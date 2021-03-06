import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdentityService } from '../../services/identity.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: string | undefined;

  constructor(
    private router: Router,
    private authService: IdentityService) {

    this.form = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      keep: new FormControl(false)
    });
  }

  login() {
    this.message = "";

    let { userName, password } = this.form.value;

    this.authService.login(userName, password).subscribe(auth => {
      if (auth && auth.token) {
        this.router.navigate(['/authorized','surveys']);
      } else {
        this.message = auth.message;
      }
    });
  }

  get keep(){
    return this.form.controls.keep as FormControl;
  }

  ngOnInit(): void { }
}
