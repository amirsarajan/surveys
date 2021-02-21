import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Survey } from '../models/survey';
import { SurveysService } from './surveys.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyDetailsResolverGuard implements Resolve<Survey | null> {
  
  constructor(private surveyService:SurveysService){
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Survey | null | Observable<Survey | null> {
    return this.surveyService.getSurvey$(route.params.id).pipe(
      first(),
      map( s => !!s ? s: null )
    );
  } 
  
}
