document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const studentList = document.getElementById('studentList');
    const submitBtn = document.getElementById('submitBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    let editingId = null;

    // Load students on page load
    loadStudents();

    // Form submission handler
    studentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            roll_number: document.getElementById('roll_number').value,
            grade: document.getElementById('grade').value,
            email: document.getElementById('email').value
        };

        try {
            if (editingId) {
                // Update existing student
                await fetch(`/api/students/${editingId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
            } else {
                // Add new student
                await fetch('/api/students', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
            }

            // Reset form and reload students
            resetForm();
            loadStudents();
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while saving the student information.');
        }
    });

    // Cancel button handler
    cancelBtn.addEventListener('click', resetForm);

    // Load students from the server
    async function loadStudents() {
        try {
            const response = await fetch('/api/students');
            const students = await response.json();
            
            studentList.innerHTML = '';
            students.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.roll_number}</td>
                    <td>${student.grade}</td>
                    <td>${student.email}</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="editStudent(${student.id})">Edit</button>
                        <button class="action-btn delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
                    </td>
                `;
                studentList.appendChild(row);
            });
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while loading students.');
        }
    }

    // Edit student
    window.editStudent = async (id) => {
        try {
            const response = await fetch(`/api/students/${id}`);
            const student = await response.json();
            
            document.getElementById('name').value = student.name;
            document.getElementById('roll_number').value = student.roll_number;
            document.getElementById('grade').value = student.grade;
            document.getElementById('email').value = student.email;
            
            editingId = id;
            submitBtn.textContent = 'Update Student';
            cancelBtn.style.display = 'inline-block';
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while loading student information.');
        }
    };

    // Delete student
    window.deleteStudent = async (id) => {
        if (confirm('Are you sure you want to delete this student?')) {
            try {
                await fetch(`/api/students/${id}`, {
                    method: 'DELETE'
                });
                loadStudents();
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while deleting the student.');
            }
        }
    };

    // Reset form
    function resetForm() {
        studentForm.reset();
        editingId = null;
        submitBtn.textContent = 'Add Student';
        cancelBtn.style.display = 'none';
    }
}); 