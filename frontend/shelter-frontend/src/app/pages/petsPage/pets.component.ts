import {Component, OnInit} from '@angular/core';
import {Animal} from "../../_models/animal";
import {AnimalService} from "../../_services/animal.service";
import {AccountService} from "../../_services/account.service";
import {first} from "rxjs";
@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})

export class PetsComponent implements OnInit {
  public filteredAnimals: Animal[] | undefined;
  public searchFilteredAnimals: Animal[] | undefined;
  public typeFilteredAnimals: Animal[] | undefined;
  public ANIMALS: Animal[] = []
  private buttonNumber: number = 1;

  constructor( private animalService: AnimalService) {
    this.buttonNumber = 1;
  }

  ngOnInit(): void {
    this.animalService.getAnimals().subscribe(animals=>{
      this.ANIMALS = animals
      this.searchFilteredAnimals = this.ANIMALS;
      this.typeFilteredAnimals = this.ANIMALS;
      this.filteredAnimals = this.ANIMALS;
    });

    this.buttonNumber = 1;
  }

  public selectButton(currentButton: number) {
    this.buttonNumber = currentButton;
  }

  public isButtonSelected(currentButton: number): boolean {
    return this.buttonNumber === currentButton || this.buttonNumber === 0 && currentButton === 1;
  }

  public filterAnimalsBySearchName(name: string): void {

    this.searchFilteredAnimals = this.ANIMALS;
    if (name) {
      this.searchFilteredAnimals = this.ANIMALS.filter(animal => {
        return animal.animalName?.toLowerCase().includes(name.toLowerCase())
      });
    }
    this.mergeFilters();

  }

  public filterAnimalsByType(type?: string): void {
    switch (type) {
      case 'all' :
        this.selectButton(1);
        break;
      case 'dog' :
        this.selectButton(2);
        break;
      case 'cat' :
        this.selectButton(3);
        break;
    }
    if (type && type !== 'all') {
      this.typeFilteredAnimals = this.ANIMALS.filter(animal => animal.animalType?.toLowerCase().includes(type.toLowerCase()));
    }else{
      this.typeFilteredAnimals = this.ANIMALS
    }
    this.mergeFilters();
  }

  private mergeFilters(): void {
    this.filteredAnimals = this.searchFilteredAnimals?.filter(animal => this.typeFilteredAnimals?.includes(animal));
  }

}
