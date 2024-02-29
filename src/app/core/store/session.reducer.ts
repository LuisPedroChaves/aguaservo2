import { createReducer, on } from '@ngrx/store';
import { LOGOUT, SET_SESSION } from './session.actions';
import { ISession } from '../models/session.model';

export interface SessionState {
  session: ISession;
  access_token: string;
  roleType: string;
}

export const SESSION_STATE: SessionState = {
  session: null!,
  access_token: null!,
  roleType: null!,
};

const _SESSION_REDUCER = createReducer(
  SESSION_STATE,
  on(SET_SESSION, (state, { session }) => ({
    ...state,
    session,
    access_token: session.access_token,
    roleType: session.user.role.type,
  })),
  on(LOGOUT, (state) => ({
    ...state,
    access_token: null!,
    session: null!,
    roleType: null!,
  }))
);

export function SessionReducer(state: any, action: any) {
  return _SESSION_REDUCER(state, action);
}
