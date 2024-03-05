import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.scss'
})
export class EmptyComponent {
  @Input() message = 'No hay datos para mostrar';
}
