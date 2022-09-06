import { TestBed } from '@angular/core/testing';

import { SessionuserService } from './sessionuser.service';

describe('SessionuserService', () => {
  let service: SessionuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
