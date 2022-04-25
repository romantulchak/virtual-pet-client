import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from '../services/token-storage.service';
import { catchError } from "rxjs/operators";
import {  throwError } from "rxjs";
import { Router } from "@angular/router";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
    providedIn:'root'
})
export class AuthInterceptor implements HttpInterceptor{
    constructor(private token: TokenStorageService,
                private router: Router){}
    private isRefreshingToken: boolean = false;
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authReq = req;
        const token = this.token.getToken();
        let user = this.token.getUser();


        if (token != null && user != null) {
          authReq = this.addToken(req, user.username, token);
        }
        return next.handle(authReq).pipe(catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.router.navigateByUrl('/login');
          } else {
            return throwError(error);
          }
        }));
      }

      private addToken(request: HttpRequest<any>,username:string, token: string){
        return request.clone({
          headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token).append("isRefreshToken", "true").append("username", username)
        });
      }
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ];
