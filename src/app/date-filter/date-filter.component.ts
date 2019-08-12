import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements OnInit {
  dateFromControl = new FormControl((new Date()));
  dateToControl = new FormControl((new Date()));
  toMaxDate = new Date();
  fromMaxDate: Date;

  constructor() {
    let m = moment().subtract(5, "day");
    this.fromMaxDate = m.toDate();
  }

  ngOnInit() {
    this.dateFromControl.setValue(this.fromMaxDate);
  }

  @Output() filter:EventEmitter<Date> = new EventEmitter();

  filterTable() {
    const dateFrom  = this.dateFromControl.value;
    this.filter.emit(dateFrom);
  }

  dateToChanged() {
    const dateTo = this.dateToControl.value;
    const m = moment(dateTo).subtract(5, "day");
    this.dateFromControl.setValue(m.toDate());
  }

}
