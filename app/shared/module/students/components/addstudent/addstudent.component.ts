import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StandardModel } from '../../../../models/standardModel';
import { UserRoles } from '../../../../models/userRoles';
import { AuthenticationService } from '../../../../services/authentication.service';
import { UserService } from '../../../../services/user.service';
import { environment } from '../../../../../../environments/environment';
import { StandardService } from '../../../../services/standard.service';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.css']
})
export class AddstudentComponent implements OnInit {
  public baseUrl = environment.baseUrl;
  studentForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  standards!: StandardModel[];
  selectedFiles?: FileList;
  currentFile?: File;
  isAddMode  !: boolean;
  id!: string;
  StudentImage!: string;
  StudentImageName!: string;
  centered!: true;
  constructor(private formBuilder: UntypedFormBuilder, private _userService: UserService, private _standardService: StandardService,
    private athenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute,
    private datePipe: DatePipe, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.studentForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: ['', Validators.required],
      standard: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['Female', Validators.required],
      address: ['', Validators.required],
      photo: ['', Validators.required],
      fatherOccupation: ['', Validators.required],
      motherOcuupation: ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    })

    this.getStandrds();

    if (!this.isAddMode) {
      this._userService.GetUserById(this.id)
        .subscribe((res) => {
          if (res.Status) {
            var data: any = res.UserData[0];
            this.studentForm.patchValue(
              {
                id: data.Id,
                firstName: data.FirstName,
                lastName: data.LastName,
                middleName: data.MiddleName,
                standard: data.Standard,
                birthDate: this.datePipe.transform(data.BirthDate, 'yyyy-MM-dd'),
                gender: data.Gender,
                address: data.Address,
                fatherOccupation: data.FatherOccupation,
                motherOcuupation: data.MotherOcuupation,
                contactNo: data.ContactNo
              });
            this.StudentImage = data.PhotoPath + data.Photo;
            this.StudentImageName = data.Photo;
            this.studentForm.controls['photo'].setValidators(null);
            this.studentForm.controls['photo'].setErrors(null);
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
  get f() { return this.studentForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.studentForm.invalid) {
      return;
    }

    this.loading = true;

    this.studentForm.value.photoFile = this.currentFile;
    this.studentForm.value.createdBy = this.athenticationService.userValue.Id;
    this.studentForm.value.updatedBy = this.athenticationService.userValue.Id;
    if (this.currentFile == undefined && this.currentFile == null) {
      this.studentForm.value.photo = this.StudentImageName;
    }
    this.studentForm.value.userTypeName = UserRoles.Student;

    const formData = new FormData();
    for (const key of Object.keys(this.studentForm.value)) {
      const value = this.studentForm.value[key];
      formData.append(key, value);
    }

    this.submitted = false;

    if (this.isAddMode) {
      //Add
      this._userService.AddUser(formData).subscribe((res) => {
        this.loading = false;
        if (res.Status) {
          this.toastr.success("Detail Added Successfully !")
          this.router.navigate(['studentlist']);
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
          this.router.navigate(['studentlist']);
        }
        else {
          this.toastr.error("Error in Update Details !")
        }
      });
    }
  }

  resetStudentForm() {
    this.submitted = false;
    this.studentForm.reset();
    Object.keys(this.studentForm.controls).forEach((key) => {
      const control = this.studentForm.controls[key];
      control.setErrors(null);
    });
  }

  cancel() {
    this.router.navigate(['studentlist']);
  }

}
