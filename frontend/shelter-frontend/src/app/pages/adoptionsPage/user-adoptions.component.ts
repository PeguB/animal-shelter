import {Component, OnInit} from '@angular/core';
import {AdoptionService} from "../../_services/adoption.service";
import {UserAdoption} from "../../_models/userAdoption";
import {AccountService} from "../../_services/account.service";
import {AdoptionRequest} from "../../_models/adoptionRequest";

@Component({
  selector: 'app-user-adoptions',
  templateUrl: './user-adoptions.component.html',
  styleUrls: ['./user-adoptions.component.css']
})
export class UserAdoptionsComponent implements OnInit {

  adoptionsArray: Array<UserAdoption>

  constructor(private adoptionService: AdoptionService,
              private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.adoptionService.getAdoptionForUser(this.accountService.tokenSubject)
      .subscribe((response) => this.adoptionsArray = response)
  }

  deleteAdoption(adoption: UserAdoption): void {
    let adoptionRequestDelete: AdoptionRequest = {
      animalName: adoption.animalName,
      dateTime: adoption.dateTime,
      username: this.accountService.tokenSubject
    }
    this.adoptionService.deleteAdoption(adoptionRequestDelete).subscribe(() => {
      this.adoptionService.getAdoptionForUser((this.accountService.tokenSubject)).subscribe((response) => this.adoptionsArray = response)
    })
  }

}
