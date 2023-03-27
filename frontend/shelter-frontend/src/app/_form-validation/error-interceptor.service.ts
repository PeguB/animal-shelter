import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AccountService} from "../_services/account.service";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private accountService: AccountService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].includes(err.status) && this.accountService.userValue) {
        // auto logout if 401 or 403 response returned from api
        this.accountService.logout();
      }

      const error = (err && err.error && err.error.message) || err.statusText;
      console.error('Eroare tampita' + err);
      return throwError(error);
    }))
  }
}
