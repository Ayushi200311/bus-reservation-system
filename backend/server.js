const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bus_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((err, connection) => {
  if (err) console.error('Error connecting to MySQL:', err);
  else {
    console.log('Connected to MySQL Database (Pool)!');
    connection.release();
  }
});

// ============== USER ROUTES ==============
app.post('/signup', (req, res) => {
  const { name, phone, email } = req.body;
  const generatedOtp = Math.floor(100000 + Math.random() * 900000);
  const sql = "INSERT INTO users (name, phone, email) VALUES (?, ?, ?)";
  db.query(sql, [name, phone, email], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err.message });
    return res.status(200).json({ message: 'User added successfully', otp: generatedOtp });
  });
});

app.post('/login', (req, res) => {
  const { phone } = req.body;
  const generatedOtp = Math.floor(100000 + Math.random() * 900000);
  const sql = "SELECT * FROM users WHERE phone = ?";
  db.query(sql, [phone], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.length > 0) {
      return res.status(200).json({ message: 'Login successful', otp: generatedOtp });
    } else {
      return res.status(404).json({ message: 'Phone number not registered' });
    }
  });
});

app.get('/cities', (req, res) => {
  db.query("SELECT * FROM cities ORDER BY city_name ASC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.get('/search-buses', (req, res) => {
  const { fromCity, toCity, date } = req.query;
  if (!fromCity || !toCity || !date) return res.status(400).json({ error: "Missing parameters" });
  let dbDate = date;
  if (date.includes('/')) {
    const [d, m, y] = date.split('/');
    dbDate = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  const sql = `
    SELECT s.schedule_id, b.bus_number, b.operator AS bus_name, b.type AS bus_type, b.seats AS total_seats,
    (b.seats - COALESCE(SUM(CASE WHEN bk.status = 'Confirmed' THEN 1 ELSE 0 END), 0)) AS seats_left,
    DATE_FORMAT(s.departure, '%H:%i') AS departure_time, DATE_FORMAT(s.arrival, '%H:%i') AS arrival_time, s.price
    FROM Schedules s JOIN Routes r ON s.route_id = r.route_id JOIN Buses b ON s.bus_id = b.bus_id
    LEFT JOIN Bookings bk ON bk.schedule_id = s.schedule_id
    WHERE r.source = ? AND r.destination = ? AND s.journey_date = ?
    GROUP BY s.schedule_id, b.bus_number, b.operator, b.type, b.seats, s.departure, s.arrival, s.price
  `;
  db.query(sql, [fromCity, toCity, dbDate], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/profile', (req, res) => {
  const { phone } = req.query;
  db.query("SELECT * FROM users WHERE phone = ?", [phone], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(result[0]);
  });
});

app.put('/update-profile', (req, res) => {
  const { phone, name, email, gender, insurance } = req.body;
  db.query("UPDATE users SET name = ?, email = ?, gender = ?, insurance = ? WHERE phone = ?", [name, email, gender, insurance, phone], (err) => {
    if (err) return res.status(500).json({ error: "Update failed" });
    res.json({ message: "Profile updated successfully!" });
  });
});

app.get('/get-seats', (req, res) => {
  const { scheduleId } = req.query;
  const sql = "SELECT s.bus_id, s.price, b.seats FROM schedules s JOIN buses b ON s.bus_id = b.bus_id WHERE s.schedule_id = ?";
  db.query(sql, [scheduleId], (err, result) => {
    if (err || result.length === 0) return res.status(404).json({ error: "Trip not found" });
    const { bus_id, price, seats: totalSeats } = result[0];
    db.query("SELECT seat_no, passenger_gender FROM bookings WHERE schedule_id = ? AND status = 'Confirmed'", [scheduleId], (err, bookedResults) => {
      const bookedMap = {};
      if (bookedResults) bookedResults.forEach(b => { bookedMap[b.seat_no] = b.passenger_gender ? b.passenger_gender.toLowerCase() : 'male'; });
      const seats = [];
      const rows = Math.ceil((totalSeats / 2) / 3);
      const createSeat = (deck, r, c) => {
        const id = `${deck === 'lower' ? 'L' : 'U'}${r}${c}`;
        let status = bookedMap[id] ? (bookedMap[id] === 'female' ? 'female' : 'booked') : 'available';
        seats.push({ id, status, price: price.toString(), deck, row: r, col: c, bus_id });
      };
      for (let r = 1; r <= rows; r++) [1, 2, 3].forEach(c => { createSeat('lower', r, c); createSeat('upper', r, c); });
      res.json(seats);
    });
  });
});

app.get('/get-bus-points', (req, res) => {
  const { scheduleId } = req.query;
  const sql = `SELECT bs.type, bs.location, TIME_FORMAT(bs.time, '%H:%i') as time FROM BusStops bs JOIN Schedules s ON bs.bus_id = s.bus_id WHERE s.schedule_id = ?`;
  db.query(sql, [scheduleId], (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    const boarding = results.filter(r => r.type.toLowerCase() === 'boarding');
    const dropping = results.filter(r => r.type.toLowerCase() === 'dropping');
    res.json({ boarding, dropping });
  });
});

app.post('/cancel-booking', (req, res) => {
  const { bookingId } = req.body;
  db.query("UPDATE bookings SET status = 'Cancelled' WHERE booking_id = ?", [bookingId], (err, result) => {
    if (err) return res.status(500).json({ message: "Database Error" });
    res.json({ message: "Successfully cancelled" });
  });
});

app.post('/book-ticket', (req, res) => {
  const { userPhone, scheduleId, totalAmount, passengers } = req.body;
  if (!userPhone || !scheduleId || !passengers || passengers.length === 0) return res.status(400).json({ error: "Missing required booking details" });
  const unitPrice = totalAmount / passengers.length;
  db.query("SELECT user_id FROM users WHERE phone = ?", [userPhone], (err, userRes) => {
    if (err || userRes.length === 0) return res.status(404).json({ error: "User not found" });
    const userId = userRes[0].user_id;
    const seatNumbers = passengers.map(p => p.seatId);
    db.query("SELECT seat_no FROM bookings WHERE schedule_id = ? AND seat_no IN (?) AND status = 'Confirmed'", [scheduleId, seatNumbers], (err, bookedSeats) => {
      if (err) return res.status(500).json({ error: "Seat check failed" });
      if (bookedSeats.length > 0) return res.status(400).json({ error: "Some seats were just taken. Please refresh.", seats: bookedSeats });
      const values = passengers.map(p => [userId, scheduleId, p.seatId, unitPrice, 'Confirmed', p.name, p.age, p.gender.toLowerCase(), 'TXN-' + Math.floor(100000 + Math.random() * 900000)]);
      db.query("INSERT INTO bookings (user_id, schedule_id, seat_no, amount, status, passenger_name, passenger_age, passenger_gender, pnr) VALUES ?", [values], (err, result) => {
        if (err) return res.status(500).json({ error: "Booking failed" });
        res.json({ message: "Booking successful!", pnr: values[0][8] });
      });
    });
  });
});

app.get('/my-bookings', (req, res) => {
  const { phone } = req.query;
  const sql = `SELECT b.booking_id, b.pnr, b.seat_no, b.status, b.amount, b.passenger_name,
    DATE_FORMAT(s.departure, '%d %b %Y, %h:%i %p') as travel_date, DATE_FORMAT(s.arrival, '%H:%i') as arr_time,
    DATE_FORMAT(s.departure, '%h:%i %p') as dep_time, DATE_FORMAT(s.departure, '%d %b %Y') as date_only,
    bu.operator as bus_name, bu.type as bus_type, r.source as from_city, r.destination as to_city, s.schedule_id,
    CASE WHEN DATE(s.departure) >= DATE(NOW()) AND b.status = 'Confirmed' THEN 'upcoming' ELSE 'completed' END as trip_type
    FROM Bookings b JOIN Schedules s ON b.schedule_id = s.schedule_id JOIN Buses bu ON s.bus_id = bu.bus_id
    JOIN Routes r ON s.route_id = r.route_id WHERE b.user_id = (SELECT user_id FROM users WHERE phone = ?) ORDER BY b.booking_id DESC`;
  db.query(sql, [phone], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/confirm-payment', (req, res) => {
  const { pnr, amount, method } = req.body;
  if (!pnr) return res.status(400).json({ error: "PNR is missing" });
  const payMethod = method || 'UPI';
  const payAmount = parseFloat(amount) || 0;
  db.query("UPDATE Bookings SET status = 'Confirmed' WHERE pnr = ?", [pnr], (err) => {
    if (err) return res.status(500).json({ error: "Database Error" });
    db.query("SELECT booking_id FROM bookings WHERE pnr = ?", [pnr], (err2, rows) => {
      if (!err2 && rows && rows.length > 0) {
        const bookingId = rows[0].booking_id;
        db.query("INSERT INTO payments (booking_id, amount, method, status) VALUES (?, ?, ?, 'Success')", [bookingId, payAmount, payMethod], () => {});
      }
      res.json({ message: "Payment Successful! Booking Confirmed.", pnr });
    });
  });
});

app.get('/notifications', (req, res) => {
  const { phone } = req.query;
  if (!phone) return res.status(400).json({ error: "Phone required" });
  db.query("SELECT * FROM Notifications WHERE user_id = (SELECT user_id FROM users WHERE phone = ?) ORDER BY created_at DESC", [phone], (err, results) => {
    if (err) return res.status(500).json({ error: "Database Error" });
    res.json(results);
  });
});

// ============== ADMIN ROUTES ==============
app.post('/admin-login', (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM admins WHERE username = ? AND password = ?", [username, password], (err, result) => {
    if (err) return res.status(500).json({ error: "Database Error" });
    if (result.length > 0) res.json({ message: "Admin Login Successful", role: 'admin' });
    else res.status(401).json({ error: "Invalid Admin Credentials" });
  });
});

app.post('/admin/add-bus', (req, res) => {
  const { bus_number, operator, type, seats } = req.body;
  const sql = "INSERT INTO Buses (bus_number, operator, seats, type, status, route_id) VALUES (?, ?, ?, ?, 'Active', 1)";
  db.query(sql, [bus_number, operator, parseInt(seats) || 36, type], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Bus Added Successfully", busId: result.insertId });
  });
});

