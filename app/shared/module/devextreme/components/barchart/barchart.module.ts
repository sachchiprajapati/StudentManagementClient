import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarchartRoutingModule } from './barchart-routing.module';
import { BarchartComponent } from './barchart.component';
import { DevExtremeModule } from 'devextreme-angular';


@NgModule({
  declarations: [
    BarchartComponent
  ],
  imports: [
    CommonModule,
    BarchartRoutingModule,
    DevExtremeModule
  ]
})
export class BarchartModule { }
