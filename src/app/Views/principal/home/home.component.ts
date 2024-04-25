import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackgroundComponent } from '../../../Components/principal/background/background.component';
import { SimpleButtonComponent } from '../../../Components/buttons/simple-button/simple-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
        RouterLink,
        BackgroundComponent,
        SimpleButtonComponent
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
