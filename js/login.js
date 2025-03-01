document.addEventListener('DOMContentLoaded', function() {
    // Handle admin login
    const adminLoginForm = document.getElementById('admin-login-form');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            handleAdminLogin(username, password, role);
        });
    }

    // Handle teacher login
    const teacherLoginForm = document.getElementById('teacher-login-form');
    if (teacherLoginForm) {
        teacherLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            handleTeacherLogin(username, password);
        });
    }

    // Handle student login
    const studentLoginForm = document.getElementById('student-login-form');
    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            handleStudentLogin(username, password);
        });
    }

    // Handle parent login
    const parentLoginForm = document.getElementById('parent-login-form');
    if (parentLoginForm) {
        parentLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            handleParentLogin(username, password);
        });
    }
});

function handleAdminLogin(username, password, role) {
    if (validateCredentials(username, password)) {
        const hideLoading = showLoading();
        
        // Store user info in localStorage for persistence
        localStorage.setItem('user', JSON.stringify({
            username: username,
            role: role,
            token: generateToken()
        }));

        // Redirect based on role
        setTimeout(() => {
            hideLoading();
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
                    showError('Invalid role selected');
            }
        }, 1000);
    } else {
        showError('Invalid credentials');
    }
}

function handleTeacherLogin(username, password) {
    if (validateCredentials(username, password)) {
        const hideLoading = showLoading();
        
        localStorage.setItem('user', JSON.stringify({
            username: username,
            role: 'teacher',
            token: generateToken()
        }));

        setTimeout(() => {
            hideLoading();
            // Fix the path to be relative to the root directory
            window.location.href = '/teacher/dashboard.html';
        }, 1000);
    } else {
        showError('Invalid credentials');
    }
}

function handleStudentLogin(username, password) {
    if (validateCredentials(username, password)) {
        const hideLoading = showLoading();
        
        localStorage.setItem('user', JSON.stringify({
            username: username,
            role: 'student',
            token: generateToken()
        }));

        setTimeout(() => {
            hideLoading();
            window.location.href = 'student_dashboard.html';
        }, 1000);
    } else {
        showError('Invalid credentials');
    }
}

function handleParentLogin(username, password) {
    if (validateCredentials(username, password)) {
        const hideLoading = showLoading();
        
        localStorage.setItem('user', JSON.stringify({
            username: username,
            role: 'parent',
            token: generateToken()
        }));

        setTimeout(() => {
            hideLoading();
            window.location.href = 'parent_dashboard.html';
        }, 1000);
    } else {
        showError('Invalid credentials');
    }
}

// Mock validation - replace with real validation in production
function validateCredentials(username, password) {
    return username.length > 0 && password.length > 0;
}

function generateToken() {
    return 'token-' + Math.random().toString(36).substr(2);
}

function showError(message) {
    // Create error alert if it doesn't exist
    let errorAlert = document.querySelector('.alert-danger');
    if (!errorAlert) {
        errorAlert = document.createElement('div');
        errorAlert.className = 'alert alert-danger mt-3';
        errorAlert.setAttribute('role', 'alert');
        
        const form = document.querySelector('form');
        form.insertAdjacentElement('beforebegin', errorAlert);
    }
    
    errorAlert.textContent = message;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorAlert.remove();
    }, 5000);
}

function showLoading() {
    const button = document.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Logging in...';
    button.disabled = true;
    return () => {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Check if user is already logged in
function checkLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        switch(user.role) {
            case 'minister':
                window.location.href = 'minister_dashboard.html';
                break;
            case 'county':
                window.location.href = 'county_dashboard.html';
                break;
            case 'district':
                window.location.href = 'district_dashboard.html';
                break;
            case 'teacher':
                window.location.href = '/teacher/dashboard.html';
                break;
            case 'student':
                window.location.href = 'student_dashboard.html';
                break;
            case 'parent':
                window.location.href = 'parent_dashboard.html';
                break;
        }
    }
}

// Call checkLoggedIn when page loads
checkLoggedIn();
