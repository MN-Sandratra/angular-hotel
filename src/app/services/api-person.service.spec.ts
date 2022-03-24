import { TestBed } from '@angular/core/testing';

import { ApiPersonService } from './api-person.service';

describe('ApiPersonService', () => {
  let service: ApiPersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
