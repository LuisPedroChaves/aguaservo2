import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RoleStore } from '../../store/reducers/role.reducer';
import { READ_USERS } from '../../store/actions/user.actions';
import { READ_ROLES } from '../../store/actions/role.actions';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(private roleStore: Store<RoleStore>) {}

  ngOnInit(): void {
    this.roleStore.dispatch(READ_USERS());
    this.roleStore.dispatch(READ_ROLES());
  }
}
