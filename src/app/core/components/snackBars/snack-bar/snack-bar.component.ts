import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss',
})
export class SnackBarComponent {
  message = 'Mensaje...';
  type = 'SUCCESS';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = this.data.message;
    this.type = this.data.type;
  }
}
