import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

import { READ_COMPANIES, SET_COMPANIES } from '../actions/company.actions';
import { CompanyService } from '../../services/company.service';

@Injectable()
export class CompanyEffects {
  constructor(
    private actions$: Actions,
    private companyService: CompanyService
  ) {}

  read = createEffect(() =>
    this.actions$.pipe(
      ofType(READ_COMPANIES),
      mergeMap(() =>
        this.companyService
          .read()
          .pipe(map((companies) => SET_COMPANIES({ companies })))
      )
    )
  );
}
