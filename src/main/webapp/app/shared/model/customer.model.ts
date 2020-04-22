export interface ICustomer {
  id?: number;
}

export class Customer implements ICustomer {
  constructor(public id?: number) {}
}
