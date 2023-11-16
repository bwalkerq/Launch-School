DROP TABLE IF EXISTS public.films;
CREATE TABLE films (title varchar(255), year integer, genre varchar(100), director varchar(255), duration integer);

INSERT INTO films(title, year, genre, director, duration) VALUES ('Die Hard', 1988, 'action', 'John McTiernan', 132);
INSERT INTO films(title, year, genre, director, duration) VALUES ('Casablanca', 1942, 'drama', 'Michael Curtiz', 102);
INSERT INTO films(title, year, genre, director, duration) VALUES ('The Conversation', 1974, 'thriller', 'Francis Ford Coppola', 113);
INSERT INTO films(title, year, genre, director, duration) VALUES ('1984', 1956, 'scifi', 'Michael Anderson', 90);
INSERT INTO films(title, year, genre, director, duration) VALUES ('Tinker Tailor Soldier Spy', 2011, 'espionage', 'Tomas Alfredson', 127);
INSERT INTO films(title, year, genre, director, duration) VALUES ('The Birdcage', 1996, 'comedy', 'Mike Nichols', 118);

alter table films alter column title set not null;
alter table films alter column year set not null;
alter table films alter column genre set not null;
alter table films alter column director set not null;
alter table films alter column duration set not null;

alter table films
    add constraint unique_film_name unique(title)

alter table films
    drop constraint unique_film_name;

alter table films
    add constraint title_length check ( length(title) >= 1 );

insert into films VALUES ('', 1901, 'action', 'JJ Abrams', 126);

alter table films drop constraint title_length;

alter table films
    add constraint year_range check ( year between 1900 and 2100 );

alter table films
    add constraint director_length check ( length(director) >=3 and director like '% %' );

update films
set director = 'johnny'
where title = 'Die Hard';

/*
 three ways to use schema to restrict which values can be stored in a column
 unique, not null, add a constraint check like length(column) >= 2, and also
 the data types that are built into the definition

 actual answer: data type (which can include length limitation,
 not null constraint, and check constraint
 */