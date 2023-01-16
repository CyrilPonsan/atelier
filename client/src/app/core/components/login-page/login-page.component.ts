import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  constructor(private authService: AuthService, private router: Router) {}

  connexion() {
    this.authService.httpLogin('tech@atelier.fr', 'toto').subscribe({
      next: this.handleResponse.bind(this),
    });
  }

  private handleResponse(response: any) {
    if (response) {
      this.router.navigateByUrl('/accueil');
    }
  }
}
