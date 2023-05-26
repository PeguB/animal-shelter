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

    return this.http.post<AdoptionRequest>(`http://localhost:8081/adoption/send`, body)
  }
}
