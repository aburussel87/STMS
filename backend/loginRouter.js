const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Client } = require('pg');
require('dotenv').config(); 

const client = new Client({
  host: process.env.PGHOST || 'localhost',  
  port: process.env.PGPORT || 5432,        
  user: process.env.PGUSER,             
  password: process.env.PGPASSWORD,       
  database: process.env.PGDATABASE
});

client.connect().catch(err => {
  console.error('Database connection error:', err);
  process.exit(1); 
});

const authenticateUser = async (username, password) => {
  try {
 
    const res = await client.query('SELECT * FROM "User" WHERE user_id = $1', [username]);
    console.log('Query result:', res.rows); 


    if (res.rows.length === 0) {
      throw new Error('User not found');
    }

    const user = res.rows[0];


    const isMatch = await bcrypt.compare(password, user.password_hash);

    
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.user_id }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRATION }    
    );
    
    return { token };
  } catch (err) {
    console.error('Authentication error:', err);
    throw err;
  }
};

module.exports = { authenticateUser };

