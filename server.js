require('dotenv').config(); 
const express = require('express'); 
const path = require('path');
const { authenticateUser } = require('./backend/loginRouter'); 
const dashboardRouter = require('./backend/dashboardRouter'); 
const chatRouter = require('./backend/chatRouter')

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));



app.post('/login', async (req, res) => {
  console.log(req.body);  
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const { token } = await authenticateUser(username, password); 
    res.json({ token });  
  } catch (error) {
    res.status(400).json({ error: error.error || error.message });
  }
});


app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'index.html');
  console.log("Looking for file at:", filePath);  

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});


//router
app.use(dashboardRouter);
app.use(chatRouter);


app.listen(PORT, '0.0.0.0',() => {
  console.log(`Server is running on http://192.168.0.105:5000`);
});
