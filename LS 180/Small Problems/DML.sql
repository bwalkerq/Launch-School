CREATE DATABASE workshop;

Create TABLE devices (
    id serial primary key ,
    name text not null ,
    created_at timestamp default CURRENT_TIMESTAMP --originally had now(), which works too!
);
CREATE TABLE parts (
    id serial primary key,
    part_number int unique not null ,
    device_id int references devices(id)
);

/*
 Accelerometer". The other should be named, "Gyroscope".

The first device should have 3 parts (this is grossly simplified). The second
 device should have 5 parts. The part numbers may be any number between 1 and
 10000. There should also be 3 parts that don't belong to any device yet.
 */

INSERT INTO devices (name)
VALUES ('Accelerometer'),
       ('Gyroscope');

INSERT INTO parts (part_number, device_id)
VALUES (1,1),
       (2,1),
       (3,1);

INSERT INTO parts (part_number, device_id) VALUES (31, 2);
INSERT INTO parts (part_number, device_id) VALUES (33, 2);
INSERT INTO parts (part_number, device_id) VALUES (35, 2);
INSERT INTO parts (part_number, device_id) VALUES (37, 2);
INSERT INTO parts (part_number, device_id) VALUES (39, 2);

INSERT INTO parts (part_number) VALUES (50);
INSERT INTO parts (part_number) VALUES (54);
INSERT INTO parts (part_number) VALUES (58);

select *
from devices
full outer join parts p on devices.id = p.device_id;

SELECT name, p.part_number from devices
join parts p on devices.id = p.device_id;

/*
 this exercies uses type conversation from integer to text in order to use
 the like operator to see if something starts with a particular character
 the syntax `column_name::text' in this case changes the data type (here, an
 integer) to a string
 */
SELECT * from parts
where part_number::text like '3%';

select name, count(p.device_id) as "total number of parts"
from devices join parts p on devices.id = p.device_id
group by name
order by name desc;

select part_number, device_id from parts
where device_id is not null;

select part_number, device_id from parts
where device_id is null;

INSERT INTO devices (name) VALUES ('Magnetometer');
INSERT INTO parts (part_number, device_id) VALUES (42, 3);

select name as oldest_device from devices
order by created_at asc -- asc is redundant since it defaults to asc
limit 1

update parts
set device_id = 1
where part_number = 37 or part_number = 39;

update parts
set device_id = 2
where part_number in (select min(part_number) from parts);

/*
 this drops the foreign key constaint that didn't have the 'on delete cascade'
 which was making me go and delete the associated parts first, and then delete
 the device. On second thought, while it's more convenient
 */
alter table parts
drop constraint parts_device_id_fkey,
    add foreign key(device_id) references devices(id) on delete cascade;

delete
from devices
where name = 'Accelerometer';

































