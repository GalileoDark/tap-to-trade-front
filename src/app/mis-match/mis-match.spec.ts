import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisMatch } from './mis-match';

describe('MisMatch', () => {
  let component: MisMatch;
  let fixture: ComponentFixture<MisMatch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisMatch],
    }).compileComponents();

    fixture = TestBed.createComponent(MisMatch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
