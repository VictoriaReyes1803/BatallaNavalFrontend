import { Injectable } from '@angular/core';
import {environment} from "../../Enviroments/enviroments";
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { GameResponse } from '../../Models/Game';
@Injectable({
  providedIn: 'root'
})
export class JuegourlsService {

  constructor(
    private http: HttpClient
  ) { }


  getHistory(page: number):Observable<GameResponse>{
    return this.http.get<GameResponse>(environment.historyGames, {params: {page: page}})
  }

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
    return this.http.post<any>(environment.dequeueGameURL, {gameId: localStorage.getItem('idPartida')});
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

  disparar(gameId: string | null, playerAttacked: string | null, playerWhoAttacked: number | null, cell:number[] ) {
    return this.http.post(environment.attackURL, {
      gameId: gameId,
      playerAttacked: playerAttacked,
      playerWhoAttacked: playerWhoAttacked,
      cell: cell
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
