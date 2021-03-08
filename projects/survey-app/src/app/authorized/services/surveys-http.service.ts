import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../models/survey';
import { environment } from '../../../environments/environment';
import { SurveyTitle } from '../models/survey-title';

@Injectable({
  providedIn: 'root'
})
export class SurveysHttpService {
 
  constructor(private client: HttpClient) { }

  public getAuthorSurveys(userId: string): Observable<SurveyTitle[]> {
    return this.client.get<Survey[]>(`${environment}surveys?userid=${userId}`, {
      headers: new HttpHeaders({
        "Content-Type": 'application/json'
      })
    });
  }

  public getSurvey(id: string): Observable<Survey> {
    return this.client.get<Survey>(`http://localhost:5000/surveys/${id}`, {
      headers: new HttpHeaders({
        "Content-Type": 'application/json'
      })
    });
  }

  create(survey: Survey):Observable<Survey> {
    return this.client.post<Survey>('http://localhost:5000/surveys',      survey, {
      headers: new HttpHeaders({
        "Content-Type": 'application/json'
      })
    });
  }

}
