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

    // Initialize FullCalendar
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: false,
        height: 'auto',
        events: getMockEvents(),
        eventClick: function(info) {
            showEventDetails(info.event);
        },
        eventDidMount: function(info) {
            const category = info.event.extendedProps.category;
            info.el.classList.add(category);
        }
    });
    calendar.render();

    // Handle Calendar Navigation
    document.getElementById('prevMonth').addEventListener('click', () => {
        calendar.prev();
    });

    document.getElementById('today').addEventListener('click', () => {
        calendar.today();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        calendar.next();
    });

    // Handle Category Filters
    document.querySelectorAll('.event-categories input').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const category = this.id.replace('Events', '');
            toggleEventCategory(category.toLowerCase(), this.checked);
        });
    });

    // Populate Upcoming Events
    populateUpcomingEvents();

    // Handle Student Selection Change
    document.getElementById('studentSelector').addEventListener('change', function(e) {
        updateCalendarData(e.target.value);
    });

    // Handle Logout
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '../index.html';
    });
});

// Mock Data Functions
function getMockEvents() {
    return [
        {
            title: 'Mid-Term Exams',
            start: '2025-03-15',
            end: '2025-03-20',
            category: 'exam',
            location: 'School Examination Hall',
            description: 'Mid-term examinations for all subjects'
        },
        {
            title: 'Sports Day',
            start: '2025-03-25',
            category: 'sport',
            location: 'School Sports Ground',
            description: 'Annual school sports day with various athletic events'
        },
        {
            title: 'Parent-Teacher Meeting',
            start: '2025-03-10',
            category: 'academic',
            location: 'School Auditorium',
            description: 'Discussion about student progress and academic performance'
        },
        {
            title: 'Easter Holiday',
            start: '2025-03-31',
            end: '2025-04-05',
            category: 'holiday',
            description: 'School closed for Easter break'
        },
        {
            title: 'Science Fair',
            start: '2025-03-28',
            category: 'academic',
            location: 'School Science Lab',
            description: 'Annual science project exhibition'
        }
    ];
}

// Helper Functions
function showEventDetails(event) {
    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventDate').textContent = formatEventDate(event);
    document.getElementById('eventTime').textContent = event.allDay ? 'All Day' : formatEventTime(event);
    document.getElementById('eventLocation').textContent = event.extendedProps.location || 'Not specified';
    document.getElementById('eventDescription').textContent = event.extendedProps.description || 'No description available';

    const modal = new bootstrap.Modal(document.getElementById('eventModal'));
    modal.show();
}

function formatEventDate(event) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const start = new Date(event.start).toLocaleDateString(undefined, options);
    if (event.end) {
        const end = new Date(event.end).toLocaleDateString(undefined, options);
        return `${start} - ${end}`;
    }
    return start;
}

function formatEventTime(event) {
    const options = { hour: 'numeric', minute: 'numeric' };
    return `${new Date(event.start).toLocaleTimeString(undefined, options)} - 
            ${new Date(event.end).toLocaleTimeString(undefined, options)}`;
}

function toggleEventCategory(category, show) {
    const events = document.querySelectorAll(`.fc-event.${category}`);
    events.forEach(event => {
        event.style.display = show ? 'block' : 'none';
    });
}

function populateUpcomingEvents() {
    const events = getMockEvents()
        .filter(event => new Date(event.start) >= new Date())
        .sort((a, b) => new Date(a.start) - new Date(b.start))
        .slice(0, 5);

    const upcomingEvents = document.getElementById('upcomingEvents');
    events.forEach(event => {
        const div = document.createElement('div');
        div.className = `upcoming-event ${event.category}`;
        div.innerHTML = `
            <div class="event-date">
                <span class="date">${new Date(event.start).getDate()}</span>
                <span class="month">${new Date(event.start).toLocaleString('default', { month: 'short' })}</span>
            </div>
            <div class="event-info">
                <h6>${event.title}</h6>
                <small>${event.location || 'Location not specified'}</small>
            </div>
        `;
        upcomingEvents.appendChild(div);
    });
}

function addToCalendar() {
    alert('Adding event to your calendar...');
}

function updateCalendarData(studentId) {
    // This would typically fetch new data from the server
    alert(`Loading calendar data for student ${studentId}`);
}

// Add custom styles
const style = document.createElement('style');
style.textContent = `
    .fc {
        background: white;
        padding: 1rem;
        border-radius: 0.5rem;
    }

    .fc-day-today {
        background-color: rgba(30, 60, 114, 0.1) !important;
    }

    .fc-event {
        border: none;
        padding: 0.25rem;
        margin: 0.125rem;
        border-radius: 0.25rem;
    }

    .fc-event.academic {
        background-color: #1e3c72;
    }

    .fc-event.exam {
        background-color: #dc3545;
    }

    .fc-event.holiday {
        background-color: #28a745;
    }

    .fc-event.sport {
        background-color: #ffc107;
    }

    .fc-event.other {
        background-color: #6c757d;
    }

    .category-dot {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-right: 0.5rem;
    }

    .category-dot.academic {
        background-color: #1e3c72;
    }

    .category-dot.exam {
        background-color: #dc3545;
    }

    .category-dot.holiday {
        background-color: #28a745;
    }

    .category-dot.sport {
        background-color: #ffc107;
    }

    .category-dot.other {
        background-color: #6c757d;
    }

    .upcoming-event {
        display: flex;
        align-items: center;
        padding: 0.75rem;
        border-bottom: 1px solid #dee2e6;
    }

    .upcoming-event:last-child {
        border-bottom: none;
    }

    .event-date {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        background: #f8f9fa;
        border-radius: 0.5rem;
        margin-right: 1rem;
    }

    .event-date .date {
        font-size: 1.5rem;
        font-weight: bold;
        line-height: 1;
    }

    .event-date .month {
        font-size: 0.875rem;
        color: #6c757d;
    }

    .event-info {
        flex: 1;
    }

    .event-info h6 {
        margin: 0;
        color: var(--first-color);
    }

    .event-info small {
        color: #6c757d;
    }

    .event-details i {
        width: 24px;
        color: var(--first-color);
    }
`;
document.head.appendChild(style);
