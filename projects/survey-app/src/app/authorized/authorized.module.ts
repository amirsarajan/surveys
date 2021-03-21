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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';

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
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatTableModule
  ],
  exports: [
    RouterModule
  ],
})
export class AuthorizedModule { }
