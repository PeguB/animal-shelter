import {Component} from '@angular/core';


@Component({
  selector: 'app-my-dialog',
  template: `
    <mat-dialog-content>
      <p>You have to be logged in!</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button style="margin:0 2% 0 0" [mat-dialog-close]="true" routerLink="../login">Go to login</button>
      <button mat-button style="margin:0 0 0 0" [mat-dialog-close]="true">Stay on this page</button>
    </mat-dialog-actions>
  `,
})
export class MyDialogNotLoggedInComponent {}
