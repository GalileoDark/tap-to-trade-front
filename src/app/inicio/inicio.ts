import { Component } from '@angular/core';
import { MiColeccion } from '../mi-coleccion/mi-coleccion';
import { MisMatch } from '../mis-match/mis-match';
import { MisWants } from '../mis-wants/mis-wants';

@Component({
  imports: [MiColeccion, MisMatch, MisWants],
  selector: 'app-inicio',
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class Inicio {}
