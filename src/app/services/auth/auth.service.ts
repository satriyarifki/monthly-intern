import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AlertType } from '../alert/alert.model';
import { AlertService } from '../alert/alert.service';
const baseApi = environment.baseApi

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';
const USER_DATA_KEY = 'auth-user-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  datas: any;
  private authUrl = baseApi + 'users/';
  constructor(private http: HttpClient, private router: Router, private alertService:AlertService) {}
  setCookie(cValue: string, expDays: number) {
    let date = new Date();
    date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = TOKEN_KEY + '=' + cValue + '; ' + expires + '; path=/';
  }
  deleteCookie() {
    document.cookie =
      TOKEN_KEY + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
  }
  getCookie() {
    const name = TOKEN_KEY + '=';
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach((val) => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    return res;
  }
  login(nik: any, password: any): Observable<any> {
    return this.http.post(
      this.authUrl + 'login',
      {
        nik,
        password,
      },
      httpOptions
    );
  }

  signOut(): void {
    window.localStorage.clear();
    this.deleteCookie();
    // window.location.reload();
    this.alertService.onCallAlert('Sign Out Success!', AlertType.Success)
    this.router.navigate(['/']);
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    this.setCookie(token, 1);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    // return window.localStorage.getItem(TOKEN_KEY);
    return this.getCookie()!;
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(USER_DATA_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
  public getUserData(): any {
    const user = window.localStorage.getItem(USER_DATA_KEY);
    // console.log(user);

    if (user) {
      return JSON.parse(user);
    }
  }

}
