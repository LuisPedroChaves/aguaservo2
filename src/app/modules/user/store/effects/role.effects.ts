import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { RoleService } from '../../services/role.service';
import * as actions from '../actions/role.actions';

@Injectable()
export class RoleEffects {
  constructor(private actions$: Actions, private roleService: RoleService) {}

  read = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.READ_ROLES),
      mergeMap(() =>
        this.roleService
          .read()
          .pipe(map((roles) => actions.SET_ROLES({ roles })))
      )
    )
  );

  create = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.CREATE_ROLE),
      mergeMap(({ role }) =>
        this.roleService
          .create(role)
          .pipe(map((role) => actions.SET_NEW_ROLE({ role })))
      )
    )
  );

  update = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.UPDATE_ROLE),
      mergeMap(({ role }) =>
        this.roleService
          .update(role)
          .pipe(map((role) => actions.SET_EDIT_ROLE({ role })))
      )
    )
  );

  delete = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.DELETE_ROLE),
      mergeMap(({ idRole }) =>
        this.roleService
          .delete(idRole)
          .pipe(map((role) => actions.REMOVE_ROLE({ role })))
      )
    )
  );
}
