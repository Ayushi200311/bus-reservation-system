const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Your MySQL username
  password: '',      // Your MySQL password
  database: 'bus_app'
});

db.connect(err => {
  if (err) console.log('Database Connection Error:', err);
  else console.log('MySQL Connected!');
});

// ---------- BASIC USER SIGNUP ----------
app.post('/signup', (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  const sql = 'INSERT INTO users (name, phone) VALUES (?, ?)';
  db.query(sql, [name, phone], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'User registered successfully!' });
  });
});

// ---------- SIMPLE ADMIN LOGIN ----------
// For now this uses a fixed username/password.
// You can later switch this to check your `admins` table.
app.post('/admin-login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Demo credentials – change these as you like
  const ADMIN_USER = 'admin';
  const ADMIN_PASS = 'admin123';

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.status(200).json({ message: 'Admin login successful' });
  }

  return res.status(401).json({ error: 'Invalid admin credentials' });
});

// ---------- CITIES ----------
// GET /admin/cities  → list cities
app.get('/admin/cities', (req, res) => {
  const sql = 'SELECT city_id, name, state FROM cities ORDER BY name ASC';
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /admin/add-city → add a city
app.post('/admin/add-city', (req, res) => {
  const { name, state } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'City name is required' });
  }

  const sql = 'INSERT INTO cities (name, state) VALUES (?, ?)';
  db.query(sql, [name, state || null], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'City added', id: result.insertId });
  });
});

// ---------- BUS STOPS ----------
// GET /admin/busstops → list bus stops
app.get('/admin/busstops', (req, res) => {
  const sql = `
    SELECT stop_id, stop_name, city_name, landmark
    FROM busstops
    ORDER BY city_name, stop_name
  `;
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /admin/add-busstop → add a bus stop
app.post('/admin/add-busstop', (req, res) => {
  const { city_name, stop_name, landmark } = req.body;
  if (!stop_name) {
    return res.status(400).json({ error: 'Stop name is required' });
  }

  const sql = `
    INSERT INTO busstops (city_name, stop_name, landmark)
    VALUES (?, ?, ?)
  `;
  db.query(sql, [city_name || null, stop_name, landmark || null], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Bus stop added', id: result.insertId });
  });
});

// ---------- ADMIN USERS ----------
// GET /admin/admins → list admin users
app.get('/admin/admins', (req, res) => {
  const sql = 'SELECT admin_id, name, email, role FROM admins ORDER BY admin_id DESC';
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /admin/add-admin → add admin user (for listing / future login)
app.post('/admin/add-admin', (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const sql = 'INSERT INTO admins (name, email, role) VALUES (?, ?, ?)';
  db.query(sql, [name, email, role || null], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Admin user added', id: result.insertId });
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
