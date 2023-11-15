CREATE TABLE employees (
                           first_name character varying(100),
                           last_name character varying(100),
                           department character varying(100),
                           vacation_remaining integer
);
INSERT INTO employees VALUES ('Leonardo', 'Ferreira', 'finance', 14);
INSERT INTO employees VALUES ('Sara', 'Mikaelsen', 'operations', 14);
INSERT INTO employees VALUES ('Lian', 'Ma', 'marketing', 13);

ALTER TABLE employees ALTER COLUMN vacation_remaining SET NOT NULL;

ALTER TABLE employees ALTER COLUMN vacation_remaining SET DEFAULT 0;
INSERT INTO employees (first_name, last_name) VALUES ('Haiden', 'Smith');

ALTER TABLE employees alter column department set default 'unassigned';

update employees
set department = 'unassigned'
where department is null;

alter table employees
alter column department
set not null ;

create table temperatures (
    "date" date not null ,
    low integer not null,
    high integer not null
);

INSERT INTO temperatures (date, low, high)
VALUES
('2016-03-01', 34, 43),
 ('2016-03-02', 32, 44),
 ('2016-03-03', 31, 47),
 ('2016-03-04', 33, 42),
 ('2016-03-05', 39, 46),
 ('2016-03-06', 32, 43),
 ('2016-03-07', 29, 32),
 ('2016-03-08', 23, 31),
 ('2016-03-09', 17, 28);

select "date", round((high + low) / 2.0, 1) as average_temp
from temperatures
-- limit 7
-- offset 1;
WHERE date BETWEEN '2016-03-02' AND '2016-03-08';

alter table temperatures
add column rainfall int default 0;

update temperatures
set rainfall = round((high + low) / 2, 1) - 35
where high > 35;

alter table temperatures alter column rainfall type numeric(6,3);

update temperatures
set rainfall = round(rainfall * 0.0393701, 3);

alter table temperatures rename to weather;
















