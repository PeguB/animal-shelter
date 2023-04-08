import {Injectable} from '@angular/core';
import {map} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../_models/user";
import {HttpClient} from "@angular/common/http";
import {UserCredentials} from "../_models/user-credentials";

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
    return JSON.parse(localStorage.getItem('token')!);
  }

  login(user: UserCredentials) {
    return this.http.post(`http://localhost:8080/v1/auth/authenticate`, user)
      .pipe(map(tokenValue => {
        localStorage.setItem('token', JSON.stringify(tokenValue));
      }))

    // return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, {username, password})
    //   .pipe(map(user => {
    //     // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     localStorage.setItem('user', JSON.stringify(user));
    //     this.userSubject.next(user);
    //     return user;
    //   }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('token');
    // this.userSubject.next(null);
    this.router.navigate(['../login']);
  }

  register(user: User) {
    return this.http.post(`http://localhost:8080/v1/auth/register`, user);
  }

  getAll() {
    // return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: string) {
    // return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  update(id: string, params: any) {
    // return this.http.put(`${environment.apiUrl}/users/${id}`, params)
    //   .pipe(map(x => {
    //     // update stored user if the logged in user updated their own record
    //     if (id == this.userValue?.id) {
    //       // update local storage
    //       const user = { ...this.userValue, ...params };
    //       localStorage.setItem('user', JSON.stringify(user));
    //
    //       // publish updated user to subscribers
    //       this.userSubject.next(user);
    //     }
    //     return x;
    //   }));
  }

  delete(id: string) {
    // return this.http.delete(`${environment.apiUrl}/users/${id}`)
    //   .pipe(map(x => {
    //     // auto logout if the logged in user deleted their own record
    //     if (id == this.userValue?.id) {
    //       this.logout();
    //     }
    //     return x;
    //   }));
  }
}
