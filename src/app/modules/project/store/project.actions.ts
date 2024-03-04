import { createAction, props } from '@ngrx/store';
import { IProject } from '../../../core/models/project/project.model';

export const READ_PROJECTS = createAction(
  '[PROJECT], Leer proyectos',
  props<{ idCompany: string }>()
);

export const SET_PROJECTS = createAction(
  '[PROJECT], Asignar proyectos',
  props<{ projects: IProject[] }>()
);

export const CREATE_PROJECT = createAction(
  '[PROJECT], Crear nuevo proyecto',
  props<{ project: IProject }>()
);

export const SET_NEW_PROJECT = createAction(
  '[PROJECT], Asignar nuevo proyecto',
  props<{ project: IProject }>()
);

export const SET_PROJECT = createAction(
  '[PROJECT] Asignar proyecto',
  props<{ project: IProject }>()
);

export const UPDATE_PROJECT = createAction(
  '[PROJECT], Editar proyecto',
  props<{ project: IProject }>()
);

export const SET_EDIT_PROJECT = createAction(
  '[PROJECT], Asignar proyecto editado',
  props<{ project: IProject }>()
);

export const DELETE_PROJECT = createAction(
  '[PROJECT], Eliminar proyecto',
  props<{ idProject: string }>()
);

export const REMOVE_PROJECT = createAction(
  '[PROJECT], Quitar proyecto',
  props<{ project: IProject }>()
);
