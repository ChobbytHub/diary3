# ビルドステージ
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /home/app
COPY . .
RUN mvn clean package -Dmaven.test.skip=true

# 実行ステージ
FROM eclipse-temurin:17-alpine
COPY --from=build /home/app/target/diary3-0.0.1-SNAPSHOT.jar /usr/local/lib/diary3.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/usr/local/lib/diary3.jar"]
