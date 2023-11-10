import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from 'app/login/services/auth.service';

/**
 * A guard that checks if the user is authenticated before allowing access to protected routes.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log(next);
    return this.checkLogin(state.url);
  }

  checkLogin(url: string): boolean {
    const protectedRoutes = ['/cart', '/users'];
    if (this.authService.isAuthenticated() && protectedRoutes.includes(url)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
