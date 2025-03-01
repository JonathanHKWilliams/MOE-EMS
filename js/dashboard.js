document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    // checkAuth();
    
    // Load sidebar
    loadSidebar();
    
    // Initialize all charts
    initializeCharts();
    
    // Load user info
    loadUserInfo();
});

function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.token || user.role !== 'teacher') {
        window.location.href = '../teacher_login.html';
    }

    // Set user name
    const userNameElement = document.querySelector('.user-name');
    if (userNameElement) {
        userNameElement.textContent = user.username;
    }
}

function loadSidebar() {
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    if (sidebarPlaceholder) {
        sidebarPlaceholder.innerHTML = `
            <aside class="sidebar">
                <div class="sidebar-header">
                    <img src="../assets/images/MOE Logo.png" alt="MOE Logo" class="logo">
                    <h3>MOE</h3>
                </div>
                <nav class="sidebar-nav">
                    <ul>
                        <li class="active">
                            <a href="dashboard.html">
                                <i class="bi bi-grid"></i>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="classes.html">
                                <i class="bi bi-book"></i>
                                <span>Classes</span>
                            </a>
                        </li>
                        <li>
                            <a href="students.html">
                                <i class="bi bi-people"></i>
                                <span>Students</span>
                            </a>
                        </li>
                        <li>
                            <a href="assignments.html">
                                <i class="bi bi-file-text"></i>
                                <span>Assignments</span>
                            </a>
                        </li>
                        <li>
                            <a href="attendance.html">
                                <i class="bi bi-calendar-check"></i>
                                <span>Attendance</span>
                            </a>
                        </li>
                        <li>
                            <a href="grades.html">
                                <i class="bi bi-graph-up"></i>
                                <span>Grades</span>
                            </a>
                        </li>
                        <li>
                            <a href="messages.html">
                                <i class="bi bi-chat-dots"></i>
                                <span>Messages</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <div class="sidebar-footer">
                    <div class="user-info">
                        <img src="../assets/images/Light_Image-02-02-removebg-preview.png" alt="Teacher" class="avatar">
                        <div class="user-details">
                            <h6 id="teacher-name">Loading...</h6>
                            <small class="text-muted">Teacher</small>
                        </div>
                    </div>
                    <button onclick="handleLogout()" class="btn btn-outline-light w-100">
                        <i class="bi bi-box-arrow-right"></i>
                        Logout
                    </button>
                </div>
            </aside>
        `;

        // Set active nav item based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
        const navItems = document.querySelectorAll('.sidebar-nav li');
        navItems.forEach(item => {
            const link = item.querySelector('a');
            if (link.getAttribute('href') === currentPage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Set teacher name
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const teacherNameElement = document.getElementById('teacher-name');
        if (teacherNameElement && user.username) {
            teacherNameElement.textContent = user.username;
        }
    }
}

function handleLogout() {
    localStorage.removeItem('user');
    window.location.href = '../teacher_login.html';
}

function initializeCharts() {
    // Performance Chart
    const performanceCtx = document.getElementById('performanceChart');
    if (performanceCtx) {
        new Chart(performanceCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Average Grade',
                    data: [75, 78, 82, 79, 85, 88],
                    borderColor: '#2563eb',
                    tension: 0.4,
                    fill: false
                }, {
                    label: 'Class Average',
                    data: [70, 72, 75, 74, 76, 78],
                    borderColor: '#9333ea',
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 60,
                        max: 100
                    }
                }
            }
        });
    }

    // Attendance Chart
    const attendanceCtx = document.getElementById('attendanceChart');
    if (attendanceCtx) {
        new Chart(attendanceCtx, {
            type: 'doughnut',
            data: {
                labels: ['Present', 'Absent', 'Late'],
                datasets: [{
                    data: [85, 10, 5],
                    backgroundColor: [
                        '#22c55e',
                        '#ef4444',
                        '#f59e0b'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                cutout: '70%'
            }
        });
    }
}

// Handle sidebar navigation
document.querySelectorAll('.sidebar .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
        }
        
        // Remove active class from all links
        document.querySelectorAll('.sidebar .nav-link').forEach(l => {
            l.classList.remove('active');
        });
        
        // Add active class to clicked link
        this.classList.add('active');
    });
});

// Handle notifications
document.querySelector('.btn-outline-primary').addEventListener('click', function() {
    // Show notifications dropdown (to be implemented)
    console.log('Show notifications');
});

// Handle new assignment button
document.querySelector('.btn-primary').addEventListener('click', function() {
    // Show new assignment modal (to be implemented)
    console.log('Create new assignment');
});

// Update real-time data
function updateDashboardData() {
    // Simulated real-time updates
    setInterval(() => {
        // Update attendance numbers
        const attendanceNumber = document.querySelector('.stats-card:nth-child(2) .number');
        if (attendanceNumber) {
            const currentAttendance = parseFloat(attendanceNumber.textContent);
            const newAttendance = (currentAttendance + (Math.random() * 0.2 - 0.1)).toFixed(1);
            attendanceNumber.textContent = newAttendance + '%';
        }

        // Update pending tasks
        const tasksNumber = document.querySelector('.stats-card:nth-child(4) .number');
        if (tasksNumber) {
            const currentTasks = parseInt(tasksNumber.textContent);
            if (Math.random() > 0.7) { // 30% chance to change
                tasksNumber.textContent = currentTasks + (Math.random() > 0.5 ? 1 : -1);
            }
        }
    }, 30000); // Update every 30 seconds
}

// Initialize tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Start real-time updates
updateDashboardData();
