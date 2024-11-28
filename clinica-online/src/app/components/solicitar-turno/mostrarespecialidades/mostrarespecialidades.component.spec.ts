import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarespecialidadesComponent } from './mostrarespecialidades.component';

describe('MostrarespecialidadesComponent', () => {
  let component: MostrarespecialidadesComponent;
  let fixture: ComponentFixture<MostrarespecialidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarespecialidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarespecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
