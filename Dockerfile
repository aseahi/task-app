# Eclipse TemurinのJava 17イメージを使用
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

# ファイルをすべてコピー
COPY . .

# gradlewに実行権限を確実に付与してビルドを実行
RUN chmod +x gradlew
RUN ./gradlew bootJar -x test --no-daemon

# 実行用イメージ
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]