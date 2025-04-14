import { Component } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
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
    this.currentCode = `// Subject: 基本的多播 observable，不保留值\nconst subject = new Subject<number>();\nsubject.subscribe(val => console.log('A:', val));\nsubject.next(1);\nsubject.subscribe(val => console.log('B:', val));\nsubject.next(2);`;

    const subject = new Subject<number>();
    subject.subscribe(val => this.addLog(`[Subject] A 收到：${val}`));
    subject.next(1);
    subject.subscribe(val => this.addLog(`[Subject] B 收到：${val}`));
    subject.next(2);
  }

  demoBehaviorSubject() {
    this.clear();
    this.currentCode = `// BehaviorSubject: 有初始值，訂閱立即拿到最後值\nconst subject = new BehaviorSubject(0);\nsubject.subscribe(val => console.log('A:', val));\nsubject.next(1);\nsubject.subscribe(val => console.log('B:', val));`;

    const subject = new BehaviorSubject<number>(0);
    subject.subscribe(val => this.addLog(`[BehaviorSubject] A 收到：${val}`));
    subject.next(1);
    subject.subscribe(val => this.addLog(`[BehaviorSubject] B 收到：${val}`));
    subject.next(2);
  }

  demoReplaySubject() {
    this.clear();
    this.currentCode = `// ReplaySubject: 可設定保留過去值數量，新訂閱也能拿到\nconst subject = new ReplaySubject(2);\nsubject.next(1); subject.next(2); subject.next(3);\nsubject.subscribe(...);`;

    const subject = new ReplaySubject<number>(2);
    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.subscribe(val => this.addLog(`[ReplaySubject] A 收到：${val}`));
    subject.next(4);
    subject.subscribe(val => this.addLog(`[ReplaySubject] B 收到：${val}`));
  }

  demoAsyncSubject() {
    this.clear();
    this.currentCode = `// AsyncSubject: 只有完成時才發送最後一個值\nconst subject = new AsyncSubject();\nsubject.next(1); subject.next(2);\nsubject.subscribe(...);\nsubject.complete();`;

    const subject = new AsyncSubject<number>();
    subject.subscribe(val => this.addLog(`[AsyncSubject] A 收到：${val}`));
    subject.next(1);
    subject.next(2);
    subject.subscribe(val => this.addLog(`[AsyncSubject] B 收到：${val}`));
    subject.next(3);
    subject.complete();
  }
}
