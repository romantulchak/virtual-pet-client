import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from '../services/token-storage.service';
import { catchError, filter, map, switchMap, take } from "rxjs/operators";
import { error } from "protractor";
import { BehaviorSubject, ObservableInput, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { SimpleOuterSubscriber } from "rxjs/internal/innerSubscribe";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
    providedIn:'root'
})
export class AuthInterceptor implements HttpInterceptor{
    constructor(private token: TokenStorageService, private authService: AuthService){}
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

            return this.handle401error(authReq, next);
          } else {
            return throwError(error);
          }
        }));
      }

      private handle401error(req: HttpRequest<any>, next:HttpHandler){
        if(!this.isRefreshingToken){
          this.isRefreshingToken = true;
          
          this.authService.refreshToken().subscribe(res=>{


            this.token.saveToken(res.token);
            this.addToken(req, res.username, res.token);
            
          });
          window.location.reload();
          return next.handle(req);
        }
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
