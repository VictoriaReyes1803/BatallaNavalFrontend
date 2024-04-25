import { Component, HostListener} from '@angular/core';
import { WebSocketService } from '../../../Services/WebSocket/websocket.service';
import { GlobalLoaderComponent } from '../../../Components/GlobalLoader/globalloader/globalloader.component';
import { AuthService } from '../../../Services/Auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JuegourlsService } from '../../../Services/WebSocket/juegourls.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GlobalLoaderComponent, CommonModule],
  templateUrl: './menugame.component.html',
  styleUrls: ['./menugame.component.css']
})
export class MenuGame{
  private audio = new Audio();

  load1: Boolean = false;
  load2: Boolean = false;
  joiningGame: Boolean = false;
    showHistory: Boolean = false;
    userName: string = ''
  eventSource: EventSource | null = null;
    showBoard: Boolean = false;


  constructor(
    private authService: AuthService,
    private router: Router,
    private JuegourlsService: JuegourlsService,
    private WebSocketService: WebSocketService,
) {}


  ngOnInit() {
    this.audio.src = 'assets/audios/fortnitemusic.mp3';
    this.audio.load(); 
    this.audio.loop = true; 
    this.audio.play().catch(error => console.error("Error playing audio:", error));    
    this.userName = this.authService.getUserName()
    setTimeout(() => {
      this.WebSocketService.startgame((data) => {
        console.log('Echo data:', data);
        this.redirectToGame(data);
      })
    }, 1500);
    
  }

  ngOnDestroy(){
      if (this.load1 === true){
        this.JuegourlsService.dequeueGame().subscribe(data => {
          console.log('Dequeued game:', data);
          localStorage.removeItem('idPartida');
        });
      }
    this.WebSocketService.leaveChannel('startgame');
    this.audio.pause()
  }

  redirectToGame(data: any) {
    if ( data.data.players[0] == this.authService.getUserId() || data.data.players[1] == this.authService.getUserId()
    ) {
      localStorage.setItem('p1', data.data.players[0]);
      localStorage.setItem('p2', data.data.players[1]);
      localStorage.setItem('turno', data.data.players[1]);
      localStorage.setItem('idPartida', data.data.gameId);
      this.load1 = false;
      this.load2 = false;
      this.router.navigate(['/Tablero'])
    }
  }

    closeHistory(){
        this.showHistory = false;
    }

    openHistory(){
        this.showHistory = true;
    }

  startQueue() {
    this.load1 = true;
    this.JuegourlsService.startQueue().subscribe(
      data => {
        localStorage.setItem('idPartida', data.gameId);
      },
      err =>{
        if (err.status == 400){
          this.load1 = false;
        }
      });
  }



  joinRandomGame() {
    this.load2 = true;
    this.joiningGame = true;
    this.tryJoinRandomGame();
  }

  tryJoinRandomGame() {
    if (!this.joiningGame) {
      return;
    }
    this.JuegourlsService.joinRandomGame().subscribe(
      data => {
        console.log('Joined game:', data);
        localStorage.setItem('idPartida', data.gameId);
        if (!data.game_found) {
          setTimeout(() => {
            this.tryJoinRandomGame();
          }, 2500);
        }
      },
      err => {
        if (err.error.game_found == false) {
          setTimeout(() => {
            this.tryJoinRandomGame();
          }, 2500);
        }else if(err.status == 400){
          this.load2 = false;
          this.joiningGame = false;
        }
      }
    );
  }

  logout(){
    this.authService.logout().then((res) => {
      if(res){
        this.router.navigate(['/'])
      }
    })
  }

  cerrar1(){
    this.load1 = false;
    this.JuegourlsService.dequeueGame().subscribe(data => {
      console.log('Dequeued game:', data);
      localStorage.removeItem('idPartida');
    });
  }

  cerrar2(){
    this.load2 = false;
    this.joiningGame = false;
  }

}
