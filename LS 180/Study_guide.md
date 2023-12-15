# SQL
- Identify the different types of JOINs and explain their differences. 
  - good.
- Name and define the three sublanguages of SQL and be able to classify different statements by sublanguage.
  - DDL - schema, grouping, data types, constraints
    - CREATE, ALTER, UPDATE, DROP
  - DML - interacting with the data within the schema
    - INSERT, UPDATE, DELETE
  - DCL
    - LOL
Write SQL statements using INSERT, UPDATE, DELETE, CREATE/ALTER/DROP TABLE, ADD/ALTER/DROP COLUMN.
- Understand how to use GROUP BY, ORDER BY, WHERE, and HAVING.
  - having is the WHERE keyword of queries that are formed with GROUP BY
    - Select --> (JOIN) --> Where --> Group By --> Having (many filters)
      - From-join (collect rows into a transient table)
       where (filter values out of it)
       group (group values into groups based on specified equality)
       having (filter the groups - similar to where)
        a filter condition that affects grouped objects
       compute functions & alias columns (perform functions on filtered values)
       sort by / order by (changing the display of our outputs)
       limit, offset (edited)
- Understand how to create and remove constraints, including CHECK constraints
  - We want all entries in our table `decks` to have a `name` entry with the word 
  `deck` in it somewhere, upper or lowercase. The `name` column already exists.
  The rule should be called `redundant_name`. Add this rule.
  - ALTER TABLE decks
    ADD CONSTRAINT redundant_name
    CHECK (name ILIKE('%deck%')); note that ILIKE checks that a string satisfies the (condition)
- Be familiar with using subqueries
  - IN is an operator, such as ILIKE, etc. Pass me an argument, and I'll
    resolve to a boolean.
  - IN, NOT IN, ALL, ANY and SOME (which are the same)
# PostgreSQL
- Describe what a sequence is and what they are used for.
  - besides serial?
  - is there a use-case for these beyond the primary key of a table?
  - A sequence is counted as a relation, the same as a table; they're not nested within tables
  - Once it generates a value, it won't generate it again
  - SELECT nextval('deck_id_seq')
- Create an auto-incrementing column.
  - Create table or alter table add column column_name serial
- Define a default value for a column.
  - 
- Be able to describe what primary, foreign, natural, and surrogate keys are.
  - P an F are constraints; P is there to identify a row in a table, 
    F is to establish a relationship between tables. You cannot have a FK that doesn't
    exist in the PK
  - natural - already existing info, avoid them; larger datasets will encounter edge cases that f this up
  - surrogate - better. use this. Its sole purpose is to identify the row within the table.
- Create and remove CHECK constraints from a column.
  - Table constraints, UNIQUE, CHECK, PRIMARY/FOREIGN KEY,  
  - Column Constraints NULL/NOT NULL, DEFAULT (behaves as a constraint)
  - ALTER table people
    add constraint born_check
    check ( age > 0 or stage_of_life = 'fetus');
- Create and remove foreign key constraints from a column.
  - did this
# Database Diagrams
- Talk about the different levels of schema.
  - Conceptual - database design
  - Logical (ignore in this course) - analogous to psuedo-code
  - Physical - 
- Define cardinality and modality. 
  - They describe a relationship between entities
    - cardinality - 1:1, 1:M, M:M, describe each, give examples
    - modality is 1 or 0, essentially whether a relationship is required or not, and on each side
- Be able to draw database diagrams using crow's foot notation.
  - meh