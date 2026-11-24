import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';

export interface ItemColeccion {
  id: number;
  nombre: string;
  imagen: string;
  cantidad: number;
}

@Component({
  selector: 'app-mi-coleccion',
  imports: [],
  templateUrl: './mi-coleccion.html',
  styleUrl: './mi-coleccion.css',
})
export class MiColeccion implements AfterViewInit, OnDestroy {
  private readonly limiteMaximo = 5;
  private resizeObserver?: ResizeObserver;
  private rafId?: number;

  gridRef = viewChild<ElementRef<HTMLElement>>('gridColeccion');

  mostrarTodos = signal<boolean>(false);
  maxEnFila = signal<number>(this.limiteMaximo);

  elementos = signal<ItemColeccion[]>([
    { id: 1, nombre: 'Flashback', imagen: '/images/flashback.png', cantidad: 1 },
    { id: 2, nombre: 'Elemento 2', imagen: '/images/ejemplo-item.png', cantidad: 2 },
    { id: 3, nombre: 'Elemento 3', imagen: '/images/ejemplo-item.png', cantidad: 1 },
    { id: 4, nombre: 'Elemento 4', imagen: '/images/flashback.png', cantidad: 4 },
    { id: 5, nombre: 'Elemento 5', imagen: '/images/ejemplo-item.png', cantidad: 1 },
    { id: 6, nombre: 'Elemento 6', imagen: '/images/flashback.png', cantidad: 3 },
  ]);

  candidatosResumen = computed<ItemColeccion[]>(() => {
    return this.elementos().slice(0, this.limiteMaximo);
  });

  // En modo resumen devolvemos los candidatos (máx. 5) y ocultamos por índice los que excedan maxEnFila()
  itemsVisibles = computed<ItemColeccion[]>(() => {
    if (this.mostrarTodos()) {
      return this.elementos();
    }
    return this.candidatosResumen();
  });

  ngAfterViewInit(): void {
    const gridEl = this.gridRef()?.nativeElement;
    if (!gridEl) {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.programarRecalculo();
    });

    this.resizeObserver.observe(gridEl);
    this.programarRecalculo();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    if (this.rafId !== undefined) {
      cancelAnimationFrame(this.rafId);
    }
  }

  alternarVerMas(): void {
    this.mostrarTodos.update((actual) => !actual);
    this.programarRecalculo();
  }

  private programarRecalculo(): void {
    if (this.rafId !== undefined) {
      cancelAnimationFrame(this.rafId);
    }

    this.rafId = requestAnimationFrame(() => {
      this.recalcularTarjetasEnFila();
    });
  }

  private recalcularTarjetasEnFila(): void {
    if (this.mostrarTodos()) {
      return;
    }

    const gridEl = this.gridRef()?.nativeElement;
    if (!gridEl) {
      return;
    }

    const anchoDisponible = gridEl.clientWidth;
    const gapPx = 16; // ajusta si cambias el gap de .grid-coleccion
    const anchoMinimoTarjeta = 180; // ajusta al minmax de tu grid

    // Cuántas tarjetas de anchoMinimoTarjeta caben en anchoDisponible
    const caben = Math.floor((anchoDisponible + gapPx) / (anchoMinimoTarjeta + gapPx));
    const limiteCalculado = Math.min(this.limiteMaximo, Math.max(1, caben));

    this.maxEnFila.set(limiteCalculado);
  }
}
