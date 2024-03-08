import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { UserModule } from '../../modules/user/user.module';

export const AdminRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('../../modules/customer/customer.module').then(
            (m) => m.CustomerModule
          ),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('../../modules/project/project.module').then(
            (m) => m.ProjectModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../../modules/user/user.module').then((m) => m.UserModule),
      },
    ],
  },
];
