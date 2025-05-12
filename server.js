require('dotenv').config(); 
const express = require('express'); 
const path = require('path');
const { authenticateUser } = require('./backend/login'); 
const dashboardRouter = require('./backend/dashboard'); 


const app = express();
const PORT = process.env.PORT || 3000; 

// Use built-in middleware for parsing JSON requests
app.use(express.json()); // For parsing JSON bodies
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded bodies


// Serve static files from the "assets" folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Serve static files from the "frontend" folder (including index.html)
app.use(express.static(path.join(__dirname, 'public')));


// Login route - Handle POST request to /login
app.post('/login', async (req, res) => {
  console.log(req.body);  // Check the request body
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const { token } = await authenticateUser(username, password); // Call backend authentication
    res.json({ token });  // Send back JWT token if login is successful
  } catch (error) {
    res.status(400).json({ error: error.error || error.message });
  }
});

// Serve index.html as the root of the website
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'index.html');
  console.log("Looking for file at:", filePath);  // Log the file path

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.use(dashboardRouter); // Use the dashboard router for API routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://192.168.0.175:${PORT}`);
});
