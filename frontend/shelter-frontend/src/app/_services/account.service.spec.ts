import {inject, TestBed} from '@angular/core/testing';

import {AccountService} from './account.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {UserCredentials} from "../_models/userCredentials";

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AccountService]
    });
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully and store tokens in local storage', inject(
    [AccountService],
    (accountService: AccountService) => {

      const mockUserCredentials: UserCredentials = {username: 'john_doe', password: 'password'};
      const mockResponse = {token: 'mockToken', refreshToken: 'mockRefreshToken'};

      accountService.login(mockUserCredentials).subscribe(() => {
        expect(localStorage.getItem('token')).toEqual(JSON.stringify(mockResponse.token));
        expect(localStorage.getItem('refreshToken')).toEqual(JSON.stringify(mockResponse.refreshToken));
      });

      const request = httpMock.expectOne('http://localhost:8081/v1/auth/authenticate');
      expect(request.request.method).toBe('POST');
      request.flush(mockResponse);
    }
  ));

  it('should remove tokens from local storage and navigate to login page', inject(
    [AccountService],
    (accountService: AccountService) => {

      spyOn(localStorage, 'removeItem');
      spyOn(accountService.router, 'navigate');

      accountService.logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(accountService.router.navigate).toHaveBeenCalledWith(['../login']);
    }
  ));

});
