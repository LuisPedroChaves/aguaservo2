import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { UserStore } from '../../store/reducers/user.reducer';
import { RoleStore } from '../../store/reducers/role.reducer';
import {
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
} from '../../store/actions/user.actions';
import { SharedModule } from '../../../../shared/shared.module';
import {
  cannotContainSpace,
  checkPasswords,
} from '../../../../core/validators/custom.validators';
import { IRole } from '../../../../core/models/user/role.model';
import { IUser } from '../../../../core/models/user/user.model';
import { CLOSE_DRAWER1 } from '../../../../layouts/admin/store/drawer.actions';
import { ConfirmationDialogComponent } from '../../../../core/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit, OnDestroy {
  newUser = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required, cannotContainSpace]),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      role: new FormControl<IRole>(null, Validators.required),
      warehouse: new FormControl(null),
    },
    { validators: checkPasswords }
  );

  userStoreSubscription = new Subscription();
  user: IUser = null;

  roleStoreSubscription = new Subscription();
  roles: IRole[] = [];
  filteredRoles: Observable<IRole[]>;

  visible = false;

  constructor(
    private userStore: Store<UserStore>,
    private roleStore: Store<RoleStore>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userStoreSubscription = this.userStore
      .select('user')
      .subscribe((state) => {
        this.setUser(state.user);
      });

    this.roleStoreSubscription = this.roleStore
      .select('role')
      .subscribe((state) => {
        this.roles = state.roles;
      });

    this.filteredRoles = this.newUser.controls['role'].valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterRoles(name as string) : this.roles.slice();
      })
    );
  }

  ngOnDestroy(): void {
    this.userStoreSubscription?.unsubscribe();
    this.roleStoreSubscription?.unsubscribe();
  }

  displayRole(role: IRole): string {
    return role && role.name ? role.name : '';
  }

  private _filterRoles(name: string): IRole[] {
    const filterValue = name.toLowerCase();

    return this.roles.filter((role) =>
      role.name.toLowerCase().includes(filterValue)
    );
  }

  closeDrawer1(): void {
    this.userStore.dispatch(CLOSE_DRAWER1());
  }

  resetNewUser(): void {
    this.newUser.reset({
      role: null,
    });
  }

  setUser(user: IUser): void {
    if (user) {
      this.user = user;

      this.newUser.controls['name'].setValue(user.name);
      this.newUser.controls['username'].setValue(user.username);
      this.newUser.controls['role'].setValue(user.role);
      return;
    }

    this.user = null!;
    this.resetNewUser();
  }

  deleteUser(): void {
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: '375px',
        panelClass: 'custom',
        data: {
          title: `Eliminar usuario`,
          description: `¿Está seguro que desea eliminar el usuario: ${this.user.username}?`,
          confirmation: true,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) {
          this.userStore.dispatch(DELETE_USER({ idUser: this.user._id }));
          this.closeDrawer1();
        }
      });
  }

  onSubmit(): void {
    if (this.newUser.invalid) {
      return;
    }

    const { name, username, password, role, warehouse } = this.newUser.value;

    if (this.user) {
      this.user = {
        ...this.user,
        name,
        username,
        role,
      };

      this.userStore.dispatch(UPDATE_USER({ user: this.user }));
      this.closeDrawer1();

      return;
    }

    const user: IUser = {
      name,
      username,
      password,
      role,
    };

    this.userStore.dispatch(CREATE_USER({ user }));
    this.resetNewUser();
  }
}
