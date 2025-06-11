FROM eclipse-temurin:17-jdk-jammy AS builder
EXPOSE 8081
ADD target/Authentication-0.0.1-SNAPSHOT.jar demo.jar
ENTRYPOINT ["java","-jar","demo.jar"]