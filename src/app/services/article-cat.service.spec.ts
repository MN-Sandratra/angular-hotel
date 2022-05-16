import { TestBed } from '@angular/core/testing';

import { ArticleCatService } from './article-cat.service';

describe('ArticleCatService', () => {
  let service: ArticleCatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleCatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
