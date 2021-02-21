import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SurveysComponent } from '../authorized/surveys/surveys.component';
import { SignupComponent } from './signup/signup.component';
import { PublicContainerComponent } from './public-container/public-container.component';
import { RedirectAuthorizedGuard } from '../services/guards/redirect-authorized.guard';

const routes: Routes = [
  {
    path: 'public',
    canActivate: [RedirectAuthorizedGuard],
    component: PublicContainerComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
    ]
  }

];

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    SignupComponent,
    PublicContainerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PublicModule { }
