document.addEventListener('DOMContentLoaded', function() {
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

    // Mock assignments data
    const assignmentsData = [
        {
            id: 1,
            title: "Algebra Quiz",
            course: "Mathematics",
            dueDate: "2025-03-05",
            status: "pending",
            grade: "-",
            description: "Complete the online algebra quiz covering chapters 5-7.",
            requirements: [
                "Complete all 20 questions",
                "Show your work for each problem",
                "Time limit: 60 minutes"
            ]
        },
        {
            id: 2,
            title: "Essay Analysis",
            course: "English",
            dueDate: "2025-03-07",
            status: "submitted",
            grade: "Pending",
            description: "Write a critical analysis of the assigned short story.",
            requirements: [
                "1000-1200 words",
                "MLA format",
                "Include at least 3 citations"
            ]
        },
        {
            id: 3,
            title: "Lab Report",
            course: "Science",
            dueDate: "2025-03-06",
            status: "graded",
            grade: "92%",
            description: "Write a detailed report on the photosynthesis experiment.",
            requirements: [
                "Include methodology",
                "Data analysis",
                "Conclusion"
            ]
        },
        {
            id: 4,
            title: "Research Paper",
            course: "History",
            dueDate: "2025-03-08",
            status: "pending",
            grade: "-",
            description: "Research paper on World War II impact on global economics.",
            requirements: [
                "2000 words minimum",
                "Include primary sources",
                "Bibliography required"
            ]
        }
    ];

    // Populate assignments table
    function populateAssignments(assignments) {
        const tbody = document.getElementById('assignmentsList');
        tbody.innerHTML = '';

        assignments.forEach(assignment => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${assignment.title}</td>
                <td>${assignment.course}</td>
                <td>${assignment.dueDate}</td>
                <td>
                    <span class="badge ${getStatusBadgeClass(assignment.status)}">
                        ${assignment.status}
                    </span>
                </td>
                <td>${assignment.grade}</td>
                <td>
                    <button class="btn btn-sm btn-primary me-2" onclick="viewAssignment(${assignment.id})">
                        <i class='bx bx-show'></i> View
                    </button>
                    ${assignment.status === 'pending' ? `
                        <button class="btn btn-sm btn-success" onclick="showSubmissionModal(${assignment.id})">
                            <i class='bx bx-upload'></i> Submit
                        </button>
                    ` : ''}
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Initialize with all assignments
    populateAssignments(assignmentsData);

    // Filter functionality
    document.querySelectorAll('[data-filter]').forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            document.querySelectorAll('[data-filter]').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            const filteredAssignments = filter === 'all' 
                ? assignmentsData 
                : assignmentsData.filter(assignment => assignment.status === filter);
            
            populateAssignments(filteredAssignments);
        });
    });

    // Course filter functionality
    document.getElementById('courseFilter').addEventListener('change', function() {
        const selectedCourse = this.value;
        const filteredAssignments = selectedCourse === 'all'
            ? assignmentsData
            : assignmentsData.filter(assignment => 
                assignment.course.toLowerCase().includes(selectedCourse));
        
        populateAssignments(filteredAssignments);
    });

    // Search functionality
    document.getElementById('searchAssignments').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredAssignments = assignmentsData.filter(assignment =>
            assignment.title.toLowerCase().includes(searchTerm) ||
            assignment.course.toLowerCase().includes(searchTerm)
        );
        populateAssignments(filteredAssignments);
    });

    // View assignment details
    window.viewAssignment = function(assignmentId) {
        const assignment = assignmentsData.find(a => a.id === assignmentId);
        if (!assignment) return;

        const detailsContainer = document.getElementById('assignmentDetails');
        detailsContainer.innerHTML = `
            <h4>${assignment.title}</h4>
            <p class="text-muted">${assignment.course}</p>
            <div class="row mb-3">
                <div class="col-md-6">
                    <strong>Due Date:</strong> ${assignment.dueDate}
                </div>
                <div class="col-md-6">
                    <strong>Status:</strong> 
                    <span class="badge ${getStatusBadgeClass(assignment.status)}">
                        ${assignment.status}
                    </span>
                </div>
            </div>
            <div class="description mb-3">
                <h5>Description</h5>
                <p>${assignment.description}</p>
            </div>
            <div class="requirements">
                <h5>Requirements</h5>
                <ul>
                    ${assignment.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>
        `;

        // Show/hide submission section based on status
        const submissionSection = document.querySelector('.submission-section');
        const submitButton = document.getElementById('submitAssignment');
        if (assignment.status === 'pending') {
            submissionSection.style.display = 'block';
            submitButton.style.display = 'block';
        } else {
            submissionSection.style.display = 'none';
            submitButton.style.display = 'none';
        }

        const modal = new bootstrap.Modal(document.getElementById('assignmentModal'));
        modal.show();
    };

    // Submit assignment
    document.getElementById('submitAssignment').addEventListener('click', function() {
        const file = document.getElementById('submissionFile').files[0];
        const comments = document.getElementById('submissionComments').value;

        if (!file) {
            alert('Please select a file to submit');
            return;
        }

        // Simulate submission
        alert('Assignment submitted successfully!');
        const modal = bootstrap.Modal.getInstance(document.getElementById('assignmentModal'));
        modal.hide();

        // Reset form
        document.getElementById('submissionForm').reset();
    });

    // Handle Logout
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '../index.html';
    });

    // Helper function for status badge classes
    function getStatusBadgeClass(status) {
        switch(status) {
            case 'pending':
                return 'bg-warning';
            case 'submitted':
                return 'bg-info';
            case 'graded':
                return 'bg-success';
            default:
                return 'bg-secondary';
        }
    }

    // Add custom styles
    const style = document.createElement('style');
    style.textContent = `
        .badge {
            font-size: 0.8em;
            padding: 0.5em 0.8em;
        }

        .table > :not(caption) > * > * {
            padding: 1rem;
        }

        .btn-group .btn {
            padding: 0.5rem 1rem;
        }

        .btn-group .btn.active {
            background-color: #1e3c72;
            color: white;
            border-color: #1e3c72;
        }

        .modal-header {
            background-color: #1e3c72;
            color: white;
        }

        .btn-close {
            filter: brightness(0) invert(1);
        }

        .description, .requirements {
            background-color: #f8f9fa;
            padding: 1rem;
            border-radius: 5px;
        }

        .requirements ul {
            list-style-type: none;
            padding-left: 0;
        }

        .requirements li {
            padding: 0.5rem 0;
            border-bottom: 1px solid #dee2e6;
        }

        .requirements li:last-child {
            border-bottom: none;
        }
    `;
    document.head.appendChild(style);
});
