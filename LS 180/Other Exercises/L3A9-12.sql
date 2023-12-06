ALTER TABLE IF EXISTS ONLY public.books_categories DROP CONSTRAINT IF EXISTS books_categories_category_id_fkey;
ALTER TABLE IF EXISTS ONLY public.books_categories DROP CONSTRAINT IF EXISTS books_categories_book_id_fkey;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_pkey;
ALTER TABLE IF EXISTS ONLY public.books DROP CONSTRAINT IF EXISTS books_pkey;
ALTER TABLE IF EXISTS public.categories ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.books ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.categories_id_seq;
DROP TABLE IF EXISTS public.categories;
DROP SEQUENCE IF EXISTS public.books_id_seq;
DROP TABLE IF EXISTS public.books_categories;
DROP TABLE IF EXISTS public.books;


CREATE TABLE books (
                       id integer NOT NULL,
                       title character varying(32) NOT NULL,
                       author character varying(32) NOT NULL
);

CREATE TABLE books_categories (
                                  book_id integer,
                                  category_id integer
);

CREATE SEQUENCE books_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE categories (
                            id integer NOT NULL,
                            name character varying(32) NOT NULL
);

CREATE SEQUENCE categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE ONLY books ALTER COLUMN id SET DEFAULT nextval('books_id_seq'::regclass);

ALTER TABLE ONLY categories ALTER COLUMN id SET DEFAULT nextval('categories_id_seq'::regclass);

INSERT INTO books VALUES (1, 'A Tale of Two Cities', 'Charles Dickens');
INSERT INTO books VALUES (2, 'Harry Potter', 'J. K. Rowling');
INSERT INTO books VALUES (3, 'Einstein: His Life and Universe', 'Walter Isaacson');


INSERT INTO books_categories VALUES (1, 2);
INSERT INTO books_categories VALUES (1, 4);
INSERT INTO books_categories VALUES (2, 2);
INSERT INTO books_categories VALUES (2, 3);
INSERT INTO books_categories VALUES (3, 1);
INSERT INTO books_categories VALUES (3, 5);
INSERT INTO books_categories VALUES (3, 6);

SELECT pg_catalog.setval('books_id_seq', 3, true);


INSERT INTO categories VALUES (1, 'Nonfiction');
INSERT INTO categories VALUES (2, 'Fiction');
INSERT INTO categories VALUES (3, 'Fantasy');
INSERT INTO categories VALUES (4, 'Classics');
INSERT INTO categories VALUES (5, 'Biography');
INSERT INTO categories VALUES (6, 'Physics');

SELECT pg_catalog.setval('categories_id_seq', 6, true);



ALTER TABLE ONLY books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);

ALTER TABLE ONLY categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY books_categories
    ADD CONSTRAINT books_categories_book_id_fkey FOREIGN KEY (book_id) REFERENCES books(id);

ALTER TABLE ONLY books_categories
    ADD CONSTRAINT books_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id);

ALTER TABLE books_categories ALTER book_id set not null, alter category_id set not null ;

ALTER TABLE books_categories drop constraint books_categories_book_id_fkey1,
    drop constraint books_categories_category_id_fkey1;

ALTER TABLE books_categories add foreign key(book_id) references books(id)
    on delete cascade;
ALTER TABLE books_categories add foreign key(category_id) references categories(id)
    on delete cascade ;
/*
 remember that on delete cascade is added as a behavior of a foreign key *WHEN*
 that FK is *ADDED*. It's not a behavior that can be added separately.
 */

SELECT books.id, author, string_agg(c.name, ', ') as categories from books
join books_categories bc on books.id = bc.book_id
join categories c on bc.category_id = c.id
group by author, books.id
order by author;

insert into categories (name)
    values ('Space Exploration'), ('South Asia');

alter table books alter title type text;

insert into books (id, author, title)
values (default, 'Lynn Sherr', 'Sally Ride: America''s First Woman in Space'),
(default, 'Charlotte Brontë','Jane Eyre'),
(default, 'Meeru Dhalwala and Vikram Vij', 'Vij''s: Elegant and Inspired Indian Cuisine')
;

update categories
set name = 'Cookbook'
where id = 9;

insert into books_categories (book_id, category_id)
values (4,1),
       (4,5),
       (4,7),
       (5,2),
       (5,4),
       (6,9),
       (6,5),
       (6,8);

alter table books_categories add unique (book_id, category_id);

update categories
set name = 'Polemic'
where id = 10;

update books_categories
set category_id = 1
where book_id = 6 and category_id = 5;

SELECT categories.name, count(bc.category_id) as book_count,
       string_agg(b.title, ', ') as book_titles
FROM categories join books_categories bc on categories.id = bc.category_id
join books b on b.id = bc.book_id
group by categories.name
order by categories.name;









