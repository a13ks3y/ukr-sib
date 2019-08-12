import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private dateSource = new Subject<Date>();
  constructor() {}
  getDate(): Observable<Date> {
    return this.dateSource.asObservable();
  }
  updateDate(date: Date) {
    this.dateSource.next(date);
  }
}
