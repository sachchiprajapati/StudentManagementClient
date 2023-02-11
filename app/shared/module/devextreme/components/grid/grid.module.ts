import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridRoutingModule } from './grid-routing.module';
import { GridComponent } from './grid.component';
import { DevExtremeModule } from 'devextreme-angular';


@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    CommonModule,
    GridRoutingModule,
    DevExtremeModule
  ]
})
export class GridModule { }
