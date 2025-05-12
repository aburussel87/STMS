const { Pool } = require('pg');

// Configure your DB connection
const pool = new Pool({
  user: 'system',
  host: 'localhost', // or your IP
  database: 'postgres',
  password: 'Russel87',
  port: 5432, // default PostgreSQL port
});

pool.query('SELECT * FROM "User"', (err, res) => {
    if (err) {
      console.error('Error connecting to DB:', err);
    } else {
      console.log('Users:', res.rows);
      console.log('Number of users:', res.rowCount);
      res.rows.forEach((row) => {
        console.log(`User ID: ${row.user_id}, Name: ${row.username}`);
      });
    }
    pool.end(); // Close the connection
  });
