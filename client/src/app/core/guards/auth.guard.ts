import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.user) {
      return true;
    }
    this.router.navigateByUrl('/connexion');
    return false;
  }
}
