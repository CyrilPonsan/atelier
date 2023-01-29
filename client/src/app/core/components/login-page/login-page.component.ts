import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegexService } from 'src/app/shared/services/regex.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  isEmailModified = false;
  isPasswordModified = false;
  isEmailValid = true;
  isPasswordValid = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private regex: RegexService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexMail)],
      ],
      password: [
        null,
        [Validators.required, Validators.pattern(this.regex.regexPassword)],
      ],
    });
  }

  emailBlurHandler(): void {
    this.isEmailModified = true;
    this.isEmailValid = this.regex.regexMail.test(
      this.loginForm.value.username
    );
  }

  passwordBlurHandler(): void {
    this.isPasswordModified = true;
    this.isPasswordValid = this.regex.regexPassword.test(
      this.loginForm.value.password
    );
  }

  submitLoginHandler(): void {
    console.log(this.loginForm.value.username);

    if (this.loginForm.valid) {
      this.authService
        .httpLogin(this.loginForm.value.username, 'Abcd@1234')
        .subscribe({
          next: this.handleResponse.bind(this),
          error: this.handleError.bind(this),
        });
    }
  }

  private handleResponse(response: any): void {
    if (response) {
      this.router.navigateByUrl('/tickets');
    }
  }

  private handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 400) {
        console.log('identifiants incorrects !');
      }
    }
  }
}
