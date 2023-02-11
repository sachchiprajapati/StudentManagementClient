import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DashboardService } from './dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrapiversionResolverService implements Resolve<any>{

  constructor(private _dashboardService: DashboardService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._dashboardService.GetAPIVersionData().pipe(
      catchError(error => {
        return of('No data');
      })
    );
  }
}
