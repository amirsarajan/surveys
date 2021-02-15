import { Injectable } from '@angular/core';
import { from, of, Subject, Observable, BehaviorSubject } from 'rxjs';
import { delay, filter, map, switchMap } from 'rxjs/operators';
import { AuthInfo } from './models/auth-info';
import { User } from './models/user';
import { UserInfo } from './models/user-info';

let users: User[] = [
  {
    name: 'test1',
    userName: 'test1',
    password: '123456',
    email: 'test1@gmail.com',
  },
  {
    name: 'test2',
    userName: 'test2',
    password: '123456',
    email: 'test2@gmail.com',
  },
];

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  isLoggedin$(): Observable<boolean> {
    return this.auth$.pipe(map((auth) => this.isValid(auth)));
  }

  private _auth$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>({});

  public get auth$(): Observable<AuthInfo> {
    return this._auth$.pipe(
      map((auth) => {
        //try to retrieve it from local storage
        if (!auth) {
          auth = this.tryRestore();
        }
        return auth;
      })
    );
  }

  constructor() {}

  private tryRestore() {
    let strAuth = localStorage.getItem('auth');
    if (strAuth) {
      let tempauth = JSON.parse(strAuth) as AuthInfo;
      if (this.isValid(tempauth)) {
        return tempauth;
      }
    }
    return {};
  }

  private storeAuthInfo(auth: AuthInfo) {
    localStorage.setItem('auth', JSON.stringify(auth));
  }

  private isValid(auth: AuthInfo): boolean {
    let today = new Date();
    return (
      !!auth &&
      !!auth.token &&
      !!auth.expires &&
      auth.expires.getTime() > today.getTime()
    );
  }

  public login(userName: string, password: string): Observable<AuthInfo> {
    return of(
      users.filter(
        (user) => user.userName === userName && user.password === password
      )
    ).pipe(
      delay(5000),
      map(([user]) => {
        if (user) {
          let authInfo = this.createAuth(user);
          return authInfo;
        }
        return { message: "Username and password didn't match" };
      }),
      map((auth) => {
        if (!!auth && !!auth.token) {
          this.storeAuthInfo(auth);
          this._auth$.next(auth);
        }
        return auth;
      })
    );
  }
  public logout() {
    this._auth$.next({});
  }

  private createAuth(user: UserInfo): AuthInfo {
    let expires = new Date();
    expires.setDate(expires.getDate() + 10);

    return {
      userInfo: {
        name: user.name,
        email: user.email,
      },
      token: JSON.stringify({ email: user.email, expires: expires }),
      expires,
    };
  }
}
