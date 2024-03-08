import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { CustomersComponent } from './pages/customers/customers.component';

export const CustomerRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: CustomersComponent,
      },
    ],
  },
];
