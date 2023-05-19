import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AdoptionRequest} from "../_models/adoptionRequest";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

  constructor(private http: HttpClient) {
  }

  sendAdoption(body: AdoptionRequest): Observable<any> {

    let refreshTkn = JSON.parse(localStorage.getItem('refreshToken')!);
    console.log(refreshTkn)

    let headers = new HttpHeaders({'Authorization': 'Bearer ' + refreshTkn});
    console.log(headers.get('Authorization'));
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + refreshTkn
    });
    return this.http.post<AdoptionRequest>(`http://localhost:8080/adoption/send`, body, { headers: reqHeader })
  }
}
