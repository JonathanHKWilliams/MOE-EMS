document.addEventListener("DOMContentLoaded", function() {
    // Initialize sidebar functionality
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

    // Mock data for children
    const children = [
        {
            id: 'STU001',
            firstName: 'John',
            lastName: 'Doe',
            grade: '10th Grade',
            school: 'Monrovia High School',
            performance: 'A',
            attendance: '98%',
            image: '../assets/images/student1.jpg'
        },
        {
            id: 'STU002',
            firstName: 'Jane',
            lastName: 'Doe',
            grade: '8th Grade',
            school: 'Monrovia Middle School',
            performance: 'B+',
            attendance: '95%',
            image: '../assets/images/student2.jpg'
        }
    ];

    // Populate children cards
    const childrenContainer = document.getElementById('children-container');
    children.forEach(child => {
        const childCard = document.createElement('div');
        childCard.className = 'col-md-6 mb-4';
        childCard.innerHTML = `
            <div class="card student-card">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <img src="${child.image}" alt="${child.firstName}" class="student-avatar me-3">
                        <div>
                            <h5 class="card-title mb-0">${child.firstName} ${child.lastName}</h5>
                            <small class="text-muted">ID: ${child.id}</small>
                        </div>
                    </div>
                    <div class="student-info">
                        <p><strong>Grade:</strong> ${child.grade}</p>
                        <p><strong>School:</strong> ${child.school}</p>
                        <p><strong>Performance:</strong> ${child.performance}</p>
                        <p><strong>Attendance:</strong> ${child.attendance}</p>
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-outline-primary btn-sm me-2" onclick="viewDetails('${child.id}')">
                            View Details
                        </button>
                        <button class="btn btn-outline-secondary btn-sm" onclick="viewSchedule('${child.id}')">
                            View Schedule
                        </button>
                    </div>
                </div>
            </div>
        `;
        childrenContainer.appendChild(childCard);
    });

    // Handle Add Child Form
    document.getElementById('saveChild').addEventListener('click', function() {
        const form = document.getElementById('addChildForm');
        if (form.checkValidity()) {
            // Add child logic here
            const modal = bootstrap.Modal.getInstance(document.getElementById('addChildModal'));
            modal.hide();
            
            // Show success message
            alert('Child added successfully!');
            
            // Reset form
            form.reset();
        } else {
            form.reportValidity();
        }
    });

    // Handle Logout
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        // Add logout logic here
        window.location.href = '../index.html';
    });
});

// View student details
function viewDetails(studentId) {
    // Redirect to student details page
    window.location.href = `student-details.html?id=${studentId}`;
}

// View student schedule
function viewSchedule(studentId) {
    // Redirect to student schedule page
    window.location.href = `student-schedule.html?id=${studentId}`;
}

// Add additional styles to the page
const style = document.createElement('style');
style.textContent = `
    .student-card {
        transition: transform 0.3s ease;
        border: none;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .student-card:hover {
        transform: translateY(-5px);
    }

    .student-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
    }

    .student-info p {
        margin-bottom: 0.5rem;
    }
`;
document.head.appendChild(style);
