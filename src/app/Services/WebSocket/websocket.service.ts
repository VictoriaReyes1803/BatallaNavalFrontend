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

  public creategame(callback: (e: any) => void) {
    this.echo?.channel('game').listen('.creategame', (data: any) => {
      callback(data);
    });
  }


  
}