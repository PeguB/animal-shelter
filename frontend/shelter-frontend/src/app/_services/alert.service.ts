import {Injectable} from '@angular/core';
import {filter, Observable, Subject, throwError} from "rxjs";
import {Alert, AlertType} from "../_models/alert";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  constructor() {
  }

  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  success(message: string, options?: any) {
    this.alert(new Alert({...options, type: AlertType.Success, message}));
  }

  error(message: string, options?: any) {
    this.alert(new Alert({...options, type: AlertType.Error, message}));
  }

  info(message: string, options?: any) {
    this.alert(new Alert({...options, type: AlertType.Info, message}));
  }

  warn(message: string, options?: any) {
    this.alert(new Alert({...options, type: AlertType.Warning, message}));
  }

  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    alert.autoClose = (alert.autoClose === undefined ? true : alert.autoClose);
    this.subject.next(alert);
  }

  clear(id = this.defaultId) {
    this.subject.next(new Alert({id}));
  }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
