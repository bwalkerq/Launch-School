CREATE TABLE singers(
    id serial,
    first_name varchar(100) NOT NULL,
    last_name varchar(100),
    occupation varchar(150),
    date_of_birth varchar(50),
    deceased boolean DEFAULT true
);

CREATE TABLE animals (
                         id serial,
                         name varchar(100) NOT NULL,
                         binomial_name varchar(100) NOT NULL,
                         max_weight_kg decimal(8,3),
                         max_age_years integer,
                         conservation_status char(2)
);


ALTER TABLE orders
    ADD COLUMN burger_cost decimal(4,2) DEFAULT 0,
    ADD COLUMN side_cost decimal(4,2) DEFAULT 0,
    ADD COLUMN drink_cost decimal(4,2) DEFAULT 0;

INSERT INTO countries
VALUES ('France', 'Paris', 67158000);

INSERT INTO singers (first_name, last_name, occupation, date_of_birth, deceased)
VALUES ('Frank', 'Sinatra', 'Singer, Actor', 1915-12-12, true),
       ('Tom', 'Cruise', 'Actor', 1962-07-03, DEFUALT);

-- set the column constraint to allow a null last name, then enter data



-- this is a table constraint rather than a column constraint, which is what I thought first


-- CREATE TABLE orders (
--                         id serial,
--                         customer_name varchar(100) NOT NULL,
--                         customer_email varchar(50),
--                         burger varchar(50),
--                         side varchar(50),
--                         drink varchar(50),
--                         customer_loyalty_points integer,
--                         burger_cost decimal(4,2) DEFAULT 0,
--                         side_cost decimal(4,2) DEFAULT 0,
--                         drink_cost decimal(4,2) DEFAULT 0
-- );


SELECT * FROM users WHERE full_name LIKE '%mi%';

select name, binomial_name, max_weight_kg, max_age_years
from animals
order by max_age_years, max_weight_kg, name DESC;

select first_name, last_name from celebrities where occupation ilike '%sing%';

select first_name, last_name from celebrities where occupation ilike '%sing%'and
                                              occupation ilike '%act%';

select burger
from orders where orders.burger_cost < 5 order by orders.burger_cost;

select customer_name, customer_email, customer_loyalty_points
from orders
where customer_loyalty_points >= 20
order by customer_loyalty_points desc;

select burger from orders
where customer_name = 'Natasha O''Shea';

select customer_name from orders where drink is null;

select burger, drink, side from orders where side != 'Fries' or side is null;

select burger, drink, side from orders where side is not null and drink is not null;

select binomial_name from animals
order by length(binomial_name) desc limit 1;

select first_name from celebrities where date_part('year', date_of_birth) = 1958;

select max(max_age_years) from animals;
select avg(max_weight_kg) from animals;

create table countries (
    id serial unique not null,
    name varchar(50) not null,
    capital varchar(50) not null ,
    population integer,
    continent_id integer
);

select count(capital) from countries;

-- Write a query to return each unique conservation status code alongside the number of animals that have that code.
select DISTINCT conservation_status, count(name) from animals group by conservation_status;

-- Write a query that returns the average burger cost for all orders that include fries.
select avg(burger_cost) from orders where side = 'Fries';

-- the cost of the cheapest side ordered.
select min(side_cost) from orders where side is not null;

-- the number of orders that include Fries and the number of orders that include Onion Rings.
select side, count(id)
from orders
where side = 'Onion Rings' or side = 'Fries'
group by side;

create table users (
                       id serial not null,
                       full_name varchar(25) not null ,
                       enabled boolean default true,
                       last_login timestamp
)

update users set enabled = true
where full_name = 'Harry Potter' or
        full_name = 'Jane Smith';

-- Add a column to the animals table called class to hold strings of up to 100 characters.
-- Update all the rows in the table so that this column holds the value Aves.

alter table animals
    add column class varchar(100);
update animals
set class = 'Aves';

alter table animals
    add column phylum varchar(100);
alter table animals
    add column kingdom varchar(100);
update animals set phylum = 'Chordata', kingdom = 'Animalia';

