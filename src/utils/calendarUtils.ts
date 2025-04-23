// utils/calendarUtils.ts
import {
  isAfter,
  isSameDay as isDateFnsSameDay,
  subYears,
  isSameMonth,
} from "date-fns";
import { getLocalToday } from "./dateHelpers";

// ローカル時間で今日の日付を取得
const today = getLocalToday();
// 今日から1年前の日付を計算
const oneYearAgo = subYears(today, 1);

// 日付が完全に一致しているかどうかを判定
export function isSameDay(date1: Date, date2: Date): boolean {
  return isDateFnsSameDay(date1, date2); // date-fnsのisSameDayを使う
}

// 今日から1年以内の日付かどうかを判定（ちょうど1年前は除外）
export function isWithinOneYear(date: Date): boolean {
  return isAfter(date, oneYearAgo); // ← isSameDay(date, oneYearAgo) を除外！
}

// 今日より後の日付かどうかを判定
export function isFutureDate(date: Date): boolean {
  return isAfter(date, today);
}

// クリック可能な日付かどうかを判定（仕様に従って）
export function isDateSelectable(date: Date, calendarMonth: Date): boolean {
  if (!isWithinOneYear(date)) {
    return false;
  }

  if (isFutureDate(date) && isSameMonth(date, today)) {
    return false;
  }

  if (!isSameMonth(date, calendarMonth)) {
    return false;
  }

  return true;
}
