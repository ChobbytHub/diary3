package com.chobby.backend.repository;

import com.chobby.backend.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    // 特定のユーザーと日付の組み合わせで日記を取得
    List<Diary> findByUserIdAndDiaryDate(Long userId, LocalDate diaryDate);

    // 特定のユーザーのすべての日記を新しい日付順で取得
    List<Diary> findByUserIdOrderByDiaryDateDesc(Long userId);
}
