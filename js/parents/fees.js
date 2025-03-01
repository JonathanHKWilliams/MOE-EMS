document.addEventListener("DOMContentLoaded", function() {
    // Initialize sidebar
    const showNavbar = (toggleId, navId, bodyId, headerId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId),
            headerpd = document.getElementById(headerId);

        if (toggle && nav && bodypd && headerpd) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('show');
                toggle.classList.toggle('bx-x');
                bodypd.classList.toggle('body-pd');
                headerpd.classList.toggle('body-pd');
            });
        }
    }

    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header');

    // Mock Data
    const mockFees = [
        {
            type: 'Tuition Fee',
            amount: 1500.00,
            dueDate: '2025-03-15',
            status: 'Pending'
        },
        {
            type: 'Books & Supplies',
            amount: 300.00,
            dueDate: '2025-03-10',
            status: 'Paid'
        },
        {
            type: 'Transportation',
            amount: 200.00,
            dueDate: '2025-03-05',
            status: 'Overdue'
        },
        {
            type: 'Laboratory Fee',
            amount: 150.00,
            dueDate: '2025-03-20',
            status: 'Pending'
        }
    ];

    const mockPayments = [
        {
            date: '2025-02-28',
            id: 'PAY001',
            description: 'Books & Supplies Payment',
            amount: 300.00,
            status: 'Success'
        },
        {
            date: '2025-02-15',
            id: 'PAY002',
            description: 'January Tuition Fee',
            amount: 1500.00,
            status: 'Success'
        },
        {
            date: '2025-02-01',
            id: 'PAY003',
            description: 'Transportation Fee',
            amount: 200.00,
            status: 'Pending'
        }
    ];

    // Populate Fee Summary
    const feeSummary = document.getElementById('feeSummary');
    let totalFees = 0;

    mockFees.forEach(fee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${fee.type}</td>
            <td>$${fee.amount.toFixed(2)}</td>
            <td>${formatDate(fee.dueDate)}</td>
            <td><span class="badge bg-${getStatusBadgeColor(fee.status)}">${fee.status}</span></td>
        `;
        feeSummary.appendChild(row);
        totalFees += fee.amount;
    });

    document.getElementById('totalFees').textContent = `$${totalFees.toFixed(2)}`;

    // Populate Payment History
    const paymentHistory = document.getElementById('paymentHistory');
    mockPayments.forEach(payment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(payment.date)}</td>
            <td>${payment.id}</td>
            <td>${payment.description}</td>
            <td>$${payment.amount.toFixed(2)}</td>
            <td><span class="badge bg-${getPaymentStatusBadgeColor(payment.status)}">${payment.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewPaymentDetails('${payment.id}')">
                    View Details
                </button>
            </td>
        `;
        paymentHistory.appendChild(row);
    });

    // Handle Payment Method Change
    document.getElementById('paymentMethod').addEventListener('change', function(e) {
        const cardDetails = document.getElementById('cardDetails');
        cardDetails.style.display = e.target.value === 'card' ? 'block' : 'none';
    });

    // Handle Student Selection Change
    document.getElementById('studentSelector').addEventListener('change', function(e) {
        updateFeeData(e.target.value);
    });

    // Handle Logout
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '../index.html';
    });
});

// Helper Functions
function getStatusBadgeColor(status) {
    switch(status.toLowerCase()) {
        case 'paid': return 'success';
        case 'pending': return 'warning';
        case 'overdue': return 'danger';
        default: return 'secondary';
    }
}

function getPaymentStatusBadgeColor(status) {
    switch(status.toLowerCase()) {
        case 'success': return 'success';
        case 'pending': return 'warning';
        case 'failed': return 'danger';
        default: return 'secondary';
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function processPayment() {
    const paymentType = document.getElementById('paymentType').value;
    const amount = document.getElementById('paymentAmount').value;
    const method = document.getElementById('paymentMethod').value;

    if (!paymentType || !amount || !method) {
        alert('Please fill in all required fields');
        return;
    }

    // Simulate payment processing
    alert('Processing payment...');
    setTimeout(() => {
        alert('Payment successful!');
        location.reload();
    }, 2000);
}

function downloadReceipt() {
    alert('Downloading receipt...');
}

function viewPaymentHistory() {
    // Scroll to payment history section
    document.querySelector('.card:last-child').scrollIntoView({ behavior: 'smooth' });
}

function viewPaymentDetails(paymentId) {
    alert(`Viewing details for payment ${paymentId}`);
}

function updateFeeData(studentId) {
    // This would typically fetch new data from the server
    alert(`Loading fee data for student ${studentId}`);
}

// Add custom styles
const style = document.createElement('style');
style.textContent = `
    .card {
        border: none;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    .card-header {
        background-color: transparent;
        border-bottom: none;
        padding: 1.5rem;
    }

    .card-body {
        padding: 1.5rem;
    }

    .table th {
        border-top: none;
        color: var(--first-color);
    }

    .badge {
        padding: 0.5em 1em;
    }

    .modal-content {
        border: none;
        border-radius: 0.5rem;
    }

    .modal-header {
        border-bottom: none;
        padding: 1.5rem;
    }

    .modal-footer {
        border-top: none;
        padding: 1.5rem;
    }

    .form-control, .form-select {
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
    }
`;
document.head.appendChild(style);
