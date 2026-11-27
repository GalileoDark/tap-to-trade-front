import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisWants } from './mis-wants';

describe('MisWants', () => {
  let component: MisWants;
  let fixture: ComponentFixture<MisWants>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisWants],
    }).compileComponents();

    fixture = TestBed.createComponent(MisWants);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
