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

    // Initialize Settings Navigation
    const settingsNavItems = document.querySelectorAll('.settings-nav-item');
    settingsNavItems.forEach(item => {
        item.addEventListener('click', function() {
            settingsNavItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Load saved settings
    loadSavedSettings();

    // Handle Logout
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '../index.html';
    });
});

// Account Settings Functions
function saveAccountSettings() {
    const email = document.querySelector('#accountSettingsForm input[type="email"]').value;
    const phone = document.querySelector('#accountSettingsForm input[type="tel"]').value;

    if (!email || !phone) {
        alert('Please fill in all required fields');
        return;
    }

    // Validate email format
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Simulate saving account settings
    alert('Saving account settings...');
    setTimeout(() => {
        alert('Account settings updated successfully!');
    }, 1000);
}

function changePassword() {
    const currentPassword = document.querySelector('#passwordForm input:nth-child(1)').value;
    const newPassword = document.querySelector('#passwordForm input:nth-child(2)').value;
    const confirmPassword = document.querySelector('#passwordForm input:nth-child(3)').value;

    if (!currentPassword || !newPassword || !confirmPassword) {
        alert('Please fill in all password fields');
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        return;
    }

    if (!isValidPassword(newPassword)) {
        alert('Password must be at least 8 characters long and contain at least one number, one uppercase letter, and one special character');
        return;
    }

    // Simulate password change
    alert('Changing password...');
    setTimeout(() => {
        alert('Password changed successfully!');
        document.getElementById('passwordForm').reset();
    }, 1000);
}

// Notification Settings Functions
function saveNotificationSettings() {
    const settings = {
        emailAcademics: document.getElementById('emailAcademics').checked,
        emailAttendance: document.getElementById('emailAttendance').checked,
        emailFees: document.getElementById('emailFees').checked,
        smsEmergency: document.getElementById('smsEmergency').checked,
        smsAttendance: document.getElementById('smsAttendance').checked
    };

    // Simulate saving notification settings
    alert('Saving notification preferences...');
    setTimeout(() => {
        alert('Notification preferences updated successfully!');
        localStorage.setItem('notificationSettings', JSON.stringify(settings));
    }, 1000);
}

// Privacy Settings Functions
function savePrivacySettings() {
    const settings = {
        profileVisibility: document.getElementById('profileVisibility').checked,
        contactVisibility: document.getElementById('contactVisibility').checked,
        twoFactor: document.getElementById('twoFactor').checked,
        loginAlert: document.getElementById('loginAlert').checked
    };

    // Simulate saving privacy settings
    alert('Saving privacy settings...');
    setTimeout(() => {
        alert('Privacy settings updated successfully!');
        localStorage.setItem('privacySettings', JSON.stringify(settings));
    }, 1000);
}

// Preferences Functions
function savePreferences() {
    const settings = {
        theme: document.getElementById('themeSelect').value,
        timezone: document.getElementById('timezoneSelect').value,
        dateFormat: document.getElementById('dateFormatSelect').value
    };

    // Apply theme immediately
    applyTheme(settings.theme);

    // Simulate saving preferences
    alert('Saving preferences...');
    setTimeout(() => {
        alert('Preferences updated successfully!');
        localStorage.setItem('preferences', JSON.stringify(settings));
    }, 1000);
}

// Language Settings Functions
function saveLanguage() {
    const language = document.getElementById('languageSelect').value;

    // Simulate saving language preference
    alert('Saving language preference...');
    setTimeout(() => {
        alert('Language updated successfully! The page will reload to apply changes.');
        localStorage.setItem('language', language);
        location.reload();
    }, 1000);
}

// Helper Functions
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPassword(password) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return re.test(password);
}

function applyTheme(theme) {
    const root = document.documentElement;
    switch(theme) {
        case 'dark':
            root.style.setProperty('--body-color', '#18191A');
            root.style.setProperty('--sidebar-color', '#242526');
            root.style.setProperty('--text-color', '#CCC');
            break;
        case 'light':
            root.style.setProperty('--body-color', '#F7F6FB');
            root.style.setProperty('--sidebar-color', '#FFF');
            root.style.setProperty('--text-color', '#1A1A1A');
            break;
        case 'system':
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                applyTheme('dark');
            } else {
                applyTheme('light');
            }
            break;
    }
}

function loadSavedSettings() {
    // Load notification settings
    try {
        const notificationSettings = JSON.parse(localStorage.getItem('notificationSettings'));
        if (notificationSettings) {
            Object.keys(notificationSettings).forEach(key => {
                const element = document.getElementById(key);
                if (element) element.checked = notificationSettings[key];
            });
        }
    } catch (e) {
        console.error('Error loading notification settings:', e);
    }

    // Load privacy settings
    try {
        const privacySettings = JSON.parse(localStorage.getItem('privacySettings'));
        if (privacySettings) {
            Object.keys(privacySettings).forEach(key => {
                const element = document.getElementById(key);
                if (element) element.checked = privacySettings[key];
            });
        }
    } catch (e) {
        console.error('Error loading privacy settings:', e);
    }

    // Load preferences
    try {
        const preferences = JSON.parse(localStorage.getItem('preferences'));
        if (preferences) {
            document.getElementById('themeSelect').value = preferences.theme;
            document.getElementById('timezoneSelect').value = preferences.timezone;
            document.getElementById('dateFormatSelect').value = preferences.dateFormat;
            applyTheme(preferences.theme);
        }
    } catch (e) {
        console.error('Error loading preferences:', e);
    }

    // Load language
    try {
        const language = localStorage.getItem('language');
        if (language) {
            document.getElementById('languageSelect').value = language;
        }
    } catch (e) {
        console.error('Error loading language setting:', e);
    }
}

// Add custom styles
const style = document.createElement('style');
style.textContent = `
    .settings-nav {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .settings-nav-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        color: var(--text-color);
        text-decoration: none;
        border-radius: 0.5rem;
        transition: all 0.3s ease;
    }

    .settings-nav-item:hover {
        background-color: rgba(30, 60, 114, 0.1);
    }

    .settings-nav-item.active {
        background-color: var(--first-color);
        color: white;
    }

    .settings-nav-item i {
        font-size: 1.25rem;
    }

    .card {
        border: none;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    .card-header {
        background-color: transparent;
        border-bottom: none;
        padding: 1.5rem;
    }

    .card-body {
        padding: 1.5rem;
    }

    .notification-group,
    .privacy-group,
    .security-group {
        padding: 1rem;
        background-color: #f8f9fa;
        border-radius: 0.5rem;
    }

    .form-check-label {
        user-select: none;
    }

    .form-control,
    .form-select {
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
    }
`;
document.head.appendChild(style);
