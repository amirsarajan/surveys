import { TestBed } from '@angular/core/testing';

import { SurveysListGuard } from './surveys-list.guard';

describe('SurveysListGuard', () => {
  let guard: SurveysListGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SurveysListGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
