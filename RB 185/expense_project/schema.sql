CREATE TABLE expenses (
                          id serial primary key ,
                          amount numeric(6,2) not null ,
                          memo text not null ,
                          created_on date not null
)

ALTER TABLE expenses
    Add CONSTRAINT positive_amount check ( amount > 0.00 );

-- INSERT INTO expenses (amount, memo, created_on) VALUES (14.56, 'Pencils', NOW());
-- INSERT INTO expenses (amount, memo, created_on) VALUES (3.29, 'Coffee', NOW());
-- INSERT INTO expenses (amount, memo, created_on) VALUES (49.99, 'Text Editor', NOW());
