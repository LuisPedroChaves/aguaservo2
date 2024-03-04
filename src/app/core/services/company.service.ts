import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICompany } from '../models/project/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private API_COMPANY = `${this.root}/company`;

  constructor(@Inject('root') private root: string, private http: HttpClient) {}

  read(): Observable<ICompany[]> {
    return this.http
      .get<ICompany[]>(`${this.API_COMPANY}`)
      .pipe(map((resp: any) => resp.companies));
  }
}
