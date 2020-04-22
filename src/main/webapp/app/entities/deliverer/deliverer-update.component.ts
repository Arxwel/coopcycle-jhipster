import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDeliverer, Deliverer } from 'app/shared/model/deliverer.model';
import { DelivererService } from './deliverer.service';

@Component({
  selector: 'jhi-deliverer-update',
  templateUrl: './deliverer-update.component.html'
})
export class DelivererUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: []
  });

  constructor(protected delivererService: DelivererService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deliverer }) => {
      this.updateForm(deliverer);
    });
  }

  updateForm(deliverer: IDeliverer): void {
    this.editForm.patchValue({
      id: deliverer.id
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const deliverer = this.createFromForm();
    if (deliverer.id !== undefined) {
      this.subscribeToSaveResponse(this.delivererService.update(deliverer));
    } else {
      this.subscribeToSaveResponse(this.delivererService.create(deliverer));
    }
  }

  private createFromForm(): IDeliverer {
    return {
      ...new Deliverer(),
      id: this.editForm.get(['id'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeliverer>>): void {
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
