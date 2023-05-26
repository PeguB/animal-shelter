import {Component, OnInit} from '@angular/core';
import {Adoption} from "../../../_models/adoption";
import {AdoptionService} from "../../../_services/adoption.service";
import {AdoptionRequest} from "../../../_models/adoptionRequest";
import {ActivatedRoute, Router} from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-adoptions',
  templateUrl: './adoptions.component.html',
  styleUrls: ['./adoptions.component.css'],
})
export class AdoptionsComponent implements OnInit {

  adoptionArray: Array<Adoption>

  constructor(private adoptionService: AdoptionService,
              private route: ActivatedRoute,
              private router: Router) {
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
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./'],{
        relativeTo: this.route
      });

    })
  }

}
