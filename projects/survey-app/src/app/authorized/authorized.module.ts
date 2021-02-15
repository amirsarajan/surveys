import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveysComponent } from './surveys/surveys.component';
import { SurveyDetailsComponent } from './survey-details/survey-details.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedContainerComponent } from './authorized-container/authorized-container.component';
import { CreateComponent } from './create/create.component';

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
        path: 'create',
        component: CreateComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [SurveysComponent, SurveyDetailsComponent],
  imports: [CommonModule, RouterModule.forChild(reoutes)],
  exports: [SurveysComponent, SurveyDetailsComponent],
})
export class AuthorizedModule {}
