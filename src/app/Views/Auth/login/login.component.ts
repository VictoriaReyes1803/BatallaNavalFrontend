import { Component } from '@angular/core';
import { WebSocketService } from '../../../Services/WebSocket/websocket.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
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
