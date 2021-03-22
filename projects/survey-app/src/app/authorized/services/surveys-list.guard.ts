import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { IdentityService } from '../../services/identity.service';
import { Survey } from '../models/survey';
import { SurveyTitle } from '../models/survey-title';
import { SurveysStoreService } from './surveys-store.service';
import { SurveysService } from './surveys.service';

@Injectable({
  providedIn: 'root'
})
export class SurveysListGuard implements Resolve<SurveyTitle[]> {
  constructor(
    private identityStore: IdentityService,
    private surveysService: SurveysService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): SurveyTitle[] | Observable<SurveyTitle[]> | Promise<SurveyTitle[]> {
    return this.identityStore.auth$.pipe(      
      switchMap(auth =>  this.surveysService.getAuthorSurveys(auth.userInfo.id)),
      first()
    );
  }

}
