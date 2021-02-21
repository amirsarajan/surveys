import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, of, Subject, Observable, BehaviorSubject } from 'rxjs';
import { delay, filter, map, switchMap } from 'rxjs/operators';
import { AuthInfo } from './models/auth-info';
import { User } from './models/user';
import { UserInfo } from './models/user-info';

let users: User[] = [
  {
    name: 'test1',
    userName: 'test1',
    password: '123',
    email: 'test1@gmail.com',
  },
  {
    name: 'test2',
    userName: 'test2',
    password: '456',
    email: 'test2@gmail.com',
  },
];

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {

  readonly authKey:string ='auth';
  private _auth$: BehaviorSubject<AuthInfo | undefined> = new BehaviorSubject<AuthInfo | undefined>(undefined);

  constructor(private router:Router) { }

  public get auth$(): Observable<AuthInfo | undefined> {
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

  isLoggedin$(): Observable<boolean> {
    return this.auth$.pipe(map((auth) => this.isValid(auth)));
  }

  private tryRestore(): AuthInfo | undefined {
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

  private storeAuthInfo(auth: AuthInfo) {
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
    this.clearAuth();
    this._auth$.next(undefined);
    this.router.navigate(['']);
  }

  clearAuth() {
    localStorage.removeItem(this.authKey);
  }

  private createAuth(user: UserInfo): AuthInfo {
    let expires = new Date();
    expires.setDate(expires.getDate() + 10);

    return {
      userInfo: {
        name: user.name,
        email: user.email,
      },
      token: JSON.stringify({ email: user.email, expires }),
      expires,
    };
  }
}
