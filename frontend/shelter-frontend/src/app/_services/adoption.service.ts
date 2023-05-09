import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AdoptionRequest} from "../_models/adoptionRequest";

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

  constructor(private http: HttpClient) {
  }

  sendAdoption(body: AdoptionRequest): Observable<any> {


    let tokenValue = JSON.parse(localStorage.getItem('token')!).token
    let headers = new HttpHeaders({'Authorization': 'Bearer ' + tokenValue});
    console.log(headers.get('Authorization'));
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + tokenValue
    });
    return this.http.post<AdoptionRequest>(`http://localhost:8080/adoption/send`, body, { headers: reqHeader })
  }
}
