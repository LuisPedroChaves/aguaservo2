import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemingService } from '../../../../core/services/theming.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent implements OnInit, OnDestroy {
  themingSubscription = new Subscription();
  isDark = false;

  constructor(private themingService: ThemingService) {}

  ngOnInit(): void {
    this.themingSubscription = this.themingService.theme.subscribe(
      (theme: string) => {
        if (theme === 'dark-theme') {
          this.isDark = true;
        } else {
          this.isDark = false;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.themingSubscription?.unsubscribe();
  }
}
