import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { IndexComponent } from './pages/index/index.component';
import { UsersComponent } from './pages/users/users.component';
import { RolesComponent } from './pages/roles/roles.component';
import { UserRoutes } from './user.routing';
import { SharedModule } from '../../shared/shared.module';
import { UserReducer } from './store/reducers/user.reducer';
import { RoleReducer } from './store/reducers/role.reducer';
import { UserEffects } from './store/effects/user.effects';
import { RoleEffects } from './store/effects/role.effects';



@NgModule({
  declarations: [
    IndexComponent,
    UsersComponent,
    RolesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
    SharedModule,
    // ngrx
    StoreModule.forFeature('user', UserReducer),
    StoreModule.forFeature('role', RoleReducer),
		EffectsModule.forFeature([UserEffects, RoleEffects]),
  ]
})
export class UserModule { }
