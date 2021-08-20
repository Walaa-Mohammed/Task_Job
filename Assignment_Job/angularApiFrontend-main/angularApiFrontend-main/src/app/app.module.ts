import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardHeaderComponent } from './components/dashboard/dashboard-header/dashboard-header.component';
import { ClientComponent } from './components/client/client.component';
import { ClientHeaderComponent } from './components/client/client-header/client-header.component';
import { ClientFooterComponent } from './components/client/client-footer/client-footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardSidebarComponent } from './components/dashboard/dashboard-sidebar/dashboard-sidebar.component';
import { CompainesComponent } from './components/dashboard/compaines/compaines.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { ConfirmModalComponent } from './components/_reusableComponents/confirm-modal/confirm-modal.component';
import { RegisterComponent } from './components/register/register.component';
import { EmployeesComponent } from './components/dashboard/employees/employees.component';
import { UsersComponent } from './components/dashboard/users/users.component';
import { UploadComponent } from './components/_reusableComponents/upload/upload.component';
import { HomeComponent } from './components/client/home/home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SettingComponent } from './components/setting/setting.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    ClientComponent,
    ClientHeaderComponent,
    ClientFooterComponent,
    PageNotFoundComponent,
    DashboardSidebarComponent,
    CompainesComponent,
    LoginComponent,
    ConfirmModalComponent,
    RegisterComponent,
    EmployeesComponent,
    UsersComponent,
    UploadComponent,
    HomeComponent,
    SettingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgbModule

  ],
  providers: [
   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
