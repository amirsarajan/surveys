import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SurveyTitle } from '../../models/survey-title';
import { IdentityService } from '../../services/identity.service';
import { SurveysStoreService } from '../../services/surveys-store.service';
import { SurveysService } from '../../services/surveys.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  searchControl: FormControl = new FormControl('');
  displayedColumns: string[] = ['title', 'desc', 'creationTime'];
  surveys: SurveyTitle[] = [];

  constructor(
    surveysStore: SurveysStoreService,
    private surveysService: SurveysService
  ) {
    // activatedRoute.data.subscribe(d => {
    //   this.surveys = d.publicSurveys;
    // });
    this.form = new FormGroup({
      search: new FormControl('', [Validators.required])
    });
    surveysStore.publicSurveys$.subscribe(
      surveys => this.surveys = surveys
    );
  }

  ngOnInit(): void {

  }

  search() {
    this.surveysService.getPublicSurveys(this.searchControl.value)
      .subscribe();
  }
}
