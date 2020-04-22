import { ICooperative } from 'app/shared/model/cooperative.model';

export interface IUserAccount {
  id?: number;
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  address?: string;
  phone?: string;
  adminsys?: ICooperative[];
  members?: ICooperative[];
}

export class UserAccount implements IUserAccount {
  constructor(
    public id?: number,
    public name?: string,
    public surname?: string,
    public email?: string,
    public password?: string,
    public address?: string,
    public phone?: string,
    public adminsys?: ICooperative[],
    public members?: ICooperative[]
  ) {}
}
