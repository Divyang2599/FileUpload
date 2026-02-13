// Registration form submit handler (for index.html)
document.getElementById('regForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        event: document.getElementById('event').value,
        timestamp: new Date().toISOString()
    };
    try {
        const response = await fetch('https://eventregfunction-gnc5f2cydzg2d5f9.canadacentral-01.azurewebsites.net/api/HttpTrigger1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            alert('Registration successful!');
            document.getElementById('regForm').reset();
        } else {
            alert('Error registering: ' + response.statusText);
        }
    } catch (error) {
        alert('Network error: ' + error.message);
    }
});

// Fetch registrations (for admin.html)
async function fetchRegistrations() {
    try {
        const response = await fetch('https://eventregfunction-gnc5f2cydzg2d5f9.canadacentral-01.azurewebsites.net/api/HttpTrigger1?admin=true', { method: 'GET' });
        if (!response.ok) {
            throw new Error('Failed to fetch: ' + response.status);
        }
        const data = await response.json();
        const tbody = document.querySelector('#regTable tbody');
        tbody.innerHTML = '';
        data.forEach(item => {
            const row = `<tr><td>${item.name || 'N/A'}</td><td>${item.email || 'N/A'}</td><td>${item.event || 'N/A'}</td><td>${item.timestamp || 'N/A'}</td></tr>`;
            tbody.innerHTML += row;
        });
    } catch (error) {
        alert('Error fetching data: ' + error.message);
    }
}

// Auto-load on admin page
if (document.getElementById('regTable')) {
    fetchRegistrations();
}