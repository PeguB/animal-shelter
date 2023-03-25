import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../_services/account.service";
import {AlertService} from "../_services/alert.service";
import {User} from "../_models";
import {first, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[+][4][0][0-9]{9}$')]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.pattern('^.{6,}$')]],
    confirmPassword: ['', [Validators.required, this.passwordValidator]]
  });
  loading = false;
  submitted = false;
  returnUrl: string | undefined;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    // this.accountService.register(this.form.value)
    //   .pipe(first())
    //   .subscribe({
    //     next: () => {
    //       this.alertService.success('Registration successful, please check your email for verification instructions', {keepAfterRouteChange: true});
    //       this.router.navigate(['../login'], {relativeTo: this.route});
    //     },
    //     error: error => {
    //       this.alertService.error(error);
    //       this.loading = false;
    //     }
    //   });
    let user: User = {
      firstName: this.registerForm.value.firstName!,
      lastName: this.registerForm.value.lastName!,
      email: this.registerForm.value.email!,
      phoneNumber: this.registerForm.value.phoneNumber!,
      username: this.registerForm.value.username!,
      password: this.registerForm.value.password!


    }
    this.accountService.register(user)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log("Registration successful");
          this.alertService.success('Registration successful', {keepAfterRouteChange: true});
          this.router.navigate(['../login'], {relativeTo: this.route});
        },
        error: error => {
          this.handleError(error);
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  //
  // private passwordValidator(control: AbstractControl) {
  //   const passwordControl = control.root.get('password');
  //   const matchPasswordControl = control;
  //   if (matchPasswordControl.errors) {
  //     // return if another validator has already found an error on the matchingControl
  //     return;
  //   }
  //   if (passwordControl) {
  //     return passwordControl?.value != matchPasswordControl.value ?
  //       {passwordValidator: {value: matchPasswordControl.value}} : null;
  //   }
  //   return null;
  // }

  private passwordValidator(control: AbstractControl) {
    if (control.root.get('password')) {
      return control.root.get('password')?.value != control.value ?
        {passwordValidator: {value: control.value}} : null;
    }
    return null;
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
