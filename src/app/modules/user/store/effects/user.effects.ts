import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import * as actions from '../actions/user.actions';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private usersService: UserService) {}

  read = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.READ_USERS),
      mergeMap(() =>
        this.usersService
          .read()
          .pipe(map((users) => actions.SET_USERS({ users })))
      )
    )
  );

  create = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.CREATE_USER),
      mergeMap(({ user }) =>
        this.usersService
          .create(user)
          .pipe(map((user) => actions.SET_NEW_USER({ user })))
      )
    )
  );

  update = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.UPDATE_USER),
      mergeMap(({ user }) =>
        this.usersService
          .update(user)
          .pipe(map((user) => actions.SET_EDIT_USER({ user })))
      )
    )
  );

  delete = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.DELETE_USER),
      mergeMap(({ idUser }) =>
        this.usersService
          .delete(idUser)
          .pipe(map((user) => actions.REMOVE_USER({ user })))
      )
    )
  );
}
