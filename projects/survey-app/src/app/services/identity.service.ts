import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, of, Subject, Observable, BehaviorSubject, EMPTY } from 'rxjs';
import { delay, filter, map, switchMap } from 'rxjs/operators';
import { AuthInfo } from '../models/auth-info';
import { User } from '../models/user';
import { UserInfo } from '../models/user-info';
import { AuthStoreService } from './store.service';

let users: User[] = [
  {
    id: '1',
    name: 'test1',
    userName: 'test1',
    password: '123',
    email: 'test1@gmail.com',
  },
  {
    id: '2',
    name: 'test2',
    userName: 'test2',
    password: '456',
    email: 'test2@gmail.com',
  },
];

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  readonly authKey: string = 'auth';

  constructor(
    private authStore: AuthStoreService,
    private router: Router) { }

  public get auth$(): Observable<AuthInfo> {
    return this.authStore.auth$;
  }

  isLoggedin$(): Observable<boolean> {
    return this.auth$.pipe(
      map((auth) => this.isValid(auth))
    );
  }

  restore() {
    let auth = this.restoreFromLocalStorage();
    if (auth) {
      this.authStore.updateAuthInfo(auth);
    }
  }

  public login(userName: string, password: string): Observable<AuthInfo> {
    return of(
      users.filter(
        (user) => user.userName === userName && user.password === password
      )
    ).pipe(
      //delay(5000),
      map(([user]) => {
        if (user) {
          let authInfo = this.createAuth(user);
          this.persistAuthInfo(authInfo);
          this.authStore.updateAuthInfo(authInfo);
          return authInfo;
        }
        return { message: "Username and password didn't match" };
      })
    );
  }

  public logout() {
    this.clearAuth();
    this.authStore.updateAuthInfo(null);
    this.router.navigate(['']);
  }

  private restoreFromLocalStorage(): AuthInfo | undefined {
    let strAuth = localStorage.getItem(this.authKey);
    if (!strAuth)
      return undefined;

    let tempauth = JSON.parse(strAuth) as AuthInfo;

    if (!(tempauth && tempauth.expires))
      return undefined;

    let strDate: string = tempauth.expires?.toString();
    tempauth.expires = new Date(strDate);

    if (!this.isValid(tempauth))
      return undefined;
    return tempauth;
  }

  private persistAuthInfo(auth: AuthInfo) {
    localStorage.setItem(this.authKey, JSON.stringify(auth));
  }

  private isValid(auth: AuthInfo | undefined): boolean {
    let today = new Date();

    if (auth &&
      auth.token &&
      auth.expires) {
      return auth.expires.getTime() > today.getTime()
    }
    return false;
  }

  private clearAuth() {
    localStorage.removeItem(this.authKey);
  }

  private createAuth(user: UserInfo): AuthInfo {
    let expires = new Date();
    expires.setDate(expires.getDate() + 10);

    return {
      userInfo: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: JSON.stringify({ email: user.email, expires }),
      expires,
    };
  }
}
