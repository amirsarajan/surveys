import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { AuthStoreService } from '../../../services/store.service';
import { SurveyTitle } from '../../models/survey-title';
import { SurveysStoreService } from '../../services/surveys-store.service';
import { SurveysService } from '../../services/surveys.service';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'desc',  'creationTime', 'isPublished'];
  surveys: SurveyTitle[] = [];

  constructor(
    private surveysStore: SurveysStoreService,
    private authStore: AuthStoreService,
    private surveysService: SurveysService) {

    surveysStore.surveys$.subscribe(surveys => {
      console.log(surveys);
      this.surveys = surveys;
    })
  }

  get surveys$(): Observable<SurveyTitle[]> {
    return this.surveysStore.surveys$;
  }

  ngOnInit(): void {
    this.authStore.auth$.pipe(
      filter(auth => !!auth && !!auth.userInfo),
      switchMap(auth => {
        if (auth && auth.userInfo) {
          return this.surveysService.getAuthorSurveys(auth?.userInfo?.id);
        }
        return of(undefined);
      })
    ).subscribe()
  }

  add() {

  }

}
