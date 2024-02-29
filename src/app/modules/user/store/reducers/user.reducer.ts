import { createReducer, on } from '@ngrx/store';
import {
  REMOVE_USER,
  SET_EDIT_USER,
  SET_NEW_USER,
  SET_USER,
  SET_USERS,
} from '../actions/user.actions';
import { IUser } from '../../../../core/models/user.model';
import { AppState } from '../../../../core/store/app.reducer';

export interface UserState {
  users: IUser[];
  user: IUser;
}

export interface UserStore extends AppState {
  user: UserState;
}

export const USER_STATE: UserState = {
  users: [],
  user: null!,
};

const _USER_REDUCER = createReducer(
  USER_STATE,

  on(SET_USERS, (state, { users }) => ({
    ...state,
    users: [...users],
  })),

  on(SET_NEW_USER, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),

  on(SET_USER, (state, { user }) => ({
    ...state,
    user: user ? user : null!,
  })),

  on(SET_EDIT_USER, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => {
      if (u._id === user._id) {
        return {
          ...user,
        };
      }

      return {
        ...u,
      };
    }),
  })),

  on(REMOVE_USER, (state, { user }) => ({
    ...state,
    users: state.users.filter((u) => u._id !== user._id),
  }))
);

export function UserReducer(state: UserState, action: any) {
  return _USER_REDUCER(state, action);
}
