import { Component } from '@angular/core';
import { WebSocketService } from '../../../Services/WebSocket/websocket.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private WebSocketService: WebSocketService){}

  ngOnInit(){
    setTimeout(() => {
      this.WebSocketService.testevent((data)=>{
        console.log(data)
      })
    }, 1500);
   
  }
}
