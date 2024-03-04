import { IUser } from './user/user.model';

export interface ISession {
  id: string;
  user: IUser;
  access_token: string;
  renewingToken: boolean;
}
