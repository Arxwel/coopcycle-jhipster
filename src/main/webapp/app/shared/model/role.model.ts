import { IUserAccount } from 'app/shared/model/user-account.model';
import { INotification } from 'app/shared/model/notification.model';

export interface IRole {
  id?: number;
  userroles?: IUserAccount;
  roles?: INotification[];
}

export class Role implements IRole {
  constructor(public id?: number, public userroles?: IUserAccount, public roles?: INotification[]) {}
}
