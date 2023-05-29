import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AccountService} from "../_services/account.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.accountService.isLoggedIn()) {
      if(this.accountService.tokenRole === 'USER'){
        return true;
      }else{
        this.router.navigate(['../home'])
        return false;
      }
    }else{
      this.router.navigate(['../home'])
      return false;
    }


  }
}
