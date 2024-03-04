import { createAction, props } from '@ngrx/store';
import { IRole } from '../../../../core/models/user/role.model';

export const READ_ROLES = createAction('[ROLE], Leer roles');

export const SET_ROLES = createAction(
  '[ROLE], Asignar roles',
  props<{ roles: IRole[] }>()
);

export const CREATE_ROLE = createAction(
  '[ROLE], Crear nuevo role',
  props<{ role: IRole }>()
);

export const SET_NEW_ROLE = createAction(
  '[ROLE], Asignar nuevo role',
  props<{ role: IRole }>()
);

export const SET_ROLE = createAction(
  '[ROLE] Asignar role',
  props<{ role: IRole }>()
);

export const UPDATE_ROLE = createAction(
  '[ROLE], Editar role',
  props<{ role: IRole }>()
);

export const SET_EDIT_ROLE = createAction(
  '[ROLE], Asignar role editado',
  props<{ role: IRole }>()
);

export const DELETE_ROLE = createAction(
  '[ROLE], Eliminar role',
  props<{ idRole: string }>()
);

export const REMOVE_ROLE = createAction(
  '[ROLE], Quitar role',
  props<{ role: IRole }>()
);
