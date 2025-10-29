// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            navMenu.classList.remove('active'); // Close mobile menu
        }
    });
});

// Modal functions
function openModal() {
    document.getElementById('enquiryModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('enquiryModal').style.display = 'none';
}

// Lightbox functions
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Form validation
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();

    let isValid = true;
    let errorMessage = '';

    if (!name) {
        isValid = false;
        errorMessage += 'Name is required.\n';
    }

    if (!phone) {
        isValid = false;
        errorMessage += 'Phone is required.\n';
    }

    if (!email) {
        isValid = false;
        errorMessage += 'Email is required.\n';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        isValid = false;
        errorMessage += 'Please enter a valid email address.\n';
    }

    if (isValid) {
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Thank you for your enquiry! We will get back to you soon.');
        contactForm.reset();
    } else {
        alert('Please correct the following errors:\n' + errorMessage);
    }
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update toggle button icon based on current theme
function updateToggleIcon() {
    const svg = themeToggle.querySelector('svg');
    if (body.getAttribute('data-theme') === 'dark') {
        svg.innerHTML = `
            <path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
        `;
    } else {
        svg.innerHTML = `
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.59-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
        `;
    }
}

updateToggleIcon();

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcon();
});

// Scroll-based animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Typing animation for hero
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    setTimeout(() => {
        typeWriter(heroTitle, originalText);
    }, 500);
});

// Gallery carousel
let currentGalleryIndex = 0;
const galleryItems = document.querySelectorAll('.gallery-item');

function showGalleryItem(index) {
    galleryItems.forEach((item, i) => {
        item.style.display = i === index ? 'block' : 'none';
    });
}

function nextGalleryItem() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
    showGalleryItem(currentGalleryIndex);
}

function prevGalleryItem() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    showGalleryItem(currentGalleryIndex);
}

// Add carousel controls (optional)
setInterval(nextGalleryItem, 5000); // Auto-slide every 5 seconds

// Loading animation
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    document.body.appendChild(loading);
    setTimeout(() => {
        document.body.removeChild(loading);
    }, 2000);
}

// Call loading on page load
window.addEventListener('load', showLoading);

// Close modals when clicking outside
window.addEventListener('click', function(e) {
    const enquiryModal = document.getElementById('enquiryModal');
    const lightbox = document.getElementById('lightbox');

    if (e.target === enquiryModal) {
        enquiryModal.style.display = 'none';
    }

    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});
