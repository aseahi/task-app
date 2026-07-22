# Eclipse TemurinのJava 17イメージを使用
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

# Gradleのビルドファイルをコピー
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# ソースコードをコピー
COPY src src

# アプリケーションをビルド
RUN ./gradlew bootJar -x test

# 実行用イメージ
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]