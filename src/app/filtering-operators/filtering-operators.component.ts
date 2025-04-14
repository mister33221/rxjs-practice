import { Component } from '@angular/core';
import { Subject, interval, take, filter, takeUntil, first, last, map, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-filtering-operators',
  templateUrl: './filtering-operators.component.html',
  styleUrls: ['./filtering-operators.component.scss']
})
export class FilteringOperatorsComponent {
  outputLogs: string[] = [];
  stopSignal$ = new Subject<void>();
  currentCode = '';

  addLog(msg: string) {
    this.outputLogs.push(msg);
  }

  clear() {
    this.outputLogs = [];
    this.stopSignal$.next();
  }

  demoFilter() {
    this.clear();
    this.currentCode = `// filter(): 過濾不符合條件的值\ninterval(500).pipe(\n  take(5),\n  filter(val => val % 2 === 0)\n).subscribe(val => console.log(val)); // 輸出 0, 2, 4`;

    interval(500)
      .pipe(take(5), filter(val => val % 2 === 0))
      .subscribe(val => this.addLog(`[filter] even value: ${val}`));
  }

  demoTake() {
    this.clear();
    this.currentCode = `// take(n): 只取前 n 筆資料\ninterval(500).pipe(\n  take(3)\n).subscribe(val => console.log(val)); // 輸出 0, 1, 2`;

    interval(500)
      .pipe(take(3))
      .subscribe(val => this.addLog(`[take] value: ${val}`));
  }

  demoTakeUntil() {
    this.clear();
    this.currentCode = `// takeUntil(): 直到 stopSignal$ 發出值為止\ninterval(500).pipe(\n  takeUntil(stopSignal$)\n).subscribe(val => console.log(val)); // 在 2 秒後 stopSignal$.next()`;

    interval(500)
      .pipe(takeUntil(this.stopSignal$))
      .subscribe(val => this.addLog(`[takeUntil] value: ${val}`));

    setTimeout(() => this.stopSignal$.next(), 2000);
  }

  demoFirst() {
    this.clear();
    this.currentCode = `// first(): 只取第一個符合條件的值\ninterval(500).pipe(\n  first(val => val >= 2)\n).subscribe(val => console.log(val)); // 輸出 2`;

    interval(500)
      .pipe(first(val => val >= 2))
      .subscribe(val => this.addLog(`[first] value >= 2: ${val}`));
  }

  demoLast() {
    this.clear();
    this.currentCode = `// last(): 在 observable 結束前記住最後一個符合條件的值\ninterval(300).pipe(\n  take(5),\n  last(val => val % 2 === 1)\n).subscribe(val => console.log(val)); // 輸出 3`;

    interval(300)
      .pipe(take(5), last(val => val % 2 === 1))
      .subscribe(val => this.addLog(`[last] last odd: ${val}`));
  }

  demoDistinctUntilChanged() {
    this.clear();
    this.currentCode = `// distinctUntilChanged(): 忽略連續重複的值\nof(1, 1, 2, 2, 3, 3).pipe(\n  distinctUntilChanged()\n).subscribe(val => console.log(val)); // 輸出 1, 2, 3`;

    const source$ = interval(500).pipe(take(6));
    const values = [1, 1, 2, 2, 3, 3];

    source$
      .pipe(
        map(i => values[i]),
        distinctUntilChanged()
      )
      .subscribe(val => this.addLog(`[distinctUntilChanged] value: ${val}`));
  }
}
