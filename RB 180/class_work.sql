CREATE table people (
    name text not null ,
    age integer not null ,
    occupation text
);

insert into people (name, age, occupation)
values ('Abby', 34, 'biologist'),
       ('Mu''nisah', 26),
       ('Mirabelle', 40, 'contractor');

/*
 Write 3 SQL queries that can be used to retrieve the second row of the table shown in #1 and #2.
 */
SELECT * from people
where occupation is null;

SELECT * from people
where age < 30;

SELECT * FROM people
where name = 'Mu''nisah';

SELECT * FROM people
where name LIKE 'Mu%';

CREATE TABLE birds (
    name text,
    length decimal(4,1),
    wingspan decimal(4,1),
    family text,
    extinct boolean
);

INSERT INTO birds (name, length, wingspan, family, extinct)
VALUES
('Spotted Towhee', 21.6, 26.7, 'Emberizidae', false),
('American Robin', 25.5, 36.0, 'Turdidae', false),
('Greater Koa Finch', 19.0, 24.0, 'Fringillidae', true),
('Carolina Parakeet', 33.0, 55.8, 'Psittacidae', true),
('Common Kestrel', 35.5, 73.5, 'Falconidae', false);

SELECT name, family from birds
where extinct = false
order by length desc ;

Select round(avg(wingspan), 1) as "average wingspan", -- learned to designate the number of digits to round to here
       min(wingspan),
       max(wingspan)
from birds;

CREATE TABLE menu_items (
    item text,
    prep_time int,
    ingredient_cost decimal(4,2),
    sales integer,
    menu_price dec (4,2)
);

INSERT INTO menu_items (item, prep_time, ingredient_cost, sales, menu_price)
VALUES
('omelette', 10, 1.50, 182, 7.99),
('tacos', 5, 2.00, 254, 8.99),
('oatmeal', 1, 0.50, 79, 5.99);


SELECT item, (menu_price - ingredient_cost) as "profit" from menu_items
order by (menu_price - ingredient_cost) desc
limit 1;

SELECT item,
       menu_price,
       ingredient_cost,
       round(prep_time / 60.0 * 13.00, 2) as "labor",
       (menu_price - ingredient_cost - round(prep_time / 60.0 * 13.00, 2)) as "profit"
FROM menu_items
order by profit desc ;
/*
 I got stuck on this part:
 Also note that prep_time/60.0 returns a floating-point numeric value (recall
 that prep_time is an integer). Alternatively, prep_time/60 would return 0.
 */















