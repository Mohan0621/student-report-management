# Student Report Management

A simple Node.js/Express application for managing student reports with authentication and role-based access control (admin and student). The app uses EJS for server-side views and a MySQL (or compatible) database for persistence.

## Features

- User registration and login
- Password hashing (bcrypt)
- Role-based redirects (admin and student/user)
- EJS templates for views
- Simple project structure suitable for learning and small projects

## Tech stack

- Node.js
- Express
- EJS
- MySQL (or MariaDB)
- bcryptjs for password hashing

## Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- MySQL or MariaDB database

## Quick start

1. Clone the repo

   git clone https://github.com/Mohan0621/student-report-management.git
   cd student-report-management

2. Install dependencies

   npm install

3. Configure the database

Create a MySQL database and update the database connection configuration in `config/db.js` (or whichever file holds DB settings). You can use a `.env` file and load it in the app.

Example .env (create at project root):

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=student_reports
PORT=3000
SESSION_SECRET=your_session_secret
```

4. Create the required table(s)

Here's a minimal `users` table schema that matches the controller logic:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','student','user') DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

5. Start the app

   npm start

If the project has a development script (e.g. using nodemon) use:

   npm run dev

6. Visit in browser

   http://localhost:3000

## Authentication & session

- Passwords are hashed using bcryptjs before being saved.
- On login, the session is populated with `req.session.user` containing id, email and role.
- Admin users are redirected to `/admin`, others to `/user` by default.

## Project structure (typical)

- controllers/ - Express route handlers
- config/ - Database and other configuration
- views/ - EJS templates (pages/ contains login/register)
- public/ - CSS and static assets
- routes/ - Express routes (if present)
- app.js / index.js - Application entrypoint

Adjust paths above to match this repository's layout.

## Notes & TODOs

- Add input validation and better error handling on the server side.
- Use environment variables via a `.env` file and a library like `dotenv`.
- Improve UX by rendering errors on the EJS pages instead of plain text responses.
- Add CSRF protection and secure cookie/session settings for production.

## Contributing

Contributions are welcome. Please open issues for bugs or feature requests, and PRs for fixes/improvements.

## License

This project is provided under the MIT License. See LICENSE file if included.

## Contact

Maintainer: Mohan0621
