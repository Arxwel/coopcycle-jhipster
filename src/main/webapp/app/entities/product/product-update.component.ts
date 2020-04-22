import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProduct, Product } from 'app/shared/model/product.model';
import { ProductService } from './product.service';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { RestaurantService } from 'app/entities/restaurant/restaurant.service';
import { IBasket } from 'app/shared/model/basket.model';
import { BasketService } from 'app/entities/basket/basket.service';

type SelectableEntity = IRestaurant | IBasket;

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
  isSaving = false;
  restaurants: IRestaurant[] = [];
  baskets: IBasket[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [null, [Validators.minLength(5), Validators.maxLength(280)]],
    price: [null, [Validators.required, Validators.min(0)]],
    disponibility: [null, [Validators.required]],
    products: [null, Validators.required],
    baskets: [null, Validators.required]
  });

  constructor(
    protected productService: ProductService,
    protected restaurantService: RestaurantService,
    protected basketService: BasketService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);

      this.restaurantService.query().subscribe((res: HttpResponse<IRestaurant[]>) => (this.restaurants = res.body || []));

      this.basketService.query().subscribe((res: HttpResponse<IBasket[]>) => (this.baskets = res.body || []));
    });
  }

  updateForm(product: IProduct): void {
    this.editForm.patchValue({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      disponibility: product.disponibility,
      products: product.products,
      baskets: product.baskets
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const product = this.createFromForm();
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  private createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      price: this.editForm.get(['price'])!.value,
      disponibility: this.editForm.get(['disponibility'])!.value,
      products: this.editForm.get(['products'])!.value,
      baskets: this.editForm.get(['baskets'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IBasket[], option: IBasket): IBasket {
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
