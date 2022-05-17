import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMouvementComponent } from './show-mouvement.component';

describe('ShowMouvementComponent', () => {
  let component: ShowMouvementComponent;
  let fixture: ComponentFixture<ShowMouvementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMouvementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMouvementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
