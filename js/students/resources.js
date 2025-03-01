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

    // Mock resource data
    const resourceData = {
        mathematics: [
            {
                id: 1,
                title: "Algebra Fundamentals",
                type: "document",
                format: "pdf",
                description: "Complete guide to basic algebraic concepts",
                dateAdded: "2025-03-01",
                size: "2.5 MB",
                bookmarked: true
            },
            {
                id: 2,
                title: "Geometry Video Lessons",
                type: "video",
                format: "mp4",
                description: "Video series covering geometric principles",
                dateAdded: "2025-03-02",
                size: "150 MB",
                bookmarked: false
            }
        ],
        english: [
            {
                id: 3,
                title: "Literature Analysis Guide",
                type: "document",
                format: "pdf",
                description: "Guide to analyzing literary works",
                dateAdded: "2025-03-03",
                size: "1.8 MB",
                bookmarked: true
            },
            {
                id: 4,
                title: "Grammar Worksheets",
                type: "worksheet",
                format: "pdf",
                description: "Practice exercises for grammar",
                dateAdded: "2025-03-04",
                size: "500 KB",
                bookmarked: false
            }
        ],
        science: [
            {
                id: 5,
                title: "Chemistry Lab Manual",
                type: "document",
                format: "pdf",
                description: "Laboratory procedures and safety guidelines",
                dateAdded: "2025-03-05",
                size: "3.2 MB",
                bookmarked: false
            },
            {
                id: 6,
                title: "Physics Formulas",
                type: "presentation",
                format: "pptx",
                description: "Comprehensive list of physics formulas",
                dateAdded: "2025-03-06",
                size: "1.5 MB",
                bookmarked: true
            }
        ],
        history: [
            {
                id: 7,
                title: "World War II Timeline",
                type: "presentation",
                format: "pptx",
                description: "Interactive timeline of WWII events",
                dateAdded: "2025-03-07",
                size: "2.8 MB",
                bookmarked: false
            },
            {
                id: 8,
                title: "Ancient Civilizations",
                type: "video",
                format: "mp4",
                description: "Documentary series on ancient civilizations",
                dateAdded: "2025-03-08",
                size: "200 MB",
                bookmarked: true
            }
        ]
    };

    // Initialize tab functionality
    const tabLinks = document.querySelectorAll('#courseResourceTabs .nav-link');
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active class from all tabs
            tabLinks.forEach(tab => tab.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            // Load resources for selected subject
            const subject = this.getAttribute('href').substring(1);
            loadResources(subject);
        });
    });

    // Load initial resources
    loadResources('mathematics');

    // Load resources for a subject
    function loadResources(subject) {
        const resourcesContainer = document.getElementById('courseResourceContent');
        const resources = resourceData[subject];
        
        let html = `<div class="resources-grid">`;
        resources.forEach(resource => {
            html += createResourceCard(resource);
        });
        html += `</div>`;
        
        resourcesContainer.innerHTML = html;

        // Add event listeners to new resource cards
        document.querySelectorAll('.resource-card').forEach(card => {
            card.addEventListener('click', () => showResourcePreview(card.dataset.id));
        });
    }

    // Create resource card HTML
    function createResourceCard(resource) {
        return `
            <div class="resource-card" data-id="${resource.id}">
                <div class="resource-icon">
                    <i class='bx ${getResourceIcon(resource.type)}'></i>
                </div>
                <div class="resource-info">
                    <h5>${resource.title}</h5>
                    <p>${resource.description}</p>
                    <div class="resource-meta">
                        <span><i class='bx bx-file'></i> ${resource.format.toUpperCase()}</span>
                        <span><i class='bx bx-data'></i> ${resource.size}</span>
                        <span><i class='bx bx-calendar'></i> ${formatDate(resource.dateAdded)}</span>
                    </div>
                </div>
                <div class="resource-actions">
                    <button class="btn btn-sm btn-outline-primary preview-btn">
                        <i class='bx bx-show'></i>
                    </button>
                    <button class="btn btn-sm ${resource.bookmarked ? 'btn-primary' : 'btn-outline-primary'} bookmark-btn">
                        <i class='bx bx-bookmark'></i>
                    </button>
                </div>
            </div>
        `;
    }

    // Load recent resources
    function loadRecentResources() {
        const recentContainer = document.getElementById('recentResources');
        const recentResources = getAllResources()
            .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
            .slice(0, 5);

        recentContainer.innerHTML = createResourceList(recentResources);
    }

    // Load bookmarked resources
    function loadBookmarkedResources() {
        const bookmarkedContainer = document.getElementById('bookmarkedResources');
        const bookmarkedResources = getAllResources().filter(r => r.bookmarked);

        bookmarkedContainer.innerHTML = createResourceList(bookmarkedResources);
    }

    // Create resource list HTML
    function createResourceList(resources) {
        return resources.map(resource => `
            <div class="resource-list-item" data-id="${resource.id}">
                <div class="resource-icon">
                    <i class='bx ${getResourceIcon(resource.type)}'></i>
                </div>
                <div class="resource-info">
                    <h6>${resource.title}</h6>
                    <small>${resource.format.toUpperCase()} • ${resource.size}</small>
                </div>
                <button class="btn btn-sm btn-outline-primary">
                    <i class='bx bx-download'></i>
                </button>
            </div>
        `).join('');
    }

    // Show resource preview
    function showResourcePreview(resourceId) {
        const resource = findResource(resourceId);
        if (!resource) return;

        const previewContainer = document.getElementById('resourcePreview');
        previewContainer.innerHTML = `
            <div class="resource-preview-header">
                <div class="resource-icon">
                    <i class='bx ${getResourceIcon(resource.type)}'></i>
                </div>
                <div class="resource-info">
                    <h4>${resource.title}</h4>
                    <p>${resource.description}</p>
                </div>
            </div>
            <div class="resource-preview-meta">
                <div class="meta-item">
                    <i class='bx bx-file'></i>
                    <span>Type: ${resource.format.toUpperCase()}</span>
                </div>
                <div class="meta-item">
                    <i class='bx bx-data'></i>
                    <span>Size: ${resource.size}</span>
                </div>
                <div class="meta-item">
                    <i class='bx bx-calendar'></i>
                    <span>Added: ${formatDate(resource.dateAdded)}</span>
                </div>
            </div>
            <div class="resource-preview-content">
                ${getPreviewContent(resource)}
            </div>
        `;

        const modal = new bootstrap.Modal(document.getElementById('resourceModal'));
        modal.show();
    }

    // Search functionality
    const searchInput = document.getElementById('searchResources');
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const resources = document.querySelectorAll('.resource-card');
        
        resources.forEach(resource => {
            const title = resource.querySelector('h5').textContent.toLowerCase();
            const description = resource.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(query) || description.includes(query)) {
                resource.style.display = '';
            } else {
                resource.style.display = 'none';
            }
        });
    });

    // Resource type filter
    const typeFilter = document.getElementById('resourceTypeFilter');
    typeFilter.addEventListener('change', function() {
        const selectedType = this.value;
        const resources = document.querySelectorAll('.resource-card');
        
        resources.forEach(resource => {
            const resourceData = findResource(resource.dataset.id);
            if (selectedType === 'all' || resourceData.type === selectedType) {
                resource.style.display = '';
            } else {
                resource.style.display = 'none';
            }
        });
    });

    // Helper Functions
    function getAllResources() {
        return Object.values(resourceData).flat();
    }

    function findResource(id) {
        return getAllResources().find(r => r.id === parseInt(id));
    }

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    function getResourceIcon(type) {
        switch(type) {
            case 'document':
                return 'bx-file';
            case 'video':
                return 'bx-video';
            case 'presentation':
                return 'bx-slideshow';
            case 'worksheet':
                return 'bx-task';
            default:
                return 'bx-file';
        }
    }

    function getPreviewContent(resource) {
        // In a real application, this would load actual preview content
        return `
            <div class="preview-placeholder">
                <i class='bx ${getResourceIcon(resource.type)}'></i>
                <p>Preview not available in demo mode</p>
            </div>
        `;
    }

    // Initial load
    loadRecentResources();
    loadBookmarkedResources();

    // Handle Logout
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '../index.html';
    });

    // Add custom styles
    const style = document.createElement('style');
    style.textContent = `
        .resources-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1rem;
            padding: 1rem;
        }

        .resource-card {
            background: #fff;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 1rem;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .resource-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .resource-icon {
            width: 40px;
            height: 40px;
            background: #1e3c72;
            color: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
        }

        .resource-icon i {
            font-size: 24px;
        }

        .resource-info h5 {
            margin: 0 0 0.5rem;
            color: #1e3c72;
        }

        .resource-info p {
            margin: 0 0 1rem;
            color: #6c757d;
            font-size: 0.9em;
        }

        .resource-meta {
            display: flex;
            gap: 1rem;
            font-size: 0.8em;
            color: #6c757d;
        }

        .resource-meta span {
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }

        .resource-actions {
            display: flex;
            justify-content: flex-end;
            gap: 0.5rem;
            margin-top: 1rem;
        }

        .resource-list-item {
            display: flex;
            align-items: center;
            padding: 0.75rem;
            border-bottom: 1px solid #dee2e6;
            gap: 1rem;
        }

        .resource-list-item:last-child {
            border-bottom: none;
        }

        .resource-list-item .resource-icon {
            margin: 0;
            width: 32px;
            height: 32px;
        }

        .resource-list-item .resource-icon i {
            font-size: 18px;
        }

        .resource-list-item .resource-info {
            flex-grow: 1;
        }

        .resource-list-item h6 {
            margin: 0;
            color: #1e3c72;
        }

        .resource-list-item small {
            color: #6c757d;
        }

        .resource-preview-header {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .resource-preview-meta {
            display: flex;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
        }

        .meta-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #6c757d;
        }

        .preview-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 3rem;
            background: #f8f9fa;
            border-radius: 8px;
            color: #6c757d;
        }

        .preview-placeholder i {
            font-size: 48px;
            margin-bottom: 1rem;
        }

        .preview-placeholder p {
            margin: 0;
        }
    `;
    document.head.appendChild(style);
});
