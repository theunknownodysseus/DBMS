# Student Information System

A simple web-based student information system built with HTML, CSS, Node.js, and MySQL.

## Features

- Add new students
- View all students
- Edit student information
- Delete students
- Responsive design

## Prerequisites

- Node.js (v12 or higher)
- MySQL Server
- npm (Node Package Manager)

## Setup Instructions

1. Clone the repository or download the files

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the MySQL database:
   - Open MySQL command line or MySQL Workbench
   - Run the SQL commands from `database.sql`

4. Configure the database connection:
   - Open `server.js`
   - Update the MySQL connection details (host, user, password) if needed

5. Start the server:
   ```bash
   npm start
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

- `public/` - Frontend files
  - `index.html` - Main HTML file
  - `styles.css` - CSS styles
  - `script.js` - Frontend JavaScript
- `server.js` - Backend server
- `database.sql` - Database setup script
- `package.json` - Project dependencies

## API Endpoints

- GET `/api/students` - Get all students
- POST `/api/students` - Add a new student
- PUT `/api/students/:id` - Update a student
- DELETE `/api/students/:id` - Delete a student 