import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import Echo from 'laravel-echo';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../Enviroments/enviroments';

declare global {
  interface Window {
    Echo: Echo | undefined;
    Pusher: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private echo?: Echo;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.inicial();
    }
  }

  private MontarPusher(): void {
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: environment.pusher.key,
      cluster: environment.pusher.cluster,
      encrypted: true,
      disableStats: true,
      logToConsole: true,
    });
  }

  private inicial(): void {
    import('pusher-js').then((Pusher) => {
      window.Pusher = Pusher.default;
      this.MontarPusher();
    });
  }

  

  public leaveChannel(channel: string): void {
    this.echo?.leave(channel);
  }

  public startgame(callback: (e: any) => void) {
    this.echo?.channel('startgame').listen('.startgame', (data: any) => {
      callback(data);
    });
  }


  public atacar(callback: (e: any) => void) {
    this.echo?.channel('atacar').listen('.atacar', (e: any) => {
      callback(e);
    });
  }

  public ataqueCorrecto(callback: (e: any) => void){
    this.echo?.channel('ataque').listen('.ataque', (e: any) => {
      callback(e);
    });
  };

  public ataqueFallido(callback: (e: any) => void){
    this.echo?.channel('ataquefallido').listen('.ataquefallido', (e: any) => {
      callback(e);
    });
  };

  public alertaGanador(callback: (e: any) => void){
    this.echo?.channel('ganador').listen('.ganador', (e: any) => {
      callback(e);
    });
  }
}
