# Eclipse TemurinのJava 17イメージを使用
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

# 必要なファイルをまとめてコピー（パスを確実に合わせる）
COPY task-backend/gradlew ./gradlew
COPY task-backend/gradle ./gradle
COPY task-backend/build.gradle ./build.gradle
COPY task-backend/settings.gradle ./settings.gradle

# ソースコードをコピー
COPY task-backend/src ./src

# 権限を付与してアプリケーションをビルド
RUN chmod +x gradlew
RUN ./gradlew bootJar -x test

# 実行用イメージ
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]