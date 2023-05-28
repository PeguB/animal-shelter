import {Injectable} from '@angular/core';
import {map} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../_models/user";
import {HttpClient} from "@angular/common/http";
import {UserCredentials} from "../_models/user-credentials";
import jwt_decode from "jwt-decode";
import {RefreshTokenRequest} from "../_models/refreshTokenRequest";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) {

  }

  public get tokenValue(): any {
    return localStorage.getItem('token');
  }

  public get tokenSubject(): string {
    //console.log(this.getDecodedAccessToken(this.tokenValue).sub)
    return this.getDecodedAccessToken(this.tokenValue).sub;
  }

  public get tokenRole(): string {
    return this.getDecodedAccessToken(this.tokenValue).role;

  }

  public get refreshTokenValue(): any {
    return localStorage.getItem('refreshToken');
  }
  public isLoggedIn(): boolean {
    if(localStorage.getItem('token') === null){
      return false
    }
    return true;
  }
  public isTokenExpired() {
    const currentTime = Math.floor(Date.now() / 1000);
    console.log(this.getDecodedAccessToken(this.refreshTokenValue).exp);
    return this.getDecodedAccessToken(this.refreshTokenValue).exp < currentTime;
  }

  login(user: UserCredentials) {
    interface ResponseAuth {
      token: string,
      refreshToken: string,
    }

    return this.http.post(`http://localhost:8081/v1/auth/authenticate`, user)
      .pipe(map((tokenValue: any) => {
        let responseAuth: ResponseAuth = tokenValue;
        localStorage.setItem('token', JSON.stringify(tokenValue.token));
        localStorage.setItem('refreshToken', JSON.stringify(tokenValue.refreshToken));
      }))
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['../login']);
  }

  register(user: User) {
    return this.http.post(`http://localhost:8081/v1/auth/register`, user);
  }

  getRefreshToken(refreshToken: RefreshTokenRequest) {
    return this.http.post(`http://localhost:8081/v1/auth/refreshToken`, refreshToken)
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      console.log(Error)
      return null;
    }
  }
}
