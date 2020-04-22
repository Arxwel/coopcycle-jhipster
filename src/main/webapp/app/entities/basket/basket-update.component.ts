import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IBasket, Basket } from 'app/shared/model/basket.model';
import { BasketService } from './basket.service';
import { IPayment } from 'app/shared/model/payment.model';
import { PaymentService } from 'app/entities/payment/payment.service';
import { IDeliverer } from 'app/shared/model/deliverer.model';
import { DelivererService } from 'app/entities/deliverer/deliverer.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer/customer.service';
import { IRestaurantOwner } from 'app/shared/model/restaurant-owner.model';
import { RestaurantOwnerService } from 'app/entities/restaurant-owner/restaurant-owner.service';

type SelectableEntity = IPayment | IDeliverer | ICustomer | IRestaurantOwner;

@Component({
  selector: 'jhi-basket-update',
  templateUrl: './basket-update.component.html'
})
export class BasketUpdateComponent implements OnInit {
  isSaving = false;
  payments: IPayment[] = [];
  deliverers: IDeliverer[] = [];
  customers: ICustomer[] = [];
  restaurantowners: IRestaurantOwner[] = [];

  editForm = this.fb.group({
    id: [],
    basketState: [null, [Validators.required]],
    expectedDeliveryTime: [],
    deliveryAddress: [null, [Validators.required, Validators.maxLength(280)]],
    payment: [],
    deliverybaskets: [],
    customerbaskets: [],
    restaubaskets: []
  });

  constructor(
    protected basketService: BasketService,
    protected paymentService: PaymentService,
    protected delivererService: DelivererService,
    protected customerService: CustomerService,
    protected restaurantOwnerService: RestaurantOwnerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ basket }) => {
      if (!basket.id) {
        const today = moment().startOf('day');
        basket.expectedDeliveryTime = today;
      }

      this.updateForm(basket);

      this.paymentService
        .query({ filter: 'basket-is-null' })
        .pipe(
          map((res: HttpResponse<IPayment[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPayment[]) => {
          if (!basket.payment || !basket.payment.id) {
            this.payments = resBody;
          } else {
            this.paymentService
              .find(basket.payment.id)
              .pipe(
                map((subRes: HttpResponse<IPayment>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPayment[]) => (this.payments = concatRes));
          }
        });

      this.delivererService.query().subscribe((res: HttpResponse<IDeliverer[]>) => (this.deliverers = res.body || []));

      this.customerService.query().subscribe((res: HttpResponse<ICustomer[]>) => (this.customers = res.body || []));

      this.restaurantOwnerService.query().subscribe((res: HttpResponse<IRestaurantOwner[]>) => (this.restaurantowners = res.body || []));
    });
  }

  updateForm(basket: IBasket): void {
    this.editForm.patchValue({
      id: basket.id,
      basketState: basket.basketState,
      expectedDeliveryTime: basket.expectedDeliveryTime ? basket.expectedDeliveryTime.format(DATE_TIME_FORMAT) : null,
      deliveryAddress: basket.deliveryAddress,
      payment: basket.payment,
      deliverybaskets: basket.deliverybaskets,
      customerbaskets: basket.customerbaskets,
      restaubaskets: basket.restaubaskets
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const basket = this.createFromForm();
    if (basket.id !== undefined) {
      this.subscribeToSaveResponse(this.basketService.update(basket));
    } else {
      this.subscribeToSaveResponse(this.basketService.create(basket));
    }
  }

  private createFromForm(): IBasket {
    return {
      ...new Basket(),
      id: this.editForm.get(['id'])!.value,
      basketState: this.editForm.get(['basketState'])!.value,
      expectedDeliveryTime: this.editForm.get(['expectedDeliveryTime'])!.value
        ? moment(this.editForm.get(['expectedDeliveryTime'])!.value, DATE_TIME_FORMAT)
        : undefined,
      deliveryAddress: this.editForm.get(['deliveryAddress'])!.value,
      payment: this.editForm.get(['payment'])!.value,
      deliverybaskets: this.editForm.get(['deliverybaskets'])!.value,
      customerbaskets: this.editForm.get(['customerbaskets'])!.value,
      restaubaskets: this.editForm.get(['restaubaskets'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBasket>>): void {
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
}
