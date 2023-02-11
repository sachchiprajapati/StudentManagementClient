import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table.component';
import { NgMaterialModule } from '../../module/material/material.module';

@NgModule({
  declarations: [
    GenericTableComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule
  ],
  exports: [
    GenericTableComponent
  ]
})
export class GenericTableModule { }
