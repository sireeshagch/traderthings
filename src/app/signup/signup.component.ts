import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: string;
  password: string;
  fullname: string;
  errorString: string;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSignupPress() {
    console.log('signup pressed');
    this.authService.signUpWithEmail(this.email, this.password).
    catch((error) => {this.errorString = error; console.log('error signing up... ' + error); } );

  }

}
