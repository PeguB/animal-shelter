import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AdoptionRequest} from "../_models/adoptionRequest";
import jwt_decode from "jwt-decode";
import {RefreshTokenRequest} from "../_models/refreshTokenRequest";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) {
  }

  getRefreshToken(refreshToken: RefreshTokenRequest){
    return this.http.post(`http://localhost:8081/v1/auth/refreshToken`,refreshToken)
  }
}
