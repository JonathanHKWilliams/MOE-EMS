document.addEventListener("DOMContentLoaded", function() {
    // Show/Hide Sidebar
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

    // Load Mock Data
    const activities = [
        {
            type: 'grade',
            title: 'New Grade Posted',
            description: 'Math Quiz Grade: A',
            time: '2 hours ago'
        },
        {
            type: 'attendance',
            title: 'Attendance Marked',
            description: 'Present in all classes',
            time: '5 hours ago'
        },
        {
            type: 'payment',
            title: 'Fee Payment',
            description: 'Term 2 fees paid successfully',
            time: '1 day ago'
        },
        {
            type: 'event',
            title: 'Parent-Teacher Meeting',
            description: 'Scheduled for next week',
            time: '2 days ago'
        }
    ];

    const events = [
        {
            title: 'Mid-Term Exams',
            date: '2025-03-15',
            type: 'exam'
        },
        {
            title: 'Sports Day',
            date: '2025-03-20',
            type: 'event'
        },
        {
            title: 'Parent-Teacher Meeting',
            date: '2025-03-10',
            type: 'meeting'
        }
    ];

    // Populate Activities
    const activityList = document.getElementById('activity-list');
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="d-flex align-items-center">
                <i class='bx bx-${getActivityIcon(activity.type)} me-3' style="color: ${getActivityColor(activity.type)}"></i>
                <div>
                    <h6 class="mb-1">${activity.title}</h6>
                    <p class="mb-1">${activity.description}</p>
                    <small class="text-muted">${activity.time}</small>
                </div>
            </div>
        `;
        activityList.appendChild(activityItem);
    });

    // Populate Events
    const eventList = document.getElementById('event-list');
    events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        eventItem.innerHTML = `
            <div class="d-flex align-items-center">
                <i class='bx bx-${getEventIcon(event.type)} me-3' style="color: ${getEventColor(event.type)}"></i>
                <div>
                    <h6 class="mb-1">${event.title}</h6>
                    <small class="text-muted">${formatDate(event.date)}</small>
                </div>
            </div>
        `;
        eventList.appendChild(eventItem);
    });

    // Handle Logout
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        // Add logout logic here
        window.location.href = '../index.html';
    });
});

// Helper Functions
function getActivityIcon(type) {
    switch(type) {
        case 'grade': return 'book';
        case 'attendance': return 'calendar-check';
        case 'payment': return 'money';
        case 'event': return 'calendar-event';
        default: return 'bell';
    }
}

function getActivityColor(type) {
    switch(type) {
        case 'grade': return '#28a745';
        case 'attendance': return '#007bff';
        case 'payment': return '#6f42c1';
        case 'event': return '#fd7e14';
        default: return '#6c757d';
    }
}

function getEventIcon(type) {
    switch(type) {
        case 'exam': return 'edit';
        case 'event': return 'calendar-event';
        case 'meeting': return 'group';
        default: return 'calendar';
    }
}

function getEventColor(type) {
    switch(type) {
        case 'exam': return '#dc3545';
        case 'event': return '#28a745';
        case 'meeting': return '#007bff';
        default: return '#6c757d';
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
