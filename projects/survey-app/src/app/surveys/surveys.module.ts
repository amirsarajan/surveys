import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveysComponent } from './surveys/surveys.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SurveysComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SurveysModule { }
