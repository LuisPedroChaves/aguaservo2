import { IUser } from '../models/user.model';

export interface ISession {
  id: string;
  user: IUser;
  access_token: string;
  renewingToken: boolean;
}
