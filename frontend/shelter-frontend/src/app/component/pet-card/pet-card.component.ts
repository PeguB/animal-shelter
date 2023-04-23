import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.css']
})
export class PetCardComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;
  @Input() photoPath: string | undefined;
  @Input() photoIconPath: string | undefined;
  @Input() age: number | undefined;
  @Input() weight: number | undefined;
  @Input() description: string | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
