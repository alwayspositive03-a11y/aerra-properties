// ============================
// LOCATION PAGE - DATA & LOGIC
// ============================

// Location data with projects
const locationData = {
    gurugram: {
        name: 'Gurugram',
        description: 'India\'s Millennium City - Home to luxury residential and commercial spaces.',
        heroImage: 'images/gurugram.jpg',
        projects: [
            {
                name: 'Oberoi 360 North',
                location: 'Sector 58, Gurgaon',
                developer: 'Oberoi Realty',
                price: 'On Request',
                image: 'images/360_west.png'
            },
            {
                name: 'Elan The Presidential',
                location: 'DXP Sector 106, Gurgaon',
                developer: 'Elan Limited',
                price: 'On Request',
                image: 'images/elan-the-presidential.jpg'
            },
            {
                name: 'DLF Privana West',
                location: 'Sector 76, Gurgaon',
                developer: 'DLF Limited',
                price: 'On Request',
                image: 'images/dlf-privana-west.jpg'
            },
            {
                name: 'M3M Altitude',
                location: 'Sector 65, Gurgaon',
                developer: 'M3M India',
                price: 'On Request',
                image: 'images/m3m-altitude.jpg'
            },
            {
                name: 'Tonino Lamborghini Residences',
                location: 'Sector 71, Gurgaon',
                developer: 'Signature Global',
                price: '₹4.49 Cr Onwards',
                image: 'images/tonino-lambo.png'
            },
            {
                name: 'Westin Residences',
                location: 'Sector 103, Gurgaon',
                developer: 'Whiteland',
                price: 'On Request',
                image: 'images/westin-residences.jpeg'
            }
        ]
    },
    noida: {
        name: 'Noida',
        description: 'Delhi NCR\'s fastest-growing real estate destination with world-class infrastructure.',
        heroImage: 'images/noida.jpg',
        projects: [
            {
                name: 'Godrej Noida',
                location: 'Sector 150, Noida',
                developer: 'Godrej Properties',
                price: 'On Request',
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop'
            },
            {
                name: 'ATS Noida',
                location: 'Sector 150, Noida',
                developer: 'ATS Group',
                price: 'On Request',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop'
            },
            {
                name: 'Supertech Noida',
                location: 'Sector 93, Noida',
                developer: 'Supertech Group',
                price: 'On Request',
                image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=400&h=250&fit=crop'
            },
            {
                name: 'ACE Noida',
                location: 'Sector 150, Noida',
                developer: 'ACE Group',
                price: 'On Request',
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop'
            }
        ]
    },
    punjab: {
        name: 'Punjab',
        description: 'Land of prosperity - Emerging real estate opportunities in Chandigarh and Mohali.',
        heroImage: 'images/punjab.jpg',
        projects: [
            {
                name: 'Emaar Mohali',
                location: 'Sector 67, Mohali',
                developer: 'Emaar India',
                price: 'On Request',
                image: 'https://images.unsplash.com/photo-1597839219216-a773cb2473e4?w=400&h=250&fit=crop'
            },
            {
                name: 'Omaxe Chandigarh',
                location: 'Chandigarh',
                developer: 'Omaxe Group',
                price: 'On Request',
                image: 'https://images.unsplash.com/photo-1584467735867-5775d2d7e3c9?w=400&h=250&fit=crop'
            },
            {
                name: 'DLF Punjab',
                location: 'Mohali, Punjab',
                developer: 'DLF Limited',
                price: 'On Request',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop'
            },
            {
                name: 'Godrej Punjab',
                location: 'Mohali, Punjab',
                developer: 'Godrej Properties',
                price: 'On Request',
                image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=400&h=250&fit=crop'
            }
        ]
    },
    dubai: {
        name: 'Dubai',
        description: 'Global luxury destination - World-class properties in the heart of the UAE.',
        heroImage: 'images/dubai.jpg',
        projects: [
            {
                name: 'Emaar Dubai',
                location: 'Dubai Hills, Dubai',
                developer: 'Emaar Properties',
                price: 'On Request',
                image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=250&fit=crop'
            },
            {
                name: 'Damac Hills',
                location: 'Damac Hills, Dubai',
                developer: 'Damac Properties',
                price: 'On Request',
                image: 'https://images.unsplash.com/photo-1584467735867-5775d2d7e3c9?w=400&h=250&fit=crop'
            },
            {
                name: 'Nakheel Dubai',
                location: 'Palm Jumeirah, Dubai',
                developer: 'Nakheel Properties',
                price: 'On Request',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop'
            },
            {
                name: 'Meraas Dubai',
                location: 'City Walk, Dubai',
                developer: 'Meraas Group',
                price: 'On Request',
                image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=400&h=250&fit=crop'
            }
        ]
    }
};

// ============================
// GET LOCATION FROM URL
// ============================

function getLocationFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('city') || 'gurugram';
}

// ============================
// LOAD LOCATION DATA
// ============================

