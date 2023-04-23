import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private http: HttpClient) {
  }

  getAnimals(): Observable<any> {
    return this.http.get(`http://localhost:8081/v1/auth/authenticate`, {responseType: 'json'})
  }
}
