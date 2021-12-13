import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const allowedRoles = route.data['allowedRoles'];
    if (
      this.auth.isAuthenticated() &&
      allowedRoles.indexOf(this.auth.getUserRole()) !== -1
    ) {
      return true;
    } else {
      this.router.navigate(['/']),
        {
          queryParams: {
            loginAgain: true,
          },
        };
    }
    return false;
  }
}
