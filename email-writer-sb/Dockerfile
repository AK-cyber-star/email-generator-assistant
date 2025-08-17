# build project
FROM maven:3.9.8-eclipse-temurin-21 AS build
WORKDIR /app
COPY . /app/
RUN mvn clean package -DskipTests

# run project
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build app/target/*.jar /app/app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]