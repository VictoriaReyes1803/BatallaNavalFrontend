import { Component} from '@angular/core';
import { WebSocketService } from '../../../Services/WebSocket/websocket.service';
import { GlobalLoaderComponent } from '../../../Components/GlobalLoader/globalloader/globalloader.component';
import { AuthService } from '../../../Services/Auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameServiceService } from '../../../Services/GameService/game-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GlobalLoaderComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class MenuGame{

  userName: string = ''
  disab = false
  isSubmitting = false
  isSubmitting2 = false
  isSubmitting3 = false
  joiningGame = false
  constructor(private WebSocketService: WebSocketService, private AuthServiceService: AuthServiceService, private router: Router, private GameServiceService: GameServiceService) {}

  ngOnInit() {
    this.userName = this.AuthServiceService.getUserName()
    setTimeout(() => {
      this.WebSocketService.creategame((data) => {
        console.log('Echo data:', data);
        if (this.AuthServiceService.getUserId() == data.data.players[0] || this.AuthServiceService.getUserId() == data.data.players[1]) {
          localStorage.setItem('gameId', data.data.gameId);
          localStorage.setItem('player1', data.data.players[0]);
          localStorage.setItem('player2', data.data.players[1]);
          this.router.navigate(['/game/' + data.data.gameId]);
        }
      })
    }, 1500);
  }

  creategame() {
    this.isSubmitting = true;
    this.GameServiceService.createGame().subscribe(
      (result) => {
        localStorage.setItem('gameId', result.gameId);
      },
      (error) => {
        console.error('Error creating game:', error);
      }
    );
  }

  ngOnDestroy(){
      this.WebSocketService.leaveChannel('game');
  }

  searchgame(){
    if (!this.joiningGame) {
      return;
    }
    this.GameServiceService.findGame().subscribe(
      data => {
        console.log('Joined game:', data);
        localStorage.setItem('gameId', data.gameId);
        if (!data.game_found) {
          setTimeout(() => {
            this.searchgame();
          }, 2500);
        }
      },
      err => {
        if (err.error.game_found == false) {
          setTimeout(() => {
            this.searchgame();
          }, 2500);
        }
      }
    );
  }

  
  joingame() {
    this.isSubmitting2 = true;
    this.joiningGame = true;
    this.searchgame();
  }

  stadistics(){
    this.isSubmitting3 = true
    this.router.navigate(['/stadistics']);
  }

  
  logout(){
    this.isSubmitting3 = true
    this.AuthServiceService.logout().then((result) => {
      if (result) {

      } else {
        this.isSubmitting3 = false
        alert('Hubo un error al cerrar sesión')
      }
    });
    this.router.navigate(['/']);
  }

  closeCreateGame(){
    this.disab = true
    console.log('cerrando uncreate game ')
      this.GameServiceService.unCreateGame().subscribe(data => {
        console.log('Uncreate game:', data);
        this.isSubmitting = false;
        this.disab = false
        localStorage.removeItem('gameId');
      });
  }

  closeSearchGame(){
    console.log('cerrando search game ')
    this.isSubmitting2 = false;
    this.joiningGame = false;
  }

}
