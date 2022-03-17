import { TestBed } from '@angular/core/testing';

import { MouvementApiService } from './mouvement-api.service';

describe('MouvementApiService', () => {
  let service: MouvementApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MouvementApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