app.get('/admin/buses', (req, res) => {
  db.query("SELECT bus_id, bus_number, operator, type, seats, status FROM buses ORDER BY bus_id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.put('/admin/bus/:id', (req, res) => {
  const { id } = req.params;
  const { bus_number, operator, type, seats } = req.body;
  db.query("UPDATE buses SET bus_number = ?, operator = ?, type = ?, seats = ? WHERE bus_id = ?", [bus_number, operator, type, parseInt(seats), id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Bus Updated" });
  });
});

app.delete('/admin/bus/:id', (req, res) => {
  db.query("DELETE FROM buses WHERE bus_id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Bus Deleted" });
  });
});

app.post('/admin/add-route', (req, res) => {
  const { source, destination, distance, duration } = req.body;
  const formattedDuration = duration && duration.includes(':') && duration.split(':').length === 2 ? `${duration}:00` : duration || '00:00:00';
  db.query("INSERT INTO Routes (source, destination, distance, duration) VALUES (?, ?, ?, ?)", [source, destination, distance, formattedDuration], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Route Added Successfully", routeId: result.insertId });
  });
});

app.get('/admin/routes', (req, res) => {
  db.query("SELECT route_id, source, destination, distance, TIME_FORMAT(duration, '%H:%i') as duration FROM routes ORDER BY route_id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.put('/admin/update-route/:id', (req, res) => {
  const { source, destination, distance, duration } = req.body;
  const formattedDuration = duration && duration.includes(':') && duration.split(':').length === 2 ? `${duration}:00` : duration || '00:00:00';
  db.query("UPDATE Routes SET source = ?, destination = ?, distance = ?, duration = ? WHERE route_id = ?", [source, destination, distance, formattedDuration, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Route Updated Successfully" });
  });
});

app.delete('/admin/delete-route/:id', (req, res) => {
  db.query("DELETE FROM Routes WHERE route_id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Route Deleted Successfully" });
  });
});

