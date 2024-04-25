import { Injectable } from '@angular/core';
import {environment} from "../../Enviroments/enviroments";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class JuegourlsService {

  constructor(
    private http: HttpClient
  ) { }


  ataqueExitoso(hited: Boolean | null, turn: string | null, cell:number[], playerWhoAttacked: number | null ) {
    return this.http.post(environment.attackSuccessURL, {
      hited: hited,
      turn: turn,
      cell: cell,
      playerWhoAttacked: playerWhoAttacked,
    });
  }

  finalizarJuego(gameId: string | null, loser_id: number | null) {
    return this.http.put(environment.endGameURL, {
      gameId: gameId,
      loser_id: loser_id
    });
  }

  ataqueFallido(hited: Boolean | null, turn: string | null, cell:number[], playerWhoAttacked: number | null ) {
    return this.http.post(environment.attackFailedURL, {
      hited: hited,
      turn: turn,
      cell: cell,
      playerWhoAttacked: playerWhoAttacked,
    });
  }

}
