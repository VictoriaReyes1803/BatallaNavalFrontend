import { CommonModule } from '@angular/common';
import {Component, Output, Input, EventEmitter, signal, inject} from '@angular/core';
import { Game } from '../../../Models/Game';
import { JuegourlsService } from '../../../Services/WebSocket/juegourls.service';
import {filter} from "rxjs";
import { Router } from '@angular/router';
@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
        CommonModule,
    ],
  templateUrl: './historydata.component.html',
  styleUrl: './historydata.component.css'
})
export class HistoryDataComponent {

    constructor(private router: Router){    }
    nohay = false
    public historyService = inject(JuegourlsService)

    public games = signal<Game[]>([]);
    public currentPage = signal(1);
    @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

    ngOnInit() {
      this.loadPage(this.currentPage())
    }

    loadPage(page: number){
      this.nohay = false
      this.historyService.getHistory(page)
        .pipe(
          filter(games => games.games.length > 0)
        )
        .subscribe(games => {
          this.games.set(games.games);
          this.currentPage.set(page);
          
        })


    }

  closeModal() {
    this.router.navigate(['/MenuGame'])
  }
}
