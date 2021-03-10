import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Survey } from '../../models/survey';
import { SurveysService } from '../../services/surveys.service';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css']
})
export class EditSurveyComponent implements OnInit {
  form: FormGroup;
  survey: Survey | undefined;

  constructor(
    private routeSnapshot: ActivatedRoute,
    private surveysService: SurveysService) {

    this.form = new FormGroup({
      id: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(100)],),
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      desc: new FormControl('', [Validators.required]),
      questions: new FormArray([], [Validators.required])
    });

    this.form.disable();
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
          this.survey = d.survey;
          this.updateForm(d.survey);
        }
      }
    );
  }

  updateForm(survey: Survey) {
    this.form.patchValue(survey);
    survey.questions.forEach(q => {
      (this.form.controls.questions as FormArray)
      .push(new FormControl(q.content))
    });

    if (!survey?.isPublished) {
      this.form.controls.title.enable();
      this.form.controls.descr.enable();
    }
  }

}
