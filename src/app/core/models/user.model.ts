import { IRole } from './role.model';

export interface IUser {
  _id?: string;
  role: IRole;
  name: string;
  username: string;
  password: string;
}
