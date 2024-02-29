import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserStore } from '../../store/reducers/user.reducer';
import { SET_USER } from '../../store/actions/user.actions';
import { IUser } from '../../../../core/models/user.model';
import { FilterPipe } from '../../../../shared/pipes/filter.pipe';
import { OPEN_DRAWER1 } from '../../../../layouts/admin/store/drawer.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  userStoreSubscription = new Subscription();
  users: IUser[] = [];
  filterUsers: IUser[] = [];

  constructor(
    private userStore: Store<UserStore>,
    private filterPipe: FilterPipe
  ) {}

  ngOnInit(): void {
    this.userStoreSubscription = this.userStore
      .select('user')
      .subscribe((state) => {
        this.users = state.users;
        this.filterUsers = state.users;
      });
  }

  ngOnDestroy(): void {
    this.userStoreSubscription?.unsubscribe();
  }

  openDrawer1(width1: string, component1: string, user: IUser): void {
    this.userStore.dispatch(SET_USER({ user }));
    this.userStore.dispatch(OPEN_DRAWER1({ width1, component1 }));
  }

  applyFilter(event: Event): void {
    const FILTER_VALUE = (event.target as HTMLInputElement).value;
    const TEXT = FILTER_VALUE.trim().toLowerCase();

    if (TEXT.length > 0) {
      this.filterUsers = this.filterPipe.transform(this.users, TEXT, [
        'name',
        'username',
      ]);
      return;
    }

    this.filterUsers = this.users;
    return;
  }

  resetFilter(value: string) {
    if (value === '') {
      this.filterUsers = this.users;
    }
  }
}
