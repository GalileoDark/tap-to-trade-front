import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiColeccion } from './mi-coleccion';

describe('MiColeccion', () => {
  let component: MiColeccion;
  let fixture: ComponentFixture<MiColeccion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiColeccion],
    }).compileComponents();

    fixture = TestBed.createComponent(MiColeccion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
