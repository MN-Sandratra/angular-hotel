import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCompteComponent } from './form-compte.component';

describe('FormCompteComponent', () => {
  let component: FormCompteComponent;
  let fixture: ComponentFixture<FormCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
