import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PublicContainerComponent } from './public-container/public-container.component';
import { RedirectAuthorizedGuard as RedirectIfAuthorizedGuard } from '../services/guards/redirect-authorized.guard';
import { MaterialImportModule } from '../material-import.module';
import { PublicSurveysGuard } from '../services/public-surveys.guard';


const routes: Routes = [
  {
    path: 'public',
    canActivate: [RedirectIfAuthorizedGuard],
    component: PublicContainerComponent,
    children: [
      {
        path: '',
        resolve:{
          publicSurveys:PublicSurveysGuard
        },
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
    RouterModule.forChild(routes),
    MaterialImportModule
  ],
  exports: [
    RouterModule
  ]
})
export class PublicModule { }
