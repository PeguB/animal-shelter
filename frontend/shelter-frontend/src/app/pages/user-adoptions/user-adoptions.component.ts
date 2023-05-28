import { Component, OnInit } from '@angular/core';
import {AdoptionService} from "../../_services/adoption.service";
import {UserAdoption} from "../../_models/userAdoption";
import {AccountService} from "../../_services/account.service";
import {Adoption} from "../../_models/adoption";
import {AdoptionRequest} from "../../_models/adoptionRequest";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-adoptions',
  templateUrl: './user-adoptions.component.html',
  styleUrls: ['./user-adoptions.component.css']
})
export class UserAdoptionsComponent implements OnInit {

  adoptionsArray: Array<UserAdoption>
  constructor(private adoptionService: AdoptionService,
              private accountService: AccountService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.adoptionService.getAdoptionForUser(this.accountService.tokenSubject)
      .subscribe((response) => this.adoptionsArray = response)
  }

  deleteAdoption(adoption: UserAdoption): void{
    let adoptionRequestDelete: AdoptionRequest = {
      animalName: adoption.animalName,
      dateTime: adoption.dateTime,
      username: this.accountService.tokenSubject
    }
    this.adoptionService.deleteAdoption(adoptionRequestDelete).subscribe(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./'],{
        relativeTo: this.route
      });

    })
  }

}