alter table countries add column continent varchar(50);
update countries set continent = 'Europe';
update countries set continent = 'Asia'
where name = 'Japan';
update countries
set continent = 'North America'
where name = 'USA';

-- update celebrities
-- set deceased = true
-- where first_name = 'Elvis';
--
-- alter table celebrities
--     alter column deceased
--         set not null ;
--
-- select * from celebrities where first_name = 'Tom';
-- delete from celebrities where first_name = 'Tom';
--
-- alter table celebrities
--     rename to singers;

select * from singers
         where occupation not like '%Singer%';

delete from singers where occupation not like '%Singer%';

delete from countries;

update orders
set drink = 'Lemonade'
where customer_name like 'J%';

update orders
set side = 'Fries',
    side_cost = 0.99,
    customer_loyalty_points = 13
where id = 4;

update orders
set side_cost = 1.20
where side = 'Fries';

/*
one-to-one: User has one address
*/

CREATE TABLE addresses (
                           user_id int, -- Both a primary and foreign key
                           street varchar(30) NOT NULL,
                           city varchar(30) NOT NULL,
                           state varchar(30) NOT NULL,
                           PRIMARY KEY (user_id),
                           FOREIGN KEY (user_id)
                               REFERENCES users (id)
                               ON DELETE CASCADE
);
INSERT INTO addresses
(user_id, street, city, state)
VALUES (1, '1 Market Street', 'San Francisco', 'CA'),
       (2, '2 Elm Street', 'San Francisco', 'CA'),
       (3, '3 Main Street', 'Boston', 'MA');

CREATE TABLE books (
                       id serial,
                       title varchar(100) NOT NULL,
                       author varchar(100) NOT NULL,
                       published_date timestamp NOT NULL,
                       isbn char(12),
                       PRIMARY KEY (id),
                       UNIQUE (isbn)
);

/*
 one-to-many: Book has many reviews
*/

CREATE TABLE reviews (
                         id serial,
                         book_id integer NOT NULL,
                         reviewer_name varchar(255),
                         content varchar(255),
                         rating integer,
                         published_date timestamp DEFAULT CURRENT_TIMESTAMP,
                         PRIMARY KEY (id),
                         FOREIGN KEY (book_id)
                             REFERENCES books(id)
                             ON DELETE CASCADE
);
INSERT INTO books
(id, title, author, published_date, isbn)
VALUES
    (1, 'My First SQL Book', 'Mary Parker',
     '2012-02-22 12:08:17.320053-03',
     '981483029127'),
    (2, 'My Second SQL Book', 'John Mayer',
     '1972-07-03 09:22:45.050088-07',
     '857300923713'),
    (3, 'My First SQL Book', 'Cary Flint',
     '2015-10-18 14:05:44.547516-07',
     '523120967812');


INSERT INTO reviews
(id, book_id, reviewer_name, content, rating,
 published_date)
VALUES
    (1, 1, 'John Smith', 'My first review', 4,
     '2017-12-10 05:50:11.127281-02'),
    (2, 2, 'John Smith', 'My second review', 5,
     '2017-10-13 15:05:12.673382-05'),
    (3, 2, 'Alice Walker', 'Another review', 1,
     '2017-10-22 23:47:10.407569-07');

CREATE TABLE checkouts (
                           id serial,
                           user_id int NOT NULL,
                           book_id int NOT NULL,
                           checkout_date timestamp,
                           return_date timestamp,
                           PRIMARY KEY (id),
                           FOREIGN KEY (user_id) REFERENCES users(id)
                               ON DELETE CASCADE,
                           FOREIGN KEY (book_id) REFERENCES books(id)
                               ON DELETE CASCADE
);
INSERT INTO checkouts
(id, user_id, book_id, checkout_date, return_date)
VALUES
    (1, 1, 1, '2017-10-15 14:43:18.095143-07',
     NULL),
    (2, 1, 2, '2017-10-05 16:22:44.593188-07',
     '2017-10-13 13:0:12.673382-05'),
    (3, 2, 2, '2017-10-15 11:11:24.994973-07',
     '2017-10-22 17:47:10.407569-07'),
    (4, 5, 3, '2017-10-15 09:27:07.215217-07',
     NULL);

