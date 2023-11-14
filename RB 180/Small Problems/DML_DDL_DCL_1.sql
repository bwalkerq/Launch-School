/*
 DDL is data definition, deals with Schema, like
 CREATE TABLE name (columns types);
 ALTER TABLE Alter column set NOT NULL
 DROP

 DML is data manipulation, deals with selecting (reading), creating, and updating (writing) data, like
 INSERT into table (columns,...)
    values (...),...;
 UPDATE table_name
    SET column_name = value, ...
    WHERE expression;
 SELECT
 DELETE
*/

/*
 I did almost all of these questions rapid fire, and got them correct; they're
 all just about understanding the division between changing schema vs changing
 data. All of these just require knowing the commands.
 */

DROP DATABASE xyzzy; -- note that this deletes all data and schema, so it's a
--bit of both DDL and DML, *but* here at LS, we're calling it DDL

CREATE SEQUENCE part_number_sequence;
/*
 DDL
 CREATE SEQUENCE statements modify the characteristics and attributes of a
 database by adding a sequence object to the database structure. It does not
 actually manipulate any data, but instead manipulates the data definitions.
 As such, CREATE SEQUENCE statements are part of the DDL sublanguage.

 It could also be argued that CREATE SEQUENCE is DML; the sequence object it
 creates is a bit of data that is used to keep track of a sequence of
 automatically generated values, so it can be thought of as being part of the
 data instead of a characteristic of the data. However, all CREATE statements
 (not just CREATE SEQUENCE) are generally thought of as DDL.
 */

