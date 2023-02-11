import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIVersionModel } from '../models/apiVersionModel';
import { DashboardModel } from '../models/dashboardModel';
import { BaseapiService } from './baseapi.service';

const GetDashboardDataURI: string = 'GetDashboardData';
const GetAPIVersionURI: string = 'GetSignalRAPIVersion';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(public service: BaseapiService) { }

  GetDashboardData(): Observable<DashboardModel> {
    return this.service.GetAPI<DashboardModel>(GetDashboardDataURI);
  }

  GetAPIVersionData(): Observable<APIVersionModel> {
    return this.service.GetAPI<APIVersionModel>(GetAPIVersionURI);
  }
}
