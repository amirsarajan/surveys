import { TestBed } from '@angular/core/testing';

import { RedirectAuthorizedGuard } from './redirect-authorized.guard';

describe('RedirectAuthorizedGuard', () => {
  let guard: RedirectAuthorizedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirectAuthorizedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
