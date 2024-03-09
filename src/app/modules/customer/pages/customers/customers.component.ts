import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  ICustomer,
  IFilterCustomers,
} from '../../../../core/models/customer/customer.model';
import {
  Observable,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  tap,
} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { CustomerStore } from '../../store/customer.reducer';
import {
  READ_CUSTOMERS,
  SET_CUSTOMER,
  SET_CUSTOMER_FILTERS,
} from '../../store/customer.actions';
import { OPEN_DRAWER1 } from '../../../../layouts/admin/store/drawer.actions';
import { IProject } from '../../../../core/models/project/project.model';
import { ProjectStore } from '../../../project/store/project.reducer';
import { READ_PROJECTS } from '../../../project/store/project.actions';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  filterCustomers: IFilterCustomers = {
    page: 0,
    size: 20,
    company: '',
    filter: '',
    project: '',
    isBuild: false,
    tempSuspended: false,
    isSuspended: false,
  };

  searchSubscription = new Subscription();
  search = new FormControl('');

  filters = new FormGroup({
    project: new FormControl<IProject>(null),
  });

  companySubscription = new Subscription();

  customerSubscription = new Subscription();
  displayedColumns: string[] = [
    'code',
    'name',
    'phone',
    'credit',
    'debit',
    'balance',
    'state',
    'actions',
  ];
  dataSource = new MatTableDataSource<ICustomer>([]);
  totalCustomers: number;

  projectStoreSubscription = new Subscription();
  projects: IProject[] = [];
  filteredProjects: Observable<IProject[]>;

  showFilters = false;

  constructor(
    private customerStore: Store<CustomerStore>,
    private projectStore: Store<ProjectStore>
  ) {}

  ngOnInit(): void {
    this.companySubscription = this.customerStore
      .select('company')
      .subscribe((state) => {
        if (state.company) {
          this.customerStore.dispatch(
            SET_CUSTOMER_FILTERS({
              filters: {
                ...this.filterCustomers,
                company: state.company._id,
              },
            })
          );

          this.dataSource = new MatTableDataSource<ICustomer>([]);
          this.projectStore.dispatch(
            READ_PROJECTS({ idCompany: state.company._id })
          );

          setTimeout(() => {
            this.paginator.pageIndex = 0;
            this.loadCustomersPage();
            this.paginator.page
              .pipe(tap(() => this.loadCustomersPage()))
              .subscribe();
          }, 300);
        }
      });

    this.customerSubscription = this.customerStore
      .select('customer')
      .subscribe((state) => {
        this.filterCustomers = state.filters;
        this.dataSource = new MatTableDataSource<ICustomer>(state.customers);

        if (this.totalCustomers !== state.totalCustomers) {
          this.totalCustomers = state.totalCustomers;
        }

        this.checkFilters();
      });

    this.searchSubscription = this.search.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap((changes) => {
          this.paginator.pageIndex = 0;
          this.loadCustomersPage();
        })
      )
      .subscribe();

    this.projectStoreSubscription = this.projectStore
      .select('project')
      .subscribe((state) => {
        this.projects = state.projects;

        if (this.projects.length > 0) {
          this.filteredProjects = this.filters.controls[
            'project'
          ].valueChanges.pipe(
            startWith(''),
            map((value) => {
              const name = typeof value === 'string' ? value : value?.name;

              if (typeof value === 'object') {
                this.paginator.pageIndex = 0;
                this.loadCustomersPage();
              }

              return name
                ? this._filterProjects(name as string)
                : this.projects.slice();
            })
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.customerSubscription?.unsubscribe();
  }

  loadCustomersPage(): void {
    const filter = this.search.value.replace(/\s{2,}/g, ' ').trim();

    this.filterCustomers = {
      ...this.filterCustomers,
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      filter,
      project: this.filters.controls['project'].value
        ? this.filters.controls['project'].value._id
        : '',
    };

    this.customerStore.dispatch(
      SET_CUSTOMER_FILTERS({ filters: this.filterCustomers })
    );

    this.customerStore.dispatch(
      READ_CUSTOMERS({ filter: this.filterCustomers })
    );
  }

  openDrawer1(width1: string, component1: string, customer: ICustomer): void {
    this.customerStore.dispatch(SET_CUSTOMER({ customer }));
    this.customerStore.dispatch(OPEN_DRAWER1({ width1, component1 }));
  }

  displayProject(project: IProject): string {
    return project && project.name ? `${project.code} - ${project.name}` : '';
  }

  private _filterProjects(name: string): IProject[] {
    const filterValue = name.toLowerCase();

    return this.projects.filter(
      (p) =>
        p.name.toLowerCase().includes(filterValue) ||
        p.code.toLowerCase().includes(filterValue)
    );
  }

  /* #region Filters */
  changeFilters(): void {
    if (this.showFilters) {
      this.showFilters = false;
      this.filterCustomers = {
        ...this.filterCustomers,
        isBuild: false,
        tempSuspended: false,
        isSuspended: false,
      };
      this.paginator.pageIndex = 0;
      this.loadCustomersPage();
      return;
    }

    this.showFilters = true;
  }

  checkFilters(): void {
    if (
      this.filterCustomers.isBuild ||
      this.filterCustomers.tempSuspended ||
      this.filterCustomers.isSuspended
    ) {
      this.showFilters = true;
    }
  }

  changeIsBuild(): void {
    this.filterCustomers = {
      ...this.filterCustomers,
      isBuild: !this.filterCustomers.isBuild,
    };
    this.paginator.pageIndex = 0;
    this.loadCustomersPage();
  }

  changeTempSuspended(): void {
    this.filterCustomers = {
      ...this.filterCustomers,
      tempSuspended: !this.filterCustomers.tempSuspended,
    };
    this.paginator.pageIndex = 0;
    this.loadCustomersPage();
  }

  changeIsSuspended(): void {
    this.filterCustomers = {
      ...this.filterCustomers,
      isSuspended: !this.filterCustomers.isSuspended,
    };
    this.paginator.pageIndex = 0;
    this.loadCustomersPage();
  }
  /* #endregion */
}
