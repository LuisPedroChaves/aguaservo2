import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { ISession } from '../../../core/models/session.model';
import { IRole, IRoleModule } from '../../../core/models/role.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store/app.reducer';
import { DrawerStore } from '../store/drawer.reducer';
import { Router } from '@angular/router';
import { LOGOUT } from '../../../core/store/actions/session.actions';
import { CHANGE_MENU_DRAWER } from '../store/drawer.actions';
import { ICompany } from '../../../core/models/company.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit, OnDestroy {
  @ViewChild('menuDrawer') menuDrawer: MatDrawer;
  drawerSubscription = new Subscription();

  sessionSubscription = new Subscription();
  session: ISession = null;
  role: IRole = null;
  module: IRoleModule = null;

  companySubscription = new Subscription();
  currentCompany: ICompany;

  constructor(
    private appStore: Store<AppState>,
    private drawerStore: Store<DrawerStore>,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.drawerSubscription = this.drawerStore
      .select('drawer')
      .subscribe((state) => {
        if (this.menuDrawer) {
          this.menuDrawer.opened = state.menuDrawer;
        }
      });

    this.sessionSubscription = this.appStore
      .select('session')
      .subscribe((state) => {
        if (state.session) {
          this.session = state.session;
          this.role = this.session.user?.role;
        }
      });

    this.companySubscription = this.appStore
      .select('company')
      .subscribe((state) => {
        this.currentCompany = state.company;
      });
  }

  ngOnDestroy(): void {
    this.drawerSubscription?.unsubscribe();
    this.sessionSubscription?.unsubscribe();
    this.companySubscription?.unsubscribe();
  }

  logout(): void {
    this.appStore.dispatch(LOGOUT());
    localStorage.removeItem('aguaservo2-session');
    this.router.navigate(['/session']);
  }

  openMenu(module: IRoleModule): void {
    this.module = module;
    if (this.menuDrawer.opened) {
      return;
    }
    this.appStore.dispatch(CHANGE_MENU_DRAWER());
  }

  closeMenu(): void {
    if (this.menuDrawer.opened) {
      this.appStore.dispatch(CHANGE_MENU_DRAWER());
    }
  }
}
