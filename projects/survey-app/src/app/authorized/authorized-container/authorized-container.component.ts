import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/auth.service';

@Component({
  selector: 'app-authorized-container',
  templateUrl: './authorized-container.component.html',
  styleUrls: ['./authorized-container.component.css']
})
export class AuthorizedContainerComponent implements OnInit {

  constructor(private authService:AuthorizationService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();    
  }
}
