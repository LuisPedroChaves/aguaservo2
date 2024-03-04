import { createReducer, on } from '@ngrx/store';

import { AppState } from '../app.reducer';
import { ICompany } from '../../models/project/company.model';
import { SET_COMPANIES, SET_COMPANY } from '../actions/company.actions';

export interface CompanyState {
  companies: ICompany[];
  company: ICompany;
}

export interface CompanyStore extends AppState {
  company: CompanyState;
}

export const COMPANY_STATE: CompanyState = {
  companies: [],
  company: null!,
};

const _COMPANY_REDUCER = createReducer(
  COMPANY_STATE,

  on(SET_COMPANIES, (state, { companies }) => ({
    ...state,
    companies: [...companies],
    company: companies.length > 0 ? { ...companies[0] } : null!,
  })),

  on(SET_COMPANY, (state, { company }) => ({
    ...state,
    company: company ? { ...company } : null!,
  }))
);

export function CompanyReducer(state: any, action: any) {
  return _COMPANY_REDUCER(state, action);
}
