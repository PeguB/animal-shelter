import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MyDialogComponent} from "./dialogAnimation.component";
import {ComponentType} from "@angular/cdk/portal";
import {MyDialogNotLoggedInComponent} from "./dialogForNotLoggedIn.component";

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.css']
})
export class PetCardComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;
  @Input() photoPath: string | undefined;
  @Input() photoIconPath: string | undefined;
  @Input() age: number | undefined;
  @Input() weight: number | undefined;
  @Input() description: string | undefined;


  ngOnInit(): void {
  }

  constructor(private dialog: MatDialog) {}

  openDialog() {
    if(localStorage.getItem('token')){
      this.choseDialog(MyDialogComponent)
    }else{
      this.choseDialog(MyDialogNotLoggedInComponent)
    }
  }
  private choseDialog(component: ComponentType<any>){
    const dialogRef = this.dialog.open(component, {
      width: '300px',
      data: {}
    });
  }
}
