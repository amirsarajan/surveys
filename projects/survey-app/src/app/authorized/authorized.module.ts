import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveysComponent } from './components/surveys/surveys.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedContainerComponent } from './components/authorized-container/authorized-container.component';
import { CreateComponent } from './components/create/create.component';
import { SurveyInfoComponent } from './components/survey-info/survey-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SurveyDetailsResolverGuard } from './services/survey-details-resolver.guard';
import { HttpClientModule } from '@angular/common/http';
import { EditSurveyComponent } from './components/edit-survey/edit-survey.component';
import { MaterialImportModule } from '../material-import.module';
import { SurveysListGuard } from './services/surveys-list.guard';

let reoutes: Routes = [
  {
    path: 'authorized',
    component: AuthorizedContainerComponent,
    children: [
      {
        path: 'surveys',
        component: SurveysComponent,        
        resolve:{
          surveys: SurveysListGuard
        }
      },
      {
        path: 'details/:id',
        resolve : {
          survey: SurveyDetailsResolverGuard
        },
        component: EditSurveyComponent,
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
     EditSurveyComponent,
     AuthorizedContainerComponent,
     SurveyInfoComponent
    ],
  imports: [
    CommonModule, 
    RouterModule.forChild(reoutes),
    ReactiveFormsModule,
    HttpClientModule,
    MaterialImportModule
  ],
  exports: [
    RouterModule
  ],
})
export class AuthorizedModule { }
