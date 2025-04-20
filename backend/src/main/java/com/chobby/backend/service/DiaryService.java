package com.chobby.backend.service;

import com.chobby.backend.entity.Diary;
import com.chobby.backend.entity.User;

import java.time.LocalDate;
import java.util.List;

public interface DiaryService {

    // 日記の1行を作成
    Diary createDiary(User user, Integer lineNumber, String text, LocalDate diaryDate);

    // ユーザーの日記一覧を取得（全日記）
    List<Diary> getAllDiaries(User user);

    // 特定の日付のユーザーの日記を取得
    List<Diary> getDiariesByDate(User user, LocalDate diaryDate);

    // 日記の1行を更新
    Diary updateDiary(Long diaryId, User user, String text);

    // 日記の1行を削除
    void deleteDiary(Long diaryId, User user);
}
