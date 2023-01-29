import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: User;
  isLogged!: boolean;
  accessToken!: string;
  refreshToken!: string;

  constructor(private http: HttpClient) {}

  getAccessToken(): string {
    return this.accessToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  logout(): void {
    this.isLogged = false;
    this.accessToken = '';
    this.refreshToken = '';
  }

  httpLogin(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${environment.baseUrl}/auth/`, { username, password })
      .pipe(
        tap((response) => {
          if (response) {
            this.user = response.user;
            this.accessToken = response.accessToken;
            this.refreshToken = response.refreshToken;
            this.isLogged = true;
          }
        })
      );
  }

  httpGenerateTokens(): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/auth/refresh-tokens`, {
      refreshToken: this.refreshToken,
    });
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
