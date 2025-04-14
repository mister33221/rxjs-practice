# 📘 RxJS 練習專案 (Angular)

[![Angular](https://img.shields.io/badge/Angular-15+-dd0031?logo=angular&logoColor=white)](https://angular.io/)
[![RxJS](https://img.shields.io/badge/RxJS-7+-B7178C?logo=reactivex&logoColor=white)](https://rxjs.dev/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)


本專案整理並實作了 RxJS 在 Angular 中的常用操作符，並依功能分類為 7 個練習分頁，每頁皆提供互動按鈕與輸出結果區塊，幫助你動手操作並理解觀察行為差異。

---

## 🔹 1. 建立 Observable 的方法
| 操作符 | 說明 |
|--------|------|
| `of()` | 建立一個 observable，輸出靜態值。 |
| `from()` | 從 promise、陣列等建立 observable。 |
| `interval()` | 每隔一段時間發出一個值。 |
| `timer()` | 延遲發送第一個值，之後可設定週期。 |
| `throwError()` | 建立一個拋出錯誤的 observable。 |
| `EMPTY` / `NEVER` | 不發送值 / 永遠不結束的 observable。 |

---

## 🔹 2. 轉換類 (Transformation Operators)
| 操作符 | 說明 |
|--------|------|
| `map()` | 對每個值做轉換。 |
| `switchMap()` | 取消前一個內層 observable，只訂閱最新的。 |
| `mergeMap()` / `flatMap()` | 平行訂閱多個 observable。 |
| `concatMap()` | 排隊等待前一個完成再訂閱下一個。 |
| `exhaustMap()` | 忽略新來的 observable，直到現有完成。 |

---

## 🔹 3. 過濾類 (Filtering Operators)
| 操作符 | 說明 |
|--------|------|
| `filter()` | 過濾不需要的值。 |
| `take(n)` | 只取前 n 個值。 |
| `takeUntil()` | 直到另一個 observable 發出值為止。 |
| `first()` / `last()` | 只取第一個 / 最後一個符合條件的值。 |
| `distinctUntilChanged()` | 避免連續重複的值發出。 |

---

## 🔹 4. 合併類 (Combination Operators)
| 操作符 | 說明 |
|--------|------|
| `combineLatest()` | 任一 observable 發出值時，組合所有最新值。 |
| `withLatestFrom()` | 取最新的其他 observable 值組合輸出。 |
| `forkJoin()` | 等所有 observable 結束後，發出最終結果。 |
| `zip()` | 多個 observable 同步依序組合輸出。 |
| `merge()` | 同時發出多個 observable 的所有值。 |
| `concat()` | 順序串接執行多個 observable。 |

---

## 🔹 5. 錯誤處理 (Error Handling)
| 操作符 | 說明 |
|--------|------|
| `catchError()` | 錯誤時回傳備援 observable。 |
| `retry(n)` | 發生錯誤時重試 n 次。 |
| `retryWhen()` | 自訂重試策略。 |
| `throwError()` | 主動建立錯誤 observable。 |

---

## 🔹 6. 工具類 (Utility Operators)
| 操作符 | 說明 |
|--------|------|
| `tap()` | 執行副作用（不改變值）。 |
| `finalize()` | observable 結束（含錯誤）時觸發。 |
| `delay()` | 延遲發送值。 |
| `debounceTime()` | 一段時間內只發出最後一個值。 |
| `auditTime()` / `throttleTime()` | 固定節流時間取樣值。 |
| `timeout()` | 若時間內未發出值則拋出錯誤。 |

---

## 🔹 7. Subject 類型與用途
| 類型 | 說明 |
|------|------|
| `Subject` | 多播，可發送資料給多個訂閱者。 |
| `BehaviorSubject` | 有初始值，訂閱時立即收到最後一筆。 |
| `ReplaySubject` | 記住過去 n 筆值，讓新訂閱者可收到。 |
| `AsyncSubject` | 結束時才發送最後一筆值給所有訂閱者。 |

---

## 🔹 8. 常見搭配 Angular 使用場景
| 場景 | 建議用法 |
|------|----------|
| HTTP 請求 | `switchMap` + `catchError` |
| 表單輸入防抖 | `debounceTime` + `distinctUntilChanged` |
| 等待多個 API 結束 | `forkJoin()` |
| 路由參數變化處理 | `combineLatest()` 或 `switchMap()` |
| 管理狀態變化 | `BehaviorSubject` |
| 組件取消訂閱 | `takeUntil(this.destroy$)` |

---

## ✅ 建議特別熟練的操作符
- `switchMap`, `tap`, `catchError`, `combineLatest`, `takeUntil`, `BehaviorSubject`

---

## 📎 補充學習建議
- 了解 Observable 與 Promise 的差異。
- 學習 RxJS 與 async/await 的整合方式（搭配 `firstValueFrom()`）。
- 善用 `takeUntil` 避免記憶體洩漏。
- 可搭配 DevTool（如 Augury）觀察 Angular 中資料流。

---

## ▶️ 使用方式

```bash
npm install
ng serve -o
```
開啟瀏覽器並造訪 http://localhost:4200
透過上方導覽點選各頁進行練習。
