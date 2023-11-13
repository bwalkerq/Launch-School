create TABLE birds (
    id serial primary key ,
    name varchar(25),
    age int,
    species varchar(15)
);

INSERT INTO birds (name, age, species)
    VALUES
('Charlie', 3, 'Finch'),
('Allie', 5, 'Owl'),
('Jennifer', 3, 'Magpie'),
('Jamie', 4, 'Owl'),
('Roy', 8, 'Crow');

select * from birds
where age < 5;

update birds
set species = 'Raven'
where species = 'Crow';

update birds
set species = 'Hawk'
where name = 'Jamie';

delete
from birds
where age = 3 and species = 'Finch';

alter table birds
add constraint postive_bird_age
CHECK ( age > 0 ); -- I don't believe we had done this yet

drop table birds;

-- connect to another database first
drop database animals;
-- or exit postgreSQL or pgcli and:
DROP DATABASE animals















