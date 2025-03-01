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

    // Mock schedule data
    const scheduleData = {
        courses: [
            {
                id: 1,
                name: "Mathematics",
                days: "Monday, Wednesday, Friday",
                time: "8:00 AM - 9:30 AM",
                room: "Room 101",
                teacher: "Mr. Johnson",
                color: "#1e3c72"
            },
            {
                id: 2,
                name: "English Literature",
                days: "Tuesday, Thursday",
                time: "9:30 AM - 11:00 AM",
                room: "Room 203",
                teacher: "Mrs. Davis",
                color: "#2a5298"
            },
            {
                id: 3,
                name: "Science",
                days: "Monday, Wednesday, Friday",
                time: "11:00 AM - 12:30 PM",
                room: "Lab 3",
                teacher: "Dr. Wilson",
                color: "#3667be"
            },
            {
                id: 4,
                name: "History",
                days: "Tuesday, Thursday",
                time: "1:00 PM - 2:30 PM",
                room: "Room 105",
                teacher: "Ms. Thompson",
                color: "#427bd4"
            }
        ],
        events: [
            {
                title: "Mathematics Quiz",
                date: "2025-03-05",
                time: "8:00 AM",
                type: "quiz"
            },
            {
                title: "English Presentation",
                date: "2025-03-07",
                time: "9:30 AM",
                type: "presentation"
            },
            {
                title: "Science Lab",
                date: "2025-03-06",
                time: "11:00 AM",
                type: "lab"
            }
        ]
    };

    // Generate calendar events
    const calendarEvents = [];
    const today = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    scheduleData.courses.forEach(course => {
        const courseDays = course.days.split(', ');
        const [startTime] = course.time.split(' - ');
        
        // Generate events for the next 2 weeks
        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() + i);
            const dayName = daysOfWeek[date.getDay()];
            
            if (courseDays.includes(dayName)) {
                calendarEvents.push({
                    title: course.name,
                    start: `${date.toISOString().split('T')[0]}T${convertTo24Hour(startTime)}`,
                    end: `${date.toISOString().split('T')[0]}T${convertTo24Hour(course.time.split(' - ')[1])}`,
                    backgroundColor: course.color,
                    extendedProps: {
                        room: course.room,
                        teacher: course.teacher
                    }
                });
            }
        }
    });

    // Add special events
    scheduleData.events.forEach(event => {
        calendarEvents.push({
            title: event.title,
            start: `${event.date}T${convertTo24Hour(event.time)}`,
            backgroundColor: getEventColor(event.type),
            classNames: ['special-event']
        });
    });

    // Initialize Calendar
    const calendarEl = document.getElementById('scheduleCalendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridDay',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay'
        },
        events: calendarEvents,
        slotMinTime: '08:00:00',
        slotMaxTime: '17:00:00',
        allDaySlot: false,
        eventClick: function(info) {
            showClassDetails(info.event);
        }
    });
    calendar.render();

    // Calendar view buttons
    document.querySelectorAll('[data-view]').forEach(button => {
        button.addEventListener('click', function() {
            const view = this.dataset.view;
            calendar.changeView(view);
            
            // Update active state
            document.querySelectorAll('[data-view]').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Populate Today's Schedule
    const todaySchedule = document.getElementById('todaySchedule');
    const todayEvents = calendarEvents.filter(event => 
        event.start.split('T')[0] === today.toISOString().split('T')[0]
    ).sort((a, b) => a.start.localeCompare(b.start));

    todayEvents.forEach(event => {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'timeline-item';
        timeSlot.innerHTML = `
            <div class="timeline-time">
                ${formatTime(event.start.split('T')[1])} - ${formatTime(event.end.split('T')[1])}
            </div>
            <div class="timeline-content">
                <div class="timeline-title">${event.title}</div>
                <div class="timeline-details">
                    ${event.extendedProps ? `
                        <span><i class='bx bx-map'></i> ${event.extendedProps.room}</span>
                        <span><i class='bx bx-user'></i> ${event.extendedProps.teacher}</span>
                    ` : ''}
                </div>
            </div>
        `;
        todaySchedule.appendChild(timeSlot);
    });

    // Populate Course Schedule
    const courseSchedule = document.getElementById('courseSchedule');
    scheduleData.courses.forEach(course => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="course-name" style="color: ${course.color}">
                    ${course.name}
                </div>
            </td>
            <td>${course.days}</td>
            <td>${course.time}</td>
            <td>${course.room}</td>
            <td>${course.teacher}</td>
        `;
        courseSchedule.appendChild(tr);
    });

    // Populate Upcoming Events
    const upcomingEvents = document.getElementById('upcomingEvents');
    scheduleData.events.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'upcoming-event';
        eventDiv.innerHTML = `
            <div class="event-type ${event.type}">
                <i class='bx ${getEventIcon(event.type)}'></i>
            </div>
            <div class="event-details">
                <div class="event-title">${event.title}</div>
                <div class="event-time">
                    <i class='bx bx-calendar'></i> ${formatDate(event.date)}
                    <i class='bx bx-time-five'></i> ${event.time}
                </div>
            </div>
        `;
        upcomingEvents.appendChild(eventDiv);
    });

    // Show class details
    window.showClassDetails = function(event) {
        const detailsContainer = document.getElementById('classDetails');
        detailsContainer.innerHTML = `
            <div class="class-header" style="background-color: ${event.backgroundColor}">
                <h4>${event.title}</h4>
                <p>${formatTime(event.start.toISOString().split('T')[1])} - ${formatTime(event.end.toISOString().split('T')[1])}</p>
            </div>
            ${event.extendedProps ? `
                <div class="class-info mt-3">
                    <p><i class='bx bx-map'></i> <strong>Room:</strong> ${event.extendedProps.room}</p>
                    <p><i class='bx bx-user'></i> <strong>Teacher:</strong> ${event.extendedProps.teacher}</p>
                </div>
            ` : ''}
        `;

        const modal = new bootstrap.Modal(document.getElementById('classModal'));
        modal.show();
    };

    // Handle Logout
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '../index.html';
    });

    // Helper Functions
    function convertTo24Hour(time12h) {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        
        if (hours === '12') {
            hours = '00';
        }
        
        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        
        return `${hours}:${minutes}:00`;
    }

    function formatTime(time24h) {
        const [hours, minutes] = time24h.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    }

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    }

    function getEventColor(type) {
        switch(type) {
            case 'quiz':
                return '#dc3545';
            case 'presentation':
                return '#28a745';
            case 'lab':
                return '#17a2b8';
            default:
                return '#6c757d';
        }
    }

    function getEventIcon(type) {
        switch(type) {
            case 'quiz':
                return 'bx-edit';
            case 'presentation':
                return 'bx-presentation';
            case 'lab':
                return 'bx-test-tube';
            default:
                return 'bx-calendar-event';
        }
    }

    // Add custom styles
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item {
            display: flex;
            margin-bottom: 1rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 5px;
        }

        .timeline-time {
            min-width: 150px;
            font-weight: bold;
            color: #1e3c72;
        }

        .timeline-content {
            flex-grow: 1;
        }

        .timeline-title {
            font-weight: bold;
            margin-bottom: 0.5rem;
        }

        .timeline-details span {
            margin-right: 1rem;
            color: #666;
        }

        .upcoming-event {
            display: flex;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid #dee2e6;
        }

        .upcoming-event:last-child {
            border-bottom: none;
        }

        .event-type {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
        }

        .event-type i {
            font-size: 20px;
            color: white;
        }

        .event-type.quiz {
            background: #dc3545;
        }

        .event-type.presentation {
            background: #28a745;
        }

        .event-type.lab {
            background: #17a2b8;
        }

        .event-details {
            flex-grow: 1;
        }

        .event-title {
            font-weight: bold;
            margin-bottom: 0.25rem;
        }

        .event-time {
            font-size: 0.9em;
            color: #666;
        }

        .event-time i {
            margin-right: 0.25rem;
            margin-left: 0.5rem;
        }

        .course-name {
            font-weight: bold;
        }

        .class-header {
            color: white;
            padding: 1rem;
            border-radius: 5px;
        }

        .class-header h4 {
            margin: 0;
        }

        .class-header p {
            margin: 0.5rem 0 0;
            opacity: 0.9;
        }

        .class-info p {
            margin-bottom: 0.5rem;
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

        .special-event {
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
});
