import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel, UserResponse } from '../models/userModel';
import { BaseapiService } from './baseapi.service';

const AddUserURI: string = 'AddUser';
const UpdateUserURI: string = 'UpdateUser';
const DeleteUserURI: string = 'DeleteUser';
const GetUserbyIdURI: string = 'GetUserbyId';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(public service: BaseapiService) { }

  AddUser(studentForm: FormData) {
    return this.service.PostFormData<UserResponse<FormData>>(AddUserURI, studentForm);
  }

  UpdateUser(studentForm: FormData) {
    return this.service.PostFormData<UserResponse<FormData>>(UpdateUserURI, studentForm);
  }

  DeleteUser(studentForm: FormData) {
    return this.service.PostFormData<UserResponse <FormData>>(DeleteUserURI, studentForm);
  }

  GetUserById(Id: any): Observable<UserResponse<UserModel>> {
    return this.service.GetAPI<UserResponse<UserModel>>(GetUserbyIdURI + "?Id=" + Id);
  }

}
