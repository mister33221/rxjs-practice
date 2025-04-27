import { Component } from '@angular/core';
import { of, map, interval, take, switchMap, delay, mergeMap, concatMap, exhaustMap, tap } from 'rxjs';

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
    this.currentCode = `// switchMap(): 取消前一個 observable，只訂閱最新\nlet request = of('請求 1', '請求 2', '請求 3');\nconst switchMapObservable = request.pipe(\n  switchMap(request => of(\`結果: \${request}\`).pipe(delay(1000))) // 模擬延遲的 HTTP 請求\n);\nswitchMapObservable.subscribe(val => console.log(val));`;
    // 模擬 HTTP 請求
    let request = of('請求 1', '請求 2', '請求 3');
    const switchMapObservable = request.pipe(
      switchMap(request => of(`結果: ${request}`).pipe(delay(1000))) // 模擬延遲的 HTTP 請求
    );
    switchMapObservable.subscribe(val => this.addLog(`[switchMap] ${val}`));
  }

  demoMergeMap() {
    this.clear();
    this.currentCode = `// mergeMap(): 平行執行並合併多個 observable 的結果\nof('A', 'B', 'C').pipe(\n  mergeMap(letter =>\n    of(1, 2, 3).pipe(\n      map(number => \`\${letter}\${number}\`),\n      delay(Math.random() * 1000) // 隨機延遲，證明平行執行而無序\n    )\n  )\n).subscribe(val => console.log(val));`;

    of('A', 'B', 'C')
    .pipe(
      mergeMap(letter =>
        of(1, 2, 3).pipe(
          map(number => `${letter}${number}`),
          delay(Math.random() * 1000) // 隨機延遲，證明平行執行而無序
        )
      )
    )
    .subscribe(val => this.addLog(`[mergeMap] ${val}`));
  }

  demoConcatMap() {
    this.clear();
    this.currentCode = `// concatMap(): 等待前一個完成才執行下一個\nof(1, 2, 3).pipe(\n  concatMap(letter =>\n    of(1, 2, 3).pipe(\n      map(number => \`\${letter}\${number}\`),\n      delay(Math.random() * 1000) // 隨機延遲，證明有序執行，等待前一個完成\n    )\n  )\n).subscribe(val => console.log(val));`;

    of('A', 'B', 'C')
    .pipe(
      concatMap(letter =>
        of(1, 2, 3).pipe(
          map(number => `${letter}${number}`),
          delay(Math.random() * 1000) // 隨機延遲，證明有序執行，等待前一個完成
        )
      )
    )
    .subscribe(val => this.addLog(`[concatMap] ${val}`));
  }

  demoExhaustMap() {
    this.clear();
    this.currentCode = `// exhaustMap(): 忽略新的內層 observable，直到現有完成\ninterval(500).pipe(\n  take(5),\n  tap(val => console.log(\`外層: \${val}\`)), // 記錄外層值\n  exhaustMap(val =>\n    of(\`inner: \${val}\`).pipe(\n      delay(1000),\n      tap(innerVal => console.log(\`內層: \${innerVal}\`)) // 記錄內層值\n    )\n  )\n).subscribe(val => console.log(\`最終: \${val}\`));`;

    // 模擬一個外層 observable，每 500 毫秒發出一個值
    // 使用 take(5) 限制只發出 5 個值，也就是總共會有 5 次的外層 observable，總費時 2.5 秒
    // 內層 observable 每次發出一個值，並延遲 1 秒
    // 使用 exhaustMap 來忽略新的內層 observable，直到現有的內層 observable 完成
    // 這樣的話，當外層 observable 發出新的值時，如果內層 observable 還在執行，就會被忽略
    interval(500)
    .pipe(
      take(5),
      tap(val => this.addLog(`[exhaustMap] 外層: ${val}`)), // 記錄外層值
      exhaustMap(val =>
        of(`inner: ${val}`).pipe(
          delay(1000),
          tap(innerVal => this.addLog(`[exhaustMap] 內層: ${innerVal}`)) // 記錄內層值
        )
      )
    )
    .subscribe(val => this.addLog(`[exhaustMap] 最終: ${val}`)); // 記錄最終值
  }
}
