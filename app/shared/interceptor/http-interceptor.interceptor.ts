import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap, retry } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

export const retryCount = 3;
export const retryWaitMilliSeconds = 1000;

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  public token!: any;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private _authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = JSON.parse(localStorage.getItem('tokenInfo')!);

    if (this.token && this.token.access_token) {
      request = this.setToken(request, this.token.access_token);
    }

    return next.handle(request).pipe(
      retry(3), 
      catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
      }));

  }

 

  private setToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this._authenticationService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.access_token);
          return next.handle(this.setToken(request, token.access_token));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.setToken(request, jwt));
        }));
    }
  }
}



//export class HttpInterceptorInterceptor implements HttpInterceptor {
//  public token!: any;
//  constructor() { }

//  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//    this.token = JSON.parse(localStorage.getItem('tokenInfo')!);
//    if (this.token && this.token.access_token) {
//      request = request.clone({
//        setHeaders: {
//          Authorization: `Bearer ${this.token.access_token}`,
//        }
//      });
//    }

//    //return next.handle(request).pipe(
//    //  retry(retryCount)
//    //);

//    return next.handle(request).pipe(
//      retryWhen(error =>
//        error.pipe(
//          concatMap((error, count) => {
//            if (count <= retryCount && error.status == 503) {
//              return of(error);
//            }
//            return throwError(error);
//          }),
//          delay(retryWaitMilliSeconds)
//        )
//      )
//    )

//  }
//}
