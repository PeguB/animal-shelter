import {Component, Inject, Input} from '@angular/core';
import {ComponentType} from "@angular/cdk/portal";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ChoseDateDialogComponent} from "./choseDateDialog";

@Component({
  selector: 'app-my-dialog',
  template: `
    <h2 mat-dialog-title></h2>
    <mat-dialog-content>
      <p>Are sure about this adoption?</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false" (click)="openDateDialog()">Yes</button>
      <button mat-button [mat-dialog-close]="false">No</button>
    </mat-dialog-actions>
  `,
})
export class MyDialogComponent {

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  openDateDialog(){
    this.choseSimpleDialog(ChoseDateDialogComponent)
  }
  private choseSimpleDialog(component: ComponentType<any>){
    let adoptionInformationTransfer = this.data;
    console.log(this.data);
    const dialogRef = this.dialog.open(component, {
      width: '400px',
      data: adoptionInformationTransfer
    });
  }
}
