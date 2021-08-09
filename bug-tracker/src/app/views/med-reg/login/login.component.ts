import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/models/user';
import { ApplicationConstants } from 'src/app/utils/application-constants';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;
  signUpForm: FormGroup;
  submittedIn = false;
  submittedUp = false;

  loginError = false;
  isSignUp = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private loginService: AuthService)
  {
    if(this.loginService.isUserLogedIn())
      this.router.navigate([ApplicationConstants.homeRoute]);
  }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  get signInF() { return this.signInForm.controls; }

  get signUpF() { return this.signUpForm.controls; }

  onSubmitUp() {
    this.submittedUp = true;
    if (this.signUpForm.invalid) {
        return;
    }
    this.loginService.signUp(new User(this.signUpF.email.value, this.signUpF.password.value, this.signUpF.firstName.value, this.signUpF.lastName.value ))
    .then(
        data => {
            this.loginError = false;
            this.isSignUp = false;
        },
        error => {
          this.loginError = true;
        }
    );
  }

  onSubmitIn() {
    this.submittedIn = true;
    if (this.signInForm.invalid) {
        return;
    }
    this.loginService.signIn(new User(this.signInF.email.value, this.signInF.password.value))
    .then(
        data => {
          this.userService.checkCurrentUser().then( () => {
            this.router.navigate([ApplicationConstants.homeRoute]);
          });
        },
        error => {
          this.loginError = true;
        }
    );
  }

  prepareSignUp(){
    this.isSignUp = true;
  }

  prepareSignIn(){
    this.isSignUp = false;
  }

}
