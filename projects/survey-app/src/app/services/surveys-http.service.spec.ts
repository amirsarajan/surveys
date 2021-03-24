import { TestBed } from '@angular/core/testing';

import { SurveysHttpService } from './surveys-http.service';

describe('SurveysHttpService', () => {
  let service: SurveysHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveysHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
