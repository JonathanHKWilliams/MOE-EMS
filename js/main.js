document.addEventListener('DOMContentLoaded', function() {
    // Login form handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            
            // In a real application, this would be an API call
            handleLogin(username, password, role);
        });
    }
});

function handleLogin(username, password, role) {
    // This is a mock login - in production, this would call your backend API
    console.log('Attempting login:', { username, role });
    
    // Redirect based on role
    switch(role) {
        case 'minister':
            window.location.href = 'minister_dashboard.html';
            break;
        case 'county':
            window.location.href = 'county_dashboard.html';
            break;
        case 'district':
            window.location.href = 'district_dashboard.html';
            break;
        default:
            alert('Invalid role selected');
    }
}

// Utility functions for dashboard
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function createChart(ctx, data) {
    // This is a placeholder for chart creation
    // In production, you would use a charting library like Chart.js
    console.log('Creating chart with data:', data);
}

// API mock functions - replace these with real API calls
async function fetchDashboardData(role) {
    // Mock data - replace with actual API call
    return {
        totalSchools: 5234,
        totalStudents: 1234567,
        totalTeachers: 45678,
        attendanceRate: 94.5,
        performanceScore: 78.3
    };
}

async function fetchUserProfile() {
    // Mock data - replace with actual API call
    return {
        name: "John Doe",
        role: "County Education Officer",
        county: "Montserrado",
        lastLogin: "2024-02-27T18:30:00Z"
    };
}

// Error handling
function handleError(error) {
    console.error('Error:', error);
    // In production, implement proper error handling and user notification
    alert('An error occurred. Please try again later.');
}

// Session management
function checkSession() {
    // Check if user is logged in
    const token = localStorage.getItem('userToken');
    if (!token) {
        window.location.href = 'index.html';
    }
    return token;
}

// Initialize tooltips and popovers if using Bootstrap
function initializeBootstrapComponents() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}
