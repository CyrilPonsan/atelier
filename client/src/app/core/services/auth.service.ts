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

  constructor(private http: HttpClient) {}

  httpLogin(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${environment.baseUrl}/auth/`, { username, password })
      .pipe(tap((response) => (this.user = response)));
  }
}
