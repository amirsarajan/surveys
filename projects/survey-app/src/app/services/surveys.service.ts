import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { catchError, delay, filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { ProgressService } from './progress.service';
import { CreateSurvey } from '../authorized/models/create-survey';
import { Survey } from '../models/survey';
import { SurveyTitle } from '../models/survey-title';
import { SurveysHttpService } from './surveys-http.service';
import { SurveysStoreService } from './surveys-store.service';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {
  update(newSurvey: Survey) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private progressService: ProgressService,
    private surveysStore: SurveysStoreService,
    private surveysHttpService: SurveysHttpService) {
  }

  getSurvey(id: string): Observable<Survey | undefined> {
    return of(id).pipe(
      tap(id => this.progressService.start()),      
      switchMap(id => this.surveysHttpService.getSurvey(id)),
      delay(3000),
      tap(s => this.surveysStore.updateCurrentSurvey(s)),
      finalize(() => this.progressService.end())
    );
  }

  getAuthorSurveys(userId: string): Observable<SurveyTitle[]> {
    return of(userId).pipe(
      tap(userId => this.progressService.start()),
      delay(3000),
      switchMap(userId => this.surveysHttpService.getAuthorSurveys(userId)),
      tap(surveys => this.surveysStore.updateSurveys(surveys)),
      finalize(() => this.progressService.end())
    );
  }

  getPublicSurveys(q: string ='', skip = 0, take = 10): Observable<SurveyTitle[]> {
    return of([skip, take]).pipe(
      tap(userId => this.progressService.start()),     
      switchMap(([skip, take]) => this.surveysHttpService.getPublic(q, skip, take)),
      delay(3000),
      tap(surveys => this.surveysStore.updatePublicSurveys(surveys)),
      finalize(() => this.progressService.end())
    );
  }

  create(survey: CreateSurvey) {
    return of(survey).pipe(
      tap(survey => this.progressService.start()),
      switchMap(survey => this.surveysHttpService.create(survey)),
      delay(3000),
      tap(s => {
        this.surveysStore.addSurvey(s);
        this.surveysStore.updateCurrentSurvey(s);
      }),
      finalize(() => this.progressService.end())
    );
  }

}
