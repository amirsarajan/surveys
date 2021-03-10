import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Survey } from '../models/survey';
import { SurveyTitle } from '../models/survey-title';

@Injectable({
  providedIn: 'root'
})
export class SurveysStoreService {
 
  protected _surveys:SurveyTitle[] = [];
  protected _surveys$: BehaviorSubject<SurveyTitle[]> = new BehaviorSubject<SurveyTitle[]>([]);
  protected _currentSurvey$: BehaviorSubject<Survey | undefined> = new BehaviorSubject<Survey | undefined>(undefined);

  get surveys$() {
    return this._surveys$;
  }

  get currentSurvey$() {
    return this._currentSurvey$;
  }

  updateSurveys(surveys: SurveyTitle[]) {
    this._surveys = surveys;
    this._surveys$.next(this._surveys);
  }

  updateCurrentSurvey(survey: Survey) {
    this._currentSurvey$.next(survey);
  }

  addSurvey(s: SurveyTitle) {
    this._surveys= [...this._surveys,s];
    this._surveys$.next(this._surveys);
  }

  constructor() { }
}
