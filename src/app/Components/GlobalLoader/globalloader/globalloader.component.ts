import { Component, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-global-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './globalloader.component.html',
  styleUrl: './globalloader.component.css'
})
export class GlobalLoaderComponent {

  @Input() text: string = '';
  @Input() textng: boolean = false;
  @Input() btntext: string = '';
  @Input() btnng: boolean = false;  
  @Input() disabled: boolean = false;  

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  btn(){
    this.close.emit(true)
  }

}
