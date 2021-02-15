import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: string | undefined;

  constructor(
    private router:Router,
    private authService: AuthorizationService) {
      
    this.form = new FormGroup({
      userName: new FormControl('userName', [Validators.required]),
      password: new FormControl('password', [Validators.required]),
    });
  }

  login(){
    this.message = "";
    
    let {userName,Password} = this.form.value;
    this.authService.login(userName,Password)
    .subscribe(auth =>{
      if(auth && auth.token ){
        this.router.navigate(["/surveys"]);
      }else{
        this.message = auth.message;
      }
    });
  }

  ngOnInit(): void {}
}
