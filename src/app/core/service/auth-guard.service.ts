import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { map, take, tap } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';


@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authService.authenticated) {
            return this.authService.currentUserObservable
                .take(1)
                .map(user => !!user)
                .do(loggedIn => {
                    if (!loggedIn) {
                        console.log("auth-guard: access denied")
                        this.router.navigate(['login']);
                    }
                })
        }else{
            return true;
        }
    }
}
