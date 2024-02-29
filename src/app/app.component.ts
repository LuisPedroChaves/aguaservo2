import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemingService } from './core/services/theming.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  themingSubscription = new Subscription();
  @HostBinding('class') className = '';
  loadingBarColor: string;

  constructor(private themingService: ThemingService) {}

  ngOnInit(): void {
    this.themingSubscription = this.themingService.theme.subscribe((theme) => {
      this.className = theme;

      if (theme === 'dark-theme') {
        this.loadingBarColor = '#91CEF5';
      } else {
        this.loadingBarColor = '#1f6587';
      }
    });
  }

  ngOnDestroy(): void {
    this.themingSubscription?.unsubscribe();
  }
}
