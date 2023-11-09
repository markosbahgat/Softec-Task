import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authService: AuthService;
  let router: Router;
  let authGuard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthService, AuthGuard],
    });

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    authGuard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  describe('canActivate', () => {
    let next: ActivatedRouteSnapshot;
    let state: RouterStateSnapshot;

    beforeEach(() => {
      next = {} as ActivatedRouteSnapshot;
      state = {} as RouterStateSnapshot;
    });

    it('should return true if the user is authenticated and the route is protected', () => {
      spyOn(authService, 'isAuthenticated').and.returnValue(true);
      spyOn(router, 'navigate');

      const result = authGuard.canActivate(next, { url: '/cart' });

      expect(result).toBeTrue();
      expect(authService.isAuthenticated).toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should return false and redirect to login if the user is not authenticated and the route is protected', () => {
      spyOn(authService, 'isAuthenticated').and.returnValue(false);
      spyOn(router, 'navigate');

      const result = authGuard.canActivate(next, { url: '/cart' });

      expect(result).toBeFalse();
      expect(authService.isAuthenticated).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should return true if the user is authenticated and the route is not protected', () => {
      spyOn(authService, 'isAuthenticated').and.returnValue(true);
      spyOn(router, 'navigate');

      const result = authGuard.canActivate(next, { url: '/home' });

      expect(result).toBeTrue();
      expect(authService.isAuthenticated).toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should return true if the user is not authenticated and the route is not protected', () => {
      spyOn(authService, 'isAuthenticated').and.returnValue(false);
      spyOn(router, 'navigate');

      const result = authGuard.canActivate(next, { url: '/home' });

      expect(result).toBeTrue();
      expect(authService.isAuthenticated).toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
