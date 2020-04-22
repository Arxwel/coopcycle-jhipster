import { Moment } from 'moment';
import { IBasket } from 'app/shared/model/basket.model';
import { IRole } from 'app/shared/model/role.model';

export interface INotification {
  id?: number;
  date?: Moment;
  notification?: IBasket;
  notifications?: IRole[];
}

export class Notification implements INotification {
  constructor(public id?: number, public date?: Moment, public notification?: IBasket, public notifications?: IRole[]) {}
}
