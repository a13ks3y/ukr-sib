import {DataSource} from '@angular/cdk/collections';
import {MatSort} from '@angular/material';
import {catchError, map} from 'rxjs/operators';
import {merge, Observable, of as observableOf} from 'rxjs';
import {ExchangeItem} from './exchange-item';

/**
 * Data source for the Exchange view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ExchangeDataSource extends DataSource<ExchangeItem> {
    data: ExchangeItem[] = [];

  constructor(private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ExchangeItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getSortedData([...this.data]);
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    //TODO: clear connection

  }


  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ExchangeItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
          case 'exchangedate': return compareDate(a.exchangedate, b.exchangedate, isAsc);
          case 'usd': return compare(+a.usd, +b.usd, isAsc);
          case 'eur': return compare(+a.eur, +b.eur, isAsc);
          case 'gpb': return compare(+a.gbp, +b.gbp, isAsc);
        default: return 0;
      }
    });
  }
}
function compareDate(a, b, isAsc) {
  //TODO: compare date sort
  return 1;
}
/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
