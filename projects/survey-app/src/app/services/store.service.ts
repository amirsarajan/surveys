import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { AuthInfo } from './models/auth-info';

// type StoreType<Type> = {
//   [p in keyof Type]: ReplaySubject<Type[p]>;
// };
@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  protected _auth$ = new BehaviorSubject<AuthInfo>(null);
  
  get auth$(): Observable<AuthInfo> {
    return this._auth$;
  }

  updateAuthInfo(value: AuthInfo) {
    this._auth$.next(value);
  }

  constructor() { }
}
