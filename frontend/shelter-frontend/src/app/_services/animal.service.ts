import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Animal} from "../_models/animal";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private http: HttpClient) {
  }

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`http://localhost:8081/animal`, {responseType: 'json'})
  }
}
