import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../_services/account.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  tabNumber: number;
  active: string;

  constructor(
    private dialog: MatDialog,
    private accountService: AccountService
  ) {
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

  public isLoggedIn(): boolean {
    return this.accountService.tokenValue != null;
  }

  public getUserName(): string {
    if (this.isLoggedIn())
      return this.accountService.tokenSubject;
    return '';
  }

  public getRole(): string {
    return this.accountService.tokenRole;
  }

  public logOut(): void {
    return this.accountService.logout();
  }
}
