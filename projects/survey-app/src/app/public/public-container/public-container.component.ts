import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdentityService } from '../../services/identity.service';

@Component({
  selector: 'app-public-container',
  templateUrl: './public-container.component.html',
  styleUrls: ['./public-container.component.css'],
})
export class PublicContainerComponent implements OnInit {
  constructor(
    private authService: IdentityService,
    private activatedRoute: ActivatedRoute
  ) {}

  isMatched(url: string): Observable<boolean> {
    return this.activatedRoute.url.pipe(
      map(segments => segments.join('/') === url)
    );
  }

  ngOnInit(): void {}
}
