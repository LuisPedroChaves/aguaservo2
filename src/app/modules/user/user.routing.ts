import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { UsersComponent } from './pages/users/users.component';
import { RolesComponent } from './pages/roles/roles.component';

export const UserRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: UsersComponent,
      },
      {
        path: 'roles',
        component: RolesComponent,
      },
    ],
  },
];
