import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { DrawerStore } from '../store/drawer.reducer';
import {
  CLOSE_DRAWER1,
  CLOSE_DRAWER2,
  CLOSE_DRAWER3,
} from '../store/drawer.actions';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent implements OnInit, OnDestroy {
  @ViewChild('drawer1') drawer1!: MatDrawer;
  @ViewChild('drawer2') drawer2!: MatDrawer;
  @ViewChild('drawer3') drawer3!: MatDrawer;
  drawerSubscription = new Subscription();
  component1 = '';
  widthDrawer1 = '90%';
  component2 = '';
  widthDrawer2 = '60%';
  component3 = '';
  widthDrawer3 = '60%';

  @ViewChild('sideDrawer') sideDrawer: MatDrawer;
  drawerWidth = '30%';
  drawerComponent = '';

  constructor(private drawerStore: Store<DrawerStore>) {}

  ngOnInit(): void {
    this.drawerSubscription = this.drawerStore
      .select('drawer')
      .subscribe((state) => {
        if (this.drawer1) {
          this.drawer1.opened = state.drawer1;
          this.widthDrawer1 = state.width1;
          this.component1 = state.component1;
        }

        if (this.drawer2) {
          this.drawer2.opened = state.drawer2;
          this.widthDrawer2 = state.width2;
          this.component2 = state.component2;
        }

        if (this.drawer3) {
          this.drawer3.opened = state.drawer3;
          this.widthDrawer3 = state.width3;
          this.component3 = state.component3;
        }

        if (this.sideDrawer) {
          this.sideDrawer.opened = state.sideDrawer;
          this.drawerWidth = state.width;
          this.drawerComponent = state.component;
        }
      });
  }

  ngOnDestroy(): void {
    this.drawerSubscription?.unsubscribe();
  }

  closeDrawer1(): void {
    this.drawerStore.dispatch(CLOSE_DRAWER1());
  }

  closeDrawer2(): void {
    this.drawerStore.dispatch(CLOSE_DRAWER2());
  }

  closeDrawer3(): void {
    this.drawerStore.dispatch(CLOSE_DRAWER3());
  }
}
