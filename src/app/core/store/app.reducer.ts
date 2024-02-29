import { ActionReducerMap } from '@ngrx/store';
import { SessionReducer, SessionState } from './session.reducer';

export interface AppState {
  session: SessionState;
}

export const appReducers: ActionReducerMap<AppState> = {
  session: SessionReducer,
};
