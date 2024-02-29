import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RoleStore } from '../../store/reducers/role.reducer';
import {
  CREATE_ROLE,
  DELETE_ROLE,
  UPDATE_ROLE,
} from '../../store/actions/role.actions';
import { SharedModule } from '../../../../shared/shared.module';
import { IModule, IRole, RoleType } from '../../../../core/models/role.model';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { CLOSE_DRAWER1 } from '../../../../layouts/admin/store/drawer.actions';
import { ConfirmationDialogComponent } from '../../../../core/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-new-role',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.scss'],
})
export class NewRoleComponent implements OnInit, OnDestroy {
  valueChangesSubscription = new Subscription();
  newRole = new FormGroup({
    name: new FormControl(null, Validators.required),
    type: new FormControl<RoleType>(RoleType.ADMIN, Validators.required),
  });

  modulesSubscription = new Subscription();
  modules: IModule[] = [];
  filterModules: IModule[] = [];

  roleStoreSubscription = new Subscription();
  role: IRole = null;

  constructor(
    private http: HttpClient,
    private roleStore: Store<RoleStore>,
    private dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.modulesSubscription = this.http
      .get<IModule[]>('/assets/data/modules.json')
      .subscribe((modules) => {
        this.modules = modules;
        this.fillModules(RoleType.ADMIN);
      });

    this.roleStoreSubscription = this.roleStore
      .select('role')
      .subscribe((state) => {
        this.setRole(state.role);
      });

    this.valueChangesSubscription = this.newRole.controls[
      'type'
    ].valueChanges.subscribe((change) => {
      this.fillModules(change);
    });
  }

  ngOnDestroy(): void {
    this.modulesSubscription?.unsubscribe();
    this.roleStoreSubscription?.unsubscribe();
    this.valueChangesSubscription?.unsubscribe();
  }

  closeDrawer(): void {
    this.roleStore.dispatch(CLOSE_DRAWER1());
  }

  fillModules(change: RoleType): void {
    this.filterModules = this.modules
      .slice()
      .filter((m) => m.roleType === change);
  }

  selectChilds(module: IModule): void {
    const INDEX = this.filterModules.findIndex((m) => m.name === module.name);

    this.filterModules[INDEX].options = this.filterModules[INDEX].options.map(
      (o) => {
        return {
          ...o,
          selected: module.selected,
        };
      }
    );
  }

  selectParent(module: IModule): void {
    const INDEX = this.filterModules.findIndex((m) => m.name === module.name);

    this.filterModules[INDEX].selected = true;
  }

  resetNewRole(): void {
    this.newRole.reset({
      type: RoleType.ADMIN,
    });
  }

  setRole(role: IRole): void {
    if (role) {
      this.role = role;

      this.newRole.controls['name'].setValue(role.name);
      this.newRole.controls['type'].setValue(role.type);

      setTimeout(() => {
        this.fillModules(role.type);
        this.filterModules = this.filterModules.map((m) => {
          const INDEX = role.modules.findIndex((rm) => rm.name === m.name);

          if (INDEX > -1) {
            m.selected = true;
            m.permissions = role.modules[INDEX].permissions;

            m.options = m.options.map((op) => {
              const OP_INDEX = role.modules[INDEX].options.findIndex(
                (ro) => ro.name === op.name
              );

              if (OP_INDEX > -1) {
                return {
                  ...op,
                  selected: true,
                  permissions:
                    role.modules[INDEX].options[OP_INDEX].permissions,
                };
              }

              return {
                ...op,
              };
            });
          }

          return {
            ...m,
          };
        });
      }, 1000);

      return;
    }

    this.role = null!;
    this.resetNewRole();
  }

  deleteRole(): void {
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: '375px',
        panelClass: 'custom',
        data: {
          title: `Eliminar rol`,
          description: `¿Está seguro que desea eliminar el rol: ${this.role.name}?`,
          confirmation: true,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) {
          this.roleStore.dispatch(DELETE_ROLE({ idRole: this.role._id }));
          this.closeDrawer();
        }
      });
  }

  onSubmit(): void {
    if (this.newRole.invalid) {
      this.snackBarService.show(
        'WARNING',
        'Algunos campos son obligatorios',
        3000
      );
      return;
    }

    const { name, type } = this.newRole.value;

    let modules = this.filterModules.filter((m) => m.selected);

    modules = modules.map((m) => {
      return {
        ...m,
        options: m.options.filter((o) => o.selected),
      };
    });

    if (this.role) {
      this.role = {
        ...this.role,
        name,
        type,
        modules,
      };

      this.roleStore.dispatch(UPDATE_ROLE({ role: this.role }));
      this.closeDrawer();

      return;
    }

    const role: IRole = {
      name,
      type,
      modules,
    };

    this.roleStore.dispatch(CREATE_ROLE({ role }));
    this.closeDrawer();
  }
}
