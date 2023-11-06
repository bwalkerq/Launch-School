CREATE TABLE singers (
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

INSERT INTO celebrities (first_name, last_name, occupation, date_of_birth, deceased)
VALUES ('Frank', 'Sinatra', 'Singer, Actor', 1915-12-12, true),
       ('Tom', 'Cruise', 'Actor', 1962-07-03, DEFUALT);

-- set the column constraint to allow a null last name, then enter data

ALTER TABLE celebrities
    ALTER COLUMN last_name
        DROP NOT NULL;

-- this is a table constraint rather than a column constraint, which is what I thought first


CREATE TABLE orders (
                        id serial,
                        customer_name varchar(100) NOT NULL,
                        customer_email varchar(50),
                        burger varchar(50),
                        side varchar(50),
                        drink varchar(50),
                        customer_loyalty_points integer,
                        burger_cost decimal(4,2) DEFAULT 0,
                        side_cost decimal(4,2) DEFAULT 0,
                        drink_cost decimal(4,2) DEFAULT 0
);


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

create table countries
(id serial unique not null,
 name varchar(50) not null,
 capital varchar(50) not null ,
 population integer);

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

update celebrities
set deceased = true
where first_name = 'Elvis';

alter table celebrities
    alter column deceased
        set not null ;

select * from celebrities where first_name = 'Tom';
delete from celebrities where first_name = 'Tom';

alter table celebrities
    rename to singers;

select *
from singers where occupation not like '%Singer%';

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
























