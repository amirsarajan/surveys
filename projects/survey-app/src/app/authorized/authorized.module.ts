import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveysComponent } from './surveys/surveys.component';
import { SurveyDetailsComponent } from './survey-details/survey-details.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedContainerComponent } from './authorized-container/authorized-container.component';
import { CreateComponent } from './create/create.component';
import { SurveyInfoComponent } from './survey-info/survey-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SurveyDetailsResolverGuard } from './services/survey-details-resolver.guard';

let reoutes: Routes = [
  {
    path: 'authorized',
    component: AuthorizedContainerComponent,
    children: [
      {
        path: 'surveys',
        component: SurveysComponent,
      },
      {
        path: 'details/:id',
        resolve : {
          survey: SurveyDetailsResolverGuard
        },
        component: SurveyDetailsComponent,
      },
      {
        path: 'create',
        component: CreateComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    SurveysComponent,
     SurveyDetailsComponent,
     AuthorizedContainerComponent,
     SurveyInfoComponent
    ],
  imports: [
    CommonModule, 
    RouterModule.forChild(reoutes),
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ],
})
export class AuthorizedModule { }
