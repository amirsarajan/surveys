import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SurveysComponent } from '../authorized/components/surveys/surveys.component';
import { SignupComponent } from './signup/signup.component';
import { PublicContainerComponent } from './public-container/public-container.component';
import { RedirectAuthorizedGuard as RedirectIfAuthorizedGuard } from '../services/guards/redirect-authorized.guard';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatInputModule} from '@angular/material/input';

const routes: Routes = [
  {
    path: 'public',
    canActivate: [RedirectIfAuthorizedGuard],
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
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule
  ],
  exports: [
    RouterModule
  ]
})
export class PublicModule { }
