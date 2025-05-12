import { CONFIG } from '../js/config.js';
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();  // Prevent the form from submitting the default way

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${CONFIG.BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      alert('Login successful!');

      // Store the token (e.g., in localStorage)
      localStorage.setItem('token', token);

      // Redirect or take any action after successful login
      window.location.href = '/dashboard.html';  // Example redirect after login
    } else {
      const error = await response.text();
      alert('Login failed: ' + error);
    }
  } catch (error) {
    alert('Error: ' + error);
  }
});
