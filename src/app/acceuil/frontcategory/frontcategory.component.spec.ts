import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontcategoryComponent } from './frontcategory.component';

describe('FrontcategoryComponent', () => {
  let component: FrontcategoryComponent;
  let fixture: ComponentFixture<FrontcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
