import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Survey } from '../models/survey';
import { SurveyTitle } from '../models/survey-title';
import { SurveysHttpService } from './surveys-http.service';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  _surveys$: BehaviorSubject<SurveyTitle[]> = new BehaviorSubject<SurveyTitle[]>([]);
  _currentSurvey$: BehaviorSubject<Survey| undefined> = new BehaviorSubject<Survey|undefined>(undefined);

  constructor(private surveysHttpService:SurveysHttpService) {    
  }

  get surveys$(): Observable<SurveyTitle[]> {
    return this._surveys$;
  }

  getSurvey(id: string): Observable<Survey|undefined> {
    return this.surveysHttpService.getSurvey(id)
    .pipe(
      tap(s => this._currentSurvey$.next(s))
    );   
  }

  getAuthorSurveys(userId: string): Observable<SurveyTitle[]|undefined> {
    return this.surveysHttpService.getAuthorSurveys(userId)
    .pipe(
      tap(surveys => this._surveys$.next(surveys))
    );   
  }

  add(survey: Survey) {
    this.surveysHttpService.create(survey)
    .pipe(
      tap(s => {
        this._currentSurvey$.next(s);      
      })
    );   
  }

}
