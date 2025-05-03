import { Component } from '@angular/core';
import { interval, take, combineLatest, withLatestFrom, of, delay, forkJoin, zip, merge, concat } from 'rxjs';

@Component({
  selector: 'app-combination-operators',
  templateUrl: './combination-operators.component.html',
  styleUrls: ['./combination-operators.component.scss']
})
export class CombinationOperatorsComponent {
  outputLogs: string[] = [];
  currentCode = '';

  addLog(msg: string) {
    this.outputLogs.push(msg);
  }

  clear() {
    this.outputLogs = [];
  }

  demoCombineLatest() {
    this.clear();
    this.currentCode = `// combineLatest(): 在所有 observable 都至少發出一個值之後，任一 observable 發出值時組合所有最新值\nconst source1$ = interval(1000).pipe(take(3));\nconst source2$ = interval(1500).pipe(take(2));\ncombineLatest([source1$, source2$]).subscribe(([a, b]) => {\n this.addLog(\`[combineLatest] a: \${a}, b: \${b}\`);\n});\n`;

    const source1$ = interval(1000).pipe(take(3));
    const source2$ = interval(1500).pipe(take(2));
    combineLatest([source1$, source2$]).subscribe(([a, b]) => {
      this.addLog(`[combineLatest] a: ${a}, b: ${b}`);
    });
  }

  demoWithLatestFrom() {
    this.clear();
    this.currentCode = `// withLatestFrom(): 主 observable 搭配其他 observable 的最新值\nfast$.pipe(withLatestFrom(slow$)) => [fast, latestSlow]\n
const fast$ = interval(1000).pipe(take(3));
const slow$ = interval(2000).pipe(take(2));
fast$.pipe(withLatestFrom(slow$)).subscribe(([fast, slow]) => {\n this.addLog(\`[withLatestFrom] fast: \${fast}, slow: \${slow}\`);\n});\n`

    const fast$ = interval(1000).pipe(take(3));
    const slow$ = interval(2000).pipe(take(2));
    fast$.pipe(withLatestFrom(slow$)).subscribe(([fast, slow]) => {
      this.addLog(`[withLatestFrom] fast: ${fast}, slow: ${slow}`);
    });
  }

  demoForkJoin() {
    this.clear();
    this.currentCode = `// forkJoin(): 所有 observable 完成後，一次回傳最新值陣列
forkJoin([a$, b$]).subscribe(([a, b]) => ...);

const a$ = of('A').pipe(delay(1000));
const b$ = of('B').pipe(delay(1500));
forkJoin([a$, b$]).subscribe(([a, b]) => {
  this.addLog(\`[forkJoin] Done A: \${a}, B: \${b}\`);
});`;

    const api1$ = of('A').pipe(delay(1000));
    const api2$ = of('B').pipe(delay(1500));
    forkJoin([api1$, api2$]).subscribe(([a, b]) => {
      this.addLog(`[forkJoin] Done A: ${a}, B: ${b}`);
    });
  }

  demoZip() {
    this.clear();
    this.currentCode = `// zip(): 將 observable 依"順序"組合發出
zip([a$, b$]) => [a1, b1], [a2, b2]...

zip([of('a', 'b', 'c'), of(1, 2, 3)]).subscribe(([a, b]) => {
  this.addLog(\`[zip] \${a} - \${b}\`);
});`;

    const source1$ = of('a', 'b', 'c');
    const source2$ = of(1, 2, 3);
    zip([source1$, source2$]).subscribe(([a, b]) => {
      this.addLog(`[zip] ${a} - ${b}`);
    });
  }

  demoMerge() {
    this.clear();
    this.currentCode = `// merge(): 多個 observable 並行發出值，順序不固定
merge(a$, b$).subscribe(val => ...)，有就發出。

const a$ = interval(500).pipe(take(3));
const b$ = interval(700).pipe(take(2));
merge(a$, b$).subscribe(val => {
  this.addLog(\`[merge] value: \${val}\`);
});`;

    const obs1$ = interval(500).pipe(take(3));
    const obs2$ = interval(700).pipe(take(2));
    merge(obs1$, obs2$).subscribe(val => {
      this.addLog(`[merge] value: ${val}`);
    });
  }

  demoConcat() {
    this.clear();
    this.currentCode = `// concat(): 等第一個 observable 完成後再執行下一個
concat(a$, b$).subscribe(val => ...);

const a$ = of('first').pipe(delay(1000));
const b$ = of('second');
concat(a$, b$).subscribe(val => {
  this.addLog(\`[concat] value: \${val}\`);
});`;

    const obs1$ = of('first').pipe(delay(1000));
    const obs2$ = of('second');
    concat(obs1$, obs2$).subscribe(val => {
      this.addLog(`[concat] value: ${val}`);
    });
  }
}
