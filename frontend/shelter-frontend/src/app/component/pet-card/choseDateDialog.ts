import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AdoptionService} from "../../_services/adoption.service";
import {AdoptionRequest} from "../../_models/adoptionRequest";
import {DatePipe} from "@angular/common";
import {FormBuilder, Validators} from "@angular/forms";
import {catchError, first, map, of, retry, switchMap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {TokenService} from "../../_services/token.service";
import {RefreshTokenRequest} from "../../_models/refreshTokenRequest";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-dialog',
  template: `
    <form (ngSubmit)="onSubmit()" [formGroup]="adoptionForm">
      <mat-form-field style="width: 100%;" class="example-full-width" appearance="fill">
        <mat-label style="font-size: 15px">Choose a date</mat-label>
        <input name="date" style="width: 87%" formControlName="date"
               matInput [matDatepicker]="picker" required>
        <mat-hint>MM/DD/YYYY</mat-hint>
        <mat-datepicker-toggle matIconSuffix [for]="picker">
          <mat-icon style="margin-bottom: 5%" matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>
        </mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
        <mat-error *ngIf="adoptionForm.controls.date.errors?.['required']">
          You have to choose a date.
        </mat-error>
      </mat-form-field>
      <mat-dialog-content>
        <div>
          <div style="margin: 15px 0 15px 0; font-family: Roboto; font-size: medium; float: left">
            {{animalName}} will be so excited to meet you!
          </div>
          <div [style.background-image]="'url(' + photoIconPath + ')'"
               style="background-size: cover; float: right" mat-card-avatar>
          </div>
          <div>
            <p style="font-size: small; clear: both; padding-top: 5%">Note: By submitting this form,
              you agree to the terms and conditions of processing your personal data. Please, do not hesitate
              to contact us for any further details.</p>
          </div>
        </div>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button style="margin:0 2% 0 0" [mat-dialog-close]="true"
                (click)="onSubmit()" [disabled]="adoptionForm.invalid">
          Submit addoption form
        </button>
        <button mat-button style="margin:0 0 0 0" [mat-dialog-close]="true">Stay on this page</button>
      </mat-dialog-actions>
    </form>
  `,
})

export class ChoseDateDialogComponent {

  public photoIconPath: string;
  public animalName: string;
  adoptionForm = this.formBuilder.group({
    date: ['', Validators.required]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private adoptionService: AdoptionService,
              private datePipe: DatePipe,
              private formBuilder: FormBuilder,
              private tokenService: TokenService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.photoIconPath = this.data.photoIconPath;
    this.animalName = this.data.animalName;
  }

  onSubmit() {
    let adoptionRequest: AdoptionRequest = {
      username: this.data.username,
      animalName: this.data.animalName,
      dateTime: this.datePipe.transform(this.adoptionForm.value.date, "yyyy-MM-dd")
    }

    interface refreshResponse {
      "refreshToken": string
    }

    this.adoptionService.sendAdoption(adoptionRequest).subscribe()
  }
}
