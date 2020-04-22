import { Moment } from 'moment';
import { IPayment } from 'app/shared/model/payment.model';
import { IDeliverer } from 'app/shared/model/deliverer.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { IRestaurantOwner } from 'app/shared/model/restaurant-owner.model';
import { IProduct } from 'app/shared/model/product.model';
import { BasketState } from 'app/shared/model/enumerations/basket-state.model';

export interface IBasket {
  id?: number;
  basketState?: BasketState;
  expectedDeliveryTime?: Moment;
  deliveryAddress?: string;
  payment?: IPayment;
  deliverybaskets?: IDeliverer;
  customerbaskets?: ICustomer;
  restaubaskets?: IRestaurantOwner;
  products?: IProduct[];
}

export class Basket implements IBasket {
  constructor(
    public id?: number,
    public basketState?: BasketState,
    public expectedDeliveryTime?: Moment,
    public deliveryAddress?: string,
    public payment?: IPayment,
    public deliverybaskets?: IDeliverer,
    public customerbaskets?: ICustomer,
    public restaubaskets?: IRestaurantOwner,
    public products?: IProduct[]
  ) {}
}
