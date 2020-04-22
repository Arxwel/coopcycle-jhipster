import { IUserAccount } from 'app/shared/model/user-account.model';

export interface ICooperative {
  id?: number;
  name?: string;
  area?: string;
  dg?: IUserAccount;
  adminedCoops?: IUserAccount[];
  cooperatives?: IUserAccount[];
}

export class Cooperative implements ICooperative {
  constructor(
    public id?: number,
    public name?: string,
    public area?: string,
    public dg?: IUserAccount,
    public adminedCoops?: IUserAccount[],
    public cooperatives?: IUserAccount[]
  ) {}
}
