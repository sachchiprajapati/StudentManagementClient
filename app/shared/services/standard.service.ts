import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StandardModel } from '../models/standardModel';
import { BaseapiService } from './baseapi.service';

const GetStandardsURI: string = 'GetStandards';


@Injectable({
  providedIn: 'root'
})

export class StandardService {

  constructor(public service: BaseapiService) { }

  GetStandards(): Observable<StandardModel[]> {
    return this.service.GetAPI<StandardModel[]>(GetStandardsURI);
  }

}
