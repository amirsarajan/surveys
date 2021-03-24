import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { IdentityService } from '../../services/identity.service';
import { SurveyTitle } from '../../models/survey-title';
import { SurveysService } from '../../services/surveys.service';

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
