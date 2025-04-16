package com.chobby.backend.service;

import com.chobby.backend.entity.Diary;
import com.chobby.backend.entity.User;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DiaryService {

    // 日記を作成
    Diary createDiary(User user, String line1, String line2, String line3, LocalDate diaryDate);

    // ユーザーの日記一覧を取得
    List<Diary> getAllDiaries(User user);

    // 特定の日付のユーザーの日記を取得
    Optional<Diary> getDiaryByDate(User user, LocalDate diaryDate);

    // 過去2年分の同じ日付の日記を取得
    List<Diary> getDiariesForLastTwoYears(User user, LocalDate diaryDate);

    // 特定の日記を編集
    Diary updateDiary(Long diaryId, String line1, String line2, String line3);

    // 日記を削除
    void deleteDiary(Long diaryId);
}
