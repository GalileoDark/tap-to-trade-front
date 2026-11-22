import {
  Component,
  ElementRef,
  HostListener,
  inject,
  output,
  OutputEmitterRef,
  signal,
} from '@angular/core';

export interface OpcionesMenu {
  titulo: string;
  icono: string;
  ruta?: string;
  tipo?: 'menu' | 'opcion';
}

@Component({
  imports: [],
  selector: 'app-barra-de-navegacion',
  styleUrl: './barra-de-navegacion.css',
  templateUrl: './barra-de-navegacion.html',
})
export class BarraDeNavegacion {
  private readonly elementRef = inject(ElementRef);

  estaExpandida: boolean = false;
  showFiller = signal(false);
  opcionSeleccionada: OutputEmitterRef<string> = output<string>();

  opcionesMenu: OpcionesMenu[] = [
    { titulo: 'Menú', icono: '/images/ttt-icono.png', tipo: 'menu' },
    { titulo: 'Inicio', icono: '/images/icono-home.png', ruta: 'inicio', tipo: 'opcion' },
    { titulo: 'Perfil', icono: '/images/icono-mi-perfil.png', ruta: 'perfil', tipo: 'opcion' },
    {
      titulo: 'Mi colección',
      icono: '/images/Icono-mi-coleccion.png',
      ruta: 'Mi coleccion',
      tipo: 'opcion',
    },
  ];

  alPulsarItem(item: OpcionesMenu): void {
    if (item.tipo === 'menu') {
      this.alternarBarra();
      return;
    }

    if (item.ruta) {
      this.seleccionarOpcion(item.ruta);
    }
  }

  alternarBarra(): void {
    this.estaExpandida = !this.estaExpandida;
  }

  seleccionarOpcion(ruta: string): void {
    this.opcionSeleccionada.emit(ruta);
  }

  @HostListener('document:click', ['$event'])
  onClickFuera(event: MouseEvent): void {
    if (!this.estaExpandida) {
      return;
    }

    const objetivo = event.target as HTMLElement | null;
    const clicDentroDeLaBarra = objetivo ? this.elementRef.nativeElement.contains(objetivo) : false;

    if (!clicDentroDeLaBarra) {
      this.estaExpandida = false;
    }
  }
}
