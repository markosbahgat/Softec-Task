import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isAuthenticated', () => {
    it('should return true if userId is present in localStorage', () => {
      const userId = '123';
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(userId));
      expect(service.isAuthenticated()).toBeTrue();
    });

    it('should return false if userId is not present in localStorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      expect(service.isAuthenticated()).toBeFalse();
    });
  });
});
