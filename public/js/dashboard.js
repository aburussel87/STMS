import {CONFIG} from '../js/config.js';

window.onload = async function () {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('You are not logged in!');
    window.location.href = '/index.html';
    return;
  }

  try {
    const response = await fetch(`${CONFIG.BASE_URL}/api/dashboard`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      const user = data.user;
      console.log(user);
    } else {
      const error = await response.json();
      alert('Failed to load dashboard: ' + (error.error || 'Unknown error'));
      window.location.href = '/index.html';
    }

  } catch (err) {
    console.error('Error fetching dashboard:', err);
    alert('Something went wrong.');
    window.location.href = '/index.html';
  }
};

// loginChart.js
 
let loginChart;
 
function updateLoginChart(labels, data) {
  const ctx = document.getElementById('loginChart').getContext('2d');
 
  // Destroy existing chart if already initialized
  if (loginChart) {
    loginChart.destroy();
  }
 
  loginChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Student Logins',
        data: data,
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(201, 203, 207, 0.6)'
        ],
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}
 
// Hardcoded sample data for demonstration
document.addEventListener('DOMContentLoaded', () => {
  const sampleLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const sampleData = [5, 12, 8, 6, 9, 3, 7]; // Number of logins per day
  updateLoginChart(sampleLabels, sampleData);
});
 
 
 
 
// routine.js
 
function updateRoutine(routineMap) {
  const today = new Date();
  const weekday = today.toLocaleDateString('en-US', { weekday: 'long' });
  const formattedDate = today.toLocaleDateString('en-GB'); // dd/mm/yyyy
 
  // Set date text
  document.getElementById('currentDate').innerText = `${weekday}, ${formattedDate}`;
 
  // Get today's routine
  const todayRoutine = routineMap[weekday] || ["No classes scheduled."];
 
  // Clear existing list
  const list = document.getElementById('routineList');
  list.innerHTML = '';
 
  // Populate with routine items
  todayRoutine.forEach(item => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = item;
    list.appendChild(li);
  });
}
 
// Sample hardcoded data
document.addEventListener('DOMContentLoaded', () => {
  const routineData = {
    Monday: ["Math - 9:00 AM", "Physics - 11:00 AM", "CS Lab - 2:00 PM"],
    Tuesday: ["Chemistry - 10:00 AM", "English - 1:00 PM"],
    Wednesday: ["Free Day"],
    Thursday: ["Math - 9:00 AM", "ICT - 12:00 PM"],
    Friday: ["Math - 9:00 AM", "ICT - 12:00 PM","Math - 9:00 AM", "Physics - 11:00 AM", "CS Lab - 2:00 PM"],
    Saturday: ["Mock Test - 11:00 AM"],
    Sunday: ["Holiday"]
  };
 
  updateRoutine(routineData);
});
