import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  tabNumber : number;

  constructor() {
    this.tabNumber = 1;
  }

  ngOnInit(): void {
  }

  public selectNavBarTab(currentTab: number) {
    this.tabNumber = currentTab;
  }

  public isTabSelected(currentTab: number): boolean {
    return this.tabNumber === currentTab;
  }

}
