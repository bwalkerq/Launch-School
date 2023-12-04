select count(id) from tickets;

select count( distinct customer_id) from tickets;
-- reversed count and distinct order, also learned that datarip shows the first 500 rows of a table; smart

select round( count( distinct t.customer_id)
                  / count( distinct c.id)::decimal * 100, 2)
    as percent
from customers c left outer join tickets t on c.id = t.customer_id
/*
 for quite a while I was tripped up for why we needed 'distinct' on the c.id,
 because there are exactly 10,000 customers, and none of the id's are repeated
 in the customer table; the reason is that we're joining, so the resulting table is
 repeating the c.id within the joined row for each ticket that the customer
 purchased. We use LEFT OUTER so that we get the c.id's that didn't purchase
 any tickets
 */

Select name, count(t.event_id) as popularity from events
    join tickets t on events.id = t.event_id
group by name
order by popularity desc;

select c.id, c.email, count(distinct t.event_id) as count from customers c
    join tickets t on c.id = t.customer_id
group by c.id
having count(distinct t.event_id) = 3
order by c.id;

select e.name, e.starts_at, sections.name, s.row, s.number from events e
join tickets t on e.id = t.event_id
    join seats s on s.id = t.seat_id
    join sections on s.section_id = sections.id
join customers c on t.customer_id = c.id
where c.email = 'gennaro.rath@mcdermott.co'





































