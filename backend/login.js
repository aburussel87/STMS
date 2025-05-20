const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Client } = require('pg');
require('dotenv').config(); 

const client = new Client({
  host: process.env.PGHOST || 'localhost',  // Host address of the database (Railway or localhost)
  port: process.env.PGPORT || 5432,        // Default PostgreSQL port (usually 5432)
  user: process.env.PGUSER,                // Your PostgreSQL username (set in .env)
  password: process.env.PGPASSWORD,        // Your PostgreSQL password (set in .env)
  database: process.env.PGDATABASE
});

client.connect().catch(err => {
  console.error('Database connection error:', err);
  process.exit(1); 
});

const authenticateUser = async (username, password) => {
  try {
 
    const res = await client.query('SELECT * FROM student WHERE Uid = $1', [username]);
    console.log('Query result:', res.rows); 


    if (res.rows.length === 0) {
      throw new Error('User not found');
    }

    const user = res.rows[0];


    const isMatch = await bcrypt.compare(password, user.password);

    
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.uid }, // Store user ID in the payload
      process.env.JWT_SECRET, // Use the secret key from environment variables
      { expiresIn: '1h' }    // Token expires in 1 hour
    );
    
    return { token };
  } catch (err) {
    console.error('Authentication error:', err);
    throw err; // Rethrow the error for handling at a higher level (e.g., in the controller)
  }
};

module.exports = { authenticateUser };

