import { Component } from '@angular/core';
import { of, map, interval, take, switchMap, delay, mergeMap, concatMap, exhaustMap } from 'rxjs';

@Component({
  selector: 'app-transformation-operators',
  templateUrl: './transformation-operators.component.html',
  styleUrls: ['./transformation-operators.component.scss']
})
export class TransformationOperatorsComponent {
  outputLogs: string[] = [];
  currentCode = '';

  addLog(log: string) {
    this.outputLogs.push(log);
  }

  clear() {
    this.outputLogs = [];
  }

  demoMap() {
    this.clear();
    this.currentCode = `// map(): 對每個值進行轉換\nof(1, 2, 3).pipe(\n  map(x => x * 10)\n).subscribe(val => console.log(val)); // 輸出 10, 20, 30`;

    of(1, 2, 3)
      .pipe(map(x => x * 10))
      .subscribe(val => this.addLog(`[map] value: ${val}`));
  }

  demoSwitchMap() {
    this.clear();
    this.currentCode = `// switchMap(): 取消前一個 observable，只訂閱最新\ninterval(1000).pipe(\n  take(3),\n  switchMap(val => of(\`內層: \${val}\`).pipe(delay(1500)))\n).subscribe(val => console.log(val));`;

    interval(1000)
      .pipe(
        take(3),
        switchMap(val => of(`內層: ${val}`).pipe(delay(1500)))
      )
      .subscribe(val => this.addLog(`[switchMap] ${val}`));
  }

  demoMergeMap() {
    this.clear();
    this.currentCode = `// mergeMap(): 平行執行所有 observable，不等待\nof(1, 2, 3).pipe(\n  mergeMap(val => of(\`inner: \${val}\`).pipe(delay(1000)))\n).subscribe(val => console.log(val));`;

    of(1, 2, 3)
      .pipe(mergeMap(val => of(`inner: ${val}`).pipe(delay(1000))))
      .subscribe(val => this.addLog(`[mergeMap] ${val}`));
  }

  demoConcatMap() {
    this.clear();
    this.currentCode = `// concatMap(): 等待前一個完成才執行下一個\nof(1, 2, 3).pipe(\n  concatMap(val => of(\`inner: \${val}\`).pipe(delay(1000)))\n).subscribe(val => console.log(val));`;

    of(1, 2, 3)
      .pipe(concatMap(val => of(`inner: ${val}`).pipe(delay(1000))))
      .subscribe(val => this.addLog(`[concatMap] ${val}`));
  }

  demoExhaustMap() {
    this.clear();
    this.currentCode = `// exhaustMap(): 忽略新的內層 observable，直到現有完成\ninterval(500).pipe(\n  take(5),\n  exhaustMap(val => of(\`inner: \${val}\`).pipe(delay(1000)))\n).subscribe(val => console.log(val));`;

    interval(500)
      .pipe(
        take(5),
        exhaustMap(val => of(`inner: ${val}`).pipe(delay(1000)))
      )
      .subscribe(val => this.addLog(`[exhaustMap] ${val}`));
  }
}
