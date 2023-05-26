import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, EMPTY, Observable, switchMap} from 'rxjs';
import {AccountService} from "../_services/account.service";
import {RefreshTokenRequest} from "../_models/refreshTokenRequest";
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.url.includes('/v1/auth') && !request.url.includes('/animal')) {
      const modifiedRequest = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('refreshToken')!)
        }
      });
      if (this.accountService.isTokenExpired()) {
        console.log(this.accountService.isTokenExpired())
        let refreshToken: RefreshTokenRequest = {
          username: 'admin',
          token: localStorage.getItem('token')!.replace('"', "")
        };
        return this.accountService.getRefreshToken(refreshToken).pipe(
          switchMap((newRefreshToken: any) => {
            localStorage.removeItem('refreshToken');

            localStorage.setItem('refreshToken', JSON.stringify(newRefreshToken.refreshToken))
            const retryRequest = modifiedRequest.clone({
              setHeaders: {
                Authorization: `Bearer ` + JSON.stringify(newRefreshToken.refreshToken).replace('"', "")
              }
            });

            return next.handle(retryRequest)
          }),
          catchError(error => {
            if (error.status == 403) {
              console.log('Token expired. Please log in again.');
              localStorage.removeItem('token');
              localStorage.removeItem('refreshToken');
              this.router.navigate(['../login']);
            }
            return EMPTY
          })
        )
      }
      return next.handle(modifiedRequest);
    }
    return next.handle(request);
  }
}
