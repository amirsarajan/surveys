import { TestBed } from '@angular/core/testing';

import { IdentityService } from './auth.service';

describe('AuthService', () => {
  let service: IdentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