app.post('/admin/add-schedule', (req, res) => {
  const { bus_id, route_id, departure, arrival, price } = req.body;
  if (!bus_id || !route_id || !departure || !price) return res.status(400).json({ error: "bus_id, route_id, departure, price required" });
  const dep = new Date(departure);
  const journeyDate = dep.toISOString().slice(0, 10);
  const arr = arrival ? new Date(arrival) : new Date(dep.getTime() + 8 * 60 * 60 * 1000);
  const arrStr = arr.toISOString().slice(0, 19).replace('T', ' ');
  const depStr = dep.toISOString().slice(0, 19).replace('T', ' ');
  db.query("INSERT INTO Schedules (bus_id, route_id, departure, arrival, journey_date, price) VALUES (?, ?, ?, ?, ?, ?)", [bus_id, route_id, depStr, arrStr, journeyDate, parseFloat(price)], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Schedule Added Successfully", scheduleId: result.insertId });
  });
});

app.get('/admin/schedules', (req, res) => {
  const sql = `SELECT s.schedule_id, s.price, DATE_FORMAT(s.departure, '%Y-%m-%d %H:%i:%s') as departure, DATE_FORMAT(s.arrival, '%Y-%m-%d %H:%i:%s') as arrival, b.bus_number, b.operator, r.source, r.destination FROM Schedules s JOIN Buses b ON s.bus_id = b.bus_id JOIN Routes r ON s.route_id = r.route_id ORDER BY s.departure DESC`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.put('/admin/schedule/:id', (req, res) => {
  const { price, departure, arrival } = req.body;
  db.query("UPDATE Schedules SET price = ?, departure = ?, arrival = ? WHERE schedule_id = ?", [price, departure, arrival, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Schedule Updated Successfully" });
  });
});

app.delete('/admin/schedule/:id', (req, res) => {
  db.query("DELETE FROM Schedules WHERE schedule_id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Schedule Deleted" });
  });
});

