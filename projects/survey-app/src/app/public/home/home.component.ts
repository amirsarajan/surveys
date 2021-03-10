import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../../services/identity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService:IdentityService) { }

  ngOnInit(): void {
  }

}
