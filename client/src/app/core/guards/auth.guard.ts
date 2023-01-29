import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getToken()) {
      this.authService.isLoggedIn = true;
      if (!this.authService.user) {
        this.authService.setUser;
      }
      return true;
    }
    //this.toast.tokenExpired();
    this.authService.logout();
    return false;
  }
}
