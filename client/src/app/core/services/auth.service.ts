import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn!: boolean; // token présent et valide
  accessToken!: any;
  refreshToken!: any;
  user!: User;
  isLoginPage!: boolean; // true : affiche le bouton inscription permettant la création de compte

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * requête http permettant de vérifier les identifiants d'un utilisateur
   * et qui reçoit en retour un jeton d'authentification
   * @param username string : identifiant saisi par l'utilisateur
   * @param password string : mot de passe saisi par l'utilisateur
   * @returns token objet {username, role, token}
   */
  httpLogin(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${environment.baseUrl}/auth/`, {
        username: username,
        password: password,
      })
      .pipe(
        tap((response) => {
          if (response) {
            this.saveTokens(response.accessToken, response.refreshToken);
            this.user = response.user;
            sessionStorage.setItem('user', JSON.stringify(this.user));
          }
        })
      );
  }

  /**
   * retourne le token
   * @returns string : token
   */
  getToken(): string {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem('accessToken');
      this.refreshToken = localStorage.getItem('refreshToken');
    }
    return this.accessToken;
  }

  /**
   * sauvegarde les tokens retournés par l'api en localStorage
   *
   * @param accessToken string
   * @param refreshToken string
   */
  saveTokens(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  /**
   * initialise la déconnexion
   */
  logout(): void {
    localStorage.clear();
    this.accessToken = '';
    this.refreshToken = '';
    this.isLoggedIn = false;
    this.router.navigateByUrl('/login');
  }

  setUser(): void {
    const tmp: any = sessionStorage.getItem('user');
    this.user = JSON.parse(tmp);
  }

  httpGenerateTokens(): Observable<any> {
    const refreshToken = this.refreshToken;
    return this.http.post<any>(`${environment.baseUrl}/auth/refreshtoken`, {
      refreshToken,
    });
  }
}
