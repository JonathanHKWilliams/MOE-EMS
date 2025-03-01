// Check authentication
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'minister') {
        window.location.href = '../login.html';
    }
}

// Load sidebar
function loadSidebar() {
    fetch('../components/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-placeholder').innerHTML = data;
            highlightCurrentPage();
        });
}

// Initialize DataTable
function initializeDataTable() {
    $('#studentsTable').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        pageLength: 10,
        order: [[1, 'asc']],
        responsive: true
    });
}

// Initialize Charts
function initializeCharts() {
    // Performance Distribution Chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    new Chart(performanceCtx, {
        type: 'bar',
        data: {
            labels: ['90-100%', '80-89%', '70-79%', '60-69%', 'Below 60%'],
            datasets: [{
                label: 'Students Performance Distribution',
                data: [150, 300, 450, 200, 100],
                backgroundColor: [
                    'rgba(40, 167, 69, 0.8)',
                    'rgba(23, 162, 184, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(255, 145, 0, 0.8)',
                    'rgba(220, 53, 69, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Performance Distribution'
                }
            }
        }
    });

    // Attendance Trend Chart
    const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
    new Chart(attendanceCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Average Attendance Rate',
                data: [92, 93, 91, 94, 92, 95],
                borderColor: 'rgba(0, 123, 255, 1)',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(0, 123, 255, 0.1)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Attendance Trend'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Handle form submissions
function setupFormHandlers() {
    // Add Student Form
    document.getElementById('addStudentForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add form handling logic here
        $('#addStudentModal').modal('hide');
    });

    // Filter Form
    document.getElementById('filterForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add filter logic here
        $('#filterModal').modal('hide');
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadSidebar();
    initializeDataTable();
    initializeCharts();
    setupFormHandlers();
});
