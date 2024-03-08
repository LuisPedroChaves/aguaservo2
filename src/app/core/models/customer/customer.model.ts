import { IProject } from '../project/project.model';

export interface ICustomer {
  _id?: string;
  _project: IProject;
  code: string;
  name: string;
  nit?: string;
  phone?: string;
  address?: string;
  email?: string;
  customFee: number;
  credit: number;
  debit: number;
  tenant: ICustomerTenant;
  tempSuspended: ICustomerTempSuspended;
  isTenant: boolean;
  isBuild: boolean;
  isSuspended: boolean;
}

export interface ICustomerTenant {
  name?: string;
  nit?: string;
  phone?: string;
}

export interface ICustomerTempSuspended {
  activationDate: Date;
  reason?: string;
  isActive: boolean;
}

export interface IFilterCustomers {
  page: number;
  size: number;
  company: string;
  filter?: string;
  project?: string;
  isBuild?: boolean;
  tempSuspended?: boolean;
  isSuspended?: boolean;
}

export interface ICustomersResponse {
  customers: ICustomer[];
  totalElements: number;
}
