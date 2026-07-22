# Eclipse TemurinのJava 17イメージを使用
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

# 一番上の階層にあるファイルをそのままコピー
COPY gradlew ./gradlew
COPY gradle ./gradle
COPY build.gradle ./build.gradle
COPY settings.gradle ./settings.gradle
COPY src ./src

# 権限を付与してアプリケーションをビルド
RUN chmod +x gradlew
RUN ./gradlew bootJar -x test

# 実行用イメージ
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]