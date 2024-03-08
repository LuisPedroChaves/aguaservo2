import { createReducer, on } from '@ngrx/store';
import {
  ICustomer,
  IFilterCustomers,
} from '../../../core/models/customer/customer.model';
import { AppState } from '../../../core/store/app.reducer';
import {
  REMOVE_CUSTOMER,
  SET_CUSTOMER,
  SET_CUSTOMERS,
  SET_CUSTOMER_FILTERS,
  SET_EDIT_CUSTOMER,
  SET_NEW_CUSTOMER,
} from './customer.actions';

export interface CustomerState {
  customers: ICustomer[];
  totalCustomers: number;
  customer: ICustomer;
  filters: IFilterCustomers;
}

export interface CustomerStore extends AppState {
  customer: CustomerState;
}

export const CUSTOMER_STATE: CustomerState = {
  customers: [],
  totalCustomers: 0,
  customer: null!,
  filters: {
    page: 0,
    size: 20,
    company: '',
    filter: '',
    project: '',
    isBuild: false,
    tempSuspended: false,
    isSuspended: false,
  },
};

const _CUSTOMER_REDUCER = createReducer(
  CUSTOMER_STATE,

  on(SET_CUSTOMERS, (state, { customers, totalCustomers }) => ({
    ...state,
    customers: [...customers],
    totalCustomers,
  })),

  on(SET_NEW_CUSTOMER, (state, { customer }) => ({
    ...state,
    customers: [customer, ...state.customers],
  })),

  on(SET_CUSTOMER, (state, { customer }) => ({
    ...state,
    customer: customer ? customer : null!,
  })),

  on(SET_EDIT_CUSTOMER, (state, { customer }) => ({
    ...state,
    customers: state.customers.map((c) => {
      if (c._id === customer._id) {
        return {
          ...customer,
        };
      }

      return {
        ...c,
      };
    }),
  })),

  on(REMOVE_CUSTOMER, (state, { customer }) => ({
    ...state,
    customers: state.customers.filter((c) => c._id !== customer._id),
  })),

  on(SET_CUSTOMER_FILTERS, (state, { filters }) => ({
    ...state,
    filters: filters
      ? filters
      : {
          page: 0,
          size: 20,
          company: '',
          filter: '',
          project: '',
          isBuild: false,
          tempSuspended: false,
          isSuspended: false,
        },
  }))
);

export function CustomerReducer(state: CustomerState, action: any) {
  return _CUSTOMER_REDUCER(state, action);
}
