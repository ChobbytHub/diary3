package com.chobby.backend.controller;

import com.chobby.backend.entity.Diary;
import com.chobby.backend.entity.User;
import com.chobby.backend.dto.DiaryRequest;
import com.chobby.backend.dto.DiaryResponse;
import com.chobby.backend.service.DiaryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 日記を操作する REST API コントローラー。
 */
@RestController
@RequestMapping("/api/diaries")
public class DiaryController {

    private final DiaryService diaryService;

    public DiaryController(DiaryService diaryService) {
        this.diaryService = diaryService;
    }

    /**
     * 日記を作成
     * POST /api/diaries
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)  // 成功時に201 Createdを返す
    public DiaryResponse createDiary(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody DiaryRequest req
    ) {
        Diary diary = diaryService.createDiary(
                user,
                req.getLineNumber(),
                req.getText(),
                req.getDiaryDate()
        );
        return toResponse(diary);  // DiaryResponse を返す
    }

    /**
     * 全日記一覧を取得
     * GET /api/diaries
     */
    @GetMapping
    public List<DiaryResponse> getAll(
            @AuthenticationPrincipal User user
    ) {
        return diaryService.getAllDiaries(user).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * 日記を更新（PATCHメソッドで更新）
     * PATCH /api/diaries/{id}
     */
    @PatchMapping("/{id}")
    public DiaryResponse updateDiary(
            @AuthenticationPrincipal User user,
            @PathVariable("id") Long id,
            @Valid @RequestBody DiaryRequest req
    ) {
        // ユーザーがその日記を所有しているか確認
        Diary updated = diaryService.updateDiary(id, user, req.getText());
        return toResponse(updated);
    }

    /**
     * 日記を削除
     * DELETE /api/diaries/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiary(
            @AuthenticationPrincipal User user,
            @PathVariable("id") Long id
    ) {
        // ユーザーがその日記を削除できるか確認
        diaryService.deleteDiary(id, user);
        return ResponseEntity.noContent().build();
    }

    // --- DTO 変換メソッド ---

    private DiaryResponse toResponse(Diary d) {
        return new DiaryResponse(
                d.getId(),
                d.getDiaryDate(),
                d.getLineNumber(),
                d.getText()
        );
    }
}
