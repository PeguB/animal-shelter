import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AdoptionRequest} from "../_models/adoptionRequest";

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

  constructor(private http: HttpClient) {
  }

  sendAdoption(body: AdoptionRequest): Observable<any> {
    return this.http.post<AdoptionRequest>(`http://localhost:8081/adoption/send`, body)
  }

  getAdoptions(): Observable<any> {
    return this.http.get('http://localhost:8081/adoption')
  }

  acceptAdoption(body: AdoptionRequest): Observable<any> {
    return this.http.put('http://localhost:8081/adoption', body)
  }
}
