import { TestBed } from '@angular/core/testing';

import { PublicSurveysGuard } from './public-surveys.guard';

describe('PublicSurveysGuard', () => {
  let guard: PublicSurveysGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PublicSurveysGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
