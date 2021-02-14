import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  
  constructor() { 
    this.form = new FormGroup({
      userName: new FormControl('userName',[Validators.required]),
      password: new FormControl('password',[Validators.required])
    });
  }

  ngOnInit(): void {
  }

}
