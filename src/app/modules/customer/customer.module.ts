import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { IndexComponent } from './pages/index/index.component';
import { CustomerRoutes } from './customer.routing';
import { SharedModule } from '../../shared/shared.module';
import { CustomersComponent } from './pages/customers/customers.component';
import { CustomerReducer } from './store/customer.reducer';
import { CustomerEffects } from './store/customer.effects';
import { ProjectReducer } from '../project/store/project.reducer';
import { ProjectEffects } from '../project/store/project.effects';

@NgModule({
  declarations: [IndexComponent, CustomersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CustomerRoutes),
    SharedModule,
    // ngrx
    StoreModule.forFeature('customer', CustomerReducer),
    StoreModule.forFeature('project', ProjectReducer),
    EffectsModule.forFeature([CustomerEffects, ProjectEffects]),
  ],
})
export class CustomerModule {}
