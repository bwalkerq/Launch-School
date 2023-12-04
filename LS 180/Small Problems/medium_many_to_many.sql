create database billing;
Create TABLE customers (
    id serial primary key ,
    name text not null ,
    payment_token char(8) unique not null check ( payment_token ~ '^[A-Z]{8}$' )
);
CREATE TABLE services (
    id serial primary key ,
    description text not null ,
    price numeric(10,2) not null check ( price >= 0.00 )
);

INSERT INTO customers (name, payment_token)
VALUES ('Pat Johnson', 'XHGOAHEQ'),
    ('Nancy Monreal', 'JKWQPJKL'),
    ('Lynn Blake', 'KLZXWEEE'),
    ('Chen Ke-Hua', 'KWETYCVX'),
    ('Scott Lakso', 'UUEAPQPS'),
    ('Jim Pornot', 'XKJEYAZA')
;

INSERT INTO services (description, price)
VALUES
('Unix Hosting', 5.95),
('DNS', 4.95),
('Whois Registration', 1.95),
('High Bandwidth', 15.00),
('Business Support', 250.00),
('Dedicated Hosting', 50.00),
('Bulk Email', 250.00),
('One-to-one Training', 999.00)
;

CREATE TABLE customers_services (
    id serial primary key ,
    customer_id integer
        not null
        references customers(id)
            on delete cascade ,
    services_id integer
        not null
        references services(id),
    UNIQUE(customer_id, services_id)
);

INSERT INTO customers_services (customer_id, services_id)
VALUES
    (1,1),
    (1,2),
    (1,3),
    (3,1),
    (3,2),
    (3,3),
    (3,4),
    (3,5),
    (4, 1),
    (4, 4),
    (5,1),
    (5, 2),
    (5, 6),
    (6, 1),
    (6, 6),
    (6, 7);

select *
from customers
where id in (select distinct customer_id from customers_services);

select distinct customers.* from customers
join customers_services cs on customers.id = cs.customer_id
order by customers.id;

select customers.* from customers
left join customers_services cs on customers.id = cs.customer_id
                   where customer_id is null
order by customers.id;

select customers.*, s.* from customers
left outer join customers_services cs on customers.id = cs.customer_id
full join services s on s.id = cs.services_id
         where customer_id is null
;

SELECT s.description from customers_services cs
right join services s on s.id = cs.services_id
where customer_id is null;

SELECT name, string_agg(s.description, ', ') as services from customers
left outer join customers_services cs on customers.id = cs.customer_id
left join services s on s.id = cs.services_id
group by name;
/*
 I knew that I needed to do a left join at first; I didn't know that i had
 to do a left join again when joining to the services; without the second left
 join we lose the record for Nancy, who has no services
 */

SELECT distinct customers.name,
       lag(customers.name)
       OVER (ORDER BY customers.name)
           AS previous,
       services.description
FROM customers
         LEFT OUTER JOIN customers_services cs
                         ON customer_id = customers.id
         LEFT OUTER JOIN services
                         ON services.id = cs.services_id;
-- woof this is nuts

SELECT description, count(cs.services_id) as count from services
join customers_services cs on services.id = cs.services_id
group by description
having count(cs.customer_id) >= 3 -- this is new
order by description;
/*
We now need to restrict the output to just those services that have a count of
at least 3. To do that, we need to use HAVING clause: this is required when
selecting rows based on aggregated data such as a count.
 */

SELECT sum(price) as "gross income" from services
join customers_services cs on services.id = cs.services_id;
/*
 I started this with the customers, knowing that I would get eventually to prices
 within the services, and knew i had to go through the cs table; I overlooked
 that I don't even need any data from the customers table.
 */

INSERT INTO customers (name, payment_token) VALUES ('John Doe', 'EYODHLCN');
INSERT INTO customers_services (customer_id, services_id)
VALUES (7,1), (7,2), (7,3);

select sum(price) from customers_services
join services s on customers_services.services_id = s.id
where price > 100;

SELECT price from services where price > 100;
Select count(id) from customers;
select sum(s.price) * (Select count(id) from customers) as sum from services s
where s.price > 100;
-- damn! Their solution has a cross join!
SELECT sum(price) from services
cross join customers
where price > 100;

select * from services cross join customers where price > 100;
select * from customers cross join services where price > 100;

select * from services join customers_services cs on services.id = cs.services_id;

delete
from customers
where name = 'Chen Ke-Hua' ;

delete from customers_services where services_id = 7;
delete from services where description = 'Bulk Email';



































