import { Component } from '@angular/core';
import {WebSocketService} from "../../../Services/WebSocket/websocket.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";

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
  barcosEnemigos = 15;
  juegoFinalizado = false;

  ngOnInit(){
    this.llenarTabla();
    this.llenarTabla2();
    this.barcosRandom(this.tabla, this.barcos);

    console.log(this.tabla)
    console.log(this.tabla2)

    setTimeout(() => {
      this.escuchadorDeAtaques();
    }, 2000)
  }

  constructor(
    private wsService: WebSocketService
  ){

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

  escuchadorDeAtaques(){

  }

  ataqueCorrecto(){

  }

  ataqueFallido(){
  }

  winner(){

  }

}
