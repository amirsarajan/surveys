import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.css']
})
export class SurveyDetailsComponent implements OnInit {
  form:FormGroup;
  constructor() { 
    this.form = new FormGroup({
      title: new FormControl('',[Validators.required,Validators.maxLength(100)]),
      description: new FormControl('',[Validators.required]),
      questions: new FormArray([],[Validators.required])
    });    
  }

  ngOnInit(): void {
  }

}
