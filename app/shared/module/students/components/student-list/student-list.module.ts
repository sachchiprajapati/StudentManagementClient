import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListRoutingModule } from './student-list-routing.module';
import { StudentListComponent } from './student-list.component';
import { NgMaterialModule } from '../../../material/material.module';
import { GenericTableModule } from '../../../../components/generic-table/generic-table.module';

@NgModule({
  declarations: [
    StudentListComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
    GenericTableModule,
    StudentListRoutingModule,
  ]
})
export class StudentListModule { }
