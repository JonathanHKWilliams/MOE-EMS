// Initialize components when document is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeDataTable();
    initializeCharts();
    loadSidebar();
    checkAuth();
    setupDynamicSelects();
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
    $('#teachersTable').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'collection',
                text: 'Export',
                buttons: ['copy', 'excel', 'pdf', 'print']
            }
        ],
        pageLength: 10,
        order: [[5, 'desc']], // Sort by experience by default
        responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search teachers..."
        }
    });
}

// Initialize Charts
function initializeCharts() {
    // Qualification Distribution Chart
    const qualificationCtx = document.getElementById('qualificationChart').getContext('2d');
    new Chart(qualificationCtx, {
        type: 'doughnut',
        data: {
            labels: ["Bachelor's", "Master's", "PhD", "Other"],
            datasets: [{
                data: [65, 25, 5, 5],
                backgroundColor: [
                    '#1e3c72',
                    '#2a5298',
                    '#3b82f6',
                    '#93c5fd'
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
                    text: 'Qualification Distribution'
                }
            }
        }
    });

    // Experience Distribution Chart
    const experienceCtx = document.getElementById('experienceChart').getContext('2d');
    new Chart(experienceCtx, {
        type: 'bar',
        data: {
            labels: ['0-2 years', '3-5 years', '6-10 years', '10+ years'],
            datasets: [{
                label: 'Number of Teachers',
                data: [2500, 5000, 4500, 3842],
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
                    text: 'Experience Distribution'
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

// Setup Dynamic Select Fields
function setupDynamicSelects() {
    // County-School relationship
    const countySelect = document.querySelector('select[name="county"]');
    const schoolSelect = document.querySelector('select[name="school"]');

    if (countySelect && schoolSelect) {
        countySelect.addEventListener('change', function() {
            const selectedCounty = this.value;
            updateSchoolOptions(selectedCounty);
        });
    }
}

// Update school options based on selected county
function updateSchoolOptions(county) {
    const schoolSelect = document.querySelector('select[name="school"]');
    if (!schoolSelect) return;

    // Clear existing options
    schoolSelect.innerHTML = '<option value="">Select School</option>';

    // Mock data - replace with API call
    const schoolsByCounty = {
        montserrado: [
            'J.W. Pearson High School',
            'William V.S. Tubman High School',
            'G.W. Gibson High School'
        ],
        nimba: [
            'Nimba County High School',
            'Ganta United Methodist School',
            'Sanniquellie Central High School'
        ]
    };

    const schools = schoolsByCounty[county] || [];
    schools.forEach(school => {
        const option = document.createElement('option');
        option.value = school.toLowerCase().replace(/\s+/g, '_');
        option.textContent = school;
        schoolSelect.appendChild(option);
    });
}

// Handle teacher form submission
document.getElementById('addTeacherForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    // Implement form submission logic here
    const formData = new FormData(this);
    console.log('Form submitted:', Object.fromEntries(formData));
    // TODO: Add API call to save teacher
    $('#addTeacherModal').modal('hide');
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

// Teacher data management functions
const teacherManager = {
    viewTeacher: function(teacherId) {
        // Implement view teacher details
        console.log('Viewing teacher:', teacherId);
    },

    editTeacher: function(teacherId) {
        // Implement edit teacher
        console.log('Editing teacher:', teacherId);
    },

    deleteTeacher: function(teacherId) {
        // Implement delete teacher
        if (confirm('Are you sure you want to delete this teacher?')) {
            console.log('Deleting teacher:', teacherId);
            // TODO: Add API call to delete teacher
        }
    },

    updateStatus: function(teacherId, status) {
        // Implement status update
        console.log('Updating status:', teacherId, status);
        // TODO: Add API call to update status
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
    if (e.target.closest('.btn-view-teacher')) {
        const teacherId = e.target.closest('tr').dataset.teacherId;
        teacherManager.viewTeacher(teacherId);
    }

    // Handle edit button click
    if (e.target.closest('.btn-edit-teacher')) {
        const teacherId = e.target.closest('tr').dataset.teacherId;
        teacherManager.editTeacher(teacherId);
    }

    // Handle delete button click
    if (e.target.closest('.btn-delete-teacher')) {
        const teacherId = e.target.closest('tr').dataset.teacherId;
        teacherManager.deleteTeacher(teacherId);
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
    const table = $('#teachersTable').DataTable();
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
