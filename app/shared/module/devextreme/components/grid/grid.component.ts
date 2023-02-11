import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { StudentService } from '../../../students/services/student.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;

  dataSource!: any[];
  constructor(private _studentService: StudentService) {

  }

  ngOnInit(): void {

    this._studentService.GetStudents()
      .subscribe((res) => {
        if (res.Status) {
          this.dataSource = res.UserData;
          this.dataSource.forEach(_ => _.PhotoPath = environment.baseUrl + _.PhotoPath + _.Photo);
        }
        else {
        }
      });
  }

  edit(event: any) {
    alert("Edit Id : " + event.row.key);
  }

  delete(event: any) {
    alert("Delete Id : " + event.row.key);
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA, {
      logging: true, allowTaint: true,
      useCORS: true
    }).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }

}
