import { Component, computed, signal } from '@angular/core';
import {MaxEnFilaDirective} from '../shared/directives/max-en-fila';

export interface ItemColeccion {
  id: number;
  nombre: string;
  imagen: string;
  cantidad: number;
}

@Component({
  selector: 'app-mi-coleccion',
  imports: [MaxEnFilaDirective],
  templateUrl: './mi-coleccion.html',
  styleUrl: './mi-coleccion.css',
})
export class MiColeccion {
  mostrarTodos = signal<boolean>(false);

  elementos = signal<ItemColeccion[]>([
    { id: 1, nombre: 'Flashback', imagen: '/images/flashback.png', cantidad: 1 },
    { id: 2, nombre: 'Elemento 2', imagen: '/images/ejemplo-item.png', cantidad: 2 },
    { id: 3, nombre: 'Elemento 3', imagen: '/images/ejemplo-item.png', cantidad: 1 },
    { id: 4, nombre: 'Elemento 4', imagen: '/images/flashback.png', cantidad: 4 },
    { id: 5, nombre: 'Elemento 5', imagen: '/images/ejemplo-item.png', cantidad: 1 },
    { id: 6, nombre: 'Elemento 6', imagen: '/images/flashback.png', cantidad: 3 },
  ]);

  itemsVisibles = computed<ItemColeccion[]>(() => {
    const lista = this.elementos();
    if (this.mostrarTodos()) {
      return lista;
    }
    return lista.slice(0, 5);
  });

  alternarVerMas(): void {
    this.mostrarTodos.update((actual) => !actual);
  }
}
