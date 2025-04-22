// src/types/diary.d.ts

/**
 * 📦 DiaryBase：共通のプロパティ（日記日付・行番号・本文）
 */
export interface DiaryBase {
  diaryDate: string; // 日記の日付（例: "2025-04-20"）
  lineNumber: 1 | 2 | 3; // 行番号（1, 2, 3）
  text: string; // 本文内容
}

/**
 * 📘 Diary：日記1件の型定義
 * サーバーから取得される日記データ。1行ごとに1レコード。
 */
export interface Diary extends DiaryBase {
  id: number; // 日記ID（DBの主キー）
}

/**
 * 📤 DiaryRequest：新しい日記を作成する際のリクエスト型
 */
export type DiaryRequest = DiaryBase;

/**
 * 📥 DiaryResponse：日記の登録・更新後に返ってくるレスポンス型
 */
export interface DiaryResponse extends DiaryBase {
  id: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * 🧠 DiaryState：日記ステート全体の型
 */
export interface DiaryState {
  diaries: Diary[];
  selectedDate: string;
}

/**
 * 📅 YearGroupProps：YearGroupコンポーネントのprops型
 * - 指定された日付と、その日に対応する3行日記（1行目～3行目）のデータを保持
 * - 各行の日記は部分的に存在する可能性があるため、Partial<Diary>[] を使用
 */
export interface YearGroupProps {
  date: string; // 日付（例: "2025-04-20"）
  diary: Partial<Diary>[]; // 各行の日記データ。未作成の場合は空オブジェクト
}

/**
 * 📝 DiaryProps：Diaryコンポーネントのprops型
 * - 1行分の日記データを受け取る
 * - データが未取得・未作成の可能性があるため optional にしている
 */
export interface DiaryProps {
  diary?: Diary; // 日記データ（undefined の場合もあり得る）
}

export interface EntryRowProps extends DiaryBase {
  id?: number; // 日記ID（DBの主キー）
}
