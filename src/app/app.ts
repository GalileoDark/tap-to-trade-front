import { Component, signal } from '@angular/core';
import { BarraDeNavegacion } from './barra-de-navegacion/barra-de-navegacion';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [BarraDeNavegacion, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('front');
  protected barraExpandida: boolean = false;
}
