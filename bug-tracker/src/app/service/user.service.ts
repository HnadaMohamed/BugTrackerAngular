import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserApp } from '../models/user-app';
import { ApplicationConstants } from '../utils/application-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private currentUserSubject: BehaviorSubject < UserApp > ;
  public currentUser: Observable < UserApp > ;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject < UserApp > (new UserApp());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  checkCurrentUser(): Promise <any> {
    const email = localStorage.getItem('email');
    return new Promise((resolve, reject) => {
      this.getUserByEmail(email).then(
        data => {
          this.currentUserSubject.next(data);
          resolve(data);
        },
        error => {
          this.currentUserSubject.next(new UserApp());
          resolve(new UserApp());
        }
      );
    });
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  getUserByEmail(email: any): Promise < any > {
    return this.http.post(ApplicationConstants.api + ApplicationConstants.apiUsers, email, {
      'headers': ApplicationConstants.headers
    }).toPromise();
  }

  resetSubjectBehavior() {
    this.currentUserSubject.next(new UserApp());
  }

}
