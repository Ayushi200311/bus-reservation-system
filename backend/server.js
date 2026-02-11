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
  password: '', // Your MySQL password
  database: 'bus_app'
});

db.connect(err => {
  if (err) console.log("Database Connection Error:", err);
  else console.log("MySQL Connected!");
});

// Signup Route
app.post('/signup', (req, res) => {
  const { name, phone } = req.body;
  const sql = "INSERT INTO users (name, phone) VALUES (?, ?)";
  
  db.query(sql, [name, phone], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "User registered successfully!" });
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));