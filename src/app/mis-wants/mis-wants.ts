import { Component, computed, input, output, signal } from '@angular/core';
import { MaxEnFilaDirective } from '../shared/directives/max-en-fila';

export interface ItemWant {
  id: number;
  nombre: string;
  imagen: string;
  cantidad: number;
}
@Component({
  imports: [MaxEnFilaDirective],
  selector: 'app-mis-wants',
  styleUrl: './mis-wants.css',
  templateUrl: './mis-wants.html',
})
export class MisWants {
  private readonly limiteResumen: number = 5;

  listaInicial = input<ItemWant[] | undefined>(undefined);
  mostrarTodos = signal<boolean>(false);
  buscarCartaClick = output<void>();

  wants = signal<ItemWant[]>([
    { id: 1, nombre: 'Carta Want 1', imagen: '/images/flashback.png', cantidad: 1 },
    { id: 2, nombre: 'Carta Want 2', imagen: '/images/ejemplo-item.png', cantidad: 2 },
    { id: 3, nombre: 'Carta Want 3', imagen: '/images/ejemplo-item.png', cantidad: 1 },
    { id: 4, nombre: 'Carta Want 4', imagen: '/images/flashback.png', cantidad: 3 },
    { id: 5, nombre: 'Carta Want 5', imagen: '/images/ejemplo-item.png', cantidad: 1 },
    { id: 6, nombre: 'Carta Want 6', imagen: '/images/flashback.png', cantidad: 2 },
  ]);

  wantsActivos = computed<ItemWant[]>(() => {
    const externa = this.listaInicial();
    return externa ?? this.wants();
  });

  sinWants = computed<boolean>(() => this.wantsActivos().length === 0);

  wantsVisibles = computed<ItemWant[]>(() => {
    const lista = this.wantsActivos();
    if (this.mostrarTodos()) {
      return lista;
    }
    return lista.slice(0, this.limiteResumen);
  });

  alternarVerMas(): void {
    this.mostrarTodos.update((actual) => !actual);
  }

  onBuscarCarta(): void {
    this.buscarCartaClick.emit();
  }
}
