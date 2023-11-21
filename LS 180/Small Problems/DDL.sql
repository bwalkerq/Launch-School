/*
 stars table

id: a unique serial number that auto-increments and serves as a primary key for this table.
name: the name of the star,e,g., "Alpha Centauri A". Allow room for 25 characters. Must be unique and non-null.
distance: the distance in light years from Earth. Define this as a whole number (e.g., 1, 2, 3, etc) that must be non-null and greater than 0.
spectral_type: the spectral type of the star: O, B, A, F, G, K, and M. Use a one character string.
companions: how many companion stars does the star have? A whole number will do. Must be non-null and non-negative.
 */

 CREATE table stars (
     id serial primary key ,
     name varchar(25) unique not null ,
     distance integer not null check ( distance > 0 ),
     spectral_type char(1) ,
     companions int not null check ( companions >= 0 )
 );

CREATE TABLE planets (
    id serial primary key ,
    designation char(1) unique , --forgot unique
    mass integer
);

alter table planets
add column star_id int not null references stars(id); -- establishes foreign key
-- didn't realize that you can define a foreign key without the 'foreign key' keyword

alter table stars
alter column name type varchar(50);

ALTER TABLE stars
    ALTER COLUMN name TYPE varchar(25);

INSERT INTO stars (name, distance, spectral_type, companions)
VALUES ('Alpha Centauri B', 4, 'K', 3);


ALTER TABLE stars
    ALTER COLUMN name TYPE varchar(50);

alter table stars
alter distance type decimal;

update stars
set distance = 5.32787987987
where id = 1;

ALTER TABLE stars
    ALTER COLUMN distance TYPE integer;

INSERT INTO stars (name, distance, spectral_type, companions)
VALUES ('Alpha Orionis', 643, 'M', 9);

ALTER TABLE stars
    ALTER COLUMN distance TYPE numeric ;


alter table stars add check (spectral_type IN ('O', 'B', 'A', 'F', 'G', 'K', 'M'))
alter table stars alter spectral_type set not null

ALTER TABLE stars
    DROP CONSTRAINT stars_spectral_type_check,
    ALTER COLUMN spectral_type DROP NOT NULL;

INSERT INTO stars (name, distance, companions)
VALUES ('Epsilon Eridani', 10.5, 0);

INSERT INTO stars (name, distance, spectral_type, companions)
VALUES ('Lacaille 9352', 10.68, 'X', 0);

ALTER TABLE stars
    ADD CHECK (spectral_type IN ('O', 'B', 'A', 'F', 'G', 'K', 'M')),
    ALTER COLUMN spectral_type SET NOT NULL;

select * from stars;

update stars
set spectral_type = 'A'
where id =4 ;

alter table stars drop constraint stars_spectral_type_check

create type spectral as ENUM ('O', 'B', 'A', 'F', 'G', 'K', 'M')

alter table stars alter spectral_type type spectral using spectral_type::spectral;

alter table planets alter designation set not null;
alter table planets alter mass type numeric;
alter table planets add check ( mass > 0);

alter table planets add semi_major_axis numeric not null;

ALTER TABLE planets
    DROP COLUMN semi_major_axis;

DELETE FROM stars;
INSERT INTO stars (name, distance, spectral_type, companions)
VALUES ('Alpha Centauri B', 4.37, 'K', 3);
INSERT INTO stars (name, distance, spectral_type, companions)
VALUES ('Epsilon Eridani', 10.5, 'K', 0);

INSERT INTO planets (designation, mass, star_id)
VALUES ('b', 0.0036, 5); -- check star_id; see note below
INSERT INTO planets (designation, mass, star_id)
VALUES ('c', 0.1, 6); -- check star_id; see note below

ALTER TABLE planets
    ADD COLUMN semi_major_axis numeric;

update planets
set semi_major_axis = 0.04
where id = 5;

update planets
set semi_major_axis = 40
where id = 6;

alter table planets alter semi_major_axis set not null ;

/*
 id: a unique serial number that auto-increments and serves as a primary key for this table.
designation: the designation of the moon. We will assume that moon designations
 will be numbers, with the first moon discovered for each planet being moon 1,
 the second moon being moon 2, etc. The designation is required.
semi_major_axis: the average distance in kilometers from the planet when a moon
 is farthest from its corresponding planet. This field must be a number greater
 than 0, but is not required; it may take some time before we are able to
 measure moon-to-planet distances in extrasolar systems.
mass: the mass of the moon measured in terms of Earth Moon masses. This field
 must be a numeric value greater than 0, but is not required.
Make sure you also specify any foreign keys necessary to tie each moon to other rows in the database.
 */
CREATE TABLE moons
(
    id              serial primary key,
    designation     int not null check ( designation > 0 ),
    semi_major_axis numeric check ( semi_major_axis > 0.0 ),
    mass            numeric check ( mass > 0.0 ),
    planet_id       int not null references planets (id)
);






