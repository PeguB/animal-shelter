import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Animal} from "../_models/animal";
import {AdoptionRequest} from "../_models/adoptionRequest";

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

  constructor(private http: HttpClient) {
  }

  sendAdoption(body: AdoptionRequest): Observable<AdoptionRequest> {
    return this.http.post<AdoptionRequest>(`http://localhost:8080/adoption/send`, body)
  }
}
