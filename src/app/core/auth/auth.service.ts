import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, finalize, map, tap } from 'rxjs';
import { SnackBarService } from '../services/snack-bar.service';
import { ISession } from '../models/session.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_AUTH = `${this.root}/auth`;

  constructor(
    @Inject('root') private root: string,
    private http: HttpClient,
    private snackBarService: SnackBarService
  ) {}

  login(username: string, password: string): Observable<ISession> {
    const BODY = `username=${username}&password=${password}`;

    let snackBarRef = this.snackBarService.loading();

    return this.http
      .post(`${this.API_AUTH}/login`, BODY, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .pipe(
        finalize(() => snackBarRef.dismiss()),
        map((resp: any) => resp)
      );
  }

  refreshToken(): Observable<any> {
    const url = this.API_AUTH + '/refresh-token';
    return this.http.get(url);
  }

  getSession(): ISession {
    return JSON.parse(localStorage.getItem('aguaservo2-session')!)
      ? JSON.parse(localStorage.getItem('aguaservo2-session')!)
      : null;
  }
}
