import { TestBed } from '@angular/core/testing';

import { CompteApiService } from './compte-api.service';

describe('CompteApiService', () => {
  let service: CompteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
