import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private _authenticationService: AuthenticationService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        //if 401 response returned from api, logout from application & redirect to login page.
        this._authenticationService.generateToken();
      }

      const error = err.error.message || err.statusText;
      return Observable.throw(error);
    }));
  }
}
