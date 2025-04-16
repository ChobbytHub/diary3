package com.chobby.backend.service.impl;

import com.chobby.backend.entity.Diary;
import com.chobby.backend.entity.User;
import com.chobby.backend.repository.DiaryRepository;
import com.chobby.backend.service.DiaryService;
import com.chobby.backend.exception.DiaryNotFoundException;
import com.chobby.backend.exception.DuplicateDiaryException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DiaryServiceImpl implements DiaryService {

    private final DiaryRepository diaryRepository;

    public DiaryServiceImpl(DiaryRepository diaryRepository) {
        this.diaryRepository = diaryRepository;
    }

    // 日記を作成するメソッド
    @Override
    @Transactional
    public Diary createDiary(User user, String line1, String line2, String line3, LocalDate diaryDate) {
        if (diaryDate == null) {
            diaryDate = LocalDate.now();
        }

        if (diaryRepository.existsByUserAndDiaryDate(user, diaryDate)) {
            throw new DuplicateDiaryException("この日付にはすでに日記が登録されています");
        }

        Diary diary = new Diary();
        diary.setUser(user);
        diary.setDiaryDate(diaryDate);
        diary.setLine1(line1);
        diary.setLine2(line2);
        diary.setLine3(line3);

        return diaryRepository.save(diary);
    }

    // ユーザーの日記一覧を取得
    @Override
    public List<Diary> getAllDiaries(User user) {
        return diaryRepository.findByUser(user);
    }

    // 特定の日付のユーザーの日記を取得
    @Override
    public Diary getDiaryByDate(User user, LocalDate diaryDate) {
        return diaryRepository.findByUserAndDiaryDate(user, diaryDate)
            .orElseThrow(() -> new DiaryNotFoundException("指定された日付の日記が見つかりません"));
    }

    // 過去2年分の同じ日付の日記を取得
    @Override
    public List<Diary> getDiariesForLastTwoYears(User user, LocalDate diaryDate) {
        LocalDate twoYearsAgo = LocalDate.now().minusYears(2);
        return diaryRepository.findByUserAndDiaryDateBetween(user, twoYearsAgo, diaryDate);
    }

    // 特定の日記を編集
    @Override
    @Transactional
    public Diary updateDiary(Long diaryId, String line1, String line2, String line3) {
        Diary diary = diaryRepository.findById(diaryId)
            .orElseThrow(() -> new DiaryNotFoundException("日記が見つかりません"));

        diary.setLine1(line1);
        diary.setLine2(line2);
        diary.setLine3(line3);
        diary.setUpdatedAt(LocalDateTime.now());

        return diaryRepository.save(diary);
    }

    // 日記を削除
    @Override
    @Transactional
    public void deleteDiary(Long diaryId) {
        Diary diary = diaryRepository.findById(diaryId)
            .orElseThrow(() -> new DiaryNotFoundException("日記が見つかりません"));

        diaryRepository.delete(diary);
    }
}
