// Check authentication
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'minister') {
        window.location.href = '../login.html';
    }
}

// Load sidebar
function loadSidebar() {
    fetch('../components/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-placeholder').innerHTML = data;
            highlightCurrentPage();
        });
}

// Save settings to localStorage
function saveSettings(formId, settingsKey) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const settings = {};
        
        formData.forEach((value, key) => {
            settings[key] = value;
        });

        // Add any checkbox values (they don't appear in FormData if unchecked)
        form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            settings[checkbox.id] = checkbox.checked;
        });

        localStorage.setItem(settingsKey, JSON.stringify(settings));
        
        // Show success message
        showNotification('Settings saved successfully!', 'success');
    });
}

// Load settings from localStorage
function loadSettings(formId, settingsKey) {
    const form = document.getElementById(formId);
    if (!form) return;

    const settings = JSON.parse(localStorage.getItem(settingsKey) || '{}');
    
    // Set form values
    Object.keys(settings).forEach(key => {
        const element = form.elements[key] || document.getElementById(key);
        if (element) {
            if (element.type === 'checkbox') {
                element.checked = settings[key];
            } else {
                element.value = settings[key];
            }
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    notification.role = 'alert';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Add to document
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Handle system maintenance actions
function setupMaintenanceHandlers() {
    // Clear Cache
    document.querySelector('button:contains("Clear Cache")').addEventListener('click', function() {
        localStorage.clear();
        showNotification('Cache cleared successfully!', 'success');
    });

    // System Optimization
    document.querySelector('button:contains("System Optimization")').addEventListener('click', function() {
        showNotification('System optimization completed!', 'success');
    });

    // Database Cleanup
    document.querySelector('button:contains("Database Cleanup")').addEventListener('click', function() {
        showNotification('Database cleanup completed!', 'success');
    });
}

// Handle backup actions
function setupBackupHandlers() {
    const createBackupBtn = document.querySelector('button:contains("Create Manual Backup")');
    if (createBackupBtn) {
        createBackupBtn.addEventListener('click', function() {
            // Simulate backup creation
            showNotification('Manual backup created successfully!', 'success');
        });
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadSidebar();

    // Initialize all settings forms
    const settingsForms = {
        'generalSettingsForm': 'generalSettings',
        'notificationSettingsForm': 'notificationSettings',
        'securitySettingsForm': 'securitySettings',
        'backupSettingsForm': 'backupSettings'
    };

    Object.entries(settingsForms).forEach(([formId, storageKey]) => {
        loadSettings(formId, storageKey);
        saveSettings(formId, storageKey);
    });

    setupMaintenanceHandlers();
    setupBackupHandlers();
});
