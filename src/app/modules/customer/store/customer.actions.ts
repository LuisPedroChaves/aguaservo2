import { createAction, props } from '@ngrx/store';
import {
  ICustomer,
  IFilterCustomers,
} from '../../../core/models/customer/customer.model';

export const READ_CUSTOMERS = createAction(
  '[CUSTOMER], Leer clientes',
  props<{ filter: IFilterCustomers }>()
);

export const SET_CUSTOMERS = createAction(
  '[CUSTOMER], Asignar clientes',
  props<{ customers: ICustomer[]; totalCustomers: number }>()
);

export const CREATE_CUSTOMER = createAction(
  '[CUSTOMER], Crear nuevo cliente',
  props<{ customer: ICustomer }>()
);

export const SET_NEW_CUSTOMER = createAction(
  '[CUSTOMER], Asignar nuevo cliente',
  props<{ customer: ICustomer }>()
);

export const SET_CUSTOMER = createAction(
  '[CUSTOMER] Asignar cliente',
  props<{ customer: ICustomer }>()
);

export const UPDATE_CUSTOMER = createAction(
  '[CUSTOMER], Editar cliente',
  props<{ customer: ICustomer }>()
);

export const SET_EDIT_CUSTOMER = createAction(
  '[CUSTOMER], Asignar cliente editado',
  props<{ customer: ICustomer }>()
);

export const DELETE_CUSTOMER = createAction(
  '[CUSTOMER], Eliminar cliente',
  props<{ idCustomer: string }>()
);

export const REMOVE_CUSTOMER = createAction(
  '[CUSTOMER], Quitar cliente',
  props<{ customer: ICustomer }>()
);

export const SET_CUSTOMER_FILTERS = createAction(
  '[CUSTOMER] Asignar filtros cliente',
  props<{ filters: IFilterCustomers }>()
);
