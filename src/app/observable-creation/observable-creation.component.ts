import { Component } from '@angular/core';
import { EMPTY, from, interval, NEVER, of, Subscription, throwError, timer } from 'rxjs';

@Component({
  selector: 'app-observable-creation',
  templateUrl: './observable-creation.component.html',
  styleUrls: ['./observable-creation.component.scss']
})
export class ObservableCreationComponent {
  outputLogs: string[] = [];
  intervalSub?: Subscription;

  // 當前所執行的程式碼與說明，會顯示在畫面左側
  currentCode = '';

  addLog(log: string) {
    this.outputLogs.push(log);
  }

  clear() {
    this.outputLogs = [];
    this.intervalSub?.unsubscribe(); // 停止 interval
  }

  demoOf() {
    this.clear();
    this.currentCode = `// of(): 建立靜態 observable，立即同步發送所有值並完成
of(1, 2, 3).subscribe({
  next: val => console.log(val), // 會依序輸出 1, 2, 3
  complete: () => console.log('completed')
});`;

    of(1, 2, 3).subscribe({
      next: val => this.addLog(`[of] value: ${val}`),
      complete: () => this.addLog('[of] completed'),
    });
  }

  demoFrom() {
    this.clear();
    this.currentCode = `// from(): 可將 Promise、陣列等轉成 Observable
const fakeApi = Promise.resolve({ id: 1, name: 'RxJS' });
from(fakeApi).subscribe({
  next: val => console.log(val),
  complete: () => console.log('completed')
});`;

    const fakeApi = Promise.resolve({ id: 1, name: 'RxJS' });
    from(fakeApi).subscribe({
      next: val => this.addLog(`[from] resolved: ${JSON.stringify(val)}`),
      complete: () => this.addLog('[from] completed'),
    });
  }

  demoInterval() {
    this.clear();
    this.currentCode = `// interval(): 每隔指定時間發出遞增數字
interval(1000).subscribe(val => console.log(val));`;

    this.intervalSub = interval(1000).subscribe(val => {
      this.addLog(`[interval] tick: ${val}`);
      if (val >= 2) this.intervalSub?.unsubscribe();
    });
  }

  demoTimer() {
    this.clear();
    this.currentCode = `// timer(): 延遲一段時間後發出 0
// 可模擬 setTimeout 行為
timer(2000).subscribe(() => console.log('after 2s'));`;

    timer(2000).subscribe(() => this.addLog('[timer] after 2 seconds'));
  }

  demoThrowError() {
    this.clear();
    this.currentCode = `// throwError(): 建立一個立即丟錯的 observable
throwError(() => new Error('錯誤')).subscribe({
  error: err => console.error(err.message)
});`;

    throwError(() => new Error('發生錯誤')).subscribe({
      next: () => {},
      error: err => this.addLog(`[throwError] error: ${err.message}`),
    });
  }

  demoEmptyNever() {
    this.clear();
    this.currentCode = `// EMPTY: 立即完成不發出值
EMPTY.subscribe({ complete: () => console.log('EMPTY 完成') });

// NEVER: 永不發出值也不會完成
NEVER.subscribe({ next: () => console.log('NEVER'), complete: () => console.log('NEVER 完成') });`;

    EMPTY.subscribe({
      next: () => this.addLog('[EMPTY] value'),
      complete: () => this.addLog('[EMPTY] completed'),
    });

    NEVER.subscribe({
      next: () => this.addLog('[NEVER] value'),
      complete: () => this.addLog('[NEVER] completed'),
    });
  }
}
