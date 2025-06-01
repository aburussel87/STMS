# 🧑‍💻 Developer Guide

## 📂 Adding a New Frontend Page

This project uses a shared dynamic header across all HTML pages to ensure consistent layout and navigation.

### ✅ Steps to Create a New Page (e.g., `profile.html`)

Use the following boilerplate structure when creating a new HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Profile</title>
</head>
<body>
  <header></header>

  <main>
    <!-- Page-specific content goes here -->
  </main>

  <!-- Automatically loads the shared header -->
  <script src="../public/js/header_loader.js"></script>
</body>
</html>
