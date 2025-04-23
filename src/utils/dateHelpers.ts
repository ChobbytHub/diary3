// utils/dateHelpers.ts
export function getLocalToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()); // 時間部分は 00:00:00
}
