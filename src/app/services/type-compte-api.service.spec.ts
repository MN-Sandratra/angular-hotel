import { TestBed } from '@angular/core/testing';

import { TypeCompteApiService } from './type-compte-api.service';

describe('TypeCompteApiService', () => {
  let service: TypeCompteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeCompteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
