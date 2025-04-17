package com.chobby.backend.service.impl;

import com.chobby.backend.entity.Diary;
import com.chobby.backend.entity.User;
import com.chobby.backend.repository.DiaryRepository;
import com.chobby.backend.service.DiaryService;
import com.chobby.backend.exception.DiaryNotFoundException;
import com.chobby.backend.exception.DuplicateDiaryException;
import com.chobby.backend.exception.UnauthorizedAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
            diaryDate = LocalDate.now(); // もし日付が指定されていなければ、今日の日付を使用
        }

        // 3年以上前の日記作成を禁止（3年前の日付も含めて）
        LocalDate threeYearsAgo = LocalDate.now().minusYears(3);
        if (!diaryDate.isAfter(threeYearsAgo)) {  // 3年前の日記は書けない
            throw new IllegalArgumentException("3年以上前の日記は作成できません");
        }

        // 同じ日付に対してユーザーの日記が存在するかをチェック
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
        // 2年前と1年前の日付を基準に、同じ日付の日記を取得
        LocalDate twoYearsAgo = diaryDate.minusYears(2);
        LocalDate oneYearAgo = diaryDate.minusYears(1);

        // それぞれの年から日記を取得
        List<Diary> diaries = new ArrayList<>();

        // 2年前の同じ日付の日記
        diaryRepository.findByUserAndDiaryDate(user, twoYearsAgo)
                       .ifPresent(diaries::add);

        // 1年前の同じ日付の日記
        diaryRepository.findByUserAndDiaryDate(user, oneYearAgo)
                       .ifPresent(diaries::add);

        // 現在の日付の同じ日記
        diaryRepository.findByUserAndDiaryDate(user, diaryDate)
                       .ifPresent(diaries::add);

        return diaries;
    }

    // 特定の日記を編集
    @Override
    @Transactional
    public Diary updateDiary(Long diaryId, User user, String line1, String line2, String line3) {
        Diary diary = diaryRepository.findById(diaryId)
            .orElseThrow(() -> new DiaryNotFoundException("日記が見つかりません"));

        // ユーザー確認
        if (!diary.getUser().equals(user)) {
            throw new UnauthorizedAccessException("この日記を更新する権限がありません");
        }

        diary.setLine1(line1);
        diary.setLine2(line2);
        diary.setLine3(line3);
        diary.setUpdatedAt(LocalDateTime.now());

        return diaryRepository.save(diary);
    }

    // 日記を削除
    @Override
    @Transactional
    public void deleteDiary(Long diaryId, User user) {
        Diary diary = diaryRepository.findById(diaryId)
            .orElseThrow(() -> new DiaryNotFoundException("日記が見つかりません"));

        // ユーザー確認
        if (!diary.getUser().equals(user)) {
            throw new UnauthorizedAccessException("この日記を削除する権限がありません");
        }

        diaryRepository.delete(diary);
    }
}
