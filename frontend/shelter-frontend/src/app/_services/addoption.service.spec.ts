import {TestBed} from '@angular/core/testing';

import {AnimalService} from './animal.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AdoptionService} from "./adoption.service";
import {AdoptionRequest} from "../_models/adoptionRequest";

describe('AdoptionService', () => {
  let service: AdoptionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AnimalService]
    });
    service = TestBed.inject(AdoptionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send adoption request', () => {
    const mockAdoptionRequest: AdoptionRequest = {
      username: 'john_doe',
      animalName: 'Cara',
      dateTime: null
    };

    service.sendAdoption(mockAdoptionRequest).subscribe();

    const req = httpMock.expectOne('http://localhost:8081/adoption/send');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockAdoptionRequest);

    const mockResponse = {status: 'success'};
    req.flush(mockResponse);

  });
});

