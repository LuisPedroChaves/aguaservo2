import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { ProjectService } from '../services/project.service';
import {
  CREATE_PROJECT,
  DELETE_PROJECT,
  READ_PROJECTS,
  REMOVE_PROJECT,
  SET_EDIT_PROJECT,
  SET_NEW_PROJECT,
  SET_PROJECTS,
  UPDATE_PROJECT,
} from './project.actions';

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private projectService: ProjectService
  ) {}

  read = createEffect(() =>
    this.actions$.pipe(
      ofType(READ_PROJECTS),
      mergeMap(({ idCompany }) =>
        this.projectService
          .read(idCompany)
          .pipe(map((projects) => SET_PROJECTS({ projects })))
      )
    )
  );

  create = createEffect(() =>
    this.actions$.pipe(
      ofType(CREATE_PROJECT),
      mergeMap(({ project }) =>
        this.projectService
          .create(project)
          .pipe(map((project) => SET_NEW_PROJECT({ project })))
      )
    )
  );

  update = createEffect(() =>
    this.actions$.pipe(
      ofType(UPDATE_PROJECT),
      mergeMap(({ project }) =>
        this.projectService
          .update(project)
          .pipe(map((project) => SET_EDIT_PROJECT({ project })))
      )
    )
  );

  delete = createEffect(() =>
    this.actions$.pipe(
      ofType(DELETE_PROJECT),
      mergeMap(({ idProject }) =>
        this.projectService
          .delete(idProject)
          .pipe(map((project) => REMOVE_PROJECT({ project })))
      )
    )
  );
}
