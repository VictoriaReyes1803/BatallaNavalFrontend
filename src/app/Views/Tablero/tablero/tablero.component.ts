import { Component } from '@angular/core';
import {WebSocketService} from "../../../Services/WebSocket/websocket.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../../../Services/Auth/auth.service";
import {JuegourlsService} from "../../../Services/WebSocket/juegourls.service";
import Swal from 'sweetalert2';
import { BackgroundComponent } from '../../../Components/principal/background/background.component';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    BackgroundComponent
  ],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})
export class TableroComponent {

  tabla: string[][] = [];
  tabla2: string[][] = [];
  private audio = new Audio();

  barcos = 2;
  juegoFinalizado = false;
  turno = localStorage.getItem('turno');
  idEnemigo :string | null = '';
  juego = localStorage.getItem('idPartida');
  cargandobala = false;


  constructor(
    private wsService: WebSocketService,
    public authService: AuthService,
    private router: Router,
    private juegoUrls: JuegourlsService
  ){

  }

  ngOnInit(){
    this.audio.src = 'assets/audios/cancionjuego.mp3';
    this.audio.load(); 
    this.audio.loop = true; 
    this.audio.play().catch(error => console.error("Error playing audio:", error));    

    this.llenarTabla();
    this.llenarTabla2();
    this.barcosRandom(this.tabla, this.barcos);

    console.log("Tabla: ", this.tabla)
    console.log("Tabla sin barcos: ", this.tabla2)

    if(this.authService.getUserId() == localStorage.getItem('p1')){
      this.idEnemigo = localStorage.getItem('p2');
    }else{
      this.idEnemigo = localStorage.getItem('p1');
    }

    console.log("Rival: ", this.idEnemigo);

    setTimeout(() => {
      this.wsService.atacar((data) => {
        if(data.data[2] == this.authService.getUserId()){
          if(this.tabla[data.data[1][0]][data.data[1][1]] == 's'){
            this.turno = data.data[2]
            this.tabla[data.data[1][0]][data.data[1][1]] = 'h';
            Swal.fire({
              title: 'Ataque enemigo',
              text: 'Ouch! Te han dado!',
              icon: 'warning'
            })
            this.barcos--;
            this.juegoUrls.ataqueExitoso(true, data.data[3], data.data[1], data.data[3]).subscribe(data => {
            });
            if(this.barcos == 0) {
              this.juegoFinalizado = true;
              this.juegoUrls.finalizarJuego(this.juego, this.authService.getUserId()).subscribe(data => {});
              Swal.fire({
                title: 'Fin del juego',
                text: 'Perdiste :(',
                icon: 'warning'
              })
              alert('Perdiste :c')
              this.router.navigate(['/MenuGame']);
            }
          } else {
            this.tabla[data.data[1][0]][data.data[1][1]] = 'm';
            this.turno = data.data[2];
            this.juegoUrls.ataqueFallido(false, data.data[2], data.data[1], data.data[3]).subscribe(data =>{
            })
          }
        }
      })

      this.wsService.ataqueCorrecto((data) => {
        if(data.data[3] == this.authService.getUserId() && data.data[0] == true){
          this.tabla2[data.data[2][0]][data.data[2][1]] = 'h';
          this.barcos--;
          this.turno = this.idEnemigo;
          Swal.fire({
            title: 'Ataque Exitoso',
            text: 'Le diste!',
            icon: 'info'
          })
        }
      })

      this.wsService.ataqueFallido((data) => {
        if(data.data[3] == this.authService.getUserId() && data.data[0] == false){
          this.tabla2[data.data[2][0]][data.data[2][1]] = 'm';
          this.turno = data.data[2];
          Swal.fire({
            title: 'Ataque Fallido',
            text: 'Fallaste!',
            icon: 'error'

          })
        }
      })

      this.wsService.alertaGanador((data) => {
        if(data.data == this.authService.getUserId()){
          this.juegoFinalizado = true;
          Swal.fire({
            title: 'Fin del juego',
            text: 'Ganaste c:',
            icon: 'success'
          })
          alert('Ganaste c:')
          this.router.navigate(['/MenuGame']);
          this.audio.pause()

        }
      })
      /*this.ataques();
      this.ataqueCorrecto();
      this.winner();
      this.ataqueFallido();*/
    }, 1500)
  }


  ngOnDestroy(){
    this.wsService.leaveChannel('ataque');
    this.wsService.leaveChannel('ataquefallido');
    this.wsService.leaveChannel('ganador');
    this.wsService.leaveChannel('atacar');
    this.audio.pause()

  }






  llenarTabla(){
    for (let i = 0; i < 8; i++) {
      this.tabla[i] = [];
      for (let j = 0; j < 5; j++) {
        this.tabla[i][j] = 'w';
      }
    }
  }

  llenarTabla2(){
    for (let i = 0; i < 8; i++) {
      this.tabla2[i] = [];
      for (let j = 0; j < 5; j++) {
        this.tabla2[i][j] = 'w';
      }
    }
  }

  barcosRandom(tablero:  string[][], nbarcos: number){
    for (let i = 0; i < nbarcos; i++) {
      let row, col;
      do {
        row = Math.floor(Math.random() * 8);
        col = Math.floor(Math.random() * 5);
      } while (tablero[row][col] === 's');
      tablero[row][col] = 's';
    }
  }

  salir(){
    let salir = confirm('¿Estás seguro de que quieres salir?');
    if(salir){
      this.juegoUrls.finalizarJuego(this.juego, this.authService.getUserId()).subscribe(data => {
        console.log(data);
      });
      this.router.navigate(['/MenuGame']);
      /*Swal.fire({
        title: 'Salir',
        text: 'Has salido del juego',
        icon: 'warning'
      })*/
    }
  }

  atacar(i:number, j:number){
    console.log('Ataque')
    this.cargandobala = true;
    let celda = [i, j];
    this.juegoUrls.disparar(this.juego, this.idEnemigo, this.authService.getUserId(), celda).subscribe(data => {
      console.log(data);
    });

  }

}
