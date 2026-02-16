// js/volunteer.js

document.getElementById('volunteerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const data = {
        full_name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        availability: document.getElementById('availability').value,
        skills: document.getElementById('skills').value,
        motivation: document.getElementById('motivation').value
    };

    try {
        const response = await fetch('https://nofinishnrbdjango.fly.dev/api/volunteers/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok && (result.success || result.id)) {
            alert('Thank you for your application! We will contact you soon.');
            this.reset();
        } else {
            alert('Submission failed: ' + (result.errors ? JSON.stringify(result.errors) : 'Please check your input.'));
        }
    } catch (error) {
        alert('An error occurred. Please try again later.');
    }
});
