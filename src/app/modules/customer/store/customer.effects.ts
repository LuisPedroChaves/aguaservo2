import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { CustomerService } from '../services/customer.service';
import {
  CREATE_CUSTOMER,
  DELETE_CUSTOMER,
  READ_CUSTOMERS,
  REMOVE_CUSTOMER,
  SET_CUSTOMERS,
  SET_EDIT_CUSTOMER,
  SET_NEW_CUSTOMER,
  UPDATE_CUSTOMER,
} from './customer.actions';

@Injectable()
export class CustomerEffects {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService
  ) {}

  read = createEffect(() =>
    this.actions$.pipe(
      ofType(READ_CUSTOMERS),
      mergeMap(({ filter }) =>
        this.customerService.read(filter).pipe(
          map((resp) =>
            SET_CUSTOMERS({
              customers: resp.customers,
              totalCustomers: resp.totalElements,
            })
          )
        )
      )
    )
  );

  create = createEffect(() =>
    this.actions$.pipe(
      ofType(CREATE_CUSTOMER),
      mergeMap(({ customer }) =>
        this.customerService
          .create(customer)
          .pipe(map((customer) => SET_NEW_CUSTOMER({ customer })))
      )
    )
  );

  update = createEffect(() =>
    this.actions$.pipe(
      ofType(UPDATE_CUSTOMER),
      mergeMap(({ customer }) =>
        this.customerService
          .update(customer)
          .pipe(map((customer) => SET_EDIT_CUSTOMER({ customer })))
      )
    )
  );

  delete = createEffect(() =>
    this.actions$.pipe(
      ofType(DELETE_CUSTOMER),
      mergeMap(({ idCustomer }) =>
        this.customerService
          .delete(idCustomer)
          .pipe(map((customer) => REMOVE_CUSTOMER({ customer })))
      )
    )
  );
}
