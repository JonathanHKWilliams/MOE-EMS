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

    // Initialize Attendance Chart
    const ctx = document.getElementById('attendanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Attendance Rate (%)',
                data: [98, 95, 97, 96, 98, 97],
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
                    text: 'Monthly Attendance Rate'
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

    // Calendar Navigation
    let currentDate = new Date();
    updateCalendar(currentDate);

    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar(currentDate);
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar(currentDate);
    });

    // Populate Recent Attendance Records
    const mockAttendanceRecords = [
        {
            date: '2025-03-01',
            status: 'Present',
            timeIn: '07:45 AM',
            timeOut: '03:30 PM',
            remarks: 'On time'
        },
        {
            date: '2025-02-28',
            status: 'Present',
            timeIn: '07:50 AM',
            timeOut: '03:30 PM',
            remarks: 'On time'
        },
        {
            date: '2025-02-27',
            status: 'Late',
            timeIn: '08:15 AM',
            timeOut: '03:30 PM',
            remarks: 'Traffic delay'
        },
        {
            date: '2025-02-26',
            status: 'Absent',
            timeIn: '-',
            timeOut: '-',
            remarks: 'Sick leave'
        }
    ];

    const attendanceRecords = document.getElementById('attendanceRecords');
    mockAttendanceRecords.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(record.date)}</td>
            <td>
                <span class="badge bg-${getStatusBadgeColor(record.status)}">
                    ${record.status}
                </span>
            </td>
            <td>${record.timeIn}</td>
            <td>${record.timeOut}</td>
            <td>${record.remarks}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewDetails('${record.date}')">
                    Details
                </button>
            </td>
        `;
        attendanceRecords.appendChild(row);
    });

    // Handle Student Selection Change
    document.getElementById('studentSelector').addEventListener('change', function(e) {
        updateAttendanceData(e.target.value);
    });

    // Handle Logout
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '../index.html';
    });
});

// Helper Functions
function updateCalendar(date) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    
    document.getElementById('currentMonth').textContent = 
        `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

    const calendar = document.getElementById('attendanceCalendar');
    calendar.innerHTML = '';

    // Add day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-header';
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });

    // Get first day of month and total days
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    // Add empty cells for days before first of month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendar.appendChild(emptyDay);
    }

    // Add days of month
    for (let i = 1; i <= totalDays; i++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.innerHTML = `
            <span class="date">${i}</span>
            <span class="status ${getRandomStatus()}"></span>
        `;
        calendar.appendChild(dayCell);
    }
}

function getRandomStatus() {
    const statuses = ['present', 'absent', 'late'];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

function getStatusBadgeColor(status) {
    switch(status.toLowerCase()) {
        case 'present': return 'success';
        case 'late': return 'warning';
        case 'absent': return 'danger';
        default: return 'secondary';
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function viewDetails(date) {
    // Redirect to detailed view
    window.location.href = `attendance-details.html?date=${date}`;
}

function updateAttendanceData(studentId) {
    // This would typically fetch new data from the server
    alert(`Loading attendance data for student ${studentId}`);
}

// Add custom styles
const style = document.createElement('style');
style.textContent = `
    .attendance-stats {
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

    .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 0.5rem;
        padding: 1rem;
    }

    .calendar-header {
        text-align: center;
        font-weight: 500;
        color: var(--first-color);
    }

    .calendar-day {
        aspect-ratio: 1;
        padding: 0.5rem;
        border: 1px solid #dee2e6;
        border-radius: 0.25rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
    }

    .calendar-day.empty {
        border: none;
    }

    .calendar-day .date {
        font-weight: 500;
    }

    .calendar-day .status {
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }

    .status.present {
        background-color: #28a745;
    }

    .status.absent {
        background-color: #dc3545;
    }

    .status.late {
        background-color: #ffc107;
    }
`;
document.head.appendChild(style);
