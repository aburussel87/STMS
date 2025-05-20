// import { CONFIG } from '../js/config.js';
// const loginForm = document.getElementById('login-form');

// loginForm.addEventListener('submit', async (e) => {
//   e.preventDefault(); 

//   const username = document.getElementById('username').value;
//   const password = document.getElementById('password').value;

//   try {
//     const response = await fetch(`${CONFIG.BASE_URL}/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       const token = data.token;
//       alert('Login successful!');
//       localStorage.setItem('token', token);
//       window.location.href = '/dashboard.html';  
//     } else {
//       const error = await response.text();
//       alert('Login failed: ' + error);
//     }
//   } catch (error) {
//     alert('Error: ' + error);
//   }
// });

import { CONFIG } from '../js/config.js';
async function login(e) {
 console.log("Login function called");
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  try {
    const response = await fetch(`${CONFIG.BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      alert('Login successful!');
      localStorage.setItem('token', token);
      window.location.href = '/dashboard.html';  
    } else {
      const error = await response.text();
      alert('Login failed: ' + error);
    }
    
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again later.");
  }
}



document.getElementById("login").addEventListener("click", login);