-- Create a continents table with an auto-incrementing id column (set as the
-- Primary Key), and a continent_name column which can hold the same data as
-- the continent column from the countries table.
create table continents (
    id serial,
    continent_name varchar(50),
    primary key (id)
)
alter table countries
add column continent_id integer;
ALTER TABLE countries
    ADD FOREIGN KEY (continent_id)
        REFERENCES continents(id);

insert into continents (continent_name)
values
           ('Africa'),
           ('Asia'),
           ('Europe'),
           ('North America'),
           ('South America');

INSERT INTO countries (name, capital, population, continent_id)
    values
            ('France', 'Paris',	67158000, 3),
            ('USA', 'Washington, D.C.', 325365189, 4),
            ('Germany', 'Berlin', 82349400, 3),
            ('Japan', 'Tokyo', 126672000, 2),
            ('Egypt', 'Cairo', 96308900, 1),
            ('Brazil', 'Brasilia', 208385000, 5);


CREATE TABLE albums (
    id serial PRIMARY KEY ,
    album_name varchar(100),
    released date,
    genre varchar(100),
    label varchar(100),
    singer_id int,
    FOREIGN KEY (singer_id) references singers(id)
);

INSERT INTO albums (album_name, released, genre, label, singer_id)
VALUES
('Born to Run', 'August 25, 1975', 'Rock and roll',	'Columbia',	1),
('Purple Rain', 'June 25, 1984', 'Pop, R&B, Rock',	'Warner Bros', 6),
('Born in the USA', 'June 4, 1984', 'Rock and roll, pop', 'Columbia', 1),
('Madonna', 'July 27, 1983', 'Dance-pop, post-disco', 'Warner Bros', 5),
('True Blue', 'June 30, 1986', 'Dance-pop, Pop', 'Warner Bros',	5),
('Elvis', 'October 19, 1956', 'Rock and roll, Rhythm and Blues', 'RCA Victor', 7),
('Sign o'' the Times', 'March 30, 1987', 'Pop, R&B, Rock, Funk', 'Paisley Park, Warner Bros', 6),
('G.I. Blues', 'October 1, 1960', 'Rock and roll, Pop', 'RCA Victor', 7);

CREATE table customers (
    id serial PRIMARY KEY ,
    customer_name varchar(100)
);

CREATE TABLE email_addresses (
    customer_id int PRIMARY KEY ,
    email varchar(100),
    FOREIGN KEY(customer_id)
                             references customers(id)
                             ON DELETE cascade
);

INSERT INTO customers (customer_name)
VALUES ('James Bergman'),
       ('Natasha O''Shea'),
       ('Aaron Muller');

INSERT INTO email_addresses (customer_id, email)
VALUES (1, 'james1998@email.com'),
       (2, 'natasha@osheafamily.com');
-- Product Name	Product Cost	Product Type	Product Loyalty Points
CREATE TABLE products (
    id serial PRIMARY KEY ,
    product_name varchar(50),
    product_cost decimal(4,2) default 0,
    product_type varchar(50),
    loyalty_points integer
);
insert into products (product_name, product_cost, product_type, loyalty_points)
VALUES
('LS Burger', 3.00, 'Burger', 10),
('LS Cheeseburger', 3.50, 'Burger', 15),
('LS Chicken Burger', 4.50, 'Burger', 20),
('LS Double Deluxe Burger', 6.00, 'Burger', 30),
('Fries', 1.20, 'Side', 3),
('Onion Rings', 1.50, 'Side', 5),
('Cola', 1.50, 'Drink', 5),
('Lemonade', 1.50, 'Drink', 5),
('Vanilla Shake', 2.00, 'Drink', 7),
('Chocolate Shake', 2.00, 'Drink', 7),
('Strawberry Shake', 2.00, 'Drink', 7);

create table orders (
    id serial primary key,
    customer_id integer not null,
    order_status varchar(20),
    FOREIGN KEY (customer_id) references customers(id)
                    on delete cascade
);

