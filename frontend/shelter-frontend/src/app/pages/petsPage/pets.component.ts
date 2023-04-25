import {Component, OnInit} from '@angular/core';
import {Animal} from "../../_models/animal";

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})

export class PetsComponent implements OnInit {
  public filteredAnimals: Animal[] | undefined;
  public searchFilteredAnimals: Animal[] | undefined;
  public typeFilteredAnimals: Animal[] | undefined;
  public ANIMALS: Animal[] = [
    {
      name: 'Cara',
      age: 16,
      weight: 6,
      sex: 'female',
      description: 'description goes here',
      photoPath: 'https://media.istockphoto.com/id/450709593/photo/pug-sitting-and-panting-1-year-old-isolated-on-white.jpg?s=612x612&w=0&k=20&c=JzZdGVpJQuHzakXi13honoI_UtrvCOaHQhgP-P6IUfY=',
      photoIconPath: 'https://c.files.bbci.co.uk/17444/production/_124800359_gettyimages-817514614.jpg',
      type: 'dog',
    },
    {
      name: 'Lucky',
      age: 10,
      weight: 2,
      sex: 'female',
      description: 'description goes here',
      photoPath: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_18/3469748/210430-frankie-al-1227_0.jpg',
      photoIconPath: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_18/3469748/210430-frankie-al-1227_0.jpg',
      type: 'dog'
    },
    {
      name: 'Rhea',
      age: 10,
      weight: 5,
      sex: 'female',
      description: 'description goes here',
      photoPath: 'https://assets.elanco.com/8e0bf1c2-1ae4-001f-9257-f2be3c683fb1/ac235c31-8953-4e7e-a582-2d5fa92d60d6/ragdoll_cat_01401.jpg',
      photoIconPath: 'https://www.pumpkin.care/wp-content/uploads/2021/01/Ragdoll-Hero.jpg',
      type: 'cat'
    },
    {
      name: 'Simba',
      age: 7,
      weight: 16,
      sex: 'female',
      description: 'description goes here',
      photoPath: 'https://onecms-res.cloudinary.com/image/upload/s--Lh6sY8BL--/c_fill,g_auto,h_468,w_830/f_auto,q_auto/v1/mediacorp/cna/image/2022/10/20/istock-1319774380.jpg?itok=QxcnSH_H',
      photoIconPath: 'https://fox56news.com/wp-content/uploads/sites/24/2022/07/Cat.jpg',
      type: 'cat'
    },
    {
      name: 'Ray',
      age: 5,
      weight: 25,
      sex: 'female',
      description: 'description goes here',
      photoPath: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg',
      photoIconPath: 'https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg',
      type: 'cat'
    }
  ];
  private buttonNumber: number = 1;

  constructor() {
    this.buttonNumber = 1;
  }

  ngOnInit(): void {
    this.filteredAnimals = this.ANIMALS;
    this.searchFilteredAnimals = this.ANIMALS;
    this.typeFilteredAnimals = this.ANIMALS;
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
      this.searchFilteredAnimals = this.ANIMALS.filter(animal => animal.name?.toLowerCase().includes(name.toLowerCase()));
    }
    this.mergeFilters();
  }

  public filterAnimalsByType(type?: string): void {
    this.typeFilteredAnimals = this.ANIMALS;
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
      this.typeFilteredAnimals = this.ANIMALS.filter(animal => animal.type?.toLowerCase().includes(type.toLowerCase()));
    }
    this.mergeFilters();
  }

  private mergeFilters(): void {
    this.filteredAnimals = this.searchFilteredAnimals?.filter(animal => this.typeFilteredAnimals?.includes(animal));
  }

}
