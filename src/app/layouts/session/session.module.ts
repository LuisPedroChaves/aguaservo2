import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { SessionRoutes } from './session.routing';
import { SharedModule } from '../../shared/shared.module';
import { ThemeButtonComponent } from '../../core/components/theme-button/theme-button.component';
import { LogoComponent } from '../../core/components/logo/logo.component';



@NgModule({
  declarations: [
    IndexComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SessionRoutes),
    SharedModule,
    // components
    ThemeButtonComponent,
    LogoComponent
  ]
})
export class SessionModule { }
