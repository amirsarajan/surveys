import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Survey } from '../models/survey';

let testSurveys: Survey[] = [
  {
    id: (new Date()).getTime().toString(),
    title: 'test servey1',
    desc: 'conducts a servey about the underage alochole consumption',
    questions: [
      'Did you like this product?',
      'How satisfied are you with this product?',
      'would you recommend this product to a friend?',
      'would you recommend the company to a friend?',
      'Did it you help accomplish your goals?',
      'How satisfied are you with our customer support?'
    ],
    isPublished: true,
  },
  {
    id: (new Date()).getTime().toString(),
    title: 'test servey2',
    desc: 'conducts a servey about the underage alochole consumption',
    questions: [
      'Did you like this product?',
      'How satisfied are you with this product?',
      'would you recommend this product to a friend?',
      'would you recommend the company to a friend?',
      'Did it you help accomplish your goals?',
      'How satisfied are you with our customer support?'
    ],
    isPublished: false,
  }
];

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  _surveys: Survey[] = testSurveys;
  _surveys$: BehaviorSubject<Survey[]> = new BehaviorSubject<Survey[]>([]);

  constructor() {
    this._surveys$.next(this._surveys);
  }

  get surveys$(): Observable<Survey[]> {
    return this._surveys$;
  }

  getSurvey$(id: string): Observable<Survey | undefined> {
    return this.surveys$.pipe(
      map(s => s.filter(item => item.id === id)),
      map(s => s.length > 0 ? s[0] : undefined)
    )
  }

  add(survey: Survey) {
    survey.id = (new Date()).getTime().toString();
    this._surveys.push(survey);
    this._surveys$.next(this._surveys);
  }

}
