import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { IUser } from '../../../core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_USER = `${this.root}/user`;

  constructor(
    @Inject('root') private root: string,
    private http: HttpClient,
    private snackBarService: SnackBarService
  ) {}

  read(): Observable<IUser[]> {
    return this.http
      .get<IUser[]>(`${this.API_USER}`)
      .pipe(map((resp: any) => resp.users));
  }

  create(user: IUser): Observable<IUser> {
    let snackBarRef = this.snackBarService.loading();

    return this.http
      .post(this.API_USER, {
        ...user,
        role: user.role._id,
      })
      .pipe(
        map((resp: any) => {
          this.snackBarService.show(
            'SUCCESS',
            'Usuario creado con éxito',
            3000
          );
          return resp.user;
        })
      );
  }

  update(user: IUser): Observable<IUser> {
    let snackBarRef = this.snackBarService.loading();

    return this.http
      .put(`${this.API_USER}/${user._id}`, {
        ...user,
        role: user.role._id,
      })
      .pipe(
        map((resp: any) => {
          this.snackBarService.show(
            'SUCCESS',
            'Usuario actualizado con éxito',
            3000
          );
          return resp.user;
        })
      );
  }

  delete(_id: string): Observable<IUser> {
    let snackBarRef = this.snackBarService.loading();

    return this.http.delete(`${this.API_USER}/${_id}`).pipe(
      map((resp: any) => {
        this.snackBarService.show(
          'SUCCESS',
          'Usuario eliminado con éxito',
          3000
        );
        return resp.user;
      })
    );
  }
}
