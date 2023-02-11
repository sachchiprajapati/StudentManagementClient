import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddteacherRoutingModule } from './addteacher-routing.module';
import { AddteacherComponent } from './addteacher.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddteacherComponent
  ],
  imports: [
    CommonModule,
    AddteacherRoutingModule,
    ReactiveFormsModule
  ]
})
export class AddteacherModule { }
