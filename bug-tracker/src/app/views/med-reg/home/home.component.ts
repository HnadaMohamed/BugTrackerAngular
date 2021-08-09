import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserApp } from 'src/app/models/user-app';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { ApplicationConstants } from 'src/app/utils/application-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: UserApp = new UserApp();

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.userService.currentUser.subscribe(user => {
      if(user)
        this.currentUser = user;
    });
  }

  ngOnInit(): void {

  }

  logout() {
    this.userService.resetSubjectBehavior();
    this.router.navigate([ApplicationConstants.signInRoute]);
  }

  goToRoute(route: any){
    this.router.navigate([route]);
  }

}
