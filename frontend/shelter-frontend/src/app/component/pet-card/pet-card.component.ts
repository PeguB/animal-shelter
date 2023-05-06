import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MyDialogComponent} from "./dialogAnimation.component";
import {ComponentType} from "@angular/cdk/portal";
import {MyDialogNotLoggedInComponent} from "./dialogForNotLoggedIn.component";
import {AccountService} from "../../_services/account.service";

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.css']
})
export class PetCardComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string | undefined;
  @Input() photoPath: string | undefined;
  @Input() photoIconPath: string;
  @Input() age: number | undefined;
  @Input() weight: number | undefined;
  @Input() description: string | undefined;


  ngOnInit(): void {
  }

  constructor(private dialog: MatDialog,
              private accountService: AccountService) {

  }

  openDialog(animalName: string, photoIconPath: string) {
    if(localStorage.getItem('token')){
      this.choseDialog(MyDialogComponent,animalName, photoIconPath, this.accountService.tokenSubject)
    }else{
      this.choseSimpleDialog(MyDialogNotLoggedInComponent)
    }
  }
  private choseDialog(component: ComponentType<any>,animalName: string, photoIconPath:string, username: string){
    const dialogRef = this.dialog.open(component, {
      width: '300px',
      data: {animalName,username, photoIconPath}
    });
  }

  private choseSimpleDialog(component: ComponentType<any>){
    const dialogRef = this.dialog.open(component, {
      width: '300px',
      data: {}
    });
  }
}
