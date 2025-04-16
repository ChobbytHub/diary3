package com.chobby.backend.service.impl;

import com.chobby.backend.entity.Diary;
import com.chobby.backend.entity.User;
import com.chobby.backend.repository.DiaryRepository;
import com.chobby.backend.service.DiaryService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class DiaryServiceImpl implements DiaryService {

    private final DiaryRepository diaryRepository;

    public DiaryServiceImpl(DiaryRepository diaryRepository) {
        this.diaryRepository = diaryRepository;
    }

    // 日記を作成するメソッド
    @Override
    public Diary createDiary(User user, String line1, String line2, String line3, LocalDate diaryDate) {
        // diaryDateがnullの場合は、デフォルトで今日の日付を使用
        if (diaryDate == null) {
            diaryDate = LocalDate.now();
        }

        // 同じ日付で同一ユーザーの日記が既に存在していないか確認
        if (diaryRepository.existsByUserAndDiaryDate(user, diaryDate)) {
            // 同じ日付の日記が存在する場合は例外をスロー
            throw new IllegalArgumentException("この日付にはすでに日記が登録されています");
        }

        // 新しい日記を作成
        Diary diary = new Diary();
        diary.setUser(user);
        diary.setDiaryDate(diaryDate);
        diary.setLine1(line1);
        diary.setLine2(line2);
        diary.setLine3(line3);

        // 日記を保存して返す
        return diaryRepository.save(diary);
    }

    // ユーザーの日記一覧を取得
    @Override
    public List<Diary> getAllDiaries(User user) {
        return diaryRepository.findByUser(user);
    }

    // 特定の日付のユーザーの日記を取得
    @Override
    public Optional<Diary> getDiaryByDate(User user, LocalDate diaryDate) {
        return diaryRepository.findByUserAndDiaryDate(user, diaryDate);
    }

    // 過去2年分の同じ日付の日記を取得
    @Override
    public List<Diary> getDiariesForLastTwoYears(User user, LocalDate diaryDate) {
        // 過去2年間の日記を取得する
        LocalDate twoYearsAgo = LocalDate.now().minusYears(2);
        return diaryRepository.findByUserAndDiaryDateBetween(user, twoYearsAgo, diaryDate);
    }

    // 特定の日記を編集
    @Override
    public Diary updateDiary(Long diaryId, String line1, String line2, String line3) {
        // 日記IDで日記を取得
        Diary diary = diaryRepository.findById(diaryId).orElseThrow(() -> new IllegalArgumentException("日記が見つかりません"));

        // 日記内容を更新
        diary.setLine1(line1);
        diary.setLine2(line2);
        diary.setLine3(line3);
        diary.setUpdatedAt(LocalDateTime.now());

        // 更新した日記を保存して返す
        return diaryRepository.save(diary);
    }

    // 日記を削除
    @Override
    public void deleteDiary(Long diaryId) {
        // 日記IDで日記を取得
        Diary diary = diaryRepository.findById(diaryId).orElseThrow(() -> new IllegalArgumentException("日記が見つかりません"));

        // 日記を削除
        diaryRepository.delete(diary);
    }
}
