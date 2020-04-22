import { IRestaurant } from 'app/shared/model/restaurant.model';
import { IBasket } from 'app/shared/model/basket.model';

export interface IProduct {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  disponibility?: boolean;
  products?: IRestaurant;
  baskets?: IBasket[];
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public price?: number,
    public disponibility?: boolean,
    public products?: IRestaurant,
    public baskets?: IBasket[]
  ) {
    this.disponibility = this.disponibility || false;
  }
}
