import { ServiceResponse } from "./serviceResponse";

export interface UserModel {
  id: bigint;
  userType: bigint;
  userTypeName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  standard: bigint;
  standardName: string
  birthDate: string;
  gender: string;
  address: string;
  fatherOccupation: string;
  motherOcuupation: string;
  email: string;
  password: string;
  photoFile: File;
  contactNo: string;
  createdBy: bigint;
  updatedBy: bigint;
}


export interface UserCountModel {
  Standard: string;
  Count: bigint
}

export interface UserResponse<T> extends ServiceResponse {
  UserData: UserModel[];
}


export interface UserCountResponse<T> extends ServiceResponse {
  UserCount: UserCountModel[];
}


