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

    // Mock student data
    const studentData = {
        name: "John Smith",
        id: "STU001",
        grade: "10A",
        subjects: ["Mathematics", "English", "Science", "History", "Geography"],
        grades: [85, 92, 78, 88, 90]
    };

    // Update student information
    document.getElementById('student-name').textContent = studentData.name;
    document.getElementById('welcome-name').textContent = studentData.name.split(' ')[0];

    // Initialize Academic Progress Chart
    const ctx = document.getElementById('academicProgress').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: studentData.subjects,
            datasets: [{
                label: 'Current Grade',
                data: studentData.grades,
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
                    text: 'Subject Performance'
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

    // Populate Today's Schedule
    const scheduleData = [
        { time: '08:00 AM', subject: 'Mathematics', teacher: 'Mr. Johnson', room: 'Room 101' },
        { time: '09:30 AM', subject: 'English', teacher: 'Mrs. Davis', room: 'Room 203' },
        { time: '11:00 AM', subject: 'Science', teacher: 'Dr. Wilson', room: 'Lab 3' },
        { time: '01:00 PM', subject: 'History', teacher: 'Ms. Thompson', room: 'Room 105' }
    ];

    const scheduleContainer = document.getElementById('todaySchedule');
    scheduleData.forEach(class_ => {
        const scheduleItem = document.createElement('div');
        scheduleItem.className = 'schedule-item';
        scheduleItem.innerHTML = `
            <div class="schedule-time">${class_.time}</div>
            <div class="schedule-details">
                <div class="subject">${class_.subject}</div>
                <div class="teacher">${class_.teacher}</div>
                <div class="room">${class_.room}</div>
            </div>
        `;
        scheduleContainer.appendChild(scheduleItem);
    });

    // Populate Upcoming Tasks
    const tasksData = [
        { subject: 'Mathematics', task: 'Algebra Assignment', due: '2025-03-03', priority: 'high' },
        { subject: 'English', task: 'Essay Submission', due: '2025-03-04', priority: 'medium' },
        { subject: 'Science', task: 'Lab Report', due: '2025-03-05', priority: 'high' },
        { subject: 'History', task: 'Research Paper', due: '2025-03-07', priority: 'medium' }
    ];

    const tasksContainer = document.getElementById('upcomingTasks');
    tasksData.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item priority-${task.priority}`;
        taskItem.innerHTML = `
            <div class="task-subject">${task.subject}</div>
            <div class="task-details">
                <div class="task-name">${task.task}</div>
                <div class="task-due">Due: ${task.due}</div>
            </div>
        `;
        tasksContainer.appendChild(taskItem);
    });

    // Populate Recent Announcements
    const announcementsData = [
        { title: 'Mid-Term Exam Schedule', date: '2025-03-01', type: 'academic' },
        { title: 'Science Fair Registration', date: '2025-02-28', type: 'event' },
        { title: 'Parent-Teacher Meeting', date: '2025-02-27', type: 'important' },
        { title: 'Sports Day Announcement', date: '2025-02-26', type: 'general' }
    ];

    const announcementsContainer = document.getElementById('recentAnnouncements');
    announcementsData.forEach(announcement => {
        const announcementItem = document.createElement('div');
        announcementItem.className = `announcement-item type-${announcement.type}`;
        announcementItem.innerHTML = `
            <div class="announcement-title">${announcement.title}</div>
            <div class="announcement-date">${announcement.date}</div>
        `;
        announcementsContainer.appendChild(announcementItem);
    });

    // Handle Logout
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '../index.html';
    });

    // Add custom styles
    const style = document.createElement('style');
    style.textContent = `
        .schedule-item {
            display: flex;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #eee;
        }

        .schedule-time {
            min-width: 100px;
            font-weight: bold;
            color: #1e3c72;
        }

        .schedule-details {
            flex-grow: 1;
        }

        .subject {
            font-weight: bold;
        }

        .teacher, .room {
            font-size: 0.9em;
            color: #666;
        }

        .task-item {
            display: flex;
            padding: 10px;
            border-left: 4px solid;
            margin-bottom: 10px;
            background: #f8f9fa;
        }

        .task-item.priority-high {
            border-color: #dc3545;
        }

        .task-item.priority-medium {
            border-color: #ffc107;
        }

        .task-subject {
            min-width: 100px;
            font-weight: bold;
        }

        .task-details {
            flex-grow: 1;
        }

        .task-due {
            font-size: 0.9em;
            color: #666;
        }

        .announcement-item {
            padding: 10px;
            border-left: 4px solid;
            margin-bottom: 10px;
            background: #f8f9fa;
        }

        .announcement-item.type-important {
            border-color: #dc3545;
        }

        .announcement-item.type-academic {
            border-color: #1e3c72;
        }

        .announcement-item.type-event {
            border-color: #28a745;
        }

        .announcement-item.type-general {
            border-color: #6c757d;
        }

        .announcement-date {
            font-size: 0.9em;
            color: #666;
        }

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
            margin-bottom: 15px;
        }

        .stat-icon i {
            font-size: 24px;
            color: white;
        }

        .stat-icon.attendance {
            background: #1e3c72;
        }

        .stat-icon.grades {
            background: #28a745;
        }

        .stat-icon.assignments {
            background: #ffc107;
        }

        .stat-icon.achievements {
            background: #17a2b8;
        }
    `;
    document.head.appendChild(style);
});
