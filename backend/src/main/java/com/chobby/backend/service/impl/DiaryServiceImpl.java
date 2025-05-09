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
import java.util.List;

@Service
public class DiaryServiceImpl implements DiaryService {

    private final DiaryRepository diaryRepository;

    public DiaryServiceImpl(DiaryRepository diaryRepository) {
        this.diaryRepository = diaryRepository;
    }

    // 日記を作成するメソッド（行ごとに保存）
    @Override
    @Transactional
    public Diary createDiary(User user, Integer lineNumber, String text, LocalDate diaryDate) {
        if (diaryDate == null) {
            diaryDate = LocalDate.now(); // もし日付が指定されていなければ、今日の日付を使用
        }

        // 3年以上前の日記作成を禁止（3年前の日付も含めて）
        LocalDate threeYearsAgo = LocalDate.now().minusYears(3);
        if (!diaryDate.isAfter(threeYearsAgo)) {  // 3年前の日記は書けない
            throw new IllegalArgumentException("3年以上前の日記は作成できません");
        }

        // 同じ日付に対してユーザーの日記が存在するかをチェック
        if (diaryRepository.existsByUserAndDiaryDateAndLineNumber(user, diaryDate, lineNumber)) {
            throw new DuplicateDiaryException("この日付と行番号にはすでに日記が登録されています");
        }

        Diary diary = new Diary();
        diary.setUser(user);
        diary.setDiaryDate(diaryDate);
        diary.setLineNumber(lineNumber);
        diary.setText(text);

        return diaryRepository.save(diary);
    }

    // ユーザーの日記一覧を取得
    @Override
    public List<Diary> getAllDiaries(User user) {
        return diaryRepository.findByUser(user);
    }

    // 特定の日付のユーザーの日記を取得
    @Override
    public List<Diary> getDiariesByDate(User user, LocalDate diaryDate) {
        return diaryRepository.findByUserAndDiaryDate(user, diaryDate);
    }

    @Override
    @Transactional
    public Diary updateDiary(Long diaryId, User user, String text) {
        Diary diary = diaryRepository.findById(diaryId)
            .orElseThrow(() -> new DiaryNotFoundException("日記が見つかりません"));

        // 認可チェック：ID 同士を比較
        if (!diary.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedAccessException("この日記を更新する権限がありません");
        }

        diary.setText(text);
        diary.setUpdatedAt(LocalDateTime.now());
        return diaryRepository.save(diary);
    }

    @Override
    @Transactional
    public void deleteDiary(Long diaryId, User user) {
        Diary diary = diaryRepository.findById(diaryId)
            .orElseThrow(() -> new DiaryNotFoundException("日記が見つかりません"));

        // 同様に ID 同士で比較
        if (!diary.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedAccessException("この日記を削除する権限がありません");
        }

        diaryRepository.delete(diary);
    }
}
