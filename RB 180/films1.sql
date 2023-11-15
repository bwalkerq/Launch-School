DROP TABLE IF EXISTS public.films;
CREATE TABLE films (title varchar(255), "year" integer, genre varchar(100), director text, duration int);

INSERT INTO films(title, "year", genre) VALUES ('Die Hard', 1988, 'action');
INSERT INTO films(title, "year", genre) VALUES ('Casablanca', 1942, 'drama');
INSERT INTO films(title, "year", genre) VALUES ('The Conversation', 1974, 'thriller');

select * from films where length(title) < 12;

ALTER TABLE films
ADD column director text,
add column duration int;

UPDATE films
    set director = 'John McTiernan', duration = 132 where title = 'Die Hard';
UPDATE films
    set director = 'Michael Curtiz', duration = 102 where title = 'Casablanca';
UPDATE films
    set director = 'Francis Ford Coppola', duration = 113 where title = 'The Conversation';

INSERT INTO films (title, "year", genre, director, duration)
VALUES
('1984', 1956, 'scifi', 'Michael Anderson', 90),
('Tinker Tailor Soldier Spy', 2011, 'espionage', 'Tomas Alfredson', 127),
('The Birdcage', 1996, 'comedy', 'Mike Nichols', 118);

SELECT title, date_part('year', now()) - "year" as "age"
from films
order by age;

select title, films.duration
from films
where films.duration > 120
order by films.duration desc;

select title from films order by films.duration desc limit 1;














