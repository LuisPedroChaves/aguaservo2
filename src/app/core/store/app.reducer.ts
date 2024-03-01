import { ActionReducerMap } from '@ngrx/store';
import { SessionReducer, SessionState } from './reducers/session.reducer';
import { CompanyReducer, CompanyState } from './reducers/company.reducer';

export interface AppState {
  session: SessionState;
  company: CompanyState;
}

export const appReducers: ActionReducerMap<AppState> = {
  session: SessionReducer,
  company: CompanyReducer,
};
