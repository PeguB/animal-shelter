import {Component, OnInit} from '@angular/core';
import {Animal} from "../../_models/animal";

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})

export class PetsComponent implements OnInit {
  public filteredAnimals: Animal[] | undefined;
  public ANIMALS: Animal[] = [
    {
      name: 'Cara',
      age: 11,
      weight: 5.2,
      sex: 'female',
      photoPath: 'https://media.istockphoto.com/id/450709593/photo/pug-sitting-and-panting-1-year-old-isolated-on-white.jpg?s=612x612&w=0&k=20&c=JzZdGVpJQuHzakXi13honoI_UtrvCOaHQhgP-P6IUfY=',
      photoIconPath: 'https://c.files.bbci.co.uk/17444/production/_124800359_gettyimages-817514614.jpg',
      type: 'dog',
    },
    {
      name: 'Lucky',
      age: 10,
      weight: 5.2,
      sex: 'female',
      description: 'lalsslfdjfvjk',
      photoPath: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_18/3469748/210430-frankie-al-1227_0.jpg',
      photoIconPath: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_18/3469748/210430-frankie-al-1227_0.jpg',
      type: 'cat'
    },
    {
      name: 'Rhea',
      age: 10,
      weight: 5.2,
      sex: 'female',
      description: 'lalsslfdjfvjk',
      type: 'dog'
    },
    {
      name: 'Simba',
      age: 10,
      weight: 5.2,
      sex: 'female',
      description: 'lalsslfdjfvjk',
      type: 'cat'
    },
    {
      name: 'Ray',
      age: 10,
      weight: 5.2,
      sex: 'female',
      description: 'lalsslfdjfvjk',
      type: 'dog'
    }
  ];
  private buttonNumber: number = 1;

  constructor() {
    this.buttonNumber = 1;
  }

  ngOnInit(): void {
    this.filteredAnimals = this.ANIMALS;
  }

  public selectButton(currentButton: number) {
    this.buttonNumber = currentButton;
  }

  public isButtonSelected(currentButton: number): boolean {
    return this.buttonNumber === currentButton || this.buttonNumber === 0 && currentButton === 1;
  }

  public searchAnimalsByName(name: string): void {
    this.filteredAnimals = this.ANIMALS.filter(animal => animal.name?.toLowerCase().includes(name.toLowerCase()));
  }
}
