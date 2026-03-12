# Backend: Add schedule_id and date_only to /my-bookings

Update your Express `/my-bookings` GET handler so the SELECT includes:
- **b.schedule_id** – so the app can open Boarding points when user taps "Track Bus".
- **date_only** – so Upcoming/Completed and Cancellation filters work correctly.

**Use this SQL in `app.get('/my-bookings', ...)`:**

```js
const sql = `
  SELECT 
    b.booking_id,
    b.schedule_id,
    b.pnr, b.seat_no, b.status, b.amount,
    DATE_FORMAT(s.departure, '%d %b %Y, %h:%i %p') as travel_date,
    DATE_FORMAT(s.departure, '%d %b %Y') as date_only,
    DATE_FORMAT(s.departure, '%h:%i %p') as dep_time,
    DATE_FORMAT(s.arrival, '%h:%i %p') as arr_time,
    bu.operator as bus_name, bu.type as bus_type,
    r.source as from_city, r.destination as to_city,
    IF(s.departure > NOW(), 'upcoming', 'completed') as trip_type
  FROM Bookings b
  JOIN Schedules s ON b.schedule_id = s.schedule_id
  JOIN Buses bu ON s.bus_id = bu.bus_id
  JOIN Routes r ON s.route_id = r.route_id
  WHERE b.user_id = (SELECT user_id FROM users WHERE phone = ?)
  ORDER BY s.departure ASC
`;
```

Replace your existing `/my-bookings` query with the above (ensure `schedule_id` and `date_only` are present).
