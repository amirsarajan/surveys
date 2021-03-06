import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../models/survey';
import { SurveyTitle } from '../models/survey-title';
import { environment } from '../../environments/environment';
import { CreateSurvey } from '../authorized/models/create-survey';

@Injectable({
  providedIn: 'root'
})
export class SurveysHttpService {

  constructor(private client: HttpClient) { }

  public getAuthorSurveys(userId: string): Observable<SurveyTitle[]> {
    return this.client.get<SurveyTitle[]>(`${environment.baseUrl}/surveys?userid=${userId}`, {
      headers: new HttpHeaders({
        "Content-Type": 'application/json'
      })
    });
  }

  public getPublic(q: string, skip = 0, take = 10): Observable<SurveyTitle[]> {
    return this.client.get<SurveyTitle[]>(`${environment.baseUrl}/surveys/public?q=${q}&skip=${skip}&take=${take}`, {
      headers: new HttpHeaders({
        "Content-Type": 'application/json'
      })
    });
  }
  public getSurvey(id: string): Observable<Survey> {
    return this.client.get<Survey>(`${environment.baseUrl}/surveys/${id}`, {
      headers: new HttpHeaders({
        "Content-Type": 'application/json'
      })
    });
  }

  create(createSurvey: CreateSurvey): Observable<Survey> {
    return this.client.post<Survey>(`${environment.baseUrl}/surveys`, createSurvey, {
      headers: new HttpHeaders({
        "Content-Type": 'application/json'
      })
    });
  }

}
