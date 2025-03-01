// Initialize all charts and components when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    initializeMap();
    initializeSystemMetrics();
    checkAuth();
});

// Authentication check
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.token || user.role !== 'minister') {
        window.location.href = '../admin_login.html';
    }
}

// Initialize all dashboard charts
function initializeCharts() {
    // Schools Chart
    const schoolsChart = new Chart(document.getElementById('schoolsChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                data: [2100, 2200, 2300, 2400, 2450, 2547],
                borderColor: '#1e3c72',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { display: false }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Teachers Chart
    const teachersChart = new Chart(document.getElementById('teachersChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                data: [14000, 14500, 15000, 15200, 15500, 15842],
                borderColor: '#10b981',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { display: false }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Students Chart
    const studentsChart = new Chart(document.getElementById('studentsChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                data: [220000, 225000, 230000, 235000, 240000, 245678],
                borderColor: '#3b82f6',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { display: false }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Performance Chart
    const performanceChart = new Chart(document.getElementById('performanceChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                data: [70, 72, 74, 75, 76, 78],
                borderColor: '#f59e0b',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { display: false }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Initialize Liberia Map
function initializeMap() {
    // Center coordinates for Liberia
    const liberiaCenter = [6.428055, -9.429499];
    
    // Initialize the map
    const map = L.map('liberiaMap').setView(liberiaCenter, 7);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add county markers with data
    const counties = [
        { name: 'Montserrado', coords: [6.3105, -10.7969], schools: 156, performance: 85 },
        { name: 'Nimba', coords: [6.8429, -8.6820], schools: 98, performance: 78 },
        { name: 'Bong', coords: [6.8292, -9.3672], schools: 87, performance: 76 },
        // Add other counties here
    ];

    counties.forEach(county => {
        const marker = L.marker(county.coords)
            .bindPopup(`
                <strong>${county.name} County</strong><br>
                Schools: ${county.schools}<br>
                Performance: ${county.performance}%
            `)
            .addTo(map);
    });
}

// Initialize System Metrics
function initializeSystemMetrics() {
    // Update system metrics periodically
    setInterval(() => {
        updateServerLoad();
        updateDatabaseStatus();
        updateStorageUsage();
    }, 30000); // Update every 30 seconds
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('user');
    window.location.href = '../admin_login.html';
}

// Export Data Handler
document.getElementById('exportForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    // Implement export functionality
    alert('Export feature will be implemented here');
});

// Helper Functions
function updateServerLoad() {
    // Simulate server load update
    const load = Math.floor(Math.random() * 30) + 40; // Random load between 40-70%
    const serverLoadBar = document.querySelector('.metric-item:nth-child(1) .progress-bar');
    if (serverLoadBar) {
        serverLoadBar.style.width = `${load}%`;
        serverLoadBar.parentElement.previousElementSibling.querySelector('.badge').textContent = 
            load < 50 ? 'Normal' : load < 80 ? 'Moderate' : 'High';
    }
}

function updateDatabaseStatus() {
    // Simulate database status update
    const status = Math.random() > 0.9 ? 'Warning' : 'Normal';
    const dbStatus = document.querySelector('.metric-item:nth-child(2) .badge');
    if (dbStatus) {
        dbStatus.textContent = status;
        dbStatus.className = `badge ${status === 'Normal' ? 'bg-success' : 'bg-warning'}`;
    }
}

function updateStorageUsage() {
    // Simulate storage usage update
    const usage = Math.floor(Math.random() * 20) + 60; // Random usage between 60-80%
    const storageBar = document.querySelector('.metric-item:nth-child(3) .progress-bar');
    if (storageBar) {
        storageBar.style.width = `${usage}%`;
    }
}
