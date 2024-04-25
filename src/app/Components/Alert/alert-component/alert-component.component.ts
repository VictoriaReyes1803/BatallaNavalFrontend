import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [ 
    RouterLink
   ],
  templateUrl: './alert-component.component.html',
  styleUrl: './alert-component.component.css',
})
export class AlertComponentComponent {
  @Input() message: string = '';
  state: string = 'in';

}
