import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarespecialistasComponent } from './mostrarespecialistas.component';

describe('MostrarespecialistasComponent', () => {
  let component: MostrarespecialistasComponent;
  let fixture: ComponentFixture<MostrarespecialistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarespecialistasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarespecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