app.get('/admin/bookings', (req, res) => {
  const sql = `SELECT b.booking_id, b.pnr, u.name AS full_name, u.phone, b.seat_no AS seat_number, b.status AS booking_status, b.booking_date, bu.operator AS bus_name FROM Bookings b JOIN users u ON b.user_id = u.user_id JOIN Schedules s ON b.schedule_id = s.schedule_id JOIN Buses bu ON s.bus_id = bu.bus_id ORDER BY b.booking_date DESC`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/admin/get-cities', (req, res) => {
  db.query("SELECT id, city_name FROM cities ORDER BY city_name ASC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Cities: DB has id, city_name only (no state)
app.get('/admin/cities', (req, res) => {
  db.query("SELECT id, city_name as name FROM cities ORDER BY city_name ASC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/admin/add-city', (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) return res.status(400).json({ error: "City name is required" });
  db.query("INSERT INTO cities (city_name) VALUES (?)", [name.trim()], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "City added", id: result.insertId });
  });
});

app.put('/admin/update-city/:id', (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) return res.status(400).json({ error: "City name is required" });
  db.query("UPDATE cities SET city_name = ? WHERE id = ?", [name.trim(), req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "City updated" });
  });
});

app.delete('/admin/delete-city/:id', (req, res) => {
  db.query("DELETE FROM cities WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "City deleted" });
  });
});

// Busstops: DB has stop_id, bus_id, type (Boarding/Dropping), location, time
app.get('/admin/busstops', (req, res) => {
  const sql = `SELECT bs.stop_id, bs.bus_id, bs.type, bs.location, TIME_FORMAT(bs.time, '%H:%i') as time, b.bus_number FROM busstops bs JOIN buses b ON bs.bus_id = b.bus_id ORDER BY bs.bus_id, bs.type, bs.time`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/admin/add-busstop', (req, res) => {
  const { bus_id, type, location, time } = req.body;
  if (!bus_id || !type || !location) return res.status(400).json({ error: "bus_id, type, and location required" });
  const validType = type.toLowerCase() === 'boarding' ? 'Boarding' : 'Dropping';
  const timeStr = time ? (time.includes(':') && time.split(':').length === 2 ? `${time}:00` : time) : '00:00:00';
  db.query("INSERT INTO busstops (bus_id, type, location, time) VALUES (?, ?, ?, ?)", [bus_id, validType, location, timeStr], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Bus stop added", id: result.insertId });
  });
});

