export interface Userlogin {
  Id: number;
  UserTypeId: number;
  UserType: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Status: boolean;
  Message: string;
  Photo: string;
}

export interface Token {
  access_token: string;
  expires_in: bigint;
  token_type: string;
  scope: string;
  refresh_token: string;
}

