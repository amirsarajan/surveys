import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { AuthorizationService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectAuthorizedGuard implements CanActivate {
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authorizationService.isLoggedin$()
      .pipe(
        first(),
        map(isLoggedin => {
          if (isLoggedin) {
            this.router.navigate(['/authorized', 'surveys']);
            return false;//disables the current routing
          } else {
            return true;//keep going
          }
        })
      );

  }
}


