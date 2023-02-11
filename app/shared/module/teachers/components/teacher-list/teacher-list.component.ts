import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { UserService } from '../../../../services/user.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { TeacherService } from '../../services/teacher.service';
import { ChildTable, TableBtn, TableColumn } from '../../../../models/genericTable';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TeacherListComponent implements OnInit {
  public baseUrl = environment.baseUrl;
  data!: any[];
  columns!: TableColumn[];
  buttons: TableBtn[] = [];
  childTableData!: ChildTable[];

  constructor(private _userService: UserService, private _athenticationService: AuthenticationService,
    private _teacherService: TeacherService,
    private router: Router, private toastr: ToastrService,
    private dialog: MatDialog) {

    this.GetTeachers();
    this.getColumns();
    this.getButtons();
  }

  ngOnInit(): void {
    this.GetTeachers();
  }

  GetTeachers() {
    this._teacherService.GetTeachers()
      .subscribe((res) => {
        if (res.Status) {
          this.data = res.UserData;
          this.data.forEach(_ => _.PhotoPath = environment.baseUrl + _.PhotoPath + _.Photo);
        }
        else {
          this.toastr.error("Error in Get Techers Details !")
        }
      });
  }

  buttonClick(result: string[]) {
    if (result[0] == "edit") {
      this.router.navigate(["addteacher", result[1]]);
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
              this.GetTeachers();
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
      { columnName: 'Email', displayName: 'Email', isImage: false, value: "" },
      { columnName: 'Address', displayName: 'Address', isImage: false, value: "" },
      { columnName: 'ContactNo', displayName: 'Contact No', isImage: false, value: "" },
      { columnName: 'BirthDate', displayName: 'Birth Date', isImage: false, value: "" }
    ];
  }

  getButtons() {
    this.buttons.push(
      { styleClass: 'iconbutton', icon: 'edit', payload: (element: any) => `${element.Id}`, action: 'edit', titlename: 'edit', colorname: 'primary' },
      { styleClass: 'iconbutton', icon: 'delete', payload: (element: any) => `${element.Id}`, action: 'delete', titlename: 'delete', colorname: 'warn' },
    );
  }

}
