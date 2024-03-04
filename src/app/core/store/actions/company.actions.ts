import { createAction, props } from '@ngrx/store';
import { ICompany } from '../../models/project/company.model';

export const READ_COMPANIES = createAction('[COMPANY], Leer empresas');

export const SET_COMPANIES = createAction(
  '[COMPANY], Asignar empresas',
  props<{ companies: ICompany[] }>()
);

export const SET_COMPANY = createAction(
  '[COMPANY] Asignar empresa',
  props<{ company: ICompany }>()
);
