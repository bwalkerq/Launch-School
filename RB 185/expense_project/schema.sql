CREATE TABLE expenses (
                          id serial primary key ,
                          amount numeric(6,2) not null ,
                          memo text not null ,
                          created_on date not null
)

ALTER TABLE expenses
    Add CONSTRAINT positive_amount check ( amount > 0.00 );

