import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTypeCompteComponent } from './form-type-compte.component';

describe('FormTypeCompteComponent', () => {
  let component: FormTypeCompteComponent;
  let fixture: ComponentFixture<FormTypeCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTypeCompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTypeCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
