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
        path: 'users',
        loadChildren: () =>
          import('../../modules/user/user.module').then((m) => m.UserModule),
      },
    ],
  },
];
