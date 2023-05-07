import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AdoptionService} from "../../_services/adoption.service";
import {AdoptionRequest} from "../../_models/adoptionRequest";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-my-dialog',
  template: `
    <mat-form-field style="width: 100%;" class="example-full-width" appearance="fill">
      <mat-label style="font-size: 15px">Choose a date</mat-label>
      <input [(ngModel)]="date" name="date" style="width: 87%"
             matInput [matDatepicker]="picker" required>
      <mat-hint>MM/DD/YYYY</mat-hint>
      <mat-datepicker-toggle matIconSuffix [for]="picker">
        <mat-icon style="margin-bottom: 5%" matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>
      </mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
    <mat-dialog-content>
      <div>
        <div style="margin: 15px 0 15px 0; font-family: Roboto; font-size: medium; float: left">
          Please choose a date to pick up {{animalName}}
        </div>
        <div [style.background-image]="'url(' + photoIconPath + ')'"
             style="background-size: cover; float: right" mat-card-avatar>
        </div>
        <div>
          <p style="font-size: small; clear: both; padding-top: 5%">Note: By submitting this form, you agree to the terms and conditions. </p>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button style="margin:0 2% 0 0" [mat-dialog-close]="true" (click)="onSubmit()">Submit appointment
      </button>
      <button mat-button style="margin:0 0 0 0" [mat-dialog-close]="true">Stay on this page</button>
    </mat-dialog-actions>
  `,
})

export class ChoseDateDialogComponent {
  date: Date;
  public photoIconPath: string;
  public animalName: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private adoptionService: AdoptionService,
              private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    this.photoIconPath = this.data.photoIconPath;
    this.animalName = this.data.animalName;
  }

  onSubmit() {
    if(this.date === null || this.date === undefined){
      console.log(this.date);
      return;
    }
    let adoptionRequest: AdoptionRequest = {
      username: this.data.username,
      animalName: this.data.animalName,
      dateTime: this.datePipe.transform(this.date, "yyyy-MM-dd")
    }
    this.adoptionService.sendAdoption(adoptionRequest)
      .subscribe();
    console.log(adoptionRequest);
  }
}
