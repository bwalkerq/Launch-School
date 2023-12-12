Create TABLE bidders (
                         id serial primary key ,
                         name text not null
);

CREATE TABLE items (
                       id serial primary key ,
                       name text not null,
                       initial_price numeric(6,2) not null
                           check ( initial_price BETWEEN 0.01 and 1000.00),
                       sales_price numeric(6,2)
                           check ( sales_price BETWEEN 0.01 and 1000.00)
);

CREATE TABLE bids (
                      id serial primary key ,
                      bidder_id int not null references bidders(id) on delete cascade ,
                      item_id int not null references items(id) on delete cascade ,
                      amount numeric(6,2) not null
                          check ( amount BETWEEN 0.01 and 1000.00)
);

CREATE INDEX on bids (bidder_id, item_id)

--here we use the psql command
\copy bidders from 'bidders.csv' header csv
--and the other two, in the same format
/*
 the benefit of the psql \copy is that we can use a relative path
 */
SELECT name as "bid on items" from items
                              where items.id in (select distinct item_id from bids);
-- note that 'id' from 'items' links to the 'item_id' from 'bids', very similar to a join 'on' statement

SELECT name as "Not Bid On" from items
                              where items.id not in (select distinct item_id from bids);

SELECT name from bidders where exists( SELECT 1 from bids where bids.bidder_id = bidders.id) order by name;
--this seems arbitrary AF
SELECT distinct name from bidders join bids b on bidders.id = b.bidder_id order by name;
--way more natural for me
SELECT max(number) from (Select count(bids.bidder_id) as number from bids group by bidder_id) as max;
SELECT max(number) from (Select count(bids.item_id) as number from bids group by item_id) as max;
Select count(bids.item_id) as number from bids group by item_id;
Select count(bids.bidder_id) as number from bids group by bidder_id;
/*
interesting that within the subquery, bids.item_id and bids.bidder_id return the
same results(!) because, coincidence: the greatest number of bids on an item,
and the greatest number of bids from a person both happen to be 9. (problem
writing).
*/

SELECT items.name, (SELECT count(bids.item_id)
                    from bids where items.id = bids.item_id) from items
order by name;
SELECT items.name, count(b.item_id) from items
    left join bids b on items.id = b.item_id
group by items.name order by name;

SELECT id from items where ROW(name, initial_price, sales_price) = ROW ('Painting', 100.00, 250.00);
/*This is an example of a problem where seeing an example (from the solution,
  unfortunately, was all I needed. This corresponding-values type comparison
  makes immediate sense to me.
  */

EXPLAIN SELECT name FROM bidders
        WHERE EXISTS (SELECT 1 FROM bids WHERE bids.bidder_id = bidders.id);
EXPLAIN ANALYSE SELECT name FROM bidders
        WHERE EXISTS (SELECT 1 FROM bids WHERE bids.bidder_id = bidders.id);

EXPLAIN ANALYZE SELECT MAX(bid_counts.count) FROM
    (SELECT COUNT(bidder_id) FROM bids GROUP BY bidder_id) AS bid_counts;

EXPLAIN ANALYZE SELECT COUNT(bidder_id) AS max_bid FROM bids
                GROUP BY bidder_id
                ORDER BY max_bid DESC
                LIMIT 1;