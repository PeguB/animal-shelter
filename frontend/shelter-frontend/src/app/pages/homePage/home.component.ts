import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showFullContent: boolean = false;

  constructor() {
  }

  public expandContent(): void {
    this.showFullContent = true;
  }

  public withdrawContent(): void {
    this.showFullContent = false;
  }

  ngOnInit(): void {
  }

}
