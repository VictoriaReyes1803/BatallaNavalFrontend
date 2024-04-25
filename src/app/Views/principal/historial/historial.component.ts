import { WebSocketService } from './../../../Services/WebSocket/websocket.service';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [
        RouterLink 
    ],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {
    constructor(
        
    ){}


}
