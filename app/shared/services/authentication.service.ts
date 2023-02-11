import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Token, Userlogin } from '../models/userlogin';
import { APIVersionModel } from '../models/apiVersionModel';
import { DashboardService } from './dashboard.service';

const loginEndPoint: string = 'login';
const tokenEndPoint: string = 'connect/token';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public baseUrl = environment.baseUrl;
  private userSubject: BehaviorSubject<Userlogin>;
  public user: Observable<Userlogin>;

  bar = {} as APIVersionModel

  constructor(private http: HttpClient, private _dashboardService: DashboardService) {
    this.userSubject = new BehaviorSubject<Userlogin>(JSON.parse(localStorage.getItem('currentUser')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): Userlogin {
    return this.userSubject.value;
  }

  public get tokenValue(): Token {
    return JSON.parse(localStorage.getItem('tokenInfo')!);
  }

  public get apiVersion(): APIVersionModel {
    if (localStorage.getItem('DBVersionAPI') === null || localStorage.getItem('DBVersionAPI') == 'undefined') {
      return this.bar;
    }
    else {
      return JSON.parse(localStorage.getItem('DBVersionAPI')!);
    }
  }

  async generateToken() {
    const params = new HttpParams({
      fromObject: {
        grant_type: environment.grantType,
        client_id: environment.clientId,
        client_secret: environment.clientSecret,
        scope: environment.scope,
        UserName: environment.username,
        Password: environment.password
      }
    });
    var res = await this.http.post<any>(this.baseUrl + tokenEndPoint, params, HTTP_OPTIONS).toPromise();
    localStorage.setItem('tokenInfo', JSON.stringify(res));
    console.log("Actual Token :" + JSON.stringify(res));
    return res;
  }


  refreshToken() {
    var token = JSON.parse(localStorage.getItem('tokenInfo')!);
    const params = new HttpParams({
      fromObject: {
        grant_type: environment.grantTypeRefreshToken,
        client_id: environment.clientId,
        client_secret: environment.clientSecret,
        refresh_token: token.refresh_token
      }
    });
    return this.http.post<any>(this.baseUrl + tokenEndPoint, params, HTTP_OPTIONS)
      .pipe(map(res => {
        if (res) {
          localStorage.setItem('tokenInfo', JSON.stringify(res));
          console.log("Refresh Token :" + JSON.stringify(res));
        }
        return res;
      }));
  }

  login(email: string, password: string) {
    let postData = new FormData();
    postData.append('Email', email);
    postData.append('Password', password);

    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');

    return this.http.post<any>(this.baseUrl + loginEndPoint, { email, password }, { headers: headers })
      .pipe(map(user => {
        if (user && user.Status) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.userSubject.next(user);
        }
        return user;
      }));
  }

  async getAPIVersion() {
    await this._dashboardService.GetAPIVersionData().subscribe((res) => {
      if (res.Status) {
        localStorage.setItem('DBVersionAPI', JSON.stringify(res));
        console.log("Existing Version : " + JSON.stringify(res));
      }
      else {
        console.log("API Version Not Found !");
      }
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('tokenInfo');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('DBVersionAPI');
    this.userSubject.next(null!);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      //error client
      errorMessage = error.error.message;
    } else {
      //error server
      errorMessage = `Error Status Code: ${error.status}, ` + `Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
