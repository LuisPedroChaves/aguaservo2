import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemingService } from '../../services/theming.service';

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

  constructor(private themingService: ThemingService) {}

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
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
  }
}
