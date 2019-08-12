import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material';
import {ajax, AjaxResponse} from 'rxjs/ajax';
import {ExchangeItem} from './exchange-item';
import {ExchangeService} from '../exchange.service';
import * as moment from 'moment';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort: MatSort;
  data: ExchangeItem[] = [];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['exchangedate', 'usd', "eur", "gbp"];
  constructor(private exchangeService: ExchangeService) {
    exchangeService.getDate().subscribe((date) => {
      this.getData(date);
    });
  }

  ngAfterViewInit() {
    const to = new Date();
    this.getData(to);
  }

  ngOnInit() {

  }

  static getDateString(date: Date, day): string {
    const m = moment(date).subtract(day, "day");
    return m.format("YYYY") + m.format("MM") + m.format("DD");
  }

  getData(to: Date) {
    this.data = [];
    const dates = [];
    for (let i = 0; i < 5; i++) {
      dates.push(ExchangeComponent.getDateString(to, i));
    }
    let requests = dates.map(dateStr => ExchangeComponent.getExchangeForDate(dateStr));
    let rows: ExchangeItem[] = [];
    requests.forEach(p => {
      p.toPromise().then((response:AjaxResponse) => {
        const data = response.response;
        const filteredData = data.filter(item => item.cc === "USD" || item.cc === "EUR" || item.cc === "GBP");
        let row: ExchangeItem = {eur: 0, exchangedate: "", gbp: 0, usd: 0};
        filteredData.forEach((item) => {
          row.exchangedate = item.exchangedate;
          switch (item.cc) {
            case 'USD':
              row.usd = item.rate;
              break;
            case 'EUR':
              row.eur = item.rate;
              break;
            case 'GBP':
              row.gbp = item.rate;
              break;
          }
        });
        rows.push(row);
        if (rows.length >= 5) {
          this.data = rows;
        }
      }).catch((err) => {
        alert("Error!");
      })
    });
  }

  static getExchangeForDate(dateStr: string) {
    return ajax(`api/NBUStatService/v1/statdirectory/exchange?date=${dateStr}&json`);
  }

}

