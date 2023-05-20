import {Injectable} from '@angular/core';
import {map} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../_models/user";
import {HttpClient} from "@angular/common/http";
import {UserCredentials} from "../_models/user-credentials";
import jwt_decode from "jwt-decode";

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
    return this.getDecodedAccessToken(this.tokenValue).sub;
  }

  login(user: UserCredentials) {
    return this.http.post(`http://localhost:8081/v1/auth/authenticate`, user)
      .pipe(map(tokenValue => {
        localStorage.setItem('token', JSON.stringify(tokenValue));
      }))
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['../login']);
  }

  register(user: User) {
    return this.http.post(`http://localhost:8081/v1/auth/register`, user);
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
