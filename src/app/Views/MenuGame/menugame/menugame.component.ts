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
          localStorage.removeItem('gameId');
        });
      }
    this.WebSocketService.leaveChannel('lol');
  }

  redirectToGame(data: any) {
    if ( data.data.players[0] == this.authService.getUserId() || data.data.players[1] == this.authService.getUserId()
    ) {
      localStorage.setItem('gameId', data.data.gameId);
      localStorage.setItem('player1', data.data.players[0]);
      localStorage.setItem('player2', data.data.players[1]);
      localStorage.setItem('turn', data.data.players[1]);
      this.load1 = false;
      this.load2 = false;
      this.showBoard = true;
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
        localStorage.setItem('gameId', data.gameId);
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
        localStorage.setItem('gameId', data.gameId);
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

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.load1) {
      this.load1 = false;
      this.JuegourlsService.dequeueGame().subscribe(data => {
        console.log('Dequeued game:', data);
        localStorage.removeItem('gameId');
      });
    }else if (event.key === 'Escape' && this.load2) {
      this.load2 = false;
      this.joiningGame = false;
    }
  }
}
