import { TestBed } from '@angular/core/testing';

import { AuthStoreService } from './store.service';

describe('StoreService', () => {
  let service: AuthStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
