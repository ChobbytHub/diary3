// src/redux/api/diaryApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Diary, DiaryRequest, DiaryResponse } from "../types/diary";

// RTK Query を使って日記APIをサービスとしてまとめる
export const diaryApi = createApi({
  reducerPath: "diaryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("jwt");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Diary"],
  endpoints: (build) => ({
    // 全日記取得
    getDiaries: build.query<Diary[], void>({
      query: () => "/api/diaries",
      providesTags: (result) =>
        result
          ? [
              ...result.map((diary) => ({
                type: "Diary" as const,
                id: diary.id,
              })),
              { type: "Diary", id: "LIST" },
            ]
          : [{ type: "Diary", id: "LIST" }],
    }),

    // 日記作成
    addDiary: build.mutation<DiaryResponse, DiaryRequest>({
      query: (newEntry) => ({
        url: "/api/diaries",
        method: "POST",
        body: newEntry,
      }),
      invalidatesTags: (result) =>
        result
          ? [
              { type: "Diary", id: "LIST" },
              { type: "Diary", id: result.id },
            ]
          : [{ type: "Diary", id: "LIST" }],
    }),

    // 日記更新
    updateDiary: build.mutation<DiaryResponse, { id: number; text: string }>({
      query: ({ id, text }) => ({
        url: `/api/diaries/${id}`,
        method: "PATCH",
        body: { text },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Diary", id },
        { type: "Diary", id: "LIST" },
      ],
    }),

    // 日記削除
    deleteDiary: build.mutation<void, number>({
      query: (id) => ({
        url: `/api/diaries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Diary", id },
        { type: "Diary", id: "LIST" },
      ],
    }),
  }),
});

// 自動生成された React Hook をエクスポート
export const {
  useGetDiariesQuery,
  useAddDiaryMutation,
  useUpdateDiaryMutation,
  useDeleteDiaryMutation,
} = diaryApi;
