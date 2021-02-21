import { TestBed } from '@angular/core/testing';

import { SurveyDetailsResolverGuard } from './survey-details-resolver.guard';

describe('SurveyDetailsResolverGuard', () => {
  let guard: SurveyDetailsResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SurveyDetailsResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
