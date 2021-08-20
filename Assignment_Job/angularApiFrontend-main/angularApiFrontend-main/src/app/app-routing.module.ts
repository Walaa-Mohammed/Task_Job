import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { CompainesComponent } from './components/dashboard/compaines/compaines.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeesComponent } from './components/dashboard/employees/employees.component';
import { UsersComponent } from './components/dashboard/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingComponent } from './components/setting/setting.component';
import { AuthGuard } from './_helpers/auth.guard';
import { UserRoles } from './_models/_enums/UserRoles';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'setting' , component: SettingComponent, canActivate: [AuthGuard],},
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild : [AuthGuard],
    data:{
      role: UserRoles.Admin
    },
    children:[
      {path: 'compaines', component: CompainesComponent},
      {path: 'employees', component: EmployeesComponent},
      {path: 'users', component: UsersComponent},
    ]
  },
  {
    path:'',
    component:ClientComponent,
    children:[
      // {path: '', component: HomeComponent},


    ]
  },
  {path: '**', component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
