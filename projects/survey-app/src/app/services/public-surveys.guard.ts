import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { SurveyTitle } from '../models/survey-title';
import { SurveysStoreService } from './surveys-store.service';
import { SurveysService } from './surveys.service';

@Injectable({
  providedIn: 'root'
})
export class PublicSurveysGuard implements Resolve<SurveyTitle[]> {

  constructor(
    private surveysStore: SurveysStoreService,
    private surveysService: SurveysService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): SurveyTitle[] | Observable<SurveyTitle[]> | Promise<SurveyTitle[]> {
    return this.surveysService.getPublicSurveys()
  }

}
