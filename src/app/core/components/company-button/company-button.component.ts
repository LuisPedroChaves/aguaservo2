import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { ICompany } from '../../models/project/company.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import {
  READ_COMPANIES,
  SET_COMPANY,
} from '../../store/actions/company.actions';
import { ThemingService } from '../../services/theming.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-company-button',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './company-button.component.html',
  styleUrl: './company-button.component.scss',
})
export class CompanyButtonComponent implements OnInit, OnDestroy {
  companySubscription = new Subscription();
  companies: ICompany[] = [];
  currentCompany: ICompany;
  otherCompany: ICompany;

  themingSubscription = new Subscription();
  isDark = false;

  constructor(
    public appStore: Store<AppState>,
    private themingService: ThemingService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.companySubscription = this.appStore
      .select('company')
      .subscribe((state) => {
        this.companies = state.companies;
        this.currentCompany = state.company;
        this.otherCompany = this.companies.filter(
          (c) => c._id !== this.currentCompany._id
        )[0];
      });

    if (this.companies.length === 0) {
      this.appStore.dispatch(READ_COMPANIES());
    }

    this.themingSubscription = this.themingService.theme.subscribe(
      (theme: string) => {
        if (theme === 'dark-theme' || theme === 'dark-sanisidro') {
          this.isDark = true;
        } else {
          this.isDark = false;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.companySubscription?.unsubscribe();
  }

  changeCompany(): void {
    this.appStore.dispatch(SET_COMPANY({ company: this.otherCompany }));
    let theme = 'theme';
    if (this.currentCompany.name === 'SAN ISIDRO') {
      theme = 'sanisidro';
    }
    const THEME = this.isDark ? `dark-${theme}` : `light-${theme}`;
    this.themingService.theme.next(THEME);

    this.snackBarService.show('SUCCESS', this.currentCompany.name, 1000);
  }
}
