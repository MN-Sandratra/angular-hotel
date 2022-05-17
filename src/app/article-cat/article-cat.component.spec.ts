import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCatComponent } from './article-cat.component';

describe('ArticleCatComponent', () => {
  let component: ArticleCatComponent;
  let fixture: ComponentFixture<ArticleCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleCatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
