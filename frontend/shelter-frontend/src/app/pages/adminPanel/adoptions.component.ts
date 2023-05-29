import {Component, OnInit} from '@angular/core';
import {Adoption} from "../../_models/adoption";
import {AdoptionService} from "../../_services/adoption.service";
import {AdoptionRequest} from "../../_models/adoptionRequest";

@Component({
  selector: 'app-adoptions',
  templateUrl: './adoptions.component.html',
  styleUrls: ['./adoptions.component.css'],
})
export class AdoptionsComponent implements OnInit {

  adoptionArray: Array<Adoption>

  constructor(private adoptionService: AdoptionService) {
  }

  ngOnInit(): void {
    this.adoptionService.getAdoptions().subscribe((adoptions) => {
      this.adoptionArray = adoptions
    })
  }

  acceptAdoption(adoption: Adoption): void {
    let adoptionRequestUpdate: AdoptionRequest = {
      animalName: adoption.animalName,
      dateTime: adoption.dateTime,
      username: adoption.username
    }
    this.adoptionService.acceptAdoption(adoptionRequestUpdate).subscribe(() => {
      this.adoptionService.getAdoptions().subscribe((adoptions) => {
        this.adoptionArray = adoptions
      })
    })
  }

  deleteAdoption(adoption: Adoption): void {
    let adoptionRequestDelete: AdoptionRequest = {
      animalName: adoption.animalName,
      dateTime: adoption.dateTime,
      username: adoption.username
    }
    this.adoptionService.deleteAdoption(adoptionRequestDelete).subscribe(() => {
      this.adoptionService.getAdoptions().subscribe((adoptions) => {
        this.adoptionArray = adoptions
      })
    })
  }

}
