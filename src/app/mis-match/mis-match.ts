import { Component, computed, signal } from '@angular/core';
import { MaxEnFilaDirective } from '../shared/directives/max-en-fila';

export interface ItemMatch {
  id: number;
  usuario: string;
  imagen: string;
  cartasQueBuscoQueTiene: number;
  cartasQueTengoQueBusca: number;
}

@Component({
  selector: 'app-mis-match',
  imports: [MaxEnFilaDirective],
  templateUrl: './mis-match.html',
  styleUrl: './mis-match.css',
})
export class MisMatch {
  private readonly limiteResumen = 5;

  mostrarTodos = signal<boolean>(false);

  matches = signal<ItemMatch[]>([
    {
      id: 1,
      usuario: 'Alex',
      imagen: '/images/flashback.png',
      cartasQueBuscoQueTiene: 3,
      cartasQueTengoQueBusca: 2,
    },
    {
      id: 2,
      usuario: 'Lucía',
      imagen: '/images/ejemplo-item.png',
      cartasQueBuscoQueTiene: 1,
      cartasQueTengoQueBusca: 4,
    },
    {
      id: 3,
      usuario: 'Mateo',
      imagen: '/images/ejemplo-item.png',
      cartasQueBuscoQueTiene: 5,
      cartasQueTengoQueBusca: 1,
    },
    {
      id: 4,
      usuario: 'Sofía',
      imagen: '/images/flashback.png',
      cartasQueBuscoQueTiene: 2,
      cartasQueTengoQueBusca: 2,
    },
    {
      id: 5,
      usuario: 'Diego',
      imagen: '/images/ejemplo-item.png',
      cartasQueBuscoQueTiene: 4,
      cartasQueTengoQueBusca: 3,
    },
    {
      id: 6,
      usuario: 'Elena',
      imagen: '/images/flashback.png',
      cartasQueBuscoQueTiene: 2,
      cartasQueTengoQueBusca: 5,
    },
  ]);

  matchesVisibles = computed<ItemMatch[]>(() => {
    const lista = this.matches();
    if (this.mostrarTodos()) {
      return lista;
    }
    return lista.slice(0, this.limiteResumen);
  });

  alternarVerMas(): void {
    this.mostrarTodos.update((actual) => !actual);
  }
}
