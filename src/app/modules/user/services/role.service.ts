import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { IRole } from '../../../core/models/user/role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private API_ROLE = `${this.root}/role`;

  constructor(
    @Inject('root') private root: string,
    private http: HttpClient,
    private snackBarService: SnackBarService
  ) {}

  read(): Observable<IRole[]> {
    return this.http
      .get<IRole[]>(`${this.API_ROLE}`)
      .pipe(map((resp: any) => resp.roles));
  }

  create(role: IRole): Observable<IRole> {
    let snackBarRef = this.snackBarService.loading();

    return this.http.post(this.API_ROLE, role).pipe(
      map((resp: any) => {
        this.snackBarService.show('SUCCESS', 'Rol creado con éxito', 3000);
        return resp.role;
      })
    );
  }

  update(role: IRole): Observable<IRole> {
    let snackBarRef = this.snackBarService.loading();

    return this.http.put(`${this.API_ROLE}/${role._id}`, role).pipe(
      map((resp: any) => {
        this.snackBarService.show('SUCCESS', 'Rol actualizado con éxito', 3000);
        return resp.role;
      })
    );
  }

  delete(_id: string): Observable<IRole> {
    let snackBarRef = this.snackBarService.loading();

    return this.http.delete(`${this.API_ROLE}/${_id}`).pipe(
      map((resp: any) => {
        this.snackBarService.show('SUCCESS', 'Rol eliminado con éxito', 3000);
        return resp.role;
      })
    );
  }
}
