import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from './components/landing/landing.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { InternalServerErrorComponent } from './components/internal-server-error/internal-server-error.component';
import { AuthGuard } from './guards/auth.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { GoingLiveComponent } from './components/going-live/going-live.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
const routes: Routes = [
  {
  path: '',
  component: LandingComponent,
  children: [
    {
      path:'',
      component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot_password',
    component: ForgotPasswordComponent
  },
  
  ],
},

{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard]
},
{
  path: 'invoice',
  component: InvoiceComponent,
  canActivate: [AuthGuard]
},
{
  path: '403',
  component: ForbiddenComponent
},
{
  path: '500',
  component: InternalServerErrorComponent
},
{
  path: 'going-live',
  component: GoingLiveComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
