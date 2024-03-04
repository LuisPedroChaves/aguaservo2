import { createReducer, on } from '@ngrx/store';
import { IProject } from '../../../core/models/project/project.model';
import { AppState } from '../../../core/store/app.reducer';
import {
  REMOVE_PROJECT,
  SET_EDIT_PROJECT,
  SET_NEW_PROJECT,
  SET_PROJECT,
  SET_PROJECTS,
} from './project.actions';

export interface ProjectState {
  projects: IProject[];
  project: IProject;
}

export interface ProjectStore extends AppState {
  project: ProjectState;
}

export const PROJECT_STATE: ProjectState = {
  projects: [],
  project: null!,
};

const _PROJECT_REDUCER = createReducer(
  PROJECT_STATE,

  on(SET_PROJECTS, (state, { projects }) => ({
    ...state,
    projects: [...projects],
  })),

  on(SET_NEW_PROJECT, (state, { project }) => ({
    ...state,
    projects: [...state.projects, project],
  })),

  on(SET_PROJECT, (state, { project }) => ({
    ...state,
    project: project ? project : null!,
  })),

  on(SET_EDIT_PROJECT, (state, { project }) => ({
    ...state,
    projects: state.projects.map((p) => {
      if (p._id === project._id) {
        return {
          ...project,
        };
      }

      return {
        ...p,
      };
    }),
  })),

  on(REMOVE_PROJECT, (state, { project }) => ({
    ...state,
    projects: state.projects.filter((p) => p._id !== project._id),
  }))
);

export function ProjectReducer(state: ProjectState, action: any) {
  return _PROJECT_REDUCER(state, action);
}
