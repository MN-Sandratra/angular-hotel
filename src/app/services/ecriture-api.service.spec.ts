import { TestBed } from '@angular/core/testing';

import { EcritureApiService } from './ecriture-api.service';

describe('EcritureApiService', () => {
  let service: EcritureApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcritureApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
