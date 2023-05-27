import {TestBed} from '@angular/core/testing';

import {ErrorInterceptorService} from './error-interceptor.service';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ErrorInterceptorService', () => {
  let service: ErrorInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorInterceptorService,
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true},
      ],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ErrorInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
