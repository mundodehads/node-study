CREATE DATABASE IF NOT EXISTS prosiglieretest;

USE prosiglieretest;

CREATE TABLE BlogPost (
    id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Comment (
    id VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    blogpost_id VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (blogpost_id) REFERENCES BlogPost(id)
);
