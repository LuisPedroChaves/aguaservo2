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
  isDark = false;

  constructor(
    private themingService: ThemingService,
    private overlay: OverlayContainer
  ) {}

  ngOnInit(): void {
    this.themingSubscription = this.themingService.theme.subscribe(
      (theme: string) => {
        if (theme === 'dark-theme') {
          this.isDark = true;
          this.overlay.getContainerElement().classList.add(theme);
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
    const THEME = this.isDark ? 'light-theme' : 'dark-theme';

    this.themingService.theme.next(THEME);
  }
}
