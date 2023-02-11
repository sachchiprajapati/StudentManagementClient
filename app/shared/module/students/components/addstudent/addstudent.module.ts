import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddstudentRoutingModule } from './addstudent-routing.module';
import { AddstudentComponent } from './addstudent.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMaterialModule } from '../../../material/material.module';


@NgModule({
  declarations: [
    AddstudentComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
    AddstudentRoutingModule,
    ReactiveFormsModule
  ]
})
export class AddstudentModule { }
