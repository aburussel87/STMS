const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Client } = require('pg');
require('dotenv').config(); 


// PostgreSQL client setup
const client = new Client({
  host:  process.env.PGHOST || 'localhost', 
  port: process.env.PGPORT || 5432,       
  user: process.env.PGUSER,      
  password: process.env.PGPASSWORD , 
  database: process.env.PGDATABASE, 
});

client.connect();

const authenticateUser = async (username, password) => {
  try {
    // Query for user by UID
    const res = await client.query('SELECT * FROM student WHERE Uid = $1', [username]);
    console.log('Query result:', res.rows); // Log the query result
    if (res.rows.length === 0) {
      throw { error: 'User not found' };
    }

    const user = res.rows[0];

    // Compare provided password with hashed password from DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw { error: 'Invalid credentials' };
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.uid },
      'secretKey', // ⚠️ Replace with env variable in production
      { expiresIn: '1h' }
    );

    return { token };
  } catch (err) {
    console.error('Authentication error:', err);
    throw err;
  }
};

module.exports = { authenticateUser };
