import {Component} from '@angular/core';

@Component({
  selector: 'app-my-dialog',
  template: `
    <h2 mat-dialog-title></h2>
    <mat-dialog-content>
      <p>Are sure about this adoption?</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Yes</button>
      <button mat-button [mat-dialog-close]="false">No</button>
    </mat-dialog-actions>
  `,
})
export class MyDialogComponent {}
