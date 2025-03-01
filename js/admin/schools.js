// Initialize components when document is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeDataTable();
    initializeCharts();
    loadSidebar();
    checkAuth();
});

// Authentication check
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.token || user.role !== 'minister') {
        window.location.href = '../admin_login.html';
    }
}

// Load sidebar content
function loadSidebar() {
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    if (sidebarPlaceholder) {
        fetch('../components/admin-sidebar.html')
            .then(response => response.text())
            .then(html => {
                sidebarPlaceholder.innerHTML = html;
                highlightCurrentPage();
            })
            .catch(error => console.error('Error loading sidebar:', error));
    }
}

// Initialize DataTables
function initializeDataTable() {
    $('#schoolsTable').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'collection',
                text: 'Export',
                buttons: ['copy', 'excel', 'pdf', 'print']
            }
        ],
        pageLength: 10,
        order: [[5, 'desc']], // Sort by performance by default
        responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search schools..."
        }
    });
}

// Initialize Charts
function initializeCharts() {
    // School Type Distribution Chart
    const typeCtx = document.getElementById('schoolTypeChart').getContext('2d');
    new Chart(typeCtx, {
        type: 'doughnut',
        data: {
            labels: ['Primary', 'Secondary', 'Both'],
            datasets: [{
                data: [1200, 800, 547],
                backgroundColor: [
                    '#1e3c72',
                    '#2a5298',
                    '#3b82f6'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'School Type Distribution'
                }
            }
        }
    });

    // Performance Distribution Chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    new Chart(performanceCtx, {
        type: 'bar',
        data: {
            labels: ['0-20%', '21-40%', '41-60%', '61-80%', '81-100%'],
            datasets: [{
                label: 'Number of Schools',
                data: [50, 150, 800, 1200, 347],
                backgroundColor: '#1e3c72'
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
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Handle school form submission
document.getElementById('addSchoolForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    // Implement form submission logic here
    const formData = new FormData(this);
    console.log('Form submitted:', Object.fromEntries(formData));
    // TODO: Add API call to save school
    $('#addSchoolModal').modal('hide');
});

// Handle filter form submission
document.getElementById('filterForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    // Implement filtering logic here
    const formData = new FormData(this);
    console.log('Filters applied:', Object.fromEntries(formData));
    // TODO: Add filter logic
    $('#filterModal').modal('hide');
});

// School data management functions
const schoolManager = {
    viewSchool: function(schoolId) {
        // Implement view school details
        console.log('Viewing school:', schoolId);
    },

    editSchool: function(schoolId) {
        // Implement edit school
        console.log('Editing school:', schoolId);
    },

    deleteSchool: function(schoolId) {
        // Implement delete school
        if (confirm('Are you sure you want to delete this school?')) {
            console.log('Deleting school:', schoolId);
            // TODO: Add API call to delete school
        }
    },

    updateStatus: function(schoolId, status) {
        // Implement status update
        console.log('Updating status:', schoolId, status);
        // TODO: Add API call to update status
    },

    generateReport: function(schoolId) {
        // Implement report generation
        console.log('Generating report for school:', schoolId);
        // TODO: Add report generation logic
    }
};

// School performance tracking
const performanceTracker = {
    calculateOverallPerformance: function(scores) {
        // Calculate weighted average of different performance metrics
        const weights = {
            academicPerformance: 0.4,
            teacherQuality: 0.2,
            facilities: 0.15,
            studentAttendance: 0.15,
            extracurricular: 0.1
        };

        let weightedSum = 0;
        let totalWeight = 0;

        for (const [metric, weight] of Object.entries(weights)) {
            if (scores[metric]) {
                weightedSum += scores[metric] * weight;
                totalWeight += weight;
            }
        }

        return totalWeight > 0 ? (weightedSum / totalWeight).toFixed(1) : 0;
    },

    getPerformanceClass: function(score) {
        if (score >= 80) return 'excellent';
        if (score >= 60) return 'good';
        if (score >= 40) return 'average';
        return 'needs-improvement';
    },

    updatePerformanceIndicators: function(schoolId, newData) {
        // Update performance indicators in the UI
        console.log('Updating performance indicators:', schoolId, newData);
        // TODO: Add UI update logic
    }
};

// Facility management
const facilityManager = {
    checkFacilityStatus: function(facilityData) {
        // Check if facilities meet minimum requirements
        const requirements = {
            classrooms: 10,
            teachers: 15,
            students: 200,
            bathrooms: 4
        };

        const issues = [];
        for (const [facility, minimum] of Object.entries(requirements)) {
            if (facilityData[facility] < minimum) {
                issues.push(`${facility} count (${facilityData[facility]}) is below minimum requirement (${minimum})`);
            }
        }

        return {
            meetsRequirements: issues.length === 0,
            issues: issues
        };
    },

    updateFacilityStatus: function(schoolId, facilityData) {
        // Update facility status in the UI
        const status = this.checkFacilityStatus(facilityData);
        console.log('Facility status:', status);
        // TODO: Add UI update logic
    }
};

// Utility functions
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.parentElement.classList.add('active');
        }
    });
}

function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
}

// Event listeners for dynamic content
document.addEventListener('click', function(e) {
    // Handle view button click
    if (e.target.closest('.btn-view-school')) {
        const schoolId = e.target.closest('tr').dataset.schoolId;
        schoolManager.viewSchool(schoolId);
    }

    // Handle edit button click
    if (e.target.closest('.btn-edit-school')) {
        const schoolId = e.target.closest('tr').dataset.schoolId;
        schoolManager.editSchool(schoolId);
    }

    // Handle delete button click
    if (e.target.closest('.btn-delete-school')) {
        const schoolId = e.target.closest('tr').dataset.schoolId;
        schoolManager.deleteSchool(schoolId);
    }

    // Handle report generation click
    if (e.target.closest('.btn-generate-report')) {
        const schoolId = e.target.closest('tr').dataset.schoolId;
        schoolManager.generateReport(schoolId);
    }
});

// Handle file uploads
const fileInputs = document.querySelectorAll('input[type="file"]');
fileInputs.forEach(input => {
    input.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        const fileNames = files.map(file => file.name).join(', ');
        // Update UI to show selected files
        const fileLabel = input.nextElementSibling;
        if (fileLabel) {
            fileLabel.textContent = fileNames || 'No files selected';
        }
    });
});

// Export functionality
function exportData(format) {
    const table = $('#schoolsTable').DataTable();
    switch(format) {
        case 'excel':
            table.button('.buttons-excel').trigger();
            break;
        case 'pdf':
            table.button('.buttons-pdf').trigger();
            break;
        case 'print':
            table.button('.buttons-print').trigger();
            break;
        default:
            table.button('.buttons-copy').trigger();
    }
}

// Initialize tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});
