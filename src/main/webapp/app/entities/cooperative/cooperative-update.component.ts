import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICooperative, Cooperative } from 'app/shared/model/cooperative.model';
import { CooperativeService } from './cooperative.service';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { UserAccountService } from 'app/entities/user-account/user-account.service';

@Component({
  selector: 'jhi-cooperative-update',
  templateUrl: './cooperative-update.component.html'
})
export class CooperativeUpdateComponent implements OnInit {
  isSaving = false;
  useraccounts: IUserAccount[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    area: [null, [Validators.required]],
    dg: [],
    adminedCoops: [],
    cooperatives: []
  });

  constructor(
    protected cooperativeService: CooperativeService,
    protected userAccountService: UserAccountService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cooperative }) => {
      this.updateForm(cooperative);

      this.userAccountService.query().subscribe((res: HttpResponse<IUserAccount[]>) => (this.useraccounts = res.body || []));
    });
  }

  updateForm(cooperative: ICooperative): void {
    this.editForm.patchValue({
      id: cooperative.id,
      name: cooperative.name,
      area: cooperative.area,
      dg: cooperative.dg,
      adminedCoops: cooperative.adminedCoops,
      cooperatives: cooperative.cooperatives
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cooperative = this.createFromForm();
    if (cooperative.id !== undefined) {
      this.subscribeToSaveResponse(this.cooperativeService.update(cooperative));
    } else {
      this.subscribeToSaveResponse(this.cooperativeService.create(cooperative));
    }
  }

  private createFromForm(): ICooperative {
    return {
      ...new Cooperative(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      area: this.editForm.get(['area'])!.value,
      dg: this.editForm.get(['dg'])!.value,
      adminedCoops: this.editForm.get(['adminedCoops'])!.value,
      cooperatives: this.editForm.get(['cooperatives'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICooperative>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IUserAccount): any {
    return item.id;
  }

  getSelected(selectedVals: IUserAccount[], option: IUserAccount): IUserAccount {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
