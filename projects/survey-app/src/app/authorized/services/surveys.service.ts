import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Survey } from '../models/survey';
import { SurveyTitle } from '../models/survey-title';
import { SurveysHttpService } from './surveys-http.service';
import { SurveysStoreService } from './surveys-store.service';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(
    private surveysStore: SurveysStoreService,
    private surveysHttpService: SurveysHttpService) {
  }

  getSurvey(id: string): Observable<Survey | undefined> {
    return this.surveysHttpService.getSurvey(id).pipe(
      tap(s => this.surveysStore.updateCurrentSurvey(s))
    );
  }

  getAuthorSurveys(userId: string): Observable<SurveyTitle[] | undefined> {
    return this.surveysHttpService.getAuthorSurveys(userId).pipe(
      tap(surveys => this.surveysStore.updateSurveys(surveys))
    );
  }

  add(survey: Survey) {
    this.surveysHttpService.create(survey)
      .pipe(
        tap(s => {
          this.surveysStore.addSurvey(s);
          this.surveysStore.updateCurrentSurvey(s);
        })
      );
  }

}
