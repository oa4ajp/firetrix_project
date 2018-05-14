import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthorizationService } from './authorization.service';


@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private authService: AuthorizationService, private router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.checkLogin(url);
    }
    checkLogin(url: string): boolean {
        if (this.authService.isUserLogged()) { return true; }
        this.router.navigate(['login']);
        return false;
    }
}
