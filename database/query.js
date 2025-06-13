
const { Client } = require('pg');

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

async function getUserInfo(uid) {
  try {
    const query = 'SELECT * FROM "User" WHERE user_id = $1';
    const result = await client.query(query, [uid]);

    if (result.rows.length === 0) {
      return null; 
    }
    return result.rows[0];
  } catch (err) {
    console.error('Error fetching user info:', err);
    throw err;
  }
}

async function getRoleInfo(uid){

}

module.exports = {
    getUserInfo,
    getRoleInfo
};
