import { createReducer, on } from '@ngrx/store';
import {
  CHANGE_MENU_DRAWER,
  CLOSE_DRAWER1,
  CLOSE_DRAWER2,
  CLOSE_DRAWER3,
  CLOSE_SIDE_DRAWER,
  OPEN_DRAWER1,
  OPEN_DRAWER2,
  OPEN_DRAWER3,
  OPEN_SIDE_DRAWER,
} from './drawer.actions';
import { AppState } from '../../../core/store/app.reducer';

export interface DrawerState {
  menuDrawer: boolean;
  drawer1: boolean;
  width1: string;
  component1: string;
  drawer2: boolean;
  width2: string;
  component2: string;
  drawer3: boolean;
  width3: string;
  component3: string;
  sideDrawer: boolean;
  width: string;
  component: string;
}

export interface DrawerStore extends AppState {
  drawer: DrawerState;
}

export const DRAWER_STATE: DrawerState = {
  menuDrawer: false,
  drawer1: false,
  width1: '90%',
  component1: '',
  drawer2: false,
  width2: '60%',
  component2: '',
  drawer3: false,
  width3: '30%',
  component3: '',
  sideDrawer: false,
  width: '30%',
  component: '',
};

const _DRAWER_REDUCER = createReducer(
  DRAWER_STATE,

  on(CHANGE_MENU_DRAWER, (state) => ({
    ...state,
    menuDrawer: !state.menuDrawer,
  })),

  on(OPEN_DRAWER1, (state, { width1, component1 }) => ({
    ...state,
    drawer1: true,
    width1,
    component1,
  })),

  on(CLOSE_DRAWER1, (state) => ({
    ...state,
    drawer1: false,
    width1: '90%',
    component1: '',
  })),

  on(OPEN_DRAWER2, (state, { width2, component2 }) => ({
    ...state,
    drawer2: true,
    width2,
    component2,
  })),

  on(CLOSE_DRAWER2, (state) => ({
    ...state,
    drawer2: false,
    width2: '60%',
    component2: '',
  })),

  on(OPEN_DRAWER3, (state, { width3, component3 }) => ({
    ...state,
    drawer3: true,
    width3,
    component3,
  })),

  on(CLOSE_DRAWER3, (state) => ({
    ...state,
    drawer3: false,
    width3: '60%',
    component3: '',
  })),

  on(OPEN_SIDE_DRAWER, (state, { width, component }) => ({
    ...state,
    sideDrawer: true,
    width,
    component,
  })),

  on(CLOSE_SIDE_DRAWER, (state) => ({
    ...state,
    sideDrawer: false,
    width: '30%',
    component: '',
  }))
);

export function DrawerReducer(state: any, action: any) {
  return _DRAWER_REDUCER(state, action);
}
