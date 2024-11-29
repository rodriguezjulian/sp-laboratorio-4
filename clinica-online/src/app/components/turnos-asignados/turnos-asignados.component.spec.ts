import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosAsignadosComponent } from './turnos-asignados.component';

describe('TurnosAsignadosComponent', () => {
  let component: TurnosAsignadosComponent;
  let fixture: ComponentFixture<TurnosAsignadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnosAsignadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnosAsignadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
