import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApplicationConstants } from '../utils/application-constants';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public helper = new JwtHelperService();

  constructor() {}

  handleToken(data: any) {
    this.getDecodedData(data);
    return this.isTokenValid(data);
  }

  getDecodedData(data: any) : any{
    const decodedToken = this.helper.decodeToken(data);
    localStorage.setItem(ApplicationConstants.email, decodedToken.email);
    localStorage.setItem(ApplicationConstants.token, data);
    return decodedToken.email;
  }

  getToken() {
    const token = localStorage.getItem(ApplicationConstants.token);
    return token !== null ? token : null;
  }

  private isTokenValid(data: any){
    const decodedToken = this.helper.decodeToken(data);
    if(decodedToken){
      const currentTimeInSeconds = Math.floor(Date.now()/1000);
      return decodedToken.exp >= currentTimeInSeconds;
    }else{
      return false;
    }
  }

  public isTokenValidPub(){
    const tokenJson = localStorage.getItem(ApplicationConstants.token);
    const tokenReady = tokenJson !== null ? tokenJson : null;
    return this.isTokenValid(tokenReady);
  }

  removeToken() {
    localStorage.removeItem(ApplicationConstants.token);
    localStorage.removeItem(ApplicationConstants.email);
  }

}
