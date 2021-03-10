import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../../../services/identity.service';

@Component({
  selector: 'app-authorized-container',
  templateUrl: './authorized-container.component.html',
  styleUrls: ['./authorized-container.component.css']
})
export class AuthorizedContainerComponent implements OnInit {

  constructor(private authService:IdentityService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();    
  }
}
