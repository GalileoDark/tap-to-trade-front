import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
  signal,
} from '@angular/core';

@Directive({
  selector: '[appMaxEnFila]',
  exportAs: 'maxEnFila',
})
export class MaxEnFilaDirective implements AfterViewInit, OnDestroy {
  private readonly hostRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private resizeObserver?: ResizeObserver;
  private rafId?: number;

  limiteMaximo = input<number>(5);
  anchoMinimoTarjeta = input<number>(160);
  gapPx = input<number>(16);

  maxEnFila = signal<number>(5);
  maxEnFilaChange = output<number>();

  ngAfterViewInit(): void {
    const el = this.hostRef.nativeElement;

    this.resizeObserver = new ResizeObserver(() => {
      this.programarRecalculo();
    });

    this.resizeObserver.observe(el);
    this.programarRecalculo();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    if (this.rafId !== undefined) {
      cancelAnimationFrame(this.rafId);
    }
  }

  recalcular(): void {
    this.programarRecalculo();
  }

  private programarRecalculo(): void {
    if (this.rafId !== undefined) {
      cancelAnimationFrame(this.rafId);
    }

    this.rafId = requestAnimationFrame(() => {
      const anchoDisponible = this.hostRef.nativeElement.clientWidth;
      const gap = this.gapPx();
      const anchoMin = this.anchoMinimoTarjeta();
      const tope = this.limiteMaximo();

      const caben = Math.floor((anchoDisponible + gap) / (anchoMin + gap));
      const calculado = Math.min(tope, Math.max(1, caben));

      if (this.maxEnFila() !== calculado) {
        this.maxEnFila.set(calculado);
        this.maxEnFilaChange.emit(calculado);
      }
    });
  }
}
