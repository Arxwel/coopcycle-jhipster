import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUserAccount, UserAccount } from 'app/shared/model/user-account.model';
import { UserAccountService } from './user-account.service';

@Component({
  selector: 'jhi-user-account-update',
  templateUrl: './user-account-update.component.html'
})
export class UserAccountUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    surname: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')]],
    password: [null, [Validators.required, Validators.minLength(8)]],
    address: [null, [Validators.required, Validators.maxLength(280)]],
    phone: [null, [Validators.required, Validators.pattern('^((\\+)33|0)[1-9](\\d{2}){4}$')]]
  });

  constructor(protected userAccountService: UserAccountService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userAccount }) => {
      this.updateForm(userAccount);
    });
  }

  updateForm(userAccount: IUserAccount): void {
    this.editForm.patchValue({
      id: userAccount.id,
      name: userAccount.name,
      surname: userAccount.surname,
      email: userAccount.email,
      password: userAccount.password,
      address: userAccount.address,
      phone: userAccount.phone
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userAccount = this.createFromForm();
    if (userAccount.id !== undefined) {
      this.subscribeToSaveResponse(this.userAccountService.update(userAccount));
    } else {
      this.subscribeToSaveResponse(this.userAccountService.create(userAccount));
    }
  }

  private createFromForm(): IUserAccount {
    return {
      ...new UserAccount(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      surname: this.editForm.get(['surname'])!.value,
      email: this.editForm.get(['email'])!.value,
      password: this.editForm.get(['password'])!.value,
      address: this.editForm.get(['address'])!.value,
      phone: this.editForm.get(['phone'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserAccount>>): void {
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
}
