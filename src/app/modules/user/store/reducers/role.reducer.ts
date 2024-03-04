import { createReducer, on } from '@ngrx/store';
import {
  REMOVE_ROLE,
  SET_EDIT_ROLE,
  SET_NEW_ROLE,
  SET_ROLE,
  SET_ROLES,
} from '../actions/role.actions';
import { IRole } from '../../../../core/models/user/role.model';
import { AppState } from '../../../../core/store/app.reducer';

export interface RoleState {
  roles: IRole[];
  role: IRole;
}

export interface RoleStore extends AppState {
  role: RoleState;
}

export const ROLE_STATE: RoleState = {
  roles: [],
  role: null!,
};

const _ROLE_REDUCER = createReducer(
  ROLE_STATE,

  on(SET_ROLES, (state, { roles }) => ({
    ...state,
    roles: [...roles],
  })),

  on(SET_NEW_ROLE, (state, { role }) => ({
    ...state,
    roles: [...state.roles, role],
  })),

  on(SET_ROLE, (state, { role }) => ({
    ...state,
    role: role ? role : null!,
  })),

  on(SET_EDIT_ROLE, (state, { role }) => ({
    ...state,
    roles: state.roles.map((r) => {
      if (r._id === role._id) {
        return {
          ...role,
        };
      }

      return {
        ...r,
      };
    }),
  })),

  on(REMOVE_ROLE, (state, { role }) => ({
    ...state,
    roles: state.roles.filter((r) => r._id !== role._id),
  }))
);

export function RoleReducer(state: RoleState, action: any) {
  return _ROLE_REDUCER(state, action);
}
