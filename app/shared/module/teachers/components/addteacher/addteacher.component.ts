import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../../environments/environment';
import { StandardModel } from '../../../../models/standardModel';
import { UserRoles } from '../../../../models/userRoles';
import { AuthenticationService } from '../../../../services/authentication.service';
import { StandardService } from '../../../../services/standard.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-addteacher',
  templateUrl: './addteacher.component.html',
  styleUrls: ['./addteacher.component.css']
})
export class AddteacherComponent implements OnInit {
  public baseUrl = environment.baseUrl;
  teacherForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  standards!: StandardModel[];
  selectedFiles?: FileList;
  currentFile?: File;
  isAddMode  !: boolean;
  id!: string;
  StudentImage!: string;
  StudentImageName!: string;

  constructor(private formBuilder: UntypedFormBuilder, private _userService: UserService, private _standardService: StandardService,
    private athenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute,
    private datePipe: DatePipe, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.teacherForm = this.formBuilder.group(
      {
        id: [''],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        middleName: ['', Validators.required],
        standard: ['', Validators.required],
        birthDate: ['', Validators.required],
        gender: ['Female', Validators.required],
        address: ['', Validators.required],
        photo: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        contactNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      },
      { validator: this.ConfirmPasswordValidator("password", "confirmPassword") }
    );

    this.getStandrds();

    if (!this.isAddMode) {
      this._userService.GetUserById(this.id)
        .subscribe((res) => {
          if (res.Status) {
            var data: any = res.UserData[0];
            this.teacherForm.patchValue(
              {
                id: data.Id,
                firstName: data.FirstName,
                lastName: data.LastName,
                middleName: data.MiddleName,
                standard: data.Standard,
                birthDate: this.datePipe.transform(data.BirthDate, 'yyyy-MM-dd'),
                gender: data.Gender,
                address: data.Address,
                email: data.Email,
                password: data.Password,
                confirmPassword: data.Password,
                contactNo: data.ContactNo
              });
            this.StudentImage = data.PhotoPath + data.Photo;
            this.StudentImageName = data.Photo;
            this.teacherForm.controls['photo'].setValidators(null);
            this.teacherForm.controls['photo'].setErrors(null);
          }
          else {
            this.toastr.error("Error in Get Details !")
          }
        });
    }
  }

  getStandrds() {
    this._standardService.GetStandards().subscribe((res) => {
      if (res != null && res.length > 0) {
        this.standards = res;
      }
      else {
        this.toastr.error("Standards Not Found !")
      }
    });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
      }
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.teacherForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.teacherForm.invalid) {
      return;
    }

    this.loading = true;

    this.teacherForm.value.photoFile = this.currentFile;
    this.teacherForm.value.createdBy = this.athenticationService.userValue.Id;
    this.teacherForm.value.updatedBy = this.athenticationService.userValue.Id;
    if (this.currentFile == undefined && this.currentFile == null) {
      this.teacherForm.value.photo = this.StudentImageName;
    }
    this.teacherForm.value.userTypeName = UserRoles.Teacher;

    const formData = new FormData();
    for (const key of Object.keys(this.teacherForm.value)) {
      const value = this.teacherForm.value[key];
      formData.append(key, value);
    }

    this.submitted = false;

    if (this.isAddMode) {
      //Add
      this._userService.AddUser(formData).subscribe((res) => {
        this.loading = false;
        if (res.Status) {
          this.toastr.success("Detail Added Successfully !")
          this.router.navigate(['teacherlist']);
        }
        else {
          this.toastr.error("Error in Add Details !")
        }
      });
    }
    else {
      //Update
      this._userService.UpdateUser(formData).subscribe((res) => {
        this.loading = false;
        if (res.Status) {
          this.toastr.success("Detail Updated Successfully !")
          this.router.navigate(['teacherlist']);
        }
        else {
          this.toastr.error("Error in Update Details !")
        }
      });
    }
  }

  resetStudentForm() {
    this.submitted = false;
    this.teacherForm.reset();
    Object.keys(this.teacherForm.controls).forEach((key) => {
      const control = this.teacherForm.controls[key];
      control.setErrors(null);
    });
  }

  cancel() {
    this.router.navigate(['teacherlist']);
  }

  ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: UntypedFormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName]
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmPasswordValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

}
