import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { ApplicationConstants } from '../utils/application-constants';
import { TokenService } from './token.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private tokenService: TokenService) {
  }

  public signUp(user: User): Promise <any> {
    const body = JSON.stringify(user);
    return this.http.post(ApplicationConstants.api + ApplicationConstants.apiSignUp, body, {
      'headers': ApplicationConstants.headers
    }).toPromise();
  }

  public signIn(user: User): Promise <any> {
    const body = JSON.stringify(user);
    return this.http.post(ApplicationConstants.api + ApplicationConstants.apiSignIn, body, { 'headers': ApplicationConstants.headers})
        .toPromise()
          .then(
            (data: any) => {
              if (data.token)
                this.tokenService.handleToken(data.token);
            }
        );
  }

  isUserLogedIn() : boolean {
    return this.tokenService.isTokenValidPub() && this.userService.getCurrentUser().email !== undefined;
  }

  logout() {
    this.tokenService.removeToken();
  }
}
