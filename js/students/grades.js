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

    // Mock grades data
    const gradesData = [
        {
            course: "Mathematics",
            credits: 4,
            midterm: 88,
            final: 92,
            assignments: 85,
            overall: 88.5,
            grade: "A",
            details: {
                assignments: [
                    { name: "Algebra Quiz", score: 85, weight: 10 },
                    { name: "Geometry Project", score: 92, weight: 15 },
                    { name: "Calculus Test", score: 88, weight: 20 }
                ],
                participation: 90,
                attendance: 95
            }
        },
        {
            course: "English Literature",
            credits: 3,
            midterm: 90,
            final: 94,
            assignments: 92,
            overall: 92,
            grade: "A",
            details: {
                assignments: [
                    { name: "Essay Analysis", score: 92, weight: 15 },
                    { name: "Poetry Project", score: 88, weight: 20 },
                    { name: "Novel Review", score: 94, weight: 15 }
                ],
                participation: 95,
                attendance: 92
            }
        },
        {
            course: "Science",
            credits: 4,
            midterm: 82,
            final: 88,
            assignments: 85,
            overall: 85,
            grade: "B+",
            details: {
                assignments: [
                    { name: "Lab Report", score: 85, weight: 15 },
                    { name: "Research Project", score: 88, weight: 20 },
                    { name: "Final Experiment", score: 82, weight: 15 }
                ],
                participation: 88,
                attendance: 90
            }
        },
        {
            course: "History",
            credits: 3,
            midterm: 85,
            final: 90,
            assignments: 88,
            overall: 87.5,
            grade: "B+",
            details: {
                assignments: [
                    { name: "Research Paper", score: 88, weight: 20 },
                    { name: "Presentation", score: 85, weight: 15 },
                    { name: "Timeline Project", score: 90, weight: 15 }
                ],
                participation: 85,
                attendance: 88
            }
        }
    ];

    // Initialize Grade Distribution Chart
    const ctx = document.getElementById('gradeDistribution').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: gradesData.map(course => course.course),
            datasets: [{
                label: 'Overall Grade',
                data: gradesData.map(course => course.overall),
                borderColor: '#1e3c72',
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Course Performance Overview'
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

    // Populate Grade Summary
    const gradeSummary = document.getElementById('gradeSummary');
    const gradeCategories = {
        'A': gradesData.filter(course => course.grade.startsWith('A')).length,
        'B': gradesData.filter(course => course.grade.startsWith('B')).length,
        'C': gradesData.filter(course => course.grade.startsWith('C')).length,
        'D': gradesData.filter(course => course.grade.startsWith('D')).length,
        'F': gradesData.filter(course => course.grade.startsWith('F')).length
    };

    Object.entries(gradeCategories).forEach(([grade, count]) => {
        const gradeItem = document.createElement('div');
        gradeItem.className = 'grade-item d-flex justify-content-between align-items-center mb-2';
        gradeItem.innerHTML = `
            <span class="grade-letter">${grade}</span>
            <div class="progress flex-grow-1 mx-2" style="height: 10px;">
                <div class="progress-bar" role="progressbar" 
                     style="width: ${(count / gradesData.length) * 100}%"></div>
            </div>
            <span class="grade-count">${count}</span>
        `;
        gradeSummary.appendChild(gradeItem);
    });

    // Populate Grades Table
    const gradesTable = document.getElementById('gradesTable');
    gradesData.forEach(course => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${course.course}</td>
            <td>${course.credits}</td>
            <td>${course.midterm}%</td>
            <td>${course.final}%</td>
            <td>${course.assignments}%</td>
            <td>${course.overall}%</td>
            <td><span class="badge ${getGradeBadgeClass(course.grade)}">${course.grade}</span></td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewGradeDetails('${course.course}')">
                    <i class='bx bx-show'></i> Details
                </button>
            </td>
        `;
        gradesTable.appendChild(tr);
    });

    // View grade details
    window.viewGradeDetails = function(courseName) {
        const course = gradesData.find(c => c.course === courseName);
        if (!course) return;

        const detailsContainer = document.getElementById('gradeDetails');
        detailsContainer.innerHTML = `
            <h4>${course.course}</h4>
            <div class="overall-grade mb-4">
                <h5>Overall Grade: ${course.grade} (${course.overall}%)</h5>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${course.overall}%"></div>
                </div>
            </div>
            <div class="grade-breakdown">
                <h5>Grade Breakdown</h5>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Component</th>
                            <th>Score</th>
                            <th>Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${course.details.assignments.map(assignment => `
                            <tr>
                                <td>${assignment.name}</td>
                                <td>${assignment.score}%</td>
                                <td>${assignment.weight}%</td>
                            </tr>
                        `).join('')}
                        <tr>
                            <td>Participation</td>
                            <td>${course.details.participation}%</td>
                            <td>10%</td>
                        </tr>
                        <tr>
                            <td>Attendance</td>
                            <td>${course.details.attendance}%</td>
                            <td>5%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;

        const modal = new bootstrap.Modal(document.getElementById('gradeDetailsModal'));
        modal.show();
    };

    // Handle Logout
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '../index.html';
    });

    // Helper function for grade badge classes
    function getGradeBadgeClass(grade) {
        switch(grade[0]) {
            case 'A':
                return 'bg-success';
            case 'B':
                return 'bg-primary';
            case 'C':
                return 'bg-warning';
            case 'D':
                return 'bg-danger';
            default:
                return 'bg-secondary';
        }
    }

    // Add custom styles
    const style = document.createElement('style');
    style.textContent = `
        .stat-card {
            transition: transform 0.3s;
        }

        .stat-card:hover {
            transform: translateY(-5px);
        }

        .stat-icon {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px;
        }

        .stat-icon i {
            font-size: 24px;
            color: white;
        }

        .stat-icon.gpa {
            background: #1e3c72;
        }

        .stat-icon.rank {
            background: #28a745;
        }

        .stat-icon.completed {
            background: #17a2b8;
        }

        .stat-icon.remaining {
            background: #6c757d;
        }

        .grade-item {
            padding: 0.5rem;
            background: #f8f9fa;
            border-radius: 5px;
        }

        .grade-letter {
            font-weight: bold;
            width: 30px;
        }

        .grade-count {
            width: 30px;
            text-align: right;
        }

        .badge {
            font-size: 0.8em;
            padding: 0.5em 0.8em;
        }

        .progress {
            height: 10px;
            border-radius: 5px;
        }

        .progress-bar {
            background-color: #1e3c72;
        }

        .modal-header {
            background-color: #1e3c72;
            color: white;
        }

        .btn-close {
            filter: brightness(0) invert(1);
        }

        .overall-grade {
            background-color: #f8f9fa;
            padding: 1rem;
            border-radius: 5px;
        }

        .grade-breakdown {
            background-color: #f8f9fa;
            padding: 1rem;
            border-radius: 5px;
        }
    `;
    document.head.appendChild(style);
});
