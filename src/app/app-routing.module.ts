import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'session',
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () =>
  //         import('./layouts/session/session.module').then(
  //           (m) => m.SessionModule
  //         ),
  //     },
  //   ],
  // },
  {
    path: '',
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'session/pageNotFound',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
