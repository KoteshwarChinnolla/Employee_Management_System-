FROM eclipse-temurin:17-jdk-jammy AS builder
EXPOSE 8080
EXPOSE 5432
ADD target/springPostgress-0.0.1-SNAPSHOT.jar demo.jar
ENTRYPOINT ["java","-jar","demo.jar"]