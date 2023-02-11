import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserService } from '../../../../services/user.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Router } from '@angular/router';
import { Userlogin } from '../../../../models/userlogin';
import { UserRoles } from '../../../../models/userRoles';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../../environments/environment';
import { StudentService } from '../../services/student.service';
import { ChildTable, TableBtn, TableColumn } from '../../../../models/genericTable';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StudentListComponent implements OnInit {
  public baseUrl = environment.baseUrl;
  public currentUser!: Userlogin;

  data!: any[];
  columns!: TableColumn[];
  buttons: TableBtn[] = [];
  childTableData!: ChildTable[];

  constructor(private _userService: UserService, private _athenticationService: AuthenticationService,
    private _studentService: StudentService,
    private router: Router, private toastr: ToastrService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {

    this.GetStudents();
    this.getColumns();
    this.getButtons();
  }

  ngOnInit(): void {
  }

  GetStudents() {
    this._studentService.GetStudents()
      .subscribe((res) => {
        if (res.Status) {
          this.data = res.UserData;
          this.data.forEach(_ => _.PhotoPath = environment.baseUrl + _.PhotoPath + _.Photo);
        }
        else {
          this.toastr.error("Error in Get Student Details !")
        }
      });
  }

  buttonClick(result: string[]) {
    if (result[0] == "edit") {
      this.router.navigate(["addstudent", result[1]]);
    }
    else if (result[0] == "delete") {

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Are you sure you want to delete?',
          buttonText: {
            ok: 'Yes',
            cancel: 'No'
          }
        }
      });

      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          const formData = new FormData();
          var updatedBy = this._athenticationService.userValue.Id
          formData.append('UpdatedBy', updatedBy.toString());
          formData.append('Id', result[1].toString());

          this._userService.DeleteUser(formData).subscribe((res) => {
            if (res.Status) {
              this.toastr.success("Student Deleted Successfully !")
              this.GetStudents();
            }
            else {
              this.toastr.error("Error in Delete Student !")
            }
          });
        }
      });
    }
  }

  getColumns() {
    this.columns = [
      { columnDef: 'FirstName', header: 'FirstName', cell: (element: any) => `${element.FirstName}` },
      { columnDef: 'MiddleName', header: 'MiddleName', cell: (element: any) => `${element.MiddleName}` },
      { columnDef: 'LastName', header: 'LastName', cell: (element: any) => `${element.LastName}` },
      { columnDef: 'Gender', header: 'Gender', cell: (element: any) => `${element.Gender}` },
      { columnDef: 'Standard', header: 'Standard', cell: (element: any) => `${element.StandardName}` }
    ];

    this.childTableData = [
      { columnName: 'PhotoPath', displayName: 'Photo', isImage: true, value: "" },
      { columnName: 'Address', displayName: 'Address', isImage: false, value: "" },
      { columnName: 'FatherOccupation', displayName: 'Father Occupation', isImage: false, value: "" },
      { columnName: 'MotherOcuupation', displayName: 'Mother Ocuupation', isImage: false, value: "" },
      { columnName: 'ContactNo', displayName: 'Contact No', isImage: false, value: "" },
      { columnName: 'BirthDate', displayName: 'Birth Date', isImage: false, value: "" }
    ];
  }

  getButtons() {
    this.currentUser = this._athenticationService.userValue;
    this.buttons.push(
      { styleClass: 'iconbutton', icon: 'edit', payload: (element: any) => `${element.Id}`, action: 'edit', titlename: 'edit', colorname: 'primary' },
    );

    if (this.currentUser.UserType.toLowerCase() != UserRoles.Teacher.toLowerCase()) {
      this.buttons.push(
        { styleClass: 'iconbutton', icon: 'delete', payload: (element: any) => `${element.Id}`, action: 'delete', titlename: 'delete', colorname: 'warn' },
      );
    }
  }

}
