import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseapiService } from '../../../services/baseapi.service';
import { UserCountModel, UserCountResponse, UserModel, UserResponse } from '../../../models/userModel';

const GetStudentsURI: string = 'GetStudents';
const GetStudentsByStandardURI: string = 'GetStudentsCountByStandard';


@Injectable({
  providedIn: 'root'
})

export class StudentService {

  constructor(public service: BaseapiService) { }

  GetStudents(): Observable<UserResponse<UserModel>> {
    return this.service.GetAPI<UserResponse<UserModel>>(GetStudentsURI);
  }

  GetStudentsByStandard(): Observable<UserCountResponse<UserCountModel>> {
    return this.service.GetAPI<UserCountResponse<UserCountModel>>(GetStudentsByStandardURI);
  }

}
