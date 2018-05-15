import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { map, take, tap } from 'rxjs/operators';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.user.map(user => {
            if (!user) {
                console.log('access denied');
                //this.notify.update('You must be logged in!', 'error');
                this.router.navigate(['login']);
                return false;
            }else{
                return true;
            }
        }).catch(() => {
            this.router.navigate(['login']);
            return Observable.of(false);
        });
    }

}
