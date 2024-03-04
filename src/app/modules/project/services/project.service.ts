import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { IProject } from '../../../core/models/project/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private API_PROJECT = `${this.root}/project`;

  constructor(
    @Inject('root') private root: string,
    private http: HttpClient,
    private snackBarService: SnackBarService
  ) {}

  read(idCompany: string): Observable<IProject[]> {
    return this.http
      .get<IProject[]>(`${this.API_PROJECT}/${idCompany}`)
      .pipe(map((resp: any) => resp.projects));
  }

  create(project: IProject): Observable<IProject> {
    let snackBarRef = this.snackBarService.loading();

    return this.http
      .post(this.API_PROJECT, {
        ...project,
        _company: project._company._id,
        _well: project._well?._id,
      })
      .pipe(
        map((resp: any) => {
          this.snackBarService.show(
            'SUCCESS',
            'Proyecto creado con éxito',
            3000
          );
          return resp.project;
        })
      );
  }

  update(project: IProject): Observable<IProject> {
    let snackBarRef = this.snackBarService.loading();

    return this.http
      .put(`${this.API_PROJECT}/${project._id}`, {
        ...project,
        _company: project._company._id,
        _well: project._well?._id,
      })
      .pipe(
        map((resp: any) => {
          this.snackBarService.show(
            'SUCCESS',
            'Proyecto actualizado con éxito',
            3000
          );
          return resp.project;
        })
      );
  }

  delete(_id: string): Observable<IProject> {
    let snackBarRef = this.snackBarService.loading();

    return this.http.delete(`${this.API_PROJECT}/${_id}`).pipe(
      map((resp: any) => {
        this.snackBarService.show(
          'SUCCESS',
          'Proyecto eliminado con éxito',
          3000
        );
        return resp.project;
      })
    );
  }
}
