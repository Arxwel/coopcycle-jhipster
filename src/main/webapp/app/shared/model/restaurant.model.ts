import { IRestaurantOwner } from 'app/shared/model/restaurant-owner.model';

export interface IRestaurant {
  id?: number;
  name?: string;
  address?: string;
  tel?: string;
  description?: string;
  restaurants?: IRestaurantOwner;
}

export class Restaurant implements IRestaurant {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string,
    public tel?: string,
    public description?: string,
    public restaurants?: IRestaurantOwner
  ) {}
}
