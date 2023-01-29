import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  accessToken!: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.accessToken = this.authService.getAccessToken();
    let authReq = this.addTokenToHeaders(req, this.accessToken);
    return next.handle(authReq).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handleRefreshToken(req, next);
        } else if (error instanceof HttpErrorResponse && error.status === 403) {
          this.authService.logout();
        }
        return throwError(() => error);
      })
    );
  }

  private handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.httpGenerateTokens().pipe(
      switchMap((data: any) => {
        this.authService.saveTokens(data.accessToken, data.refreshToken);
        return next.handle(this.addTokenToHeaders(request, data.accessToken));
      })
    );
  }

  private addTokenToHeaders(req: HttpRequest<any>, accessToken: string) {
    return req.clone({
      headers: req.headers.set('Authorization', `bearer ${accessToken}`),
    });
  }
}
