import { Component } from '@angular/core';
import { of, tap, map, interval, finalize, catchError, delay, take, debounceTime, auditTime, timeout } from 'rxjs';

@Component({
  selector: 'app-utility-operators',
  templateUrl: './utility-operators.component.html',
  styleUrls: ['./utility-operators.component.scss']
})
export class UtilityOperatorsComponent {
  outputLogs: string[] = [];
  currentCode = '';

  addLog(msg: string) {
    this.outputLogs.push(msg);
  }

  clear() {
    this.outputLogs = [];
  }

  demoTap() {
    this.clear();
    this.currentCode = `// tap(): 用於除錯、副作用，不改變資料流

    of(1, 2, 3)
      .pipe(
        tap(val => this.addLog(\`[tap] before map: \${val}\`)),
        map(val => val * 10),
        tap(val => this.addLog(\`[tap] after map: \${val}\`))
      .subscribe(val => this.addLog(\`[tap] subscribe: \${val}\`));`;

    of(1, 2, 3)
      .pipe(
        tap(val => this.addLog(`[tap] before map: ${val}`)),
        map(val => val * 10),
        tap(val => this.addLog(`[tap] after map: ${val}`))
      )
      .subscribe(val => this.addLog(`[tap] subscribe: ${val}`));
  }

  demoFinalize() {
    this.clear();
    this.currentCode = `// finalize(): observable 結束，不管是成功或錯誤都會呼叫

    interval(500)
      .pipe(
        take(2),
        tap(val => this.addLog(\`[finalize] value: \${val}\`)),
        finalize(() => this.addLog(\`[finalize] 完成或錯誤後觸發\`))
      )
      .subscribe();`;

    interval(500)
      .pipe(
        take(2),
        tap(val => this.addLog(`[finalize] value: ${val}`)),
        finalize(() => this.addLog(`[finalize] 完成或錯誤後觸發`))
      )
      .subscribe();
  }

  demoDelay() {
    this.clear();
    this.currentCode = `// delay(): 延遲發送資料

    of('延遲訊息')
      .pipe(
        delay(1500)
      )
      .subscribe(val => this.addLog(\`[delay] \${val}\`));`;

    of('延遲訊息')
      .pipe(delay(1500))
      .subscribe(val => this.addLog(`[delay] ${val}`));
  }

  demoDebounceTime() {
    this.clear();
    this.currentCode = `// debounceTime(): 一段時間內只接受最後一筆值

    const source$ = interval(300).pipe(take(10));
    source$
      .pipe(
        map(i => \`輸入 \${i}\`),
        debounceTime(700)
      )
      .subscribe(val => this.addLog(\`[debounceTime] \${val}\`));`;

    const source$ = interval(300).pipe(take(10));

    source$
      .pipe(
        map(i => `輸入 ${i}`),
        debounceTime(700)
      )
      .subscribe(val => this.addLog(`[debounceTime] ${val}`));
  }

  demoAuditTime() {
    this.clear();
    this.currentCode = `// auditTime(): 每隔固定時間取最後一筆資料

    const source$ = interval(300).pipe(take(10));
    source$
      .pipe(
        auditTime(1000)
      )
      .subscribe(val => this.addLog(\`[auditTime] \${val}\`));`;

    interval(300)
      .pipe(take(10), auditTime(1000))
      .subscribe(val => this.addLog(`[auditTime] ${val}`));
  }

  demoTimeout() {
    this.clear();
    this.currentCode = `// timeout(): 若時間內未發出值則丟錯\n

    const slow$ = of('慢的訊息').pipe(delay(2000));
    slow$
      .pipe(
        timeout(1000),
        catchError(err => {
          this.addLog(\`[timeout] 發生錯誤：\${err.name}\`);
          return of('改回預設值');
        })
      )
      .subscribe(val => this.addLog(\`[timeout] 收到：\${val}\`));`;

    const slow$ = of('慢的訊息').pipe(delay(2000));
    slow$
      .pipe(
        timeout(1000),
        catchError(err => {
          this.addLog(`[timeout] 發生錯誤：${err.name}`);
          return of('改回預設值');
        })
      )
      .subscribe(val => this.addLog(`[timeout] 收到：${val}`));
  }
}
