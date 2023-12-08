
create table directors_films (
                                 id serial,
                                 film_id int not null references films(id),
                                 director_id int not null references directors(id)
);
alter table films_directors rename column director to director_id;

alter table films_directors add unique (director_id, film_id);

ALTER TABLE films_directors rename to directors_films;
--be alphabetical

INSERT INTO directors_films (film_id, director_id)
VALUES
    (1,1),
    (2,2),
    (3,3),
    (4,4),
    (5,5),
    (6,6),
    (7,3),
    (8,7),
    (9,8),
    (10,4);

alter table films drop director_id;

SELECT films.title, d.name from films
    join directors_films df on films.id = df.film_id
join directors d on d.id = df.director_id
order by title;

INSERT INTO directors (name) values
                                 ('Joel Coen'),
                                 ('Ethan Coen'),
                                 ('Frank Miller'),
                                 ('Robert Rodriguez');

INSERT INTO films (title, year, genre, duration) VALUES
('Fargo', 1996, 'comedy', 98),
('No Country for Old Men', 2007, 'western', 122),
('Sin City', 2005, 'crime', 124),
('Spy Kids', 2001, 'scifi', 88);

INSERT INTO directors_films (film_id, director_id) VALUES
(11,9),
(12,9),
(12,10),
(13,11),
(13,12),
(14,12);

SELECT directors.name as director, count(df.director_id) as films from directors
join directors_films df on directors.id = df.director_id
group by directors.name
order by films desc , name