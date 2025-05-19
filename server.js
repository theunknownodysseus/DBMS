const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SHASWATTH2005$', // Add your MySQL password here
    database: 'student_db'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// API Routes
// Get all students
app.get('/api/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Add a new student
app.post('/api/students', (req, res) => {
    const { name, roll_number, grade, email } = req.body;
    const query = 'INSERT INTO students (name, roll_number, grade, email) VALUES (?, ?, ?, ?)';
    
    db.query(query, [name, roll_number, grade, email], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: results.insertId, message: 'Student added successfully' });
    });
});

// Update a student
app.put('/api/students/:id', (req, res) => {
    const { name, roll_number, grade, email } = req.body;
    const query = 'UPDATE students SET name = ?, roll_number = ?, grade = ?, email = ? WHERE id = ?';
    
    db.query(query, [name, roll_number, grade, email, req.params.id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Student updated successfully' });
    });
});

// Delete a student
app.delete('/api/students/:id', (req, res) => {
    const query = 'DELETE FROM students WHERE id = ?';
    
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Student deleted successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 