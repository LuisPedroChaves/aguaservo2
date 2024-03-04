import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemingService } from '../../services/theming.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { ICompany } from '../../models/project/company.model';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent implements OnInit, OnDestroy {
  @Input('width') width = 40;

  themeSubscription = new Subscription();
  isDark = false;

  companySubscription = new Subscription();
  currentCompany: ICompany;

  constructor(
    private themingService: ThemingService,
    private appStore: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.themeSubscription = this.themingService.theme.subscribe(
      (theme: string) => {
        if (theme === 'dark-theme') {
          this.isDark = true;
        } else {
          this.isDark = false;
        }
      }
    );

    this.companySubscription = this.appStore
      .select('company')
      .subscribe((state) => {
        this.currentCompany = state.company;
      });
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
    this.companySubscription?.unsubscribe();
  }
}
