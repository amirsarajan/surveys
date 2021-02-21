import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './public/login/login.component';
import { SignupComponent } from './public/signup/signup.component';
import { SurveysComponent } from './authorized/surveys/surveys.component';
import { SurveyDetailsComponent } from './authorized/survey-details/survey-details.component';
import { PublicModule } from './public/public.module';
import { AuthorizedModule } from './authorized/authorized.module';

@NgModule({
  declarations: [
    AppComponent,
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PublicModule,
    AuthorizedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
