const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyPessQeD4PqRRSO6xEa6p-qG5nOfrkYdrVkfgveo3-aTY2Xw-32OatnzhuMUnrTU_S/exec";

document.getElementById("leadForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        project: document.getElementById("project").value,
        requirement: document.getElementById("requirement").value
    };

    try {

        const response = await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        document.getElementById("message").innerHTML =
            "✓ Enquiry submitted successfully";

        document.getElementById("leadForm").reset();

    } catch (error) {

        console.error(error);

        document.getElementById("message").innerHTML =
            "Server Error";

    }
});

// ============================
// LOCATION PROJECTS - WITH DROPDOWN
// ============================

// Project data by location
const locationData = {
    gurugram: [
        { name: 'Oberoi 360 North', location: 'Sector 58, Gurgaon', developer: 'Oberoi Realty', price: 'On Request', image: 'images/360_west.png' },
        { name: 'Elan The Presidential', location: 'DXP Sector 106, Gurgaon', developer: 'Elan Limited', price: 'On Request', image: 'images/elan-the-presidential.jpg' },
        { name: 'DLF Privana West', location: 'Sector 76, Gurgaon', developer: 'DLF Limited', price: 'On Request', image: 'images/dlf-privana-west.jpg' },
        { name: 'M3M Altitude', location: 'Sector 65, Gurgaon', developer: 'M3M India', price: 'On Request', image: 'images/m3m-altitude.jpg' }
    ],
    noida: [
        { name: 'Godrej Noida', location: 'Sector 150, Noida', developer: 'Godrej Properties', price: 'On Request', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop' },
        { name: 'ATS Noida', location: 'Sector 150, Noida', developer: 'ATS Group', price: 'On Request', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop' },
        { name: 'Supertech Noida', location: 'Sector 93, Noida', developer: 'Supertech Group', price: 'On Request', image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=400&h=250&fit=crop' }
    ],
    punjab: [
        { name: 'Emaar Mohali', location: 'Sector 67, Mohali', developer: 'Emaar India', price: 'On Request', image: 'https://images.unsplash.com/photo-1597839219216-a773cb2473e4?w=400&h=250&fit=crop' },
        { name: 'Omaxe Chandigarh', location: 'Chandigarh', developer: 'Omaxe Group', price: 'On Request', image: 'https://images.unsplash.com/photo-1584467735867-5775d2d7e3c9?w=400&h=250&fit=crop' },
        { name: 'DLF Punjab', location: 'Mohali, Punjab', developer: 'DLF Limited', price: 'On Request', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop' }
    ],
    dubai: [
        { name: 'Emaar Dubai', location: 'Dubai Hills, Dubai', developer: 'Emaar Properties', price: 'On Request', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=250&fit=crop' },
        { name: 'Damac Hills', location: 'Damac Hills, Dubai', developer: 'Damac Properties', price: 'On Request', image: 'https://images.unsplash.com/photo-1584467735867-5775d2d7e3c9?w=400&h=250&fit=crop' },
        { name: 'Nakheel Dubai', location: 'Palm Jumeirah, Dubai', developer: 'Nakheel Properties', price: 'On Request', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop' }
    ]
};

// Track which location is currently open
let activeLocation = null;

// Toggle location dropdown
function toggleLocation(location) {
    // If clicking the same location, close it
    if (activeLocation === location) {
        closeLocation(location);
        return;
    }
    
    // Close any open location first
    if (activeLocation) {
        closeLocation(activeLocation);
    }
    
    // Open the clicked location
    openLocation(location);
}

function openLocation(location) {
    const dropdown = document.getElementById(`dropdown-${location}`);
    const card = dropdown.closest('.location-card-wrapper').querySelector('.location-card');
    
    // Add active class to card
    card.classList.add('active');
    
    // Open dropdown
    dropdown.classList.add('open');
    
    // Load projects
    loadProjects(location);
    
    activeLocation = location;
}

function closeLocation(location) {
    const dropdown = document.getElementById(`dropdown-${location}`);
    const card = dropdown.closest('.location-card-wrapper').querySelector('.location-card');
    
    // Remove active class
    card.classList.remove('active');
    
    // Close dropdown
    dropdown.classList.remove('open');
    
    if (activeLocation === location) {
        activeLocation = null;
    }
}

// Load projects with skeleton loading
function loadProjects(location) {
    const container = document.getElementById(`projects-${location}`);
    const projects = locationData[location] || [];
    
    // Show skeleton loading
    container.innerHTML = `
        <div class="skeleton skeleton-image"></div>
        <div class="skeleton skeleton-text" style="width:80%;"></div>
        <div class="skeleton skeleton-text" style="width:60%;"></div>
        <div class="skeleton skeleton-text" style="width:40%;"></div>
    `;
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(240px, 1fr))';
    container.style.gap = '16px';
    
    // Simulate loading delay (for demo)
    setTimeout(() => {
        if (projects.length === 0) {
            container.innerHTML = `
                <div class="no-projects-msg">
                    <i class="fas fa-building"></i>
                    <p>No projects available in this location yet.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = projects.map(project => `
            <div class="dropdown-project-item">
                <img src="${project.image}" alt="${project.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x250/0033A0/FFFFFF?text=${encodeURIComponent(project.name)}'">
                <div class="dropdown-project-content">
                    <h4>${project.name}</h4>
                    <p class="project-loc"><i class="fas fa-map-marker-alt" style="color: var(--secondary); font-size:12px;"></i> ${project.location}</p>
                    <p class="project-dev"><i class="fas fa-building" style="color: var(--secondary); font-size:12px;"></i> ${project.developer}</p>
                    <div class="project-price">${project.price}</div>
                    <button class="enquire-small" onclick="document.getElementById('enquire').scrollIntoView({behavior:'smooth'})">
                        Enquire Now
                    </button>
                </div>
            </div>
        `).join('');
    }, 500);
}

// ============================
// AUTOMATIC DARK/LIGHT MODE
// ============================

// Check user's system preference
function setTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const root = document.documentElement;
    
    if (prefersDark) {
        root.style.setProperty('--bg-color', '#0a0a1a');
        root.style.setProperty('--text-color', '#ffffff');
        root.style.setProperty('--card-bg', '#1a1a2e');
        root.style.setProperty('--skeleton-bg1', '#2a2a3e');
        root.style.setProperty('--skeleton-bg2', '#3a3a4e');
    } else {
        root.style.setProperty('--bg-color', '#f8f9fc');
        root.style.setProperty('--text-color', '#2d2d3f');
        root.style.setProperty('--card-bg', '#ffffff');
        root.style.setProperty('--skeleton-bg1', '#e0e0e0');
        root.style.setProperty('--skeleton-bg2', '#f0f0f0');
    }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setTheme);

// Apply theme on page load
document.addEventListener('DOMContentLoaded', setTheme);

// ============================
// FORM VALIDATION (Enhanced)
// ============================

// Smart form validation with real-time feedback
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('leadForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error state while typing
            this.classList.remove('error');
            const errorMsg = this.parentElement.querySelector('.field-error');
            if (errorMsg) errorMsg.remove();
        });
    });
    
    // Form submit
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const formData = {};
        
        // Validate all fields
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
            formData[input.id] = input.value;
        });
        
        if (!isValid) {
            showMessage('Please fix all errors before submitting.', 'error');
            return;
        }
        
        // Submit form (existing code)
        submitForm(formData);
    });
});

function validateField(field) {
    const value = field.value.trim();
    const errorMsg = field.parentElement.querySelector('.field-error');
    
    // Remove existing error
    if (errorMsg) errorMsg.remove();
    field.classList.remove('error');
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    if (field.id === 'phone' && value && !isValidPhone(value)) {
        showFieldError(field, 'Please enter a valid 10-digit phone number');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    const error = document.createElement('span');
    error.className = 'field-error';
    error.style.cssText = 'color: #ef4444; font-size: 12px; margin-top: 4px;';
    error.textContent = message;
    field.parentElement.appendChild(error);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    const cleaned = phone.replace(/\s/g, '');
    return /^[0-9]{10}$/.test(cleaned);
}

function showMessage(msg, type) {
    const messageEl = document.getElementById('message');
    if (!messageEl) return;
    messageEl.textContent = msg;
    messageEl.className = 'form-message ' + type;
    messageEl.style.display = 'block';
    setTimeout(() => { messageEl.style.display = 'none'; }, 5000);
}

// ============================
// DYNAMIC DATA LOADING
// ============================

// Open Gurugram by default on page load
document.addEventListener('DOMContentLoaded', function() {
    // Open Gurugram by default (after a slight delay)
    setTimeout(() => {
        toggleLocation('gurugram');
    }, 300);
});

// ============================
// LEAD POP-UP
// ============================

let popupInterval = null;
let popupShown = false;
let popupSubmitting = false;

// ===== SHOW POP-UP =====
function showPopup() {
    const popup = document.getElementById('leadPopup');
    if (popup && !popupShown && !popupSubmitting) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        popupShown = true;
    }
}

// ===== CLOSE POP-UP =====
function closePopup() {
    const popup = document.getElementById('leadPopup');
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== SHOW ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    // Show after 5.5 seconds for smooth experience
    setTimeout(function() {
        showPopup();
    }, 55000);
    
    // Start recurring schedule
    scheduleNextPopup();
});

// ===== SCHEDULE NEXT POP-UP (50-55 seconds) =====
function scheduleNextPopup() {
    const delay = Math.floor(Math.random() * 50000) + 55000; // 50-55 seconds
    
    if (popupInterval) {
        clearTimeout(popupInterval);
    }
    
    popupInterval = setTimeout(function() {
        const popup = document.getElementById('leadPopup');
        if (popup && !popup.classList.contains('active') && !popupSubmitting) {
            popupShown = false;
            showPopup();
        }
        scheduleNextPopup();
    }, delay);
}

// ===== CLOSE ON OVERLAY CLICK =====
document.addEventListener('click', function(e) {
    const popup = document.getElementById('leadPopup');
    if (popup && e.target === popup) {
        closePopup();
    }
});

// ===== ESCAPE KEY CLOSE =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const popup = document.getElementById('leadPopup');
        if (popup && popup.classList.contains('active')) {
            closePopup();
        }
    }
});

// ========================================
// POPUP FORM HANDLING
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('popupForm');
    if (!form) return;
    
    // Real-time validation on blur
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validatePopupField(this);
        });
        input.addEventListener('input', function() {
            const errorEl = document.getElementById(this.id + 'Error');
            if (errorEl) {
                errorEl.textContent = '';
                this.classList.remove('error');
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (popupSubmitting) return;
        
        let isValid = true;
        const fields = this.querySelectorAll('input[required]');
        fields.forEach(field => {
            if (!validatePopupField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) return;
        
        submitPopupForm(this);
    });
});

// ===== VALIDATE FIELD =====
function validatePopupField(field) {
    const errorEl = document.getElementById(field.id + 'Error');
    if (!errorEl) return true;
    
    let isValid = true;
    let errorMsg = '';
    
    if (field.id === 'popupName') {
        const name = field.value.trim();
        if (!name) {
            errorMsg = 'Please enter your full name';
            isValid = false;
        } else if (name.length < 2) {
            errorMsg = 'Name must be at least 2 characters';
            isValid = false;
        }
    }
    
    if (field.id === 'popupPhone') {
        const phone = field.value.replace(/\s/g, '');
        if (!phone) {
            errorMsg = 'Please enter your phone number';
            isValid = false;
        } else if (!/^[0-9]{10}$/.test(phone)) {
            errorMsg = 'Enter a valid 10-digit phone number';
            isValid = false;
        }
    }
    
    if (field.id === 'popupEmail') {
        const email = field.value.trim();
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errorMsg = 'Enter a valid email address';
            isValid = false;
        }
    }
    
    if (!isValid) {
        errorEl.textContent = errorMsg;
        field.classList.add('error');
    } else {
        errorEl.textContent = '';
        field.classList.remove('error');
    }
    
    return isValid;
}

// ===== SUBMIT POPUP FORM =====
function submitPopupForm(form) {
    const submitBtn = form.querySelector('.popup-submit');
    const originalText = submitBtn.innerHTML;
    const messageEl = document.getElementById('popupMessage');
    
    // Get form data
    const name = document.getElementById('popupName').value.trim();
    const phone = document.getElementById('popupPhone').value.trim();
    const email = document.getElementById('popupEmail').value.trim();
    
    // Validate
    if (!name || !phone) {
        messageEl.textContent = 'Please fill in all required fields.';
        messageEl.className = 'popup-message error';
        return;
    }
    
    // Show loading
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    // ===== YOUR APPS SCRIPT URL =====
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_V0eEbw-n0IsdAvQy7BV4EwZ1R8ushejfVL5Nj4UCQcPyt_uLYp7-CXQiF9rBZGWT/exec';
    
    // Send data to Google Sheets
    fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            name: name,
            phone: phone,
            email: email,
            project: 'Pop-up Lead',
            requirement: 'Pop-up consultation request',
            source: 'Pop-up'
        })
    })
    .then(() => {
        // Success - data sent to Google Sheets
        showPopupSuccess(submitBtn, originalText, messageEl, form);
    })
    .catch(() => {
        // Even with no-cors error, data is usually sent
        showPopupSuccess(submitBtn, originalText, messageEl, form);
    });
}

function showPopupSuccess(submitBtn, originalText, messageEl, form) {
    messageEl.textContent = '✓ Thank you! Our team will contact you shortly.';
    messageEl.className = 'popup-message success';
    form.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    popupSubmitting = false;
    
    // Close popup after 2.5 seconds
    setTimeout(() => {
        closePopup();
        popupShown = false;
        messageEl.className = 'popup-message';
        messageEl.textContent = '';
    }, 2500);
}

// ===== MAKE FUNCTIONS GLOBAL =====
window.showPopup = showPopup;
window.closePopup = closePopup;