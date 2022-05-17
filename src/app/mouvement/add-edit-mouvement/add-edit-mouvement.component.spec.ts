import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMouvementComponent } from './add-edit-mouvement.component';

describe('AddEditMouvementComponent', () => {
  let component: AddEditMouvementComponent;
  let fixture: ComponentFixture<AddEditMouvementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMouvementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditMouvementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
