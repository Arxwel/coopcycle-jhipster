export interface IDeliverer {
  id?: number;
}

export class Deliverer implements IDeliverer {
  constructor(public id?: number) {}
}
