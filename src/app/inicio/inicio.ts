import { Component } from '@angular/core';
import { MiColeccion } from '../mi-coleccion/mi-coleccion';
import { MisMatch } from '../mis-match/mis-match';

@Component({
  imports: [MiColeccion, MisMatch],
  selector: 'app-inicio',
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class Inicio {}
