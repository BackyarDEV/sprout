FROM maven:3.9-eclipse-temurin-25 AS build

WORKDIR /app

COPY backend/pom.xml .

RUN mvn dependency:go-offline

COPY backend/src ./src

RUN mvn clean package -DskipTests


FROM eclipse-temurin:25-jre

WORKDIR /app

COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8490

ENTRYPOINT ["java", "-jar", "app.jar"]