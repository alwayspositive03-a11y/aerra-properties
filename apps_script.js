/* script.js - Complete Interactive Features */

// ============================
// HEADER SCROLL EFFECT
// ============================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================
// MOBILE HAMBURGER MENU
// ============================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
    }
});

// ============================
// SCROLL TO TOP BUTTON
// ============================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================
// PROJECT DATA
// ============================
const projects = [
    {
        id: 1,
        name: 'Oberoi 360 North',
        location: 'Sector 58, Gurgaon',
        developer: 'Oberoi Realty',
        price: 'On Request',
        category: 'luxury',
        image: 'images/360_west.png'
    },
    {
        id: 2,
        name: 'Elan The Presidential',
        location: 'DXP Sector 106, Gurgaon',
        developer: 'Elan Limited',
        price: 'On Request',
        category: 'luxury',
        image: 'images/elan-the-presidential.jpg'
    },
    {
        id: 3,
        name: 'Tonino Lamborghini Residences',
        location: 'Sector 71 (SPR), Gurgaon',
        developer: 'Signature Global',
        price: '₹4.49 Cr Onwards',
        category: 'luxury',
        image: 'images/tonino-lambo.png'
    },
    {
        id: 4,
        name: 'DLF Privana West',
        location: 'Sector 76, Gurgaon',
        developer: 'DLF Limited',
        price: 'On Request',
        category: 'premium',
        image: 'images/dlf-privana-west.jpg'
    },
    {
        id: 5,
        name: 'Westin Residences',
        location: 'Sector 103, Gurgaon',
        developer: 'Whiteland',
        price: 'On Request',
        category: 'premium',
        image: 'images/westin-residences.jpeg'
    },
    {
        id: 6,
        name: 'SmartWorld One DXP',
        location: 'Sector 113, Gurgaon',
        developer: 'SmartWorld Developers',
        price: 'On Request',
        category: 'premium',
        image: 'images/smart-world-one-dxp.jpg'
    },
    {
        id: 7,
        name: 'M3M Altitude',
        location: 'Sector 65, Gurgaon',
        developer: 'M3M India',
        price: 'On Request',
        category: 'premium',
        image: 'images/m3m-altitude.jpg'
    },
    {
        id: 8,
        name: 'Signature Global Titanium SPR',
        location: 'Sector 71, Gurgaon',
        developer: 'Signature Global',
        price: 'On Request',
        category: 'premium',
        image: 'images/signature-titanium.jpg'
    },
    {
        id: 9,
        name: 'Prestige Gurgaon 92',
        location: 'Sector 62, Gurgaon',
        developer: 'Prestige Group',
        price: 'On Request',
        category: 'upcoming',
        image: 'images/upcoming-simbol.jpeg'
    }
];

// ============================
// RENDER PROJECTS
// ============================
const projectGrid = document.getElementById('projectGrid');

function renderProjects(filter = 'all') {
    const filtered = filter === 'all' 
        ? projects 
        : projects.filter(p => p.category === filter);
    
    projectGrid.innerHTML = filtered.map(project => `
        <div class="card" data-category="${project.category}">
            <img src="${project.image}" loading="lazy" alt="${project.name}">
            <div class="card-content">
                <h3>${project.name}</h3>
                <p><strong>Location:</strong> ${project.location}</p>
                <p><strong>Developer:</strong> ${project.developer}</p>
                <div class="price">${project.price}</div>
                <button class="enquire-btn" 
                    onclick="document.getElementById('enquire').scrollIntoView({behavior:'smooth'})">
                    Enquire Now
                </button>
            </div>
        </div>
    `).join('');
}

// Initial render
renderProjects();

// ============================
// PROJECT FILTERS
// ============================
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter);
    });
});

// ============================
// SEARCH FUNCTIONALITY
// ============================
function searchProperties() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (!query) {
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    const filtered = projects.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.developer.toLowerCase().includes(query)
    );
    
    if (filtered.length > 0) {
        projectGrid.innerHTML = filtered.map(project => `
            <div class="card">
                <img src="${project.image}" loading="lazy" alt="${project.name}">
                <div class="card-content">
                    <h3>${project.name}</h3>
                    <p><strong>Location:</strong> ${project.location}</p>
                    <p><strong>Developer:</strong> ${project.developer}</p>
                    <div class="price">${project.price}</div>
                    <button class="enquire-btn" 
                        onclick="document.getElementById('enquire').scrollIntoView({behavior:'smooth'})">
                        Enquire Now
                    </button>
                </div>
            </div>
        `).join('');
        
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    } else {
        projectGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <h3>No projects found matching "${query}"</h3>
                <p style="color: var(--text-light);">Try searching for a different project, location, or developer.</p>
            </div>
        `;
    }
}

// Enter key for search
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchProperties();
    }
});

// ============================
// LEAD FORM SUBMISSION
// ============================
const leadForm = document.getElementById('leadForm');
const messageEl = document.getElementById('message');

leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(leadForm);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        project: formData.get('project'),
        message: formData.get('requirement')
    };
    
    // Validation
    if (!data.name || !data.phone || !data.project || !data.message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    // Phone validation (basic)
    if (!/^[0-9]{10}$/.test(data.phone.replace(/\s/g, ''))) {
        showMessage('Please enter a valid 10-digit phone number.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = leadForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    try {
        // Send to Google Apps Script
        const response = await fetch('https://script.google.com/macros/s/AKfycbyPessQeD4PqRRSO6xEa6p-qG5nOfrkYdrVkfgveo3-aTY2Xw-32OatnzhuMUnrTU_S/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data)
        });
        
        // Since mode: 'no-cors' doesn't return response body, we assume success
        showMessage('Thank you! We\'ll get back to you shortly.', 'success');
        leadForm.reset();
        
        // Track conversion (optional)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL'
            });
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showMessage('Something went wrong. Please try again or contact us directly.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

function showMessage(msg, type) {
    messageEl.textContent = msg;
    messageEl.className = 'form-message ' + type;
    messageEl.style.display = 'block';
    
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 5000);
}

// ============================
// SMOOTH SCROLL FOR NAV LINKS
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================
// INTERSECTION OBSERVER - ANIMATIONS
// ============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.card, .insight-card, .tool-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================
// LAZY LOADING FOR IMAGES
// ============================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

// ============================
// KEYBOARD NAVIGATION
// ============================
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
    }
});

// ============================
// CONSOLE WELCOME
// ============================
console.log('%c🏠 Aerra Properties', 'font-size: 24px; font-weight: bold; color: #0033A0;');
console.log('%cYour Gateway to Luxury Living in Gurgaon', 'font-size: 14px; color: #C8A35F;');
console.log('%c📞 +91 7009781399', 'font-size: 14px; color: #666;');