app.put('/admin/update-busstop/:id', (req, res) => {
  const { bus_id, type, location, time } = req.body;
  const validType = type && type.toLowerCase() === 'boarding' ? 'Boarding' : 'Dropping';
  const timeStr = time ? (time.includes(':') && time.split(':').length === 2 ? `${time}:00` : time) : '00:00:00';
  db.query("UPDATE busstops SET bus_id = ?, type = ?, location = ?, time = ? WHERE stop_id = ?", [bus_id, validType, location, timeStr, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Bus stop updated" });
  });
});

app.delete('/admin/delete-busstop/:id', (req, res) => {
  db.query("DELETE FROM busstops WHERE stop_id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Bus stop deleted" });
  });
});

// Admins: DB has admin_id, username, password only
app.get('/admin/admins', (req, res) => {
  db.query("SELECT admin_id, username FROM admins ORDER BY admin_id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/admin/add-admin', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Username and password required" });
  db.query("INSERT INTO admins (username, password) VALUES (?, ?)", [username.trim(), password], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Admin added", id: result.insertId });
  });
});

app.delete('/admin/delete-admin/:id', (req, res) => {
  db.query("DELETE FROM admins WHERE admin_id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Admin deleted" });
  });
});

app.get('/admin/users', (req, res) => {
  db.query("SELECT user_id, name, phone, email, gender FROM users ORDER BY user_id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "DB Error" });
    res.json(results);
  });
});

// Transactions: bookings has user_id, not user_phone - join users
app.get('/admin/transactions', (req, res) => {
  const sql = `SELECT b.booking_id, b.pnr, b.amount, b.status, b.booking_date, u.name, u.phone FROM bookings b JOIN users u ON b.user_id = u.user_id ORDER BY b.booking_date DESC`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "DB Error" });
    res.json(results);
  });
});

app.post('/admin/broadcast', (req, res) => {
  const { title, message } = req.body;
  db.query("SELECT user_id FROM users", (err, users) => {
    if (err) return res.status(500).json({ error: "DB Error" });
    const values = users.map(u => [u.user_id, title || 'Notification', message || '', 'Offer']);
    if (values.length > 0) {
      db.query("INSERT INTO Notifications (user_id, title, message, type) VALUES ?", [values], (err, result) => {
        if (err) return res.status(500).json({ error: "Insert Error" });
        res.json({ message: `Sent to ${values.length} users!` });
      });
    } else res.json({ message: "No users found" });
  });
});

app.post('/admin/generate-schedules', (req, res) => {
  const { bus_id, route_id, departure_time, arrival_time, price, days } = req.body;
  if (!bus_id || !route_id || !departure_time || !arrival_time || !price) return res.status(400).json({ error: "bus_id, route_id, departure_time, arrival_time, price required" });
  const totalDays = days && Number.isInteger(parseInt(days)) ? parseInt(days) : 30;
  const today = new Date();
  const values = [];
  for (let i = 0; i < totalDays; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const journeyDate = d.toISOString().slice(0, 10);
    values.push([bus_id, route_id, `${journeyDate} ${departure_time}`, `${journeyDate} ${arrival_time}`, parseFloat(price), journeyDate]);
  }
  db.query("INSERT INTO Schedules (bus_id, route_id, departure, arrival, price, journey_date) VALUES ?", [values], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to generate schedules" });
    res.json({ message: `Created ${values.length} schedules`, inserted: result.affectedRows });
  });
});

app.listen(3000, '0.0.0.0', () => console.log('Server running on port 3000'));
