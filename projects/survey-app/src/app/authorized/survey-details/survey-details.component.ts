import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Survey } from '../models/survey';
import { SurveysService } from '../services/surveys.service';

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.css']
})
export class SurveyDetailsComponent implements OnInit {
  form: FormGroup;
  survey: Survey | undefined;

  constructor(
    private routeSnapshot: ActivatedRoute,
    private surveysService: SurveysService) {

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      desc: new FormControl('', [Validators.required]),
      questions: new FormArray([], [Validators.required])
    });
  }

  get questionsControls() {
    return (this.form.get('questions') as FormArray).controls;
  }

  add() {
    (this.form.get('questions') as FormArray)
      .controls.push(new FormControl(''));
  }

  ngOnInit(): void {
    this.routeSnapshot.data.subscribe(
      d => {
        if (d && d.survey) {
          this.form.patchValue(d.survey);
        }
      }
    );

  }

}
