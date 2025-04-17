package com.chobby.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * ユーザー登録後のレスポンスDTOクラス。
 * ユーザー登録結果を示すメッセージを保持。
 */
@Getter
@AllArgsConstructor // 全てのフィールドを引数に持つコンストラクタを自動生成
public class UserResponse {
    private String message; // 登録結果メッセージ
}
