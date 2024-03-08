import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import {
  ICustomer,
  ICustomersResponse,
  IFilterCustomers,
} from '../../../core/models/customer/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private API_CUSTOMER = `${this.root}/customer`;

  constructor(
    @Inject('root') private root: string,
    private http: HttpClient,
    private snackBarService: SnackBarService
  ) {}

  read(filter: IFilterCustomers): Observable<ICustomersResponse> {
    return this.http
      .get<ICustomersResponse>(`${this.API_CUSTOMER}`, {
        params: new HttpParams()
          .set('page', filter.page)
          .set('size', filter.size)
          .set('company', filter.company)
          .set('filter', filter.filter)
          .set('project', filter.project)
          .set('isBuild', filter.isBuild)
          .set('tempSuspended', filter.tempSuspended)
          .set('isSuspended', filter.isSuspended)
      })
      .pipe(map((resp) => resp));
  }

  create(customer: ICustomer): Observable<ICustomer> {
    let snackBarRef = this.snackBarService.loading();

    return this.http
      .post(this.API_CUSTOMER, {
        ...customer,
        _project: customer._project._id,
      })
      .pipe(
        map((resp: any) => {
          this.snackBarService.show(
            'SUCCESS',
            'Cliente creado con éxito',
            3000
          );
          return resp.customer;
        })
      );
  }

  update(customer: ICustomer): Observable<ICustomer> {
    let snackBarRef = this.snackBarService.loading();

    return this.http
      .put(`${this.API_CUSTOMER}/${customer._id}`, {
        ...customer,
        _project: customer._project._id,
      })
      .pipe(
        map((resp: any) => {
          this.snackBarService.show(
            'SUCCESS',
            'Cliente actualizado con éxito',
            3000
          );
          return resp.customer;
        })
      );
  }

  delete(_id: string): Observable<ICustomer> {
    let snackBarRef = this.snackBarService.loading();

    return this.http.delete(`${this.API_CUSTOMER}/${_id}`).pipe(
      map((resp: any) => {
        this.snackBarService.show(
          'SUCCESS',
          'Cliente eliminado con éxito',
          3000
        );
        return resp.customer;
      })
    );
  }
}
