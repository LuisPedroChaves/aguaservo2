import { Component, OnDestroy, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';
import { ThemingService } from '../../services/theming.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-theme-button',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './theme-button.component.html',
  styleUrl: './theme-button.component.scss',
})
export class ThemeButtonComponent implements OnInit, OnDestroy {
  themingSubscription = new Subscription();
  currentTheme: string;
  isDark = false;

  constructor(
    private themingService: ThemingService,
    private overlay: OverlayContainer
  ) {}

  ngOnInit(): void {
    this.themingSubscription = this.themingService.theme.subscribe(
      (theme: string) => {
        this.currentTheme = theme;
        if (theme === 'dark-theme' || theme === 'dark-sanisidro') {
          this.isDark = true;
          this.overlay.getContainerElement().classList.add(theme);
        } else if (theme === 'light-sanisidro') {
          this.isDark = false;
          this.overlay
            .getContainerElement()
            .classList.remove('light-sanisidro');
        } else {
          this.isDark = false;
          this.overlay.getContainerElement().classList.remove('dark-theme');
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.themingSubscription?.unsubscribe();
  }

  changeTheme(): void {
    let theme = 'light-theme';

    if (this.currentTheme === 'light-theme') {
      theme = 'dark-theme';
    }

    if (this.currentTheme === 'dark-theme') {
      theme = 'light-theme';
    }

    if (this.currentTheme === 'light-sanisidro') {
      theme = 'dark-sanisidro';
    }

    if (this.currentTheme === 'dark-sanisidro') {
      theme = 'light-sanisidro';
    }

    this.themingService.theme.next(theme);
  }
}
