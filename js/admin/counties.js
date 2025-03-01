// Initialize DataTables and other components when document is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeDataTable();
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
    $('#countiesTable').DataTable({
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
            searchPlaceholder: "Search counties..."
        }
    });
}

// Handle county officer form submission
document.getElementById('addCountyForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    // Implement form submission logic here
    const formData = new FormData(this);
    console.log('Form submitted:', Object.fromEntries(formData));
    // TODO: Add API call to save county officer
    $('#addCountyModal').modal('hide');
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

// County data management functions
const countyManager = {
    viewCounty: function(countyId) {
        // Implement view county details
        console.log('Viewing county:', countyId);
    },

    editCounty: function(countyId) {
        // Implement edit county
        console.log('Editing county:', countyId);
    },

    deleteCounty: function(countyId) {
        // Implement delete county
        if (confirm('Are you sure you want to delete this county officer?')) {
            console.log('Deleting county:', countyId);
            // TODO: Add API call to delete county
        }
    },

    updateStatus: function(countyId, status) {
        // Implement status update
        console.log('Updating status:', countyId, status);
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

function calculatePerformanceClass(performance) {
    if (performance >= 80) return 'bg-success';
    if (performance >= 60) return 'bg-warning';
    return 'bg-danger';
}

// Event listeners for dynamic content
document.addEventListener('click', function(e) {
    // Handle view button click
    if (e.target.closest('.btn-view-county')) {
        const countyId = e.target.closest('tr').dataset.countyId;
        countyManager.viewCounty(countyId);
    }

    // Handle edit button click
    if (e.target.closest('.btn-edit-county')) {
        const countyId = e.target.closest('tr').dataset.countyId;
        countyManager.editCounty(countyId);
    }

    // Handle delete button click
    if (e.target.closest('.btn-delete-county')) {
        const countyId = e.target.closest('tr').dataset.countyId;
        countyManager.deleteCounty(countyId);
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
    const table = $('#countiesTable').DataTable();
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
