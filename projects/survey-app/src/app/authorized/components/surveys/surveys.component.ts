import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { AuthStoreService } from '../../../services/store.service';
import { SurveyTitle } from '../../../models/survey-title';
import { SurveysService } from '../../../services/surveys.service';
import { EditSurveyComponent } from '../edit-survey/edit-survey.component';
import { SurveysStoreService } from '../../../services/surveys-store.service';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'desc', 'creationTime', 'isPublished'];
  surveys: SurveyTitle[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private surveysStore: SurveysStoreService,
    private authStore: AuthStoreService,
    private surveysService: SurveysService,
    private dialog: MatDialog) {

    surveysStore.surveys$.subscribe(surveys => {
      console.log(surveys);
      this.surveys = surveys;
    })
  }

  get surveys$(): Observable<SurveyTitle[]> {
    return this.surveysStore.surveys$;
  }

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe(data =>{

    // });
    // this.authStore.auth$.pipe(
    //   filter(auth => !!auth && !!auth.userInfo),
    //   switchMap(auth => {
    //     if (auth && auth.userInfo) {
    //       return this.surveysService.getAuthorSurveys(auth?.userInfo?.id);
    //     }
    //     return of(undefined);
    //   })
    // ).subscribe()
  }

  openEdit(surveyTitle: SurveyTitle) {
    this.surveysService.getSurvey(surveyTitle.id)
      .subscribe(
        (survey) => {
          this.dialog.open(EditSurveyComponent, {
            width: '100%',
            height: 'auto',
            data: survey
          }).beforeClosed()
            .subscribe((res: boolean) => {
              console.log(`EditSurvey result => ${res}`);
            });
        }
      );
  }

  openNew() {
    this.dialog.open(EditSurveyComponent, {
      width: '100%',
      height: 'auto',
    }).beforeClosed()
      .subscribe((res: boolean) => {
        console.log(`EditSurvey result => ${res}`);
      });
  }

}
