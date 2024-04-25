import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-simple-button',
  standalone: true,
  imports: [],
  templateUrl: './simple-button.component.html',
  styleUrl: './simple-button.component.css'
})
export class SimpleButtonComponent {
    @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() message: string = 'Mensaje predeterminado';

    clickButton(){
        this.clicked.emit(true);
    }
}
