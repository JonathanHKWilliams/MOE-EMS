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

    // Mock attendance data
    const attendanceData = {
        present: 45,
        absent: 5,
        late: 3,
        rate: 90,
        courseWise: {
            Mathematics: 92,
            English: 88,
            Science: 95,
            History: 85
        },
        recent: [
            { date: '2025-03-01', status: 'present', course: 'Mathematics' },
            { date: '2025-02-28', status: 'present', course: 'English' },
            { date: '2025-02-27', status: 'late', course: 'Science' },
            { date: '2025-02-26', status: 'present', course: 'History' },
            { date: '2025-02-25', status: 'absent', course: 'Mathematics' }
        ],
        calendar: [
            { title: 'Present', start: '2025-03-01', color: '#28a745' },
            { title: 'Present', start: '2025-02-28', color: '#28a745' },
            { title: 'Late', start: '2025-02-27', color: '#ffc107' },
            { title: 'Present', start: '2025-02-26', color: '#28a745' },
            { title: 'Absent', start: '2025-02-25', color: '#dc3545' }
        ]
    };

    // Update attendance stats
    document.getElementById('presentDays').textContent = attendanceData.present;
    document.getElementById('absentDays').textContent = attendanceData.absent;
    document.getElementById('lateDays').textContent = attendanceData.late;
    document.getElementById('attendanceRate').textContent = `${attendanceData.rate}%`;

    // Initialize Calendar
    const calendarEl = document.getElementById('attendanceCalendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
        },
        events: attendanceData.calendar,
        eventClick: function(info) {
            showAttendanceDetails(info.event);
        }
    });
    calendar.render();

    // Calendar view buttons
    document.querySelectorAll('[data-view]').forEach(button => {
        button.addEventListener('click', function() {
            const view = this.dataset.view;
            calendar.changeView(view === 'month' ? 'dayGridMonth' : 'dayGridWeek');
            
            // Update active state
            document.querySelectorAll('[data-view]').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Initialize Course Attendance Chart
    const ctx = document.getElementById('courseAttendance').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(attendanceData.courseWise),
            datasets: [{
                label: 'Attendance Rate (%)',
                data: Object.values(attendanceData.courseWise),
                backgroundColor: '#1e3c72',
                borderRadius: 5
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
                    text: 'Course-wise Attendance Rate'
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

    // Populate Recent Attendance
    const recentAttendance = document.getElementById('recentAttendance');
    attendanceData.recent.forEach(record => {
        const recordDiv = document.createElement('div');
        recordDiv.className = 'attendance-record';
        recordDiv.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <div class="course-name">${record.course}</div>
                    <div class="date text-muted">${record.date}</div>
                </div>
                <span class="badge ${getStatusBadgeClass(record.status)}">
                    ${record.status}
                </span>
            </div>
        `;
        recentAttendance.appendChild(recordDiv);
    });

    // Show attendance details
    window.showAttendanceDetails = function(event) {
        const detailsContainer = document.getElementById('attendanceDetails');
        detailsContainer.innerHTML = `
            <div class="attendance-detail-header mb-3">
                <h6>Date: ${event.start.toLocaleDateString()}</h6>
                <span class="badge ${getStatusBadgeClass(event.title.toLowerCase())}">
                    ${event.title}
                </span>
            </div>
            <div class="attendance-info">
                <p><strong>Time:</strong> 8:00 AM</p>
                <p><strong>Course:</strong> Mathematics</p>
                <p><strong>Teacher:</strong> Mr. Johnson</p>
                ${event.title === 'Late' ? `
                    <div class="late-info alert alert-warning">
                        <i class='bx bx-time-five'></i>
                        Arrived 15 minutes late
                    </div>
                ` : ''}
                ${event.title === 'Absent' ? `
                    <div class="absent-info alert alert-danger">
                        <i class='bx bx-x-circle'></i>
                        Absence recorded
                    </div>
                ` : ''}
            </div>
        `;

        const modal = new bootstrap.Modal(document.getElementById('attendanceModal'));
        modal.show();
    };

    // Handle Logout
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '../index.html';
    });

    // Helper function for status badge classes
    function getStatusBadgeClass(status) {
        switch(status.toLowerCase()) {
            case 'present':
                return 'bg-success';
            case 'absent':
                return 'bg-danger';
            case 'late':
                return 'bg-warning';
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

        .stat-icon.present {
            background: #28a745;
        }

        .stat-icon.absent {
            background: #dc3545;
        }

        .stat-icon.late {
            background: #ffc107;
        }

        .stat-icon.overall {
            background: #1e3c72;
        }

        .attendance-record {
            padding: 1rem;
            border-bottom: 1px solid #dee2e6;
        }

        .attendance-record:last-child {
            border-bottom: none;
        }

        .course-name {
            font-weight: bold;
        }

        .date {
            font-size: 0.9em;
        }

        .badge {
            font-size: 0.8em;
            padding: 0.5em 0.8em;
        }

        .modal-header {
            background-color: #1e3c72;
            color: white;
        }

        .btn-close {
            filter: brightness(0) invert(1);
        }

        .attendance-detail-header {
            background-color: #f8f9fa;
            padding: 1rem;
            border-radius: 5px;
        }

        .attendance-info {
            background-color: #f8f9fa;
            padding: 1rem;
            border-radius: 5px;
        }

        .late-info, .absent-info {
            margin-top: 1rem;
            margin-bottom: 0;
        }

        .fc {
            background: white;
            padding: 1rem;
            border-radius: 5px;
        }

        .fc-toolbar-title {
            font-size: 1.2em !important;
        }

        .fc-button-primary {
            background-color: #1e3c72 !important;
            border-color: #1e3c72 !important;
        }

        .fc-day-today {
            background-color: rgba(30, 60, 114, 0.1) !important;
        }
    `;
    document.head.appendChild(style);
});
