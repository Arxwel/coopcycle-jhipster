export interface IRestaurantOwner {
  id?: number;
}

export class RestaurantOwner implements IRestaurantOwner {
  constructor(public id?: number) {}
}
