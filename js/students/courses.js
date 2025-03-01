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

    // Mock course data
    const coursesData = [
        {
            id: 1,
            name: "Mathematics",
            teacher: "Mr. Johnson",
            schedule: "Monday, Wednesday, Friday - 8:00 AM",
            progress: 75,
            grade: 85,
            color: "#1e3c72",
            icon: "bx-math",
            assignments: [
                { title: "Algebra Quiz", due: "2025-03-05" },
                { title: "Geometry Project", due: "2025-03-10" }
            ],
            materials: [
                { title: "Algebra Textbook", type: "pdf" },
                { title: "Practice Worksheets", type: "doc" }
            ]
        },
        {
            id: 2,
            name: "English Literature",
            teacher: "Mrs. Davis",
            schedule: "Tuesday, Thursday - 9:30 AM",
            progress: 65,
            grade: 92,
            color: "#2a5298",
            icon: "bx-book-open",
            assignments: [
                { title: "Essay Analysis", due: "2025-03-07" },
                { title: "Reading Assignment", due: "2025-03-12" }
            ],
            materials: [
                { title: "Literature Anthology", type: "pdf" },
                { title: "Writing Guide", type: "doc" }
            ]
        },
        {
            id: 3,
            name: "Science",
            teacher: "Dr. Wilson",
            schedule: "Monday, Wednesday, Friday - 11:00 AM",
            progress: 80,
            grade: 88,
            color: "#3667be",
            icon: "bx-atom",
            assignments: [
                { title: "Lab Report", due: "2025-03-06" },
                { title: "Science Project", due: "2025-03-15" }
            ],
            materials: [
                { title: "Science Textbook", type: "pdf" },
                { title: "Lab Manual", type: "pdf" }
            ]
        },
        {
            id: 4,
            name: "History",
            teacher: "Ms. Thompson",
            schedule: "Tuesday, Thursday - 1:00 PM",
            progress: 70,
            grade: 90,
            color: "#427bd4",
            icon: "bx-time-five",
            assignments: [
                { title: "Research Paper", due: "2025-03-08" },
                { title: "Timeline Project", due: "2025-03-14" }
            ],
            materials: [
                { title: "History Textbook", type: "pdf" },
                { title: "Historical Documents", type: "doc" }
            ]
        }
    ];

    // Populate course cards
    const courseContainer = document.getElementById('courseContainer');
    coursesData.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'col-md-6 col-lg-4 mb-4';
        courseCard.innerHTML = `
            <div class="card course-card h-100" data-course-id="${course.id}">
                <div class="card-body">
                    <div class="course-icon" style="background-color: ${course.color}">
                        <i class='bx ${course.icon}'></i>
                    </div>
                    <h5 class="card-title mt-3">${course.name}</h5>
                    <p class="card-text">${course.teacher}</p>
                    <div class="progress mb-3">
                        <div class="progress-bar" role="progressbar" style="width: ${course.progress}%"
                             aria-valuenow="${course.progress}" aria-valuemin="0" aria-valuemax="100">
                            ${course.progress}%
                        </div>
                    </div>
                    <div class="course-grade">
                        Current Grade: <span class="grade">${course.grade}%</span>
                    </div>
                    <button class="btn btn-primary mt-3" onclick="showCourseDetails(${course.id})">
                        View Details
                    </button>
                </div>
            </div>
        `;
        courseContainer.appendChild(courseCard);
    });

    // Course details modal functionality
    window.showCourseDetails = function(courseId) {
        const course = coursesData.find(c => c.id === courseId);
        if (!course) return;

        // Update modal content
        document.getElementById('modalCourseName').textContent = course.name;
        document.getElementById('modalCourseTeacher').textContent = `Teacher: ${course.teacher}`;
        document.getElementById('modalCourseSchedule').textContent = `Schedule: ${course.schedule}`;
        
        const progressBar = document.getElementById('modalCourseProgress');
        progressBar.style.width = `${course.progress}%`;
        progressBar.textContent = `${course.progress}%`;

        document.getElementById('modalCourseGrade').textContent = `${course.grade}%`;

        // Populate assignments
        const assignmentsContainer = document.getElementById('modalCourseAssignments');
        assignmentsContainer.innerHTML = course.assignments.map(assignment => `
            <div class="list-group-item">
                <div class="d-flex justify-content-between align-items-center">
                    <div>${assignment.title}</div>
                    <span class="badge bg-primary">${assignment.due}</span>
                </div>
            </div>
        `).join('');

        // Populate materials
        const materialsContainer = document.getElementById('modalCourseMaterials');
        materialsContainer.innerHTML = course.materials.map(material => `
            <div class="list-group-item">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <i class='bx bx-file me-2'></i>
                        ${material.title}
                    </div>
                    <span class="badge bg-secondary">${material.type}</span>
                </div>
            </div>
        `).join('');

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('courseModal'));
        modal.show();
    };

    // Handle Logout
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '../index.html';
    });

    // Add custom styles
    const style = document.createElement('style');
    style.textContent = `
        .course-card {
            transition: transform 0.3s;
            border: none;
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
        }

        .course-card:hover {
            transform: translateY(-5px);
        }

        .course-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
        }

        .course-icon i {
            font-size: 30px;
            color: white;
        }

        .course-grade {
            font-size: 0.9em;
            color: #666;
        }

        .course-grade .grade {
            font-weight: bold;
            color: #1e3c72;
        }

        .progress {
            height: 10px;
            border-radius: 5px;
        }

        .progress-bar {
            background-color: #1e3c72;
        }

        .grade-display {
            font-size: 2em;
            font-weight: bold;
            color: #1e3c72;
        }

        .list-group-item {
            border: none;
            background-color: #f8f9fa;
            margin-bottom: 5px;
            border-radius: 5px;
        }

        .modal-content {
            border: none;
            border-radius: 10px;
        }

        .modal-header {
            background-color: #1e3c72;
            color: white;
            border-radius: 10px 10px 0 0;
        }

        .btn-close {
            filter: brightness(0) invert(1);
        }
    `;
    document.head.appendChild(style);
});
