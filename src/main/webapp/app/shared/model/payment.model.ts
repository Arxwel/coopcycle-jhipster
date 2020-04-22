import { IBasket } from 'app/shared/model/basket.model';
import { PaymentMethod } from 'app/shared/model/enumerations/payment-method.model';

export interface IPayment {
  id?: number;
  mode?: PaymentMethod;
  basket?: IBasket;
}

export class Payment implements IPayment {
  constructor(public id?: number, public mode?: PaymentMethod, public basket?: IBasket) {}
}
