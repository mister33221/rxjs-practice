import { Component } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
})
export class SubjectsComponent {
  outputLogs: string[] = [];
  currentCode = '';

  addLog(msg: string) {
    this.outputLogs.push(msg);
  }

  clear() {
    this.outputLogs = [];
  }

  demoSubject() {
    this.clear();
    this.currentCode = `// Subject: 基本的多播 observable，不保留值

    const subject = new Subject();
    subject.next(0); // 這行不會有任何效果，因為沒有訂閱者
    subject.subscribe(val => this.addLog('A 收到：' + val));
    // 在只有一個訂閱者(A)時，發送的值會被接收
    subject.next(1);
    subject.subscribe(val => this.addLog('B 收到：' + val));
    // 在有兩個訂閱者(A, B)時，兩者都會收到發送的值
    subject.next(2);`;

    const subject = new Subject<number>();
    subject.next(0); // 這行不會有任何效果，因為沒有訂閱者
    subject.subscribe((val) => this.addLog(`[Subject] A 收到：${val}`));
    subject.next(1);
    subject.subscribe((val) => this.addLog(`[Subject] B 收到：${val}`));
    subject.next(2);
  }

  demoBehaviorSubject() {
    this.clear();
    this.currentCode = `// BehaviorSubject: 有初始值，訂閱立即拿到目前最新值
    // 跟 Subject 不同的是，
    // 當你訂閱 Subject 時，並不會收到目前的值，
    // 但 BehaviorSubject 會立即發送目前的值給訂閱者
    // 且 BehaviorSubject 需要有初始值

    const subject = new BehaviorSubject(0);
    subject.subscribe(val => this.addLog('A 收到：' + val));
    // 在只有一個訂閱者(A)時，發送的值會被接收
    subject.next(1);
    subject.subscribe(val => this.addLog('B 收到：' + val));
    // 在有兩個訂閱者(A, B)時，兩者都會收到發送的值
    subject.next(2);`;


    // 放了一個初始值 0，只要有訂閱者就會收到目前的值

    const subject = new BehaviorSubject<number>(0);
    subject.subscribe((val) => this.addLog(`[BehaviorSubject] A 收到：${val}`));
    subject.next(1);
    subject.subscribe((val) => this.addLog(`[BehaviorSubject] B 收到：${val}`));
    subject.next(2);
  }

  demoReplaySubject() {
    this.clear();
    this.currentCode = `// ReplaySubject:

    // ReplaySubject 可以設定保留過去的值數量，
    // 一訂閱就會收到值，值的數量取決於你設定的 buffer size
    // 新的訂閱者也會收到過去的值

    const subject = new ReplaySubject(2);
    subject.next(1);
    subject.next(2);
    subject.next(3);
    // 訂閱收到 2, 3
    subject.subscribe(val => this.addLog('A 收到：' + val));
    // 再收到 4
    subject.next(4);
    // 訂閱收到 3, 4
    subject.subscribe(val => this.addLog('B 收到：' + val));`;

    const subject = new ReplaySubject<number>(2);
    subject.next(1);
    subject.next(2);
    subject.next(3);
    // 訂閱收到 2, 3
    subject.subscribe((val) => this.addLog(`[ReplaySubject] A 收到：${val}`));
    // 再收到 4
    subject.next(4);
    // 訂閱收到 3, 4
    subject.subscribe((val) => this.addLog(`[ReplaySubject] B 收到：${val}`));

  }

  demoAsyncSubject() {
    this.clear();
    this.currentCode = `// AsyncSubject: 只有完成(complete)時才發送最後一個值

    // const subject = new AsyncSubject();
    // subject.subscribe(val => this.addLog('A 收到：' + val));
    // subject.next(1);
    // subject.next(2);
    // subject.subscribe(val => this.addLog('B 收到：' + val));
    // subject.next(3);
    // subject.complete();`

    const subject = new AsyncSubject<number>();
    subject.subscribe((val) => this.addLog(`[AsyncSubject] A 收到：${val}`));
    subject.next(1);
    subject.next(2);
    subject.subscribe((val) => this.addLog(`[AsyncSubject] B 收到：${val}`));
    subject.next(3);
    subject.complete();
  }
}
