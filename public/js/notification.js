const notifications = [
    "New assignment uploaded few minutes ago",
    "Your fee status has been updated",
    "Upcoming exam on Monday"
  ];

  const notificationList = document.getElementById("notificationList");

  notifications.forEach((message) => {
    const div = document.createElement("div");
    div.className = "border-bottom py-1";
    div.textContent = message;
    notificationList.appendChild(div);
  });

  const bell = document.getElementById('notificationBell');
  const popup = document.getElementById('notificationPopup');

  bell.addEventListener('click', () => {
    popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
  });

  document.addEventListener('click', function (event) {
    if (!popup.contains(event.target) && !bell.contains(event.target)) {
      popup.style.display = 'none';
    }
  });