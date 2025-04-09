# 1. 使用するJDKのイメージを指定（OpenJDK 17を使用）
FROM openjdk:17-jdk-slim

# 2. 作業ディレクトリを設定
WORKDIR /app

# 3. アプリケーションのJARファイルをコンテナにコピー
# ここで、`target`ディレクトリ内のJARファイルをコピーします
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

# 4. アプリケーションを実行するためのコマンドを指定
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

# 5. コンテナがリッスンするポートを指定（Spring Bootのデフォルトポートは8080）
EXPOSE 8080
