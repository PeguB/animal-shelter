import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../_services/account.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  tabNumber: number;

  constructor(
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
    return this.accountService.tokenSubject;
  }

  public getRole(): string {
    return this.accountService.tokenRole;
  }

  public logOut(): void {
    return this.accountService.logout();
  }
}
