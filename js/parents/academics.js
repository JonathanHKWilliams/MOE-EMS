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
    const performanceData = {
        labels: ['Term 1', 'Term 2', 'Term 3', 'Term 4'],
        datasets: [
            {
                label: 'Overall Grade',
                data: [85, 88, 92, 90],
                borderColor: '#1e3c72',
                tension: 0.4,
                fill: false
            },
            {
                label: 'Class Average',
                data: [78, 80, 82, 81],
                borderColor: '#6c8dc3',
                tension: 0.4,
                fill: false
            }
        ]
    };

    const subjects = [
        {
            name: 'Mathematics',
            teacher: 'Mr. Johnson',
            currentGrade: 'A',
            classAverage: 'B+',
            lastAssessment: '95/100',
            trend: 'up'
        },
        {
            name: 'English',
            teacher: 'Mrs. Smith',
            currentGrade: 'A-',
            classAverage: 'B',
            lastAssessment: '88/100',
            trend: 'stable'
        },
        {
            name: 'Science',
            teacher: 'Dr. Brown',
            currentGrade: 'B+',
            classAverage: 'B',
            lastAssessment: '85/100',
            trend: 'up'
        },
        {
            name: 'History',
            teacher: 'Ms. Davis',
            currentGrade: 'A',
            classAverage: 'B-',
            lastAssessment: '92/100',
            trend: 'up'
        }
    ];

    const assessments = [
        {
            subject: 'Mathematics',
            type: 'Quiz',
            date: '2025-02-28',
            score: '95/100',
            topic: 'Quadratic Equations'
        },
        {
            subject: 'English',
            type: 'Essay',
            date: '2025-02-25',
            score: '88/100',
            topic: 'Literary Analysis'
        },
        {
            subject: 'Science',
            type: 'Lab Report',
            date: '2025-02-23',
            score: '90/100',
            topic: 'Chemical Reactions'
        }
    ];

    // Initialize Performance Chart
    const ctx = document.getElementById('performanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: performanceData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Academic Performance Trend'
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

    // Populate Subjects Table
    const subjectsTable = document.getElementById('subjectsTable');
    subjects.forEach(subject => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${subject.name}</td>
            <td>${subject.teacher}</td>
            <td>
                <span class="badge bg-${getGradeBadgeColor(subject.currentGrade)}">
                    ${subject.currentGrade}
                </span>
            </td>
            <td>${subject.classAverage}</td>
            <td>${subject.lastAssessment}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-2" onclick="viewSubjectDetails('${subject.name}')">
                    Details
                </button>
                <button class="btn btn-sm btn-outline-secondary" onclick="viewAssignments('${subject.name}')">
                    Assignments
                </button>
            </td>
        `;
        subjectsTable.appendChild(row);
    });

    // Populate Assessments Timeline
    const assessmentsList = document.getElementById('assessmentsList');
    assessments.forEach(assessment => {
        const item = document.createElement('div');
        item.className = 'assessment-item';
        item.innerHTML = `
            <div class="assessment-date">
                ${formatDate(assessment.date)}
            </div>
            <div class="assessment-content">
                <h6>${assessment.subject} - ${assessment.type}</h6>
                <p>Topic: ${assessment.topic}</p>
                <p class="score">Score: ${assessment.score}</p>
            </div>
        `;
        assessmentsList.appendChild(item);
    });

    // Handle Student Selection Change
    document.getElementById('studentSelector').addEventListener('change', function(e) {
        // Update all data based on selected student
        updateDashboard(e.target.value);
    });

    // Handle Logout
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '../index.html';
    });
});

// Helper Functions
function getGradeBadgeColor(grade) {
    switch(grade[0]) {
        case 'A': return 'success';
        case 'B': return 'primary';
        case 'C': return 'warning';
        default: return 'danger';
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function viewSubjectDetails(subject) {
    window.location.href = `subject-details.html?subject=${encodeURIComponent(subject)}`;
}

function viewAssignments(subject) {
    window.location.href = `assignments.html?subject=${encodeURIComponent(subject)}`;
}

function updateDashboard(studentId) {
    // This would typically fetch new data from the server
    // For now, just show an alert
    alert(`Loading data for student ${studentId}`);
}

// Add custom styles
const style = document.createElement('style');
style.textContent = `
    .term-stats {
        display: grid;
        gap: 1rem;
    }

    .stat-item {
        text-align: center;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 0.5rem;
    }

    .stat-item h3 {
        color: var(--first-color);
        margin: 0;
    }

    .assessment-timeline {
        display: grid;
        gap: 1rem;
    }

    .assessment-item {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 0.5rem;
    }

    .assessment-date {
        color: var(--first-color);
        font-weight: 500;
    }

    .assessment-content h6 {
        margin: 0;
        color: var(--first-color);
    }

    .assessment-content p {
        margin: 0.5rem 0 0;
    }

    .score {
        font-weight: 500;
        color: var(--first-color);
    }
`;
document.head.appendChild(style);
