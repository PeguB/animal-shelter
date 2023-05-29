import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {AccountService} from "../../_services/account.service";
import {AlertService} from "../../_services/alert.service";
import {first} from "rxjs";
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
          this.alertService.success('Login successful', {keepAfterRouteChange: true});
          window.scrollTo(0, 0);

          if (this.accountService.tokenRole == 'USER')
            setTimeout(() => {
              this.router.navigate(['../home'], {relativeTo: this.route})
            }, 1000);

          else if (this.accountService.tokenRole == 'ADMIN')
            setTimeout(() => {
              this.router.navigate(['../adoptions'], {relativeTo: this.route})
            }, 1000);
        },

        error: error => {
          this.alertService.handleError(error);
          this.alertService.error("Username or password fields are invalid.");
          window.scrollTo(0, 0);
          this.loading = false;
        }
      });
  }
}
