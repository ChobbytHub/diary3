package com.chobby.backend.repository;

import com.chobby.backend.entity.Diary;
import com.chobby.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DiaryRepository extends JpaRepository<Diary, Long> {

    // ユーザーの日記一覧を取得
    List<Diary> findByUser(User user);

    // 特定の日付に対する日記を取得
    Optional<Diary> findByUserAndDiaryDate(User user, LocalDate diaryDate);

    // ユーザーの指定した日付範囲内の日記を取得
    List<Diary> findByUserAndDiaryDateBetween(User user, LocalDate startDate, LocalDate endDate);

    // 同じ日付に対してユーザーの日記が存在するかをチェック
    boolean existsByUserAndDiaryDate(User user, LocalDate diaryDate);
}
