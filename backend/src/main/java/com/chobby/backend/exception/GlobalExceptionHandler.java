package com.chobby.backend.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 例外を一元的に処理するためのクラス。
 * @RestControllerAdvice を使用して、全てのコントローラーで発生した例外を捕捉し、標準化されたエラーレスポンスを返す。
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    // ログ出力用のLoggerインスタンス
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * エラーレスポンスを作成する汎用メソッド。
     * 例外が発生したときのレスポンスを構築する。
     *
     * @param status  HTTPステータスコード
     * @param message エラーメッセージ
     * @param ex      発生した例外
     * @return エラーレスポンスのレスポンスエンティティ
     */
    private ResponseEntity<ErrorResponse> buildErrorResponse(HttpStatus status, String message, Exception ex) {
        // 発生した例外の内容をログとして記録
        logger.warn("Handled exception: {}", ex.getMessage(), ex);  // ログレベルは警告（必要に応じて error に変更）

        // ErrorResponseオブジェクトを生成
        ErrorResponse errorResponse = new ErrorResponse(
                status.value(),                 // ステータスコード
                status.getReasonPhrase(),       // ステータスメッセージ
                message,                         // エラーメッセージ
                LocalDateTime.now()              // エラーメッセージ発生時刻
        );

        // エラーレスポンスをHTTPステータスとともに返却
        return ResponseEntity.status(status).body(errorResponse);
    }

    /**
     * DiaryNotFoundException が発生した際に呼ばれるメソッド。
     * 対象の日記が見つからない場合に 404 (NOT FOUND) エラーを返す。
     */
    @ExceptionHandler(DiaryNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleDiaryNotFound(DiaryNotFoundException ex) {
        // 例外をハンドリングし、エラーレスポンスを生成
        return buildErrorResponse(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    }

    /**
     * DuplicateDiaryException が発生した際に呼ばれるメソッド。
     * 同じ日付の日記を重複して登録しようとした場合に 400 (BAD REQUEST) エラーを返す。
     */
    @ExceptionHandler(DuplicateDiaryException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateDiary(DuplicateDiaryException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
    }

    /**
     * UnauthorizedAccessException が発生した際に呼ばれるメソッド。
     * ユーザーに権限がない場合に 403 (FORBIDDEN) エラーを返す。
     */
    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedAccess(UnauthorizedAccessException ex) {
        return buildErrorResponse(HttpStatus.FORBIDDEN, ex.getMessage(), ex);
    }

    /**
     * MethodArgumentNotValidException が発生した際に呼ばれるメソッド。
     * バリデーションエラーが発生した場合に 400 (BAD REQUEST) エラーを返す。
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationErrors(MethodArgumentNotValidException ex) {
        // フィールドごとのエラーメッセージを収集
        Map<String, String> errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .collect(Collectors.toMap(
                fieldError -> fieldError.getField(),  // フィールド名
                fieldError -> fieldError.getDefaultMessage(), // エラーメッセージ
                (existing, replacement) -> existing   // 同じフィールド名の場合は既存のエラーメッセージを使用
            ));

        // バリデーションエラー全体のメッセージ
        String errorMessage = "Validation failed: " + errors.toString();

        // エラーレスポンスを返す
        return buildErrorResponse(HttpStatus.BAD_REQUEST, errorMessage, ex);
    }

    /**
     * その他の予期しない例外が発生した際に呼ばれるメソッド。
     * 内部サーバーエラー（500）を返す。
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleAll(Exception ex) {
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", ex);
    }
}
