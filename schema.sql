create database myne;
use myne;

create table person(
id int not null auto_increment primary key,
name varchar(100),
lastname varchar(100),
phone varchar(100),
created_at datetime
);

