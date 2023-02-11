// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //baseUrl: 'http://192.168.37.17/StudentManegementAPI/',
  baseUrl: 'https://localhost:7007/',
  //baseUrl: 'http://192.168.37.17:1002/StudentSystemAPI/',
  clientId: "studentsystem",
  clientSecret: "student#@123",
  scope: "studentapi offline_access",
  grantType: "password",
  grantTypeRefreshToken: "refresh_token",
  username: "admin@gmail.com",
  password : "admin"
  //scope: "student.api",
  //grantType: "client_credentials"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
