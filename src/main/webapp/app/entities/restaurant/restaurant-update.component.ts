import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRestaurant, Restaurant } from 'app/shared/model/restaurant.model';
import { RestaurantService } from './restaurant.service';
import { IRestaurantOwner } from 'app/shared/model/restaurant-owner.model';
import { RestaurantOwnerService } from 'app/entities/restaurant-owner/restaurant-owner.service';

@Component({
  selector: 'jhi-restaurant-update',
  templateUrl: './restaurant-update.component.html'
})
export class RestaurantUpdateComponent implements OnInit {
  isSaving = false;
  restaurantowners: IRestaurantOwner[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    address: [null, [Validators.maxLength(280)]],
    tel: [null, [Validators.required, Validators.pattern('^((\\+)33|0)[1-9](\\d{2}){4}$')]],
    description: [null, [Validators.minLength(20), Validators.maxLength(512)]],
    restaurants: [null, Validators.required]
  });

  constructor(
    protected restaurantService: RestaurantService,
    protected restaurantOwnerService: RestaurantOwnerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ restaurant }) => {
      this.updateForm(restaurant);

      this.restaurantOwnerService.query().subscribe((res: HttpResponse<IRestaurantOwner[]>) => (this.restaurantowners = res.body || []));
    });
  }

  updateForm(restaurant: IRestaurant): void {
    this.editForm.patchValue({
      id: restaurant.id,
      name: restaurant.name,
      address: restaurant.address,
      tel: restaurant.tel,
      description: restaurant.description,
      restaurants: restaurant.restaurants
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const restaurant = this.createFromForm();
    if (restaurant.id !== undefined) {
      this.subscribeToSaveResponse(this.restaurantService.update(restaurant));
    } else {
      this.subscribeToSaveResponse(this.restaurantService.create(restaurant));
    }
  }

  private createFromForm(): IRestaurant {
    return {
      ...new Restaurant(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      address: this.editForm.get(['address'])!.value,
      tel: this.editForm.get(['tel'])!.value,
      description: this.editForm.get(['description'])!.value,
      restaurants: this.editForm.get(['restaurants'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRestaurant>>): void {
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

  trackById(index: number, item: IRestaurantOwner): any {
    return item.id;
  }
}
