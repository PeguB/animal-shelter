import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {QuestionForAdoptionDialog} from "./dialogAnimation.component";
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
  @Input() photoIconPath: string | undefined;
  @Input() age: number | undefined;
  @Input() weight: number | undefined;
  @Input() description: string | undefined;

  constructor(private dialog: MatDialog,
              private accountService: AccountService) {

  }

  ngOnInit(): void {
  }

  openAdoptMeDialog(animalName: string, photoIconPath: string | undefined) {
    if (localStorage.getItem('token')) {
      this.choseDialogWithAdoptionData(QuestionForAdoptionDialog, animalName, photoIconPath, this.accountService.tokenSubject)
    } else {
      this.choseDefaultDialog(MyDialogNotLoggedInComponent)
    }
  }

  private choseDialogWithAdoptionData(component: ComponentType<any>, animalName: string, photoIconPath: string | undefined, username: string) {
    const dialogRef = this.dialog.open(component, {
      width: '300px',
      data: {animalName, username, photoIconPath}
    });
  }

  private choseDefaultDialog(component: ComponentType<any>) {
    const dialogRef = this.dialog.open(component, {
      width: '300px',
      data: {}
    });
  }
}
