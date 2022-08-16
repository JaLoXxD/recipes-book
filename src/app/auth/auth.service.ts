import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { UserModel } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiKey: string = environment.firebaseAPIKey;

  user = new BehaviorSubject<UserModel>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  register(email: string, password: string) {
    console.log(email);
    console.log(password);
    const body: Object = {
      email,
      password,
      returnSecureToken: true,
    };
    console.log(body);
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
        body
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) =>
          this.handleUser(
            resData.email,
            resData.localId,
            resData.idToken,
            resData.expiresIn
          )
        )
      );
  }

  login(email: string, password: string) {
    const body: Object = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
        body
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) =>
          this.handleUser(
            resData.email,
            resData.localId,
            resData.idToken,
            resData.expiresIn
          )
        )
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  checkUserData() {
    const userData: {
      mail: string;
      id: string;
      _token: string;
      _tokeExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;
    const { mail, id, _token, _tokeExpirationDate } = userData;
    const loadedUser = new UserModel(
      mail,
      id,
      _token,
      new Date(_tokeExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(_tokeExpirationDate).getTime() - new Date().getTime();
      this.checkTokenDuration(expirationDuration);
    }
  }

  checkTokenDuration(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let errMsg = 'An unknown error was ocurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errMsg));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errMsg = 'This email already exists!';
      case 'EMAIL_NOT_FOUND':
        errMsg = 'Email not found!';
      case 'INVALID_PASSWORD':
        errMsg = 'Email or password are incorrect!';
    }
    return throwError(() => new Error(errMsg));
  }

  private handleUser(
    email: string,
    userId: string,
    token: string,
    expiresIn: string
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new UserModel(email, userId, token, expirationDate);
    this.user.next(user);
    this.checkTokenDuration(+expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
