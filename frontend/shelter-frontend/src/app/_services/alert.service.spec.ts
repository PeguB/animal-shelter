import {TestBed} from '@angular/core/testing';

import {AlertService} from './alert.service';
import {take} from "rxjs";
import {AlertType} from "../_models/alert";

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit success alert', () => {
    const message = 'Success message';

    service.onAlert().pipe(take(1)).subscribe(alert => {
      expect(alert.message).toBe(message);
      expect(alert.type).toBe(AlertType.Success);
    });

    service.success(message);
  });

  it('should emit error alert', () => {
    const message = 'Error message';
    const options = {autoClose: false};

    service.onAlert().pipe(take(1)).subscribe(alert => {
      expect(alert.message).toBe(message);
      expect(alert.type).toBe(AlertType.Error);
      expect(alert.autoClose).toBe(false);
    });

    service.error(message, options);
  });
});
