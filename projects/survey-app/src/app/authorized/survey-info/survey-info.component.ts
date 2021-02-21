import { Component, Input, OnInit } from '@angular/core';
import { Survey } from '../models/survey';

@Component({
  selector: 'app-survey-info',
  templateUrl: './survey-info.component.html',
  styleUrls: ['./survey-info.component.css']
})
export class SurveyInfoComponent implements OnInit {
  @Input() survey: Survey|undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
