import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  private buttonNumber: number;

  constructor() {
    this.buttonNumber = 1;
  }

  ngOnInit(): void {
  }

  public selectButton(currentButton: number) {
    this.buttonNumber = currentButton;
  }

  public isButtonSelected(currentTab: number): boolean {
    return this.buttonNumber === currentTab;
  }

}
