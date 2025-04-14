import { Component } from '@angular/core';
import { throwError, catchError, of, delay, map, retry, retryWhen, scan } from 'rxjs';

@Component({
  selector: 'app-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.scss']
})
export class ErrorHandlingComponent {
  outputLogs: string[] = [];
  currentCode = '';

  addLog(msg: string) {
    this.outputLogs.push(msg);
  }

  clear() {
    this.outputLogs = [];
  }

  demoCatchError() {
    this.clear();
    this.currentCode = `// catchError(): 錯誤時返回備援 observable\nthrowError(() => new Error('失敗')).pipe(\n  catchError(err => of('備援資料'))\n).subscribe(val => console.log(val));`;

    throwError(() => new Error('出錯啦！'))
      .pipe(
        catchError(err => {
          this.addLog(`[catchError] 捕捉錯誤：${err.message}`);
          return of('使用備援資料');
        })
      )
      .subscribe(val => this.addLog(`[catchError] 收到：${val}`));
  }

  demoRetry() {
    this.clear();
    this.currentCode = `// retry(n): 發生錯誤時重試 n 次
of(1).pipe(
  map(() => { throw '錯誤'; }),
  retry(2)
).subscribe(...);`;

    let counter = 0;

    const source$ = of(1).pipe(
      // 模擬錯誤：前兩次丟錯
      map(val => {
        counter++;
        if (counter < 3) throw new Error(`第 ${counter} 次錯誤`);
        return val;
      }),
      retry(2)
    );

    source$.subscribe({
      next: val => this.addLog(`[retry] 成功值：${val}`),
      error: err => this.addLog(`[retry] 最終錯誤：${err.message}`)
    });
  }

  demoRetryWhen() {
    this.clear();
    this.currentCode = `// retryWhen(): 根據條件與時間策略重試\nof('發送').pipe(
  map(() => { throw '錯誤'; }),
  retryWhen(errors => errors.pipe(...))
)`;

    let counter = 0;

    const source$ = of('發送').pipe(
      map(() => {
        counter++;
        if (counter < 3) throw new Error(`第 ${counter} 次錯誤`);
        return '成功！';
      }),
      retryWhen(errors =>
        errors.pipe(
          scan((acc, err) => {
            if (acc >= 2) throw err;
            this.addLog(`[retryWhen] 第 ${acc + 1} 次重試`);
            return acc + 1;
          }, 0),
          delay(1000)
        )
      )
    );

    source$.subscribe({
      next: val => this.addLog(`[retryWhen] 成功值：${val}`),
      error: err => this.addLog(`[retryWhen] 最終錯誤：${err.message}`)
    });
  }

  demoThrowError() {
    this.clear();
    this.currentCode = `// throwError(): 手動建立錯誤 observable\nthrowError(() => new Error('自訂錯誤')).subscribe({
  error: err => console.log(err.message)
});`;

    throwError(() => new Error('這是一個 throwError 示範'))
      .subscribe({
        next: () => {},
        error: err => this.addLog(`[throwError] 捕捉錯誤：${err.message}`)
      });
  }
}
