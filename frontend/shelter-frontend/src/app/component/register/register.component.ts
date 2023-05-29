import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../_services/account.service";
import {AlertService} from "../../_services/alert.service";
import {first} from "rxjs";
import {User} from "../../_models/user";

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
    this.alertService.clear();
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

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
          this.alertService.success('Registration successful', {keepAfterRouteChange: true});
          this.loading = false;
          window.scrollTo(0, 0);
          setTimeout(() => {
            this.router.navigate(['../login'], {relativeTo: this.route});
          }, 1000)

        },
        error: error => {
          this.alertService.handleError(error);
          this.alertService.error(error.error.detail);
          window.scrollTo(0, 0);
          this.loading = false;
        }
      });
  }

  private passwordValidator(control: AbstractControl) {
    if (control.root.get('password')) {
      return control.root.get('password')?.value != control.value ?
        {passwordValidator: {value: control.value}} : null;
    }
    return null;
  }
}
