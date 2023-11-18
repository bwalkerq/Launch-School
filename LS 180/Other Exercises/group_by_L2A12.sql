--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

ALTER TABLE ONLY public.films DROP CONSTRAINT title_unique;
ALTER TABLE ONLY public.films DROP CONSTRAINT films_pkey;
ALTER TABLE public.films ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.films_id_seq;
DROP TABLE public.films;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: films; Type: TABLE; Schema: public; Owner: -; Tablespace:
--

CREATE TABLE films (
                       id integer NOT NULL,
                       title character varying(255) NOT NULL,
                       year integer NOT NULL,
                       genre character varying(100) NOT NULL,
                       director character varying(255) NOT NULL,
                       duration integer NOT NULL,
                       CONSTRAINT director_name CHECK (((length((director)::text) >= 1) AND ("position"((director)::text, ' '::text) > 0))),
                       CONSTRAINT title_length CHECK ((length((title)::text) >= 1)),
                       CONSTRAINT year_range CHECK (((year >= 1900) AND (year <= 2100)))
);


--
-- Name: films_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE films_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: films_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE films_id_seq OWNED BY films.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY films ALTER COLUMN id SET DEFAULT nextval('films_id_seq'::regclass);


--
-- Data for Name: films; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO films VALUES (1, 'Die Hard', 1988, 'action', 'John McTiernan', 132);
INSERT INTO films VALUES (2, 'Casablanca', 1942, 'drama', 'Michael Curtiz', 102);
INSERT INTO films VALUES (3, 'The Conversation', 1974, 'thriller', 'Francis Ford Coppola', 113);
INSERT INTO films VALUES (4, '1984', 1956, 'scifi', 'Michael Anderson', 90);
INSERT INTO films VALUES (5, 'Tinker Tailor Soldier Spy', 2011, 'espionage', 'Tomas Alfredson', 127);
INSERT INTO films VALUES (6, 'The Birdcage', 1996, 'comedy', 'Mike Nichols', 118);
INSERT INTO films VALUES (7, '28 Days Later', 2002, 'horror', 'Danny Boyle', 113);
INSERT INTO films VALUES (8, 'The Godfather', 1972, 'crime', 'Francis Ford Coppola', 175);
INSERT INTO films VALUES (9, '12 Angry Men', 1957, 'drama', 'Sidney Lumet', 96);
INSERT INTO films VALUES (10, 'Interstellar', 2014, 'scifi', 'Christopher Nolan', 169);
INSERT INTO films VALUES (11, 'Midnight Special', 2016, 'scifi', 'Jeff Nicols', 111);
INSERT INTO films VALUES (12, 'Home Alone', 1990, 'comedy', 'John Wilden Hughes, Jr.', 102);
INSERT INTO films VALUES (13, 'Hairspray', 1988, 'comedy', 'John Waters', 92);
INSERT INTO films VALUES (14, 'Godzilla', 1998, 'scifi', 'Roland Emmerich', 139);
INSERT INTO films VALUES (15, 'Godzilla', 2014, 'scifi', 'Gareth Edwards', 123);



--
-- Name: films_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('films_id_seq', 15, true);


--
-- Name: films_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace:
--

ALTER TABLE ONLY films
    ADD CONSTRAINT films_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--
INSERT INTO films
(title, year, genre, director, duration) VALUES
('Wayne''s World', 1992, 'comedy', 'Penelope Spheeris', 95),
('Bourne Identity', 2002, 'espionage', 'Doug Liman', 118);

select distinct genre from films;
select *
from films;
select genre
from films group by genre;
-- Write a SQL query that determines the average duration across all the movies
-- in the films table, rounded to the nearest minute.
select round(avg(duration)) from films;

select genre, round(avg(duration)) as "average duration" from films group by genre;

select year / 10 * 10 as "decade", round(avg(duration)) -- clever to /10*10
from films group by decade order by decade;

select * from films
where director like 'John %'; -- forgot the space after John, which could
-- include names like Johnas or whatever

select genre, count(id) from films group by genre order by count(id) desc ;
select *
from films order by year;

select year / 10 * 10 as "decade", genre, string_agg(title, ', ') as "films"
from films group by decade, genre order by decade, genre;
-- that's a new aggregate function! Without it, the query didn't work

select genre, sum(duration) as "total duration" from films
group by genre order by "total duration";






