create table order_items (
    id serial primary key ,
    order_id integer not null ,
    product_id integer not null ,
    FOREIGN KEY (order_id) references orders(id)
                           on delete cascade,
    FOREIGN KEY (product_id) references products(id)
                           on delete cascade
);

/*
 James has one order, consisting of a Chicken Burger, Fries, Onion Rings, and a Lemonade. It has a status of 'In Progress'.

Natasha has two orders. The first consists of a Cheeseburger, Fries, and a Cola, and has a status of 'Placed';
 the second consists of a Double Deluxe Burger, a Cheeseburger, two sets of Fries, Onion Rings, a Chocolate Shake and a Vanilla Shake, and has a status of 'Complete'.

Aaron has one order, consisting of an LS Burger and Fries. It has a status of 'Placed'.
 */

INSERT INTO orders (customer_id, order_status)
VALUES (1, 'In Progress'),
       (2, 'Placed'),
       (2, 'Complete'),
       (3, 'Placed');

INSERT INTO order_items (order_id, product_id)
VALUES (1, 3),
       (1, 5),
       (1, 6),
       (1, 8),
       (2, 2),
       (2, 5),
       (2, 7),
       (3, 4),
       (3, 2),
       (3, 5),
       (3, 5),
       (3, 6),
       (3, 10),
       (3, 9),
       (4, 1),
       (4, 5);

select users.full_name, books.title, checkouts.checkout_date
from users
join checkouts on users.id = checkouts.user_id
join books on books.id = checkouts.book_id;

-- exercises for joins

-- Write a query to return all of the country names along with their appropriate continent names.

select c.name, t.continent_name
from countries c join continents t
    on c.continent_id = t.id;

-- return all of the names and capitals of the European countries.

select c.name, c.capital
from countries as c join continents as n
on c.continent_id = n.id where n.continent_name = 'Europe';

-- return the first name of any singer who had an album released under the Warner Bros label.

select DISTINCT singers.first_name --this is good, I forgot the distinct
from singers join albums a on singers.id = a.singer_id
where a.label LIKE '%Warner Bros%';

--return the first name and last name of any singer who released an album in the
-- 80s and who is still living, along with the names of the album that was
-- released and the release date. Order the results by the singer's age (youngest first).

select s.first_name, s.last_name, a.album_name, a.released
from singers as s
    join albums a
        on s.id = a.singer_id
where a.released >= '1980-01-01'
  AND a.released < '1990-01-01'
  and s.deceased = false
order by date_of_birth desc ;

-- first name and last name of any singer without an associated album entry.

select first_name, last_name
from singers
where singers.id not in (
    select singer_id from albums
    );

select first_name, last_name
from singers left join albums a on singers.id = a.singer_id
where a.singer_id is null;

-- Return a list of all orders and their associated product items.

select orders.id, orders.customer_id, orders.order_status, p.product_name
from orders
join order_items oi on orders.id = oi.order_id
join products p on oi.product_id = p.id;

-- id of any order that includes Fries. Use table aliasing in your query.

select distinct o.id as "Order ID's that include Fries"
from orders o
    join order_items oi on o.id = oi.order_id
join products p on oi.product_id = p.id
where product_name = 'Fries';

-- Build on the query from the previous question to return the name of any customer who ordered fries.
select distinct customer_name as "Customers who like Fries" from customers
join orders o on customers.id = o.customer_id
join order_items oi on o.id = oi.order_id
join products p on oi.product_id = p.id
where product_name = 'Fries';

-- return the total cost of Natasha O'Shea's orders.

select sum(product_cost) as "total cost of Natasha's orders"
from products p
    join order_items oi on p.id = oi.product_id
join orders o on oi.order_id = o.id
join customers c2 on c2.id = o.customer_id
where c2.customer_name = 'Natasha O''Shea'
;

-- return the name of every product included in an order alongside the number of
-- times it has been ordered. 
-- Sort the results by product name, ascending.

select p.product_name, count(p.id) from products p
    join order_items oi on p.id = oi.product_id
    join orders o on oi.order_id = o.id
group by product_name
order by count(p.id) desc ;




