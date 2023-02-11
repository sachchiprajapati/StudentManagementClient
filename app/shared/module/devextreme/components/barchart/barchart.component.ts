import { PercentPipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserCountModel } from '../../../../models/userModel';
import { StudentService } from '../../../students/services/student.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  dataSource!: UserCountModel[];
  pipe: any = new PercentPipe('en-US');

  constructor(private _studentService: StudentService) {
  }

  ngOnInit(): void {
    this._studentService.GetStudentsByStandard()
      .subscribe((res) => {
        if (res.Status) {
          this.dataSource = res.UserCount;
        }
        else {
        }
      });
  }

  customizeTooltip = (arg: any) => ({
    text: 'Count : ' +`${arg.value} - ${this.pipe.transform(arg.percent, '1.2-2')}`,
  });

  customizeLabel(arg: any) {
    return `${arg.argumentText}: ${arg.percentText}`;
  }


  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
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
