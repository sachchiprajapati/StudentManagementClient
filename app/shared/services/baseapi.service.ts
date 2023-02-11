import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseapiService {
  public baseUrl = environment.baseUrl;
  constructor(private _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  GetAPI<T>(url: string) {
    var res = this._http.get<T>(this.baseUrl + url, { headers: this.httpOptions.headers }).pipe(
      finalize(() => {
      }),
      catchError(this.handleError)
    );
    return res;
  }

  PostAPI<T>(url: string, body: FormData) {
    var res = this._http.post<T>(this.baseUrl + url, body, { headers: this.httpOptions.headers, reportProgress : true, observe: 'events' }).pipe(
      finalize(() => {
      }),
      catchError(this.handleError)
    );
    return res;
  }

  PostFormData<T>(url: string, body: FormData) {
    var res = this._http.post<T>(this.baseUrl + url, body).pipe(
      finalize(() => {
      }),
      catchError(this.handleError)
    );
    return res;
  }

  DeleteAPI<T>(url: string) {
    var res = this._http.delete<T>(this.baseUrl + url, { headers: this.httpOptions.headers }).pipe(
      finalize(() => {
      }),
      catchError(this.handleError)
    );
    return res;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      //error client
      errorMessage = error.error.message;
    } else {
      //error server
      errorMessage = `Error Status : ${error.status}, ` + `Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
