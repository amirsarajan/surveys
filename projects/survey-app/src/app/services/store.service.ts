import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthInfo } from './models/auth-info';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  protected _auth$ = new BehaviorSubject<AuthInfo | undefined>(undefined);

  get auth$(): Observable<AuthInfo | undefined> {
    return this._auth$;
  }

  updateAuthInfo(value: AuthInfo| undefined) {
    this._auth$.next(value);
  }

  constructor() { }
}
