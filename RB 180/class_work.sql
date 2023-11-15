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
























