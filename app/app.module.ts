import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentWrapperComponent } from './shared/components/mastertheme/content-wrapper/content-wrapper.component';
import { ControlSidebarComponent } from './shared/components/mastertheme/control-sidebar/control-sidebar.component';
import { MainFooterComponent } from './shared/components/mastertheme/main-footer/main-footer.component';
import { MainHeaderComponent } from './shared/components/mastertheme/main-header/main-header.component';
import { MainSidebarComponent } from './shared/components/mastertheme/main-sidebar/main-sidebar.component';
import { MenuItemsComponent } from './shared/components/mastertheme/menu-items/menu-items.component';
import { LoginComponent } from './shared/components/login/login.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { MasterthemeComponent } from './shared/components/mastertheme/mastertheme.component';
import { HttpInterceptorInterceptor } from './shared/interceptor/http-interceptor.interceptor';
import { ErrorInterceptorInterceptor } from './shared/interceptor/error-interceptor.interceptor';
import { AddstudentModule } from './shared/module/students/components/addstudent/addstudent.module';
import { StudentListModule } from './shared/module/students/components/student-list/student-list.module';
import { AddteacherModule } from './shared/module/teachers/components/addteacher/addteacher.module';
import { TeacherListModule } from './shared/module/teachers/components/teacher-list/teacher-list.module';
import { NgMaterialModule } from './shared/module/material/material.module';
import { GridModule } from './shared/module/devextreme/components/grid/grid.module';
import { BarchartModule } from './shared/module/devextreme/components/barchart/barchart.module';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LoaderInterceptor } from './shared/interceptor/loader.interceptor';
import { MaterialcontrolsComponent } from './shared/components/materialcontrols/materialcontrols.component';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentWrapperComponent,
    ControlSidebarComponent,
    MainFooterComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    MenuItemsComponent,
    LoginComponent,
    DashboardComponent,
    MasterthemeComponent,
    LoaderComponent,
    MaterialcontrolsComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right'
    }),
    NgMaterialModule,
    AddstudentModule,
    StudentListModule,
    AddteacherModule,
    TeacherListModule,
    GridModule,
    BarchartModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    AuthGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
