FROM maven:3.9-amazoncorretto-17 as build
ENV HOME=/usr/app
RUN mkdir -p $HOME
WORKDIR $HOME
ADD . $HOME
RUN mvn package && rm -fr src/main/frontend/node*
EXPOSE 8080
