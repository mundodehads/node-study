CREATE TABLE User (
    id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    access_token VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO User (id, name, password, email, role, access_token)
VALUES 
    ('0', 'Jon Doe Administrator', 'jondoe321', 'jon+admin@doe.com', 'ADMIN', 'admin'),
    ('1', 'Jon Doe Regular', 'jondoe123', 'jon@doe.com', 'USER', 'default');
