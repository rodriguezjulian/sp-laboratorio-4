import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesParaEspecialistasComponent } from './pacientes-para-especialistas.component';

describe('PacientesParaEspecialistasComponent', () => {
  let component: PacientesParaEspecialistasComponent;
  let fixture: ComponentFixture<PacientesParaEspecialistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientesParaEspecialistasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientesParaEspecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
