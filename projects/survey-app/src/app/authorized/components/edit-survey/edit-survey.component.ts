import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CreateSurvey } from '../../models/create-survey';
import { Survey } from '../../../models/survey';
import { SurveysService } from '../../../services/surveys.service';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css']
})
export class EditSurveyComponent implements OnInit {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditSurveyComponent>,
    @Inject(MAT_DIALOG_DATA) public survey: Survey,
    private routeSnapshot: ActivatedRoute,
    private surveysService: SurveysService) {

    this.form = new FormGroup({
      id: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(100)],),
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      desc: new FormControl('', [Validators.required]),
      questions: new FormArray([], [Validators.required])
    });

    if (survey) {
      this.updateForm(survey);
    }
  }

  get addEnabled() {
    return this.survey?.isPublished;
  }

  get submitEnabled() {
    return this.survey?.isPublished;
  }

  get questionsControls() {
    return (this.form.get('questions') as FormArray).controls;
  }

  add() {
    (this.form.get('questions') as FormArray)
      // .push(new FormControl('',[Validators.required]));
      .push(new FormGroup({
        content: new FormControl('', [Validators.required]),
        hint: new FormControl(''),
      }))
  }

  ngOnInit(): void {
    // this.routeSnapshot.data.subscribe(
    //   d => {
    //     if (d && d.survey) {
    //       this.survey = d.survey;
    //       this.updateForm(d.survey);
    //     }
    //   }
    // );
  }

  updateForm(survey: Survey) {
    this.form.patchValue(survey);
    survey.questions.forEach(q => {
      (this.form.controls.questions as FormArray)
        .push(new FormGroup({
          content: new FormControl(q.content, [Validators.required]),
          hint: new FormControl(q.hint),
        }));
    });

    if (survey?.isPublished) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  save() {
    let newSurvey: Survey = this.form.getRawValue();
    if (this.form.valid) {
      if (!this.survey) {
        this.ceateNewSurvey(newSurvey);
      } else {
        this.updateSurvey(newSurvey);
      }
    }
  }

  ceateNewSurvey(newSurvey: CreateSurvey) {
    this.surveysService.create(newSurvey)
      .subscribe(
        () => {
          this.dialogRef.close(true);
        },
        (error) => {
          // this.dialogRef.close(false);
        }
      );
  }

  updateSurvey(newSurvey: Survey) {
    // this.surveysService.update(newSurvey)
    // .subscribe(
    //   () => {
    //     this.dialogRef.close(true);
    //   },
    //   (error) => {
    //     // this.dialogRef.close(false);
    //   }
    // );
  }

  cancel() {
    this.dialogRef.close(true);
  }
}
