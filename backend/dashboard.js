// const express = require('express');
// const jwt = require('jsonwebtoken');
// const { Client } = require('pg');
// require('dotenv').config();

// const router = express.Router();
// const client = new Client({
//   host: process.env.PGHOST || 'localhost',  // Host address of the database (Railway or localhost)
//   port: process.env.PGPORT || 5432,        // Default PostgreSQL port (usually 5432)
//   user: process.env.PGUSER,                // Your PostgreSQL username (set in .env)
//   password: process.env.PGPASSWORD,        // Your PostgreSQL password (set in .env)
//   database: process.env.PGDATABASE,        // Your PostgreSQL database name (set in .env)
//   ssl: {
//     rejectUnauthorized: false,  // Required for Railway PostgreSQL (SSL)
//   },
// });

// client.connect();

// // Middleware to verify JWT
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, 'secretKey', (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

// // Dashboard route
// router.get('/api/dashboard', authenticateToken, async (req, res) => {
//   try {
//     const result = await client.query('SELECT * FROM student WHERE uid = $1', [req.user.userId]);

//     if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });

//     const user = result.rows[0];
//     res.json({
//       name: "Abu Russel",
//       email: "aburussel87@gmail.com",
//       uid: user.uid,
//     });
//   } catch (err) {
//     console.error('Dashboard error:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;


const express = require('express');
const jwt = require('jsonwebtoken');
const { Client } = require('pg');
require('dotenv').config();

const router = express.Router();

// PostgreSQL client setup using DATABASE_URL
const client = new Client({
  connectionString: process.env.DATABASE_URL, // Use DATABASE_URL from .env
  ssl: {
    rejectUnauthorized: false,  // Required for Railway PostgreSQL (SSL)
  },
});

client.connect();

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // Use JWT_SECRET from .env
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Dashboard route
router.get('/api/dashboard', authenticateToken, async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM student WHERE uid = $1', [req.user.userId]);

    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = result.rows[0];
    res.json({
      name: "Abu Russel",
      email: "aburussel87@gmail.com",
      uid: user.uid,
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

