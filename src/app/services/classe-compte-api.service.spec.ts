import { TestBed } from '@angular/core/testing';

import { ClasseCompteApiService } from './classe-compte-api.service';

describe('ClasseCompteApiService', () => {
  let service: ClasseCompteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasseCompteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
