create table if not exists users(
    id integer PRIMARY KEY AUTO_INCREMENT,
    username varchar(255) not null,
    pass varchar(255) not null
);

Insert into users(username,pass) 
values
('qwerty1234','qwerty12345')
('qweqweqwe','qweqweqwe')