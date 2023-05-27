import {TestBed} from '@angular/core/testing';

import {AnimalService} from './animal.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Animal} from "../_models/animal";

describe('AnimalService', () => {
  let service: AnimalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AnimalService]
    });
    service = TestBed.inject(AnimalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve animals from API', () => {
    const mockAnimals: Animal[] = [
      {animalName: 'Cara'},
      {animalName: 'Blacky'},
      {animalName: 'Lucky'},
      {animalName: 'Rhea'}
    ];

    service.getAnimals().subscribe((animals: Animal[]) => {
      expect(animals.length).toBe(4);
      expect(animals).toEqual(mockAnimals);
    });

    const req = httpMock.expectOne('http://localhost:8081/animal');
    expect(req.request.method).toBe('GET');
    req.flush(mockAnimals);
  });

});
