// Check authentication
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'minister') {
        window.location.href = '../login.html';
    }
}

// Load sidebar
function loadSidebar() {
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    if (sidebarPlaceholder) {
        fetch('components/sidebar.html')
            .then(response => response.text())
            .then(data => {
                sidebarPlaceholder.innerHTML = data;
                highlightCurrentPage();
            });
    }
}

// Highlight current page in sidebar
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize Performance Trend Chart
function initPerformanceChart() {
    const ctx = document.getElementById('performanceTrendChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'Overall Performance',
                data: [72, 75, 78, 76, 82, 85],
                borderColor: 'rgba(0, 123, 255, 1)',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(0, 123, 255, 0.1)'
            }, {
                label: 'Attendance Rate',
                data: [85, 87, 86, 88, 90, 92],
                borderColor: 'rgba(40, 167, 69, 1)',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(40, 167, 69, 0.1)'
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
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Handle report generation
function setupReportGeneration() {
    const form = document.getElementById('generateReportForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generating...';
            submitBtn.disabled = true;

            // Simulate report generation
            setTimeout(() => {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('generateReportModal'));
                modal.hide();

                // Show success message
                showNotification('Report generated successfully! Check your email.', 'success');
            }, 2000);
        });
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    notification.role = 'alert';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadSidebar();
    initPerformanceChart();
    setupReportGeneration();
});
