import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  private buttonNumber: number = 1;

  constructor() {
    this.buttonNumber = 1;
    console.log("Cons" + this.buttonNumber);
  }

  ngOnInit(): void {
  }

  public selectButton(currentButton: number) {
    this.buttonNumber = currentButton;
    console.log(this.buttonNumber);
  }

  public isButtonSelected(currentButton: number): boolean {
    console.log("Is button selected: this si current " + this.buttonNumber, currentButton);
    return this.buttonNumber === currentButton || this.buttonNumber === 0 && currentButton === 1;
    ;
  }

}
