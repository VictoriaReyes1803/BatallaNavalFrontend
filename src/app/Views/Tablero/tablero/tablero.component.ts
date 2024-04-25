import { Component } from '@angular/core';
import {WebSocketService} from "../../../Services/WebSocket/websocket.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../../../Services/Auth/auth.service";
import {JuegourlsService} from "../../../Services/WebSocket/juegourls.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})
export class TableroComponent {

  tabla: string[][] = [];
  tabla2: string[][] = [];

  barcos = 15;
  juegoFinalizado = false;
  turno = localStorage.getItem('turno');
  idEnemigo :string | null = '';
  juego = localStorage.getItem('idPartida');
  cargandobala = false;


  constructor(
    private wsService: WebSocketService,
    private authService: AuthService,
    private router: Router,
    private juegoUrls: JuegourlsService
  ){

  }

  ngOnInit(){
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
      this.ataques();
      this.ataqueCorrecto();
      this.winner();
      this.ataqueFallido();
    }, 2000)
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
    if(salir == true){

    }
  }

  atacar(i:number, j:number){
    let celda = [i, j];
  }

  ataques(){
    this.wsService.atacar((data) => {
      const vistima = data.data[2];

      if(vistima == this.authService.getUserId()){
        if(this.tabla[data.data[1][0]][data.data[1][1]] == 's'){
          this.turno = vistima;
          this.tabla[data.data[1][0]][data.data[1][1]] = 'h';
          //alerta abajo
          this.barcos--;
          this.juegoUrls.ataqueExitoso(true, data.data[3], data.data[1], data.data[3]);

          if(this.barcos == 0){
            this.juegoFinalizado = true;
            this.juegoUrls.finalizarJuego(this.juego, this.authService.getUserId());
            Swal.fire({
              title: 'Fin del juego',
              text: 'Perdiste :c',
              icon: 'warning'
            });
          }
        }else{
          this.turno = vistima;
          this.tabla[data.data[1][0]][data.data[1][1]] = 'm';
          this.juegoUrls.ataqueFallido(false, data.data[3], data.data[1], data.data[3]);
          //alerta abajo
        }
      }
    });
  }

  ataqueCorrecto(){
    this.wsService.ataqueCorrecto((data) => {
      const idEnemigo = data.data[3];
      const statusAtaque = data.data[0];

      if(idEnemigo == this.authService.getUserId() && statusAtaque == true){
        this.tabla2[data.data[2][0]][data.data[2][1]] = 'h';
        this.turno = this.idEnemigo;
        this.cargandobala = false;
        //Poner la alerta aquí
      }
    })
  }

  ataqueFallido(){
    this.wsService.ataqueFallido((data) => {
      const idEnemigo = data.data[3];
      const statusAtaque = data.data[0];
      const turno = data.data[1];
      if(idEnemigo == this.authService.getUserId() && statusAtaque == false){
        this.tabla2[data.data[2][0]][data.data[2][1]] = 'm';
        this.turno = turno;
        this.cargandobala = false;
        //Poner la alerta aquí

      }
    })
  }

  winner(){
    this.wsService.alertaGanador((data) => {
      if(data.data == this.authService.getUserId()){
        this.juegoFinalizado = true;
        //Poner la alerta aquí
      }
    });
  }
}
