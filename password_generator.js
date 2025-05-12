// const bcrypt = require('bcryptjs');
// const fs = require('fs');
// const { Client } = require('pg');
// require('dotenv').config();

// // PostgreSQL client setup
// const client = new Client({
//     host: process.env.PGHOST || 'localhost',  // Host address of the database (Railway or localhost)
//     port: process.env.PGPORT || 5432,        // Default PostgreSQL port (usually 5432)
//     user: process.env.PGUSER,                // Your PostgreSQL username (set in .env)
//     password: process.env.PGPASSWORD,        // Your PostgreSQL password (set in .env)
//     database: process.env.PGDATABASE,        // Your PostgreSQL database name (set in .env)
//     ssl: {
//       rejectUnauthorized: false,  // Required for Railway PostgreSQL (SSL)
//     },
//   });

// // Connect to the PostgreSQL database
// client.connect();

// // Function to generate IDs and passwords, hash them, and save to both database and CSV
// function generateIdsAndPasswords(year, classCode, n, passwordLength = 8) {
//     // Validations
//     if (!(year >= 1000 && year <= 9999)) {
//         throw new Error("Year must be a 4-digit number");
//     }
//     if (!(classCode.length === 2 && /^\d{2}$/.test(classCode))) {
//         throw new Error("Class code must be exactly 2 digits");
//     }

//     const idPasswordMap = {};
//     const yearPrefix = String(year).slice(-2);  // Last two digits of the year

//     for (let i = 1; i <= n; i++) {
//         const suffix = String(i).padStart(3, '0');  // Zero-padded 3-digit number
//         const userId = yearPrefix + classCode + suffix;
        
//         const rawPassword = generateRandomPassword(passwordLength);
        
//         // Hash the password with bcrypt
//         bcrypt.hash(rawPassword, 10, (err, hashedPassword) => {
//             if (err) throw err;
//             idPasswordMap[userId] = { rawPassword, hashedPassword };

//             // Save to the database
//             saveToDatabase(userId,  hashedPassword);

//             // If all passwords are hashed, save them to CSV
//             if (Object.keys(idPasswordMap).length === n) {
//                 saveToCsv(idPasswordMap);
//             }
//         });
//     }
// }

// // Generate a random password of the specified length
// function generateRandomPassword(length) {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     let password = '';
//     for (let i = 0; i < length; i++) {
//         password += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return password;
// }

// // Save the user credentials to the database
// function saveToDatabase(userId, hashedPassword) {
//     const query = {
//         text: 'INSERT INTO student(uid,password) VALUES($1, $2)',
//         values: [userId,hashedPassword],
//     };

//     client.query(query, (err, res) => {
//         if (err) {
//             console.error('Error inserting into the database', err);
//         }
//     });
// }

// // Save the user credentials to a CSV file
// function saveToCsv(data, filename = 'credentials.csv') {
//     const header = ['ID', 'Raw Password', 'Hashed Password'];
//     const rows = [];

//     for (const [userId, { rawPassword, hashedPassword }] of Object.entries(data)) {
//         rows.push([userId, rawPassword, hashedPassword]);
//     }

//     const csvContent = [header, ...rows]
//         .map(row => row.join(','))
//         .join('\n');

//     fs.writeFileSync(filename, csvContent, 'utf8');
// }

// // Example usage
// const year = 2025;
// const classCode = "05";
// const n = 180;
// const passwordLength = 8;

// generateIdsAndPasswords(year, classCode, n, passwordLength);
