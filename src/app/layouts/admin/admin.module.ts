import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { IndexComponent } from './index/index.component';
import { MenuComponent } from './menu/menu.component';
import { AdminRoutes } from './admin.routing';
import { SharedModule } from '../../shared/shared.module';
import { DrawerReducer } from './store/drawer.reducer';
import { LogoComponent } from '../../core/components/logo/logo.component';
import { ThemeButtonComponent } from '../../core/components/theme-button/theme-button.component';

@NgModule({
  declarations: [IndexComponent, MenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    SharedModule,
    // ngrx
    StoreModule.forFeature('drawer', DrawerReducer),
    // components
    LogoComponent,
    ThemeButtonComponent
  ],
})
export class AdminModule {}
