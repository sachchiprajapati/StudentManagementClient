import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherListRoutingModule } from './teacher-list-routing.module';
import { TeacherListComponent } from './teacher-list.component';
import { NgMaterialModule } from '../../../material/material.module';
import { GenericTableModule } from '../../../../components/generic-table/generic-table.module';

@NgModule({
  declarations: [
    TeacherListComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
    GenericTableModule,
    TeacherListRoutingModule,
  ]
})
export class TeacherListModule { }
