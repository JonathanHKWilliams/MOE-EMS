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
    const mockTeachers = [
        {
            name: 'Mr. Johnson',
            subject: 'Mathematics',
            email: 'johnson@school.edu',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Mrs. Smith',
            subject: 'English',
            email: 'smith@school.edu',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Dr. Brown',
            subject: 'Science',
            email: 'brown@school.edu',
            image: 'https://via.placeholder.com/50'
        }
    ];

    const mockAdmins = [
        {
            name: 'Principal Davis',
            role: 'School Principal',
            email: 'principal@school.edu',
            image: 'https://via.placeholder.com/50'
        },
        {
            name: 'Mrs. Wilson',
            role: 'Academic Coordinator',
            email: 'academic@school.edu',
            image: 'https://via.placeholder.com/50'
        }
    ];

    const mockMessages = [
        {
            id: 'MSG001',
            from: 'Mr. Johnson',
            subject: 'Mathematics Assignment Update',
            preview: 'Your child has shown great improvement...',
            date: '2025-03-01',
            unread: true
        },
        {
            id: 'MSG002',
            from: 'Principal Davis',
            subject: 'School Event Announcement',
            preview: 'We are pleased to announce our annual...',
            date: '2025-02-28',
            unread: false
        },
        {
            id: 'MSG003',
            to: 'Mrs. Smith',
            subject: 'Absence Notification',
            preview: 'I would like to inform you that...',
            date: '2025-02-27',
            sent: true
        }
    ];

    const mockNotifications = [
        {
            type: 'info',
            message: 'New assignment posted in Mathematics',
            time: '2 hours ago'
        },
        {
            type: 'warning',
            message: 'Upcoming parent-teacher meeting',
            time: '1 day ago'
        },
        {
            type: 'success',
            message: 'Report card available for download',
            time: '2 days ago'
        }
    ];

    // Populate Teachers List
    const teacherList = document.getElementById('teacherList');
    mockTeachers.forEach(teacher => {
        const div = document.createElement('div');
        div.className = 'contact-item';
        div.innerHTML = `
            <div class="d-flex align-items-center mb-3">
                <img src="${teacher.image}" class="rounded-circle me-2" alt="${teacher.name}">
                <div>
                    <h6 class="mb-0">${teacher.name}</h6>
                    <small class="text-muted">${teacher.subject}</small>
                </div>
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-primary" onclick="startChat('${teacher.email}')">
                    <i class='bx bx-message'></i> Chat
                </button>
                <button class="btn btn-sm btn-outline-primary" onclick="scheduleCall('${teacher.email}')">
                    <i class='bx bx-phone'></i> Call
                </button>
            </div>
        `;
        teacherList.appendChild(div);
    });

    // Populate Admins List
    const adminList = document.getElementById('adminList');
    mockAdmins.forEach(admin => {
        const div = document.createElement('div');
        div.className = 'contact-item';
        div.innerHTML = `
            <div class="d-flex align-items-center mb-3">
                <img src="${admin.image}" class="rounded-circle me-2" alt="${admin.name}">
                <div>
                    <h6 class="mb-0">${admin.name}</h6>
                    <small class="text-muted">${admin.role}</small>
                </div>
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-primary" onclick="startChat('${admin.email}')">
                    <i class='bx bx-message'></i> Chat
                </button>
                <button class="btn btn-sm btn-outline-primary" onclick="scheduleCall('${admin.email}')">
                    <i class='bx bx-phone'></i> Call
                </button>
            </div>
        `;
        adminList.appendChild(div);
    });

    // Populate Messages List
    const messageList = document.getElementById('messageList');
    mockMessages.forEach(message => {
        const div = document.createElement('div');
        div.className = `message-item ${message.unread ? 'unread' : ''}`;
        div.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <h6 class="mb-0">${message.subject}</h6>
                <small class="text-muted">${formatDate(message.date)}</small>
            </div>
            <p class="mb-0">${message.from || 'To: ' + message.to}</p>
            <p class="text-muted mb-0">${message.preview}</p>
            <div class="message-actions">
                <button class="btn btn-sm btn-link" onclick="viewMessage('${message.id}')">View</button>
                <button class="btn btn-sm btn-link" onclick="replyMessage('${message.id}')">Reply</button>
                <button class="btn btn-sm btn-link text-danger" onclick="deleteMessage('${message.id}')">Delete</button>
            </div>
        `;
        messageList.appendChild(div);
    });

    // Populate Notifications List
    const notificationList = document.getElementById('notificationList');
    mockNotifications.forEach(notification => {
        const div = document.createElement('div');
        div.className = 'notification-item';
        div.innerHTML = `
            <div class="d-flex align-items-center">
                <i class='bx bx-${getNotificationIcon(notification.type)} ${notification.type}'></i>
                <div class="ms-2">
                    <p class="mb-0">${notification.message}</p>
                    <small class="text-muted">${notification.time}</small>
                </div>
            </div>
        `;
        notificationList.appendChild(div);
    });

    // Populate Message Recipients
    const messageRecipient = document.getElementById('messageRecipient');
    mockTeachers.forEach(teacher => {
        const option = document.createElement('option');
        option.value = teacher.email;
        option.textContent = `${teacher.name} (${teacher.subject})`;
        messageRecipient.appendChild(option);
    });
    mockAdmins.forEach(admin => {
        const option = document.createElement('option');
        option.value = admin.email;
        option.textContent = `${admin.name} (${admin.role})`;
        messageRecipient.appendChild(option);
    });

    // Handle Student Selection Change
    document.getElementById('studentSelector').addEventListener('change', function(e) {
        updateCommunicationData(e.target.value);
    });

    // Handle Logout
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '../index.html';
    });
});

// Helper Functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'info': return 'info-circle';
        case 'warning': return 'error';
        case 'success': return 'check-circle';
        default: return 'bell';
    }
}

function startChat(email) {
    alert(`Starting chat with ${email}`);
}

function scheduleCall(email) {
    alert(`Scheduling call with ${email}`);
}

function scheduleAppointment() {
    alert('Opening appointment scheduler...');
}

function reportAbsence() {
    alert('Opening absence report form...');
}

function filterMessages(type) {
    alert(`Filtering messages: ${type}`);
}

function viewMessage(id) {
    alert(`Viewing message ${id}`);
}

function replyMessage(id) {
    alert(`Replying to message ${id}`);
}

function deleteMessage(id) {
    if (confirm('Are you sure you want to delete this message?')) {
        alert(`Deleting message ${id}`);
    }
}

function sendMessage() {
    const recipient = document.getElementById('messageRecipient').value;
    const subject = document.getElementById('messageSubject').value;
    const content = document.getElementById('messageContent').value;

    if (!recipient || !subject || !content) {
        alert('Please fill in all required fields');
        return;
    }

    alert('Sending message...');
    setTimeout(() => {
        alert('Message sent successfully!');
        location.reload();
    }, 1000);
}

function updateCommunicationData(studentId) {
    // This would typically fetch new data from the server
    alert(`Loading communication data for student ${studentId}`);
}

// Add custom styles
const style = document.createElement('style');
style.textContent = `
    .contact-item {
        padding: 1rem;
        border-bottom: 1px solid #dee2e6;
    }

    .contact-item:last-child {
        border-bottom: none;
    }

    .message-item {
        padding: 1rem;
        border-left: 3px solid transparent;
        border-bottom: 1px solid #dee2e6;
        transition: all 0.3s ease;
    }

    .message-item:hover {
        background-color: #f8f9fa;
    }

    .message-item.unread {
        border-left-color: var(--first-color);
        background-color: #f8f9fa;
    }

    .message-actions {
        margin-top: 0.5rem;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .message-item:hover .message-actions {
        opacity: 1;
    }

    .notification-item {
        padding: 0.75rem;
        border-bottom: 1px solid #dee2e6;
    }

    .notification-item:last-child {
        border-bottom: none;
    }

    .notification-item i {
        font-size: 1.5rem;
        padding: 0.5rem;
        border-radius: 50%;
    }

    .notification-item i.info {
        color: var(--first-color);
        background-color: rgba(30, 60, 114, 0.1);
    }

    .notification-item i.warning {
        color: #ffc107;
        background-color: rgba(255, 193, 7, 0.1);
    }

    .notification-item i.success {
        color: #28a745;
        background-color: rgba(40, 167, 69, 0.1);
    }
`;
document.head.appendChild(style);
