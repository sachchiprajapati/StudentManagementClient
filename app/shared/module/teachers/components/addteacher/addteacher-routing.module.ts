import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddteacherComponent } from './addteacher.component';

const routes: Routes = [
  { path: '', component: AddteacherComponent },
  { path: 'addteacher/:id', component: AddteacherComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddteacherRoutingModule { }
