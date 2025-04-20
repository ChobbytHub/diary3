package com.chobby.backend.repository;

import com.chobby.backend.entity.Diary;
import com.chobby.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DiaryRepository extends JpaRepository<Diary, Long> {

    // ユーザーの全日記を取得（行単位で複数返る）
    List<Diary> findByUser(User user);

    // 特定の日付の全行の日記を取得
    List<Diary> findByUserAndDiaryDate(User user, LocalDate diaryDate);

    // ユーザーの日記（特定日・特定行）を1つ取得
    Optional<Diary> findByUserAndDiaryDateAndLineNumber(User user, LocalDate diaryDate, Integer lineNumber);

    // 日記の存在確認（行単位での存在確認）
    boolean existsByUserAndDiaryDateAndLineNumber(User user, LocalDate diaryDate, Integer lineNumber);

    // 日付範囲内のすべての行を取得
    List<Diary> findByUserAndDiaryDateBetween(User user, LocalDate startDate, LocalDate endDate);
}
