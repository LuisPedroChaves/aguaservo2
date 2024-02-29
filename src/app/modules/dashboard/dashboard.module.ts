import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutes } from './dashboard.routing';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [CommonModule, RouterModule.forChild(DashboardRoutes), SharedModule],
})
export class DashboardModule {}
