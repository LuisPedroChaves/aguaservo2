import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { LOGIN, SET_SESSION } from '../actions/session.actions';

@Injectable()
export class SessionEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOGIN),
      mergeMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map((data) => {
            localStorage.setItem('aguaservo2-session', JSON.stringify(data));
            return SET_SESSION({ session: data });
          })
        )
      )
    )
  );
}
