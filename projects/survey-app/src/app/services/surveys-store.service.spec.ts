import { TestBed } from '@angular/core/testing';

import { SurveysStoreService } from './surveys-store.service';

describe('SurveysStoreService', () => {
  let service: SurveysStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveysStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
