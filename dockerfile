FROM maven:3-eclipse-temurin-17 AS build
COPY ./ /home/app
RUN cd /home/app && mvn clean package -Dmaven.test.skip=true
FROM eclipse-temurin:17-alpine
COPY --from=build /home/app/target/spring-boot-starter-parent-3.4.4.jar /usr/local/lib/diary3.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/usr/local/lib/diary3.jar"]