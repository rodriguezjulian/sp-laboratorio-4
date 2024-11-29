import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentAdmintComponent } from './parent-admint.component';

describe('ParentAdmintComponent', () => {
  let component: ParentAdmintComponent;
  let fixture: ComponentFixture<ParentAdmintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentAdmintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentAdmintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
