import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../../core/models/user.model';

export const READ_USERS = createAction('[USER], Leer usuarios');

export const SET_USERS = createAction(
  '[USER], Asignar usuarios',
  props<{ users: IUser[] }>()
);

export const CREATE_USER = createAction(
  '[USER], Crear nuevo usuario',
  props<{ user: IUser }>()
);

export const SET_NEW_USER = createAction(
  '[USER], Asignar nuevo usuario',
  props<{ user: IUser }>()
);

export const SET_USER = createAction(
  '[USER] Asignar usuario',
  props<{ user: IUser }>()
);

export const UPDATE_USER = createAction(
  '[USER], Editar usuario',
  props<{ user: IUser }>()
);

export const SET_EDIT_USER = createAction(
  '[USER], Asignar usuario editado',
  props<{ user: IUser }>()
);

export const DELETE_USER = createAction(
  '[USER], Eliminar usuario',
  props<{ idUser: string }>()
);

export const REMOVE_USER = createAction(
  '[USER], Quitar usuario',
  props<{ user: IUser }>()
);
