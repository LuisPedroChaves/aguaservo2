import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RoleStore } from '../../store/reducers/role.reducer';
import { SET_ROLE } from '../../store/actions/role.actions';
import { IRole } from '../../../../core/models/user/role.model';
import { FilterPipe } from '../../../../shared/pipes/filter.pipe';
import { OPEN_DRAWER1 } from '../../../../layouts/admin/store/drawer.actions';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit, OnDestroy {
  rolesStoreSubscription = new Subscription();
  roles: IRole[] = [];
  filterRoles: IRole[] = [];

  constructor(
    private roleStore: Store<RoleStore>,
    private filterPipe: FilterPipe
  ) {}

  ngOnInit(): void {
    this.rolesStoreSubscription = this.roleStore
      .select('role')
      .subscribe((state) => {
        this.roles = state.roles;
        this.filterRoles = state.roles;
      });
  }

  ngOnDestroy(): void {
    this.rolesStoreSubscription?.unsubscribe();
  }

  openDrawer1(width1: string, component1: string, role: IRole): void {
    this.roleStore.dispatch(SET_ROLE({ role }));
    this.roleStore.dispatch(OPEN_DRAWER1({ width1, component1 }));
  }

  applyFilter(event: Event): void {
    const FILTER_VALUE = (event.target as HTMLInputElement).value;
    const TEXT = FILTER_VALUE.trim().toLowerCase();

    if (TEXT.length > 0) {
      this.filterRoles = this.filterPipe.transform(this.roles, TEXT, ['name']);
      return;
    }

    this.filterRoles = this.roles;
    return;
  }

  resetFilter(value: string) {
    if (value === '') {
      this.filterRoles = this.roles;
    }
  }
}
