import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel, UserResponse } from '../../../models/userModel';
import { BaseapiService } from '../../../services/baseapi.service';

const GetTeachersURI: string = 'GetTeachers';

@Injectable({
  providedIn: 'root'
})

export class TeacherService {

  constructor(public service: BaseapiService) { }

  GetTeachers(): Observable<UserResponse<UserModel>> {
    return this.service.GetAPI<UserResponse<UserModel>>(GetTeachersURI);
  }

}
