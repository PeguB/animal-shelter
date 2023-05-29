import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {AccountService} from "../../_services/account.service";
import {AlertService} from "../../_services/alert.service";
import {first, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {UserCredentials} from "../../_models/userCredentials";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  }
)

export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  loading = false;
  submitted = false;
  returnUrl: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {

  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // console.log(this.accountService.userValue);
    //route to home if user is logged in
    if (this.accountService.tokenValue) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    let user: UserCredentials = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!
    }
    this.accountService.login(user)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log("Login successful");
          this.alertService.success('Login successful', {keepAfterRouteChange: true});
          if (this.accountService.tokenRole == 'USER')
            this.router.navigate(['../home'], {relativeTo: this.route});
          else if (this.accountService.tokenRole == 'ADMIN')
            this.router.navigate(['../adoptions'], {relativeTo: this.route});
        },
        error: error => {
          this.handleError(error);
          // this.alertService.error(error.error.detail);
          this.alertService.error("Username or password fields are invalid.");
          this.loading = false;
        }
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
