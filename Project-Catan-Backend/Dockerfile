FROM openjdk:17-jdk-alpine3.14
VOLUME /tmp
ARG JAR_FILE=target/*.war
COPY ${JAR_FILE} app.war
ENTRYPOINT ["java","-jar","/app.war"]
