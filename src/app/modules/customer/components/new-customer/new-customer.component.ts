import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { cannotContainSpace } from '../../../../core/validators/custom.validators';
import { IProject } from '../../../../core/models/project/project.model';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { ICustomer } from '../../../../core/models/customer/customer.model';
import { Store } from '@ngrx/store';
import { CustomerStore } from '../../store/customer.reducer';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { ProjectStore } from '../../../project/store/project.reducer';
import { CLOSE_DRAWER1 } from '../../../../layouts/admin/store/drawer.actions';
import { ConfirmationDialogComponent } from '../../../../core/components/confirmation-dialog/confirmation-dialog.component';
import {
  CREATE_CUSTOMER,
  DELETE_CUSTOMER,
  UPDATE_CUSTOMER,
} from '../../store/customer.actions';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.scss',
})
export class NewCustomerComponent implements OnInit, OnDestroy {
  newCustomer = new FormGroup({
    _project: new FormControl<IProject>(null, Validators.required),
    code: new FormControl('', [Validators.required, cannotContainSpace]),
    name: new FormControl('', Validators.required),
    nit: new FormControl('', Validators.required),
    phone: new FormControl(''),
    address: new FormControl('CIUDAD', Validators.required),
    email: new FormControl('', Validators.email),
    customFee: new FormControl<number>(0, Validators.required),
    isBuild: new FormControl(false, Validators.required),
    isSuspended: new FormControl(false, Validators.required),
  });

  isTenant = new FormControl(false, Validators.required);
  tenantName = new FormControl(null);
  tenantNit = new FormControl('CF');
  tenantPhone = new FormControl('');

  projectStoreSubscription = new Subscription();
  projects: IProject[] = [];
  filteredProjects: Observable<IProject[]>;

  customerStoreSubscription = new Subscription();
  customer: ICustomer = null;

  constructor(
    private customerStore: Store<CustomerStore>,
    private projectStore: Store<ProjectStore>,
    private dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.customerStoreSubscription = this.customerStore
      .select('customer')
      .subscribe((state) => {
        this.setCustomer(state.customer);
      });

    this.projectStoreSubscription = this.projectStore
      .select('project')
      .subscribe((state) => {
        this.projects = state.projects;
      });

    this.filteredProjects = this.newCustomer.controls[
      '_project'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name
          ? this._filterProjects(name as string)
          : this.projects.slice();
      })
    );
  }

  ngOnDestroy(): void {
    this.customerStoreSubscription?.unsubscribe();
    this.projectStoreSubscription?.unsubscribe();
  }

  closeDrawer1(): void {
    this.customerStore.dispatch(CLOSE_DRAWER1());
  }

  displayProject(project: IProject): string {
    return project && project.name ? project.name : '';
  }

  private _filterProjects(name: string): IProject[] {
    const filterValue = name.toLowerCase();

    return this.projects.filter(
      (project) =>
        project.code.toLowerCase().includes(filterValue) ||
        project.name.toLowerCase().includes(filterValue)
    );
  }

  resetNewCustomer(): void {
    this.newCustomer.reset({
      _project: null,
      nit: 'CF',
      address: 'CIUDAD',
      customFee: 0,
      isBuild: false,
      isSuspended: false,
    });
    this.resetTenant();
  }

  resetTenant(): void {
    this.isTenant.setValue(false);
    this.tenantName.setValue('');
    this.tenantNit.setValue('CF');
    this.tenantPhone.setValue('');
  }

  setCustomer(customer: ICustomer): void {
    if (customer) {
      this.customer = customer;

      this.newCustomer.controls['_project'].setValue(customer._project);
      this.newCustomer.controls['code'].setValue(customer.code);
      this.newCustomer.controls['name'].setValue(customer.name);
      this.newCustomer.controls['nit'].setValue(customer.nit);
      this.newCustomer.controls['phone'].setValue(customer.phone);
      this.newCustomer.controls['address'].setValue(customer.address);
      this.newCustomer.controls['email'].setValue(customer.email);
      this.newCustomer.controls['customFee'].setValue(customer.customFee);
      this.newCustomer.controls['isBuild'].setValue(customer.isBuild);
      this.newCustomer.controls['isSuspended'].setValue(customer.isSuspended);

      this.isTenant.setValue(customer.isTenant);
      this.tenantName.setValue(customer.tenant.name);
      this.tenantNit.setValue(customer.tenant.nit);
      this.tenantPhone.setValue(customer.tenant.phone);
      return;
    }

    this.customer = null!;
    this.resetNewCustomer();
  }

  deleteCustomer(): void {
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: '375px',
        panelClass: 'custom',
        data: {
          title: `Eliminar Cliente`,
          description: `¿Está seguro que desea eliminar el cliente: ${this.customer.code}?`,
          confirmation: true,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) {
          this.customerStore.dispatch(
            DELETE_CUSTOMER({ idCustomer: this.customer._id })
          );
          this.closeDrawer1();
        }
      });
  }

  onSubmit(): void {
    if (this.newCustomer.invalid) {
      this.snackBarService.show(
        'WARNING',
        'Por favor complete los campos requeridos',
        2500
      );
      return;
    }

    const {
      _project,
      code,
      name,
      nit,
      phone,
      address,
      email,
      customFee,
      isBuild,
      isSuspended,
    } = this.newCustomer.value;

    if (this.customer) {
      this.customer = {
        ...this.customer,
        _project,
        tenant: {
          name: this.tenantName.value,
          nit: this.tenantNit.value,
          phone: this.tenantPhone.value,
        },
        code,
        name,
        nit,
        phone,
        address,
        email,
        customFee,
        isBuild,
        isSuspended,
        isTenant: this.isTenant.value,
      };

      this.customerStore.dispatch(UPDATE_CUSTOMER({ customer: this.customer }));
      this.closeDrawer1();

      return;
    }

    const customer: ICustomer = {
      _project,
      code: _project.code + code,
      name,
      nit,
      phone,
      address,
      email,
      customFee,
      credit: 0,
      debit: 0,
      tenant: {
        name: this.tenantName.value,
        nit: this.tenantNit.value,
        phone: this.tenantPhone.value,
      },
      tempSuspended: null,
      isTenant: this.isTenant.value,
      isBuild,
      isSuspended,
    };

    this.customerStore.dispatch(CREATE_CUSTOMER({ customer: customer }));
    this.closeDrawer1();
  }
}
