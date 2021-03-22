import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { catchError, filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { ProgressService } from '../../services/progress.service';
import { Survey } from '../models/survey';
import { SurveyTitle } from '../models/survey-title';
import { SurveysHttpService } from './surveys-http.service';
import { SurveysStoreService } from './surveys-store.service';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(
    private progressService: ProgressService,
    private surveysStore: SurveysStoreService,
    private surveysHttpService: SurveysHttpService) {
  }

  getSurvey(id: string): Observable<Survey | undefined> {
    return of(id).pipe(
      tap(id => this.progressService.start()),
      switchMap(id => this.surveysHttpService.getSurvey(id)),
      tap(s => this.surveysStore.updateCurrentSurvey(s)),
      finalize(() => this.progressService.end())
    );
  }

  getAuthorSurveys(userId: string): Observable<SurveyTitle[]> {
    return of(userId).pipe(
      tap(userId => this.progressService.start()),
      switchMap(userId => this.surveysHttpService.getAuthorSurveys(userId)),
      tap(surveys => this.surveysStore.updateSurveys(surveys)),
      finalize(() => this.progressService.end())
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
