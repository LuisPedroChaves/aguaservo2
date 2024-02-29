import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {}
}
