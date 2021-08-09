import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';
import { UserService } from '../service/user.service';
import { ApplicationConstants } from '../utils/application-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService) {
  }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.userService.checkCurrentUser().then( (data) => {
        if(this.tokenService.isTokenValidPub() && data.email !== undefined){
          resolve(true);
        }
        else{
          this.authService.logout();
          this.userService.resetSubjectBehavior();
          this.router.navigate([ApplicationConstants.signInRoute]);
          resolve(false);
        }
      });
    });
  }

}
