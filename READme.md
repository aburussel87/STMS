
# Institutional Information System

This project is a web-based Institutional Information System featuring a dynamic frontend with reusable components, and a Node.js backend managing authentication, chat, dashboard, and database operations.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm (comes with Node.js)
- PostgreSQL or your preferred database

### Installation

1. Clone the repository:
   ```bash
   git clone https://your-repo-url.git
   cd your-project-folder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup your database and configure connection details in `backend/database.js` (or your config file).

4. Run the server:
   ```bash
   node server.js
   ```

5. Open frontend pages via your local server or file system (e.g., `public/index.html`).

---

## 📁 Project Directory Structure

```
.
├── backend
│   ├── chat.js                          // all js file used for backend
├── credentials.csv
├── database
│   ├──                                  // database information
├── package-lock.json
├── package.json
├── password_generator.js
├── public
│   ├── chat.html                        // all html files
│   ├── css                              // all css files
│   ├── js                               // al js files used for frontend
├── README.md
├── schema.txt
└── server.js
```

### Description:

- **backend/** — Server-side scripts handling chat, dashboard, database, and login functionality.
- **credentials.csv** — Credential storage (keep secure and out of version control).
- **database/** — Database backups, diagrams, and schema files.
- **package.json & package-lock.json** — Node.js dependencies and lock files.
- **password_generator.js** — Utility for generating passwords.
- **public/** — Frontend files: HTML pages, stylesheets, images, JS scripts, and shared components like `header.html`.
- **README.md** — This documentation file.
- **schema.txt** — Database schema description.
- **server.js** — Main backend server entry point.

---

## 🧑‍💻 Developer Guide

### Adding a New Frontend Page

When creating a new frontend HTML page (e.g., `profile.html`), use the following template structure to ensure the shared header loads dynamically:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Page Title</title>
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
```

The `header_loader.js` script automatically fetches and inserts the contents of `header.html` into the `<header>` element, maintaining consistency across all pages.

## Deployment under same WIFI
- place your ip address and port here inside server.js
```
app.listen(PORT, '0.0.0.0',() => {
  console.log(`Server is running on http://your_ip_address:your_port`);
});

```
.
├── public
│   ├── chat.html                        
│   ├── css                              
│   ├── js 
│       ├──config.js.      // place your ip adress here too
---

## ⚙️ Features

- Dynamic shared header loaded via JavaScript.
- Sidebar implemented using Bootstrap Offcanvas.
- Notification icon with popup for alerts.
- Backend routes for login, dashboard, chat, and database interactions.
- Modular frontend and backend separation.

---

## 📚 Useful Commands

- Run backend server:
  ```bash
  node server.js
  ```

- View project directory structure (excluding `node_modules`):
  ```bash
  tree -L 2 -I 'node_modules'
  ```


---

## 🛠️ Technologies Used

- Node.js
- PostgreSQL
- Bootstrap 5
- Font Awesome
- Vanilla JavaScript
- HTML5 & CSS3

---

## 🤝 Contributors

- Abu Russel
- Provat Roy

---

## 📄 License

[@all rights reserved by IIS]

---

