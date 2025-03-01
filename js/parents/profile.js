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
    const mockChildren = [
        {
            name: 'John Doe Jr.',
            grade: '10th',
            class: '10-A',
            studentId: 'STU001'
        },
        {
            name: 'Jane Doe',
            grade: '8th',
            class: '8-B',
            studentId: 'STU002'
        }
    ];

    const mockEmergencyContacts = [
        {
            name: 'Mary Johnson',
            relationship: 'Sister',
            phone: '+231 234 567 890'
        },
        {
            name: 'Robert Smith',
            relationship: 'Brother',
            phone: '+231 345 678 901'
        }
    ];

    // Populate Children List
    const childrenList = document.getElementById('childrenList');
    mockChildren.forEach(child => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${child.name}</td>
            <td>${child.grade}</td>
            <td>${child.class}</td>
            <td>${child.studentId}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewChild('${child.studentId}')">
                    View Details
                </button>
            </td>
        `;
        childrenList.appendChild(row);
    });

    // Populate Emergency Contacts
    const emergencyContacts = document.getElementById('emergencyContacts');
    mockEmergencyContacts.forEach(contact => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.relationship}</td>
            <td>${contact.phone}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-2" onclick="editContact('${contact.name}')">
                    <i class='bx bx-edit-alt'></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteContact('${contact.name}')">
                    <i class='bx bx-trash'></i>
                </button>
            </td>
        `;
        emergencyContacts.appendChild(row);
    });

    // Handle Logout
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '../index.html';
    });
});

// Profile Functions
function changeProfilePicture() {
    // Simulate file upload
    alert('Opening file upload dialog...');
}

function editProfile() {
    const modal = new bootstrap.Modal(document.getElementById('editProfileModal'));
    modal.show();
}

function saveProfile() {
    // Validate form
    const form = document.getElementById('editProfileForm');
    if (!form.checkValidity()) {
        alert('Please fill in all required fields');
        return;
    }

    // Simulate profile update
    alert('Saving profile changes...');
    setTimeout(() => {
        alert('Profile updated successfully!');
        location.reload();
    }, 1000);
}

function viewChild(studentId) {
    window.location.href = `students.html?id=${studentId}`;
}

// Emergency Contact Functions
function addEmergencyContact() {
    const modal = new bootstrap.Modal(document.getElementById('addContactModal'));
    modal.show();
}

function saveContact() {
    // Validate form
    const form = document.getElementById('contactForm');
    if (!form.checkValidity()) {
        alert('Please fill in all required fields');
        return;
    }

    // Simulate contact addition
    alert('Adding emergency contact...');
    setTimeout(() => {
        alert('Contact added successfully!');
        location.reload();
    }, 1000);
}

function editContact(name) {
    alert(`Editing contact: ${name}`);
}

function deleteContact(name) {
    if (confirm(`Are you sure you want to delete ${name} from emergency contacts?`)) {
        alert('Deleting contact...');
        setTimeout(() => {
            alert('Contact deleted successfully!');
            location.reload();
        }, 1000);
    }
}

// Add custom styles
const style = document.createElement('style');
style.textContent = `
    .profile-image {
        position: relative;
        display: inline-block;
    }

    .profile-image img {
        width: 150px;
        height: 150px;
        object-fit: cover;
    }

    .profile-image-overlay {
        position: absolute;
        bottom: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        padding: 0.5rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .contact-info {
        display: grid;
        gap: 1rem;
    }

    .info-item {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .info-item i {
        font-size: 1.5rem;
        color: var(--first-color);
        width: 24px;
    }

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

    .form-control {
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
    }

    .form-control:disabled {
        background-color: #f8f9fa;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);
