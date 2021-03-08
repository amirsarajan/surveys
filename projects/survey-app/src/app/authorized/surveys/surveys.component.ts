import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Survey } from '../models/survey';
import { SurveyTitle } from '../models/survey-title';
import { SurveysService } from '../services/surveys.service';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit {

  constructor(private surveysService: SurveysService) {

  }

  get surveys$():Observable<SurveyTitle[]>{
    return this.surveysService.surveys$;
  }

  ngOnInit(): void {
    this.surveysService
  }

}
