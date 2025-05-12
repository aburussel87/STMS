document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login.html";
    return;
  }

  try {
    const response = await fetch("/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Unauthorized");
    }

    const data = await response.json();

    document.getElementById("username").textContent = data.name;
    document.getElementById("email").textContent = data.email;
    document.getElementById("uid").textContent = data.uid;
  } catch (error) {
    alert("Authentication failed. Please login again.");
    localStorage.removeItem("token");
    window.location.href = "index.html";
  }
});

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}
