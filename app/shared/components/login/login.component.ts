import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;

  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private route: ActivatedRoute,
    private athenticationService: AuthenticationService, private toastr: ToastrService) {

    // redirect to home if already logged in
    if (this.athenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  async onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    //this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    await this.athenticationService.generateToken();

    await this.athenticationService.getAPIVersion();

    this.athenticationService.login(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.Status) {
            this.router.navigate([this.returnUrl]);
            this.toastr.success("Login Successfully !");
          }
          else {
            this.loading = false;
            this.toastr.error("Error in Login. Check Email and Password !");
          }
        },
        error => {
          this.loading = false;
        });
  }


}
