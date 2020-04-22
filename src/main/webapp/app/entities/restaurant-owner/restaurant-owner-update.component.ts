import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRestaurantOwner, RestaurantOwner } from 'app/shared/model/restaurant-owner.model';
import { RestaurantOwnerService } from './restaurant-owner.service';

@Component({
  selector: 'jhi-restaurant-owner-update',
  templateUrl: './restaurant-owner-update.component.html'
})
export class RestaurantOwnerUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: []
  });

  constructor(
    protected restaurantOwnerService: RestaurantOwnerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ restaurantOwner }) => {
      this.updateForm(restaurantOwner);
    });
  }

  updateForm(restaurantOwner: IRestaurantOwner): void {
    this.editForm.patchValue({
      id: restaurantOwner.id
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const restaurantOwner = this.createFromForm();
    if (restaurantOwner.id !== undefined) {
      this.subscribeToSaveResponse(this.restaurantOwnerService.update(restaurantOwner));
    } else {
      this.subscribeToSaveResponse(this.restaurantOwnerService.create(restaurantOwner));
    }
  }

  private createFromForm(): IRestaurantOwner {
    return {
      ...new RestaurantOwner(),
      id: this.editForm.get(['id'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRestaurantOwner>>): void {
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
