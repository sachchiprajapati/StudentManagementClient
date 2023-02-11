import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { LoginComponent } from './shared/components/login/login.component';
import { MasterthemeComponent } from './shared/components/mastertheme/mastertheme.component';
import { MaterialcontrolsComponent } from './shared/components/materialcontrols/materialcontrols.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { DashboardResolverService } from './shared/services/dashboard-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: MasterthemeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard], resolve: { dashboardData: DashboardResolverService }, title: "Dashboard" },

      { path: 'addstudent', loadChildren: () => import('./shared/module/students/components/addstudent/addstudent.module').then(m => m.AddstudentModule), canActivate: [AuthGuard] ,title: "Add Student" },
      { path: 'addstudent/:id', loadChildren: () => import('./shared/module/students/components/addstudent/addstudent.module').then(m => m.AddstudentModule), canActivate: [AuthGuard], title: "Update Student" },
      { path: 'studentlist', loadChildren: () => import('./shared/module/students/components/student-list/student-list.module').then(m => m.StudentListModule), canActivate: [AuthGuard], title: "Students" },

      { path: 'addteacher', loadChildren: () => import('./shared/module/teachers/components/addteacher/addteacher.module').then(m => m.AddteacherModule), canActivate: [AuthGuard], title: "Add Teacher" },
      { path: 'addteacher/:id', loadChildren: () => import('./shared/module/teachers/components/addteacher/addteacher.module').then(m => m.AddteacherModule), canActivate: [AuthGuard], title: "Update Teacher" },
      { path: 'teacherlist', loadChildren: () => import('./shared/module/teachers/components/teacher-list/teacher-list.module').then(m => m.TeacherListModule), canActivate: [AuthGuard], title: "Teachers" },

      { path: 'grid', loadChildren: () => import('./shared/module/devextreme/components/grid/grid.module').then(m => m.GridModule), canActivate: [AuthGuard], title: "DevExtreme Grid" },
      { path: 'barchart', loadChildren: () => import('./shared/module/devextreme/components/barchart/barchart.module').then(m => m.BarchartModule), canActivate: [AuthGuard], title: "DevExtreme Charts" },

      { path: 'matcontrols', component: MaterialcontrolsComponent, canActivate: [AuthGuard], title: "Material Controls" },
    ],
    title: "Dashboard"
  },
  { path: 'login', component: LoginComponent, title: "Login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
