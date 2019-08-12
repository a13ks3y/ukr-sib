import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ExchangeService} from './exchange.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bank Test Assigment';
  private subscription: Subscription;

  onFilter(date: Date) {
    this.exchangeService.updateDate(date);
  }

  constructor(private exchangeService: ExchangeService) {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
