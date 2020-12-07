import { Injectable } from '@angular/core';
import * as alertyfy from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  public success(message: string) {
    alertyfy.success(message);
  }

  public warning(message: string) {
    alertyfy.warning(message);
  }

  public error(message: string) {
    alertyfy.error(message);

  }
}