function loadLocation() {
    const city = getLocationFromURL();
    const data = locationData[city];
    
    if (!data) {
        window.location.href = 'index.html';
        return;
    }
    
    // Update page title
    document.title = `${data.name} Projects - Aerra Properties`;
    document.getElementById('pageTitle').textContent = `${data.name} Projects - Aerra Properties`;
    
    // Update hero section
    document.getElementById('locationName').textContent = data.name;
    document.getElementById('locationName2').textContent = data.name;
    document.getElementById('locationDescription').textContent = data.description;
    
    // Update hero background
    const hero = document.getElementById('locationHero');
    hero.style.background = `linear-gradient(135deg, rgba(0,51,160,0.85), rgba(0,51,160,0.6)), url('${data.heroImage}') center/cover no-repeat`;
    
    // Update project count
    document.getElementById('projectCount').innerHTML = `Projects in <span id="locationName2">${data.name}</span>`;
    
    // Render projects with skeleton effect
    renderProjects(data.projects);
}

// ============================
// RENDER PROJECTS WITH SKELETON
// ============================

function renderProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    
    // Show skeleton for 800ms, then render
    setTimeout(() => {
        if (!projects || projects.length === 0) {
            grid.innerHTML = `
                <div class="no-projects" style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <i class="fas fa-building" style="font-size: 48px; color: var(--gray-medium);"></i>
                    <h3 style="margin-top: 16px;">No projects available</h3>
                    <p style="color: var(--text-secondary);">Check back soon for new listings.</p>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = projects.map(project => `
            <div class="project-item">
                <img src="${project.image}" alt="${project.name}" class="project-item-image" loading="lazy" 
                     onerror="this.src='https://via.placeholder.com/400x250/0033A0/FFFFFF?text=${encodeURIComponent(project.name)}'">
                <div class="project-item-content">
                    <h4>${project.name}</h4>
                    <p class="project-location"><i class="fas fa-map-marker-alt" style="color: var(--secondary);"></i> ${project.location}</p>
                    <p class="project-developer"><i class="fas fa-building" style="color: var(--secondary);"></i> ${project.developer}</p>
                    <div class="project-price">${project.price}</div>
                    <button class="enquire-small" onclick="document.getElementById('enquire').scrollIntoView({behavior:'smooth'})">
                        Enquire Now
                    </button>
                </div>
            </div>
        `).join('');
    }, 800);
}

// ============================
// SMART FORM VALIDATION
// ============================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('leadForm');
    
    // Real-time validation on blur
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        input.addEventListener('input', function() {
            // Clear error while typing
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
        
        // Validate all fields
        let isValid = true;
        const fields = this.querySelectorAll('input[required], textarea[required]');
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            return;
        }
        
        // Submit form
        submitForm(this);
    });
});

// ============================
// VALIDATE INDIVIDUAL FIELD
// ============================

function validateField(field) {
    const errorEl = document.getElementById(field.id + 'Error');
    if (!errorEl) return true;
    
    let isValid = true;
    let errorMsg = '';
    
    // Name validation
    if (field.id === 'name') {
        if (!field.value.trim()) {
            errorMsg = 'Please enter your full name';
            isValid = false;
        } else if (field.value.trim().length < 2) {
            errorMsg = 'Name must be at least 2 characters';
            isValid = false;
        }
    }
    
    // Phone validation
    if (field.id === 'phone') {
        const phone = field.value.replace(/\s/g, '');
        if (!phone) {
            errorMsg = 'Please enter your phone number';
            isValid = false;
        } else if (!/^[0-9]{10}$/.test(phone)) {
            errorMsg = 'Please enter a valid 10-digit phone number';
            isValid = false;
        }
    }
    
    // Email validation (optional but validate if filled)
    if (field.id === 'email') {
        const email = field.value.trim();
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errorMsg = 'Please enter a valid email address';
            isValid = false;
        }
    }
    
    // Project validation
    if (field.id === 'project') {
        if (!field.value.trim()) {
            errorMsg = 'Please enter the project name';
            isValid = false;
        }
    }
    
    // Requirement validation
    if (field.id === 'requirement') {
        if (!field.value.trim()) {
            errorMsg = 'Please tell us about your requirement';
            isValid = false;
        } else if (field.value.trim().length < 10) {
            errorMsg = 'Please provide more details (minimum 10 characters)';
            isValid = false;
        }
    }
    
    // Show/hide error
    if (!isValid) {
        errorEl.textContent = errorMsg;
        field.classList.add('error');
    } else {
        errorEl.textContent = '';
        field.classList.remove('error');
    }
    
    return isValid;
}

// ============================
// SUBMIT FORM
// ============================

function submitForm(form) {
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    const messageEl = document.getElementById('message');
    
    // Show loading
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        project: formData.get('project'),
        message: formData.get('requirement')
    };
    
    // Simulate API call (replace with your actual endpoint)
    setTimeout(() => {
        // Success
        messageEl.textContent = '✓ Thank you! We\'ll get back to you shortly.';
        messageEl.className = 'form-message success';
        messageEl.style.display = 'block';
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
        
    }, 1500);
}

// ============================
// INITIALIZE
// ============================
document.addEventListener('DOMContentLoaded', loadLocation);