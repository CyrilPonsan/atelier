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
  loader = false;
  hasError = false;

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

  //  vérifie la validité de l'email qd le champs email perd le focus
  emailBlurHandler(): void {
    this.isEmailModified = true;
    this.isEmailValid = this.regex.regexMail.test(
      this.loginForm.value.username
    );
  }

  //  vérifie la validité du password qd le champs password perd le focus
  passwordBlurHandler(): void {
    this.isPasswordModified = true;
    this.isPasswordValid = this.regex.regexPassword.test(
      this.loginForm.value.password
    );
  }

  //  connexion
  submitLoginHandler(): void {
    console.log(this.loginForm.value.username);

    if (this.loginForm.valid) {
      this.authService
        .httpLogin(
          this.loginForm.value.username.trim(),
          this.loginForm.value.password.trim()
        )
        .subscribe({
          next: this.handleResponse.bind(this),
          error: this.handleError.bind(this),
        });
    }
  }

  //  gestion d'une réponse positive
  private handleResponse(response: any): void {
    if (response) {
      this.router.navigateByUrl('/tickets');
      this.hasError = false;
    }
    this.hasError = true;
  }

  //  gestion d'une erreur d'identifiants
  private handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 400) {
        console.log('identifiants incorrects !');
        this.hasError = true;
      }
    }
  }
}
