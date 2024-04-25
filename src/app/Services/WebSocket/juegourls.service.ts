import { Injectable } from '@angular/core';
import {environment} from "../../Enviroments/enviroments";
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JuegourlsService {

  constructor(
    private http: HttpClient
  ) { }


  startQueue(): Observable<any> {
    return this.http.post<any>(environment.queueGameURL, {player1_id: 1});
  }

  joinRandomGame(): Observable<any> {
    return this.http.put<any>(environment.joinRandomGameURL, {player2_id: 2});
  }

  endGame(losser_id: string, gameId: string): Observable<any> {
    return this.http.put<any>(environment.endGameURL, {losser_id: losser_id, gameId: gameId});
  }

  dequeueGame(): Observable<any> {
    return this.http.post<any>(environment.dequeueGameURL, {gameId: localStorage.getItem('gameId')});
  }

  cancelRandomQueue(): Observable<any> {
    return this.http.post<any>(environment.cancelRandomQueueURL, {player_id: 2});
  }

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
