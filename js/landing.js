document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Initialize interactive map points
    initializeMap();
});

// Initialize interactive map
function initializeMap() {
    const mapPoints = [
        { id: 'bomi', name: 'Bomi County', x: 15, y: 35 },
        { id: 'bong', name: 'Bong County', x: 45, y: 25 },
        { id: 'gbarpolu', name: 'Gbarpolu County', x: 25, y: 15 },
        { id: 'grand-bassa', name: 'Grand Bassa County', x: 55, y: 45 },
        { id: 'grand-cape-mount', name: 'Grand Cape Mount County', x: 10, y: 25 },
        { id: 'grand-gedeh', name: 'Grand Gedeh County', x: 75, y: 45 },
        { id: 'grand-kru', name: 'Grand Kru County', x: 70, y: 75 },
        { id: 'lofa', name: 'Lofa County', x: 35, y: 10 },
        { id: 'margibi', name: 'Margibi County', x: 45, y: 45 },
        { id: 'maryland', name: 'Maryland County', x: 85, y: 85 },
        { id: 'montserrado', name: 'Montserrado County', x: 35, y: 45 },
        { id: 'nimba', name: 'Nimba County', x: 65, y: 25 },
        { id: 'rivercess', name: 'River Cess County', x: 60, y: 55 },
        { id: 'river-gee', name: 'River Gee County', x: 75, y: 65 },
        { id: 'sinoe', name: 'Sinoe County', x: 65, y: 65 }
    ];

    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;

    // Create interactive points on the map
    mapPoints.forEach(point => {
        const marker = document.createElement('div');
        marker.className = 'map-point';
        marker.style.left = `${point.x}%`;
        marker.style.top = `${point.y}%`;
        marker.setAttribute('data-county', point.id);
        marker.setAttribute('title', point.name);

        // Add hover tooltip
        marker.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'map-tooltip';
            tooltip.textContent = point.name;
            this.appendChild(tooltip);
        });

        marker.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.map-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });

        // Add click handler
        marker.addEventListener('click', function() {
            // Navigate to county details or show modal
            console.log(`Clicked ${point.name}`);
        });

        mapContainer.appendChild(marker);
    });
}

// Handle registration button click
document.querySelector('button.btn-primary.btn-lg').addEventListener('click', function() {
    // Redirect to registration page or show registration modal
    window.location.href = '/register.html';
});

// Add animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.feature-card, .county-card, .process-card').forEach(el => {
    observer.observe(el);
});
