import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { DashboardUserComponent } from './pages/user/dashboard-user/dashboard-user.component';
import { AdminGuard } from './services/admin.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
  {
    path: '',
    component : HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component : SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component : LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component : DashboardComponent,
    canActivate : [AdminGuard],
    children: [{
      path : 'profile',
      component : ProfileComponent
    },
    {
      path : '',
      component : HomeComponent
    }]
  },
  {
    path : 'user',
    component : DashboardUserComponent,
    pathMatch : 'full',
    canActivate: [NormalGuard]
  },
  {
    path: 'admin',
    component : DashboardComponent,
    canActivate : [AdminGuard],
    children: [{
      path : 'new-post',
      component : ProfileComponent
    },
    {
      path : '',
      component : HomeComponent
    }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
