import { Component, signal } from '@angular/core';
import { BarraDeNavegacion } from './barra-de-navegacion/barra-de-navegacion';

@Component({
  imports: [BarraDeNavegacion],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('front');
}
