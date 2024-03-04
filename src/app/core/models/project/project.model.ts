import { ICompany } from './company.model';
import { IWell } from './well.model';

export interface IProject {
  _id?: string;
  _company: ICompany;
  _well?: IWell;
  code: string;
  name: string;
  fee: number;
  isActive: boolean;
}
