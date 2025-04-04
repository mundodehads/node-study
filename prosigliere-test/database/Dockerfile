FROM mysql:8

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=prosiglieretest

COPY ./init.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
