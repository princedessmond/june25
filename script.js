// Data storage (In production, this would connect to a backend database)
let registrations = JSON.parse(localStorage.getItem('june25_registrations')) || [];
let transportRequests = JSON.parse(localStorage.getItem('june25_transport')) || [];
let legalRequests = JSON.parse(localStorage.getItem('june25_legal')) || [];
let donations = JSON.parse(localStorage.getItem('june25_donations')) || { total: 0 };

// Live demo mode - simulated realistic stats
const DEMO_MODE = true; // Set to false for production
let liveRegistrationCount = 0;
let liveFundAmount = 0;

// Carousel variables
let currentSlideIndex = 0;
let carouselInterval;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();

    if (DEMO_MODE) {
        initializeLiveStats();
        startLiveStatsSimulation();
    } else {
        updateStats();
    }

    setupFormHandlers();
    startCountdown();
    animateStats();
    setupMobileMenu();
});

// ===== MOBILE MENU =====

function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !navLinks.contains(event.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
}

// ===== CAROUSEL FUNCTIONS =====

// Initialize carousel
function initCarousel() {
    showSlide(currentSlideIndex);
    startAutoSlide();
}

// Show specific slide
function showSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');

    if (!slides.length) return;

    // Loop around
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    // Remove active class from all
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Add active to current
    slides[currentSlideIndex].classList.add('active');
    if (indicators[currentSlideIndex]) {
        indicators[currentSlideIndex].classList.add('active');
    }
}

// Move to next/previous slide
function moveSlide(direction) {
    stopAutoSlide();
    showSlide(currentSlideIndex + direction);
    startAutoSlide();
}

// Jump to specific slide
function currentSlide(index) {
    stopAutoSlide();
    showSlide(index);
    startAutoSlide();
}

// Auto-advance slides
function startAutoSlide() {
    carouselInterval = setInterval(() => {
        showSlide(currentSlideIndex + 1);
    }, 5000); // Change slide every 5 seconds
}

// Stop auto-advance
function stopAutoSlide() {
    clearInterval(carouselInterval);
}

// Pause on hover
document.addEventListener('DOMContentLoaded', function() {
    const heroCarousel = document.querySelector('.hero-carousel');
    if (heroCarousel) {
        heroCarousel.addEventListener('mouseenter', stopAutoSlide);
        heroCarousel.addEventListener('mouseleave', startAutoSlide);
    }
});

// ===== COUNTDOWN TIMER =====

function startCountdown() {
    // Target date: June 25, 2026 at 8:00 AM EAT
    const targetDate = new Date('2026-06-25T08:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Calculate days, hours, minutes, seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update countdown display elements
        const daysElement = document.getElementById('countdown-days');
        const hoursElement = document.getElementById('countdown-hours');
        const minutesElement = document.getElementById('countdown-minutes');
        const secondsElement = document.getElementById('countdown-seconds');
        const statusElement = document.getElementById('countdown-status');

        if (distance > 0) {
            // Format numbers with leading zeros
            if (daysElement) daysElement.textContent = String(days).padStart(2, '0');
            if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
            if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
            if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');

            // Update message based on time remaining
            if (statusElement) {
                if (days === 0 && hours < 24) {
                    statusElement.textContent = "🔥 FINAL HOURS! Register now - it's almost time!";
                    statusElement.style.fontSize = '1.5rem';
                    statusElement.style.fontWeight = '700';
                } else if (days === 1) {
                    statusElement.textContent = "⚡ Tomorrow we march! Last chance to register!";
                } else if (days <= 3) {
                    statusElement.textContent = "⏰ Just " + days + " days left! Don't miss out - register now!";
                } else if (days <= 7) {
                    statusElement.textContent = "📢 Less than a week to go! Join thousands of Kenyans.";
                } else {
                    statusElement.textContent = "Every second counts. Register now and stand with thousands.";
                }
            }
        } else {
            // Countdown expired
            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';
            if (statusElement) {
                statusElement.textContent = "🇰🇪 The march is happening NOW! Stand together for Kenya!";
                statusElement.style.fontSize = '1.8rem';
                statusElement.style.fontWeight = '700';
            }
        }
    }

    // Update immediately
    updateCountdown();

    // Update every second for ticking effect
    setInterval(updateCountdown, 1000);
}

// ===== ANIMATED STATISTICS =====

// Initialize live stats with random starting values
function initializeLiveStats() {
    // Random starting values in the specified ranges
    liveRegistrationCount = Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000; // 2000-4000
    liveFundAmount = Math.floor(Math.random() * (10000 - 8000 + 1)) + 8000; // 8000-10000
}

// Start live stats simulation
function startLiveStatsSimulation() {
    // Initial animation to current values
    animateNumber('registeredCount', liveRegistrationCount, 2000);
    animateNumber('fundedAmount', liveFundAmount, 2500, true);

    // Increment registrations slowly - one person at a time, more frequently
    setInterval(() => {
        const increment = 1; // Single registration at a time feels more realistic
        liveRegistrationCount += increment;

        // Keep within range 2k-6k
        if (liveRegistrationCount > 6000) {
            liveRegistrationCount = Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000; // Reset to 2000-3000
        }

        updateLiveStat('registeredCount', liveRegistrationCount);
    }, Math.random() * (5000 - 2000) + 2000); // Random interval 2-5 seconds (slower, more realistic)

    // Increment funds slowly - smaller amounts more frequently
    setInterval(() => {
        const increment = Math.floor(Math.random() * (200 - 50 + 1)) + 50; // KSh 50-200 (smaller amounts)
        liveFundAmount += increment;

        // Keep within range up to 12k
        if (liveFundAmount > 12000) {
            liveFundAmount = Math.floor(Math.random() * (9000 - 8000 + 1)) + 8000; // Reset to 8000-9000
        }

        updateLiveStat('fundedAmount', liveFundAmount, true);
    }, Math.random() * (8000 - 4000) + 4000); // Random interval 4-8 seconds (slower)

    // Occasional small spike every 30-60 seconds (more realistic than frequent large spikes)
    setInterval(() => {
        const spike = Math.floor(Math.random() * (8 - 3 + 1)) + 3; // 3-8 people at once (smaller spikes)
        liveRegistrationCount += spike;

        if (liveRegistrationCount > 6000) {
            liveRegistrationCount = 6000;
        }

        updateLiveStat('registeredCount', liveRegistrationCount);

        // Also add funds during spike (proportional)
        const fundSpike = Math.floor(Math.random() * (400 - 150 + 1)) + 150;
        liveFundAmount += fundSpike;

        if (liveFundAmount > 12000) {
            liveFundAmount = 12000;
        }

        updateLiveStat('fundedAmount', liveFundAmount, true);
    }, Math.random() * (60000 - 30000) + 30000); // Random spike 30-60 seconds (less frequent)
}

// Update live stat with smooth animation
function updateLiveStat(elementId, newValue, isCurrency = false) {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Get current value
    let currentText = element.textContent;
    if (isCurrency) {
        currentText = currentText.replace('KSh ', '').replace(/,/g, '');
    } else {
        currentText = currentText.replace(/,/g, '');
    }
    const currentValue = parseInt(currentText) || 0;

    // Animate from current to new value
    const duration = 800; // 0.8 seconds
    const startTime = Date.now();
    const difference = newValue - currentValue;

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out effect
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const displayValue = Math.floor(currentValue + (difference * easeProgress));

        if (isCurrency) {
            element.textContent = `KSh ${displayValue.toLocaleString()}`;
        } else {
            element.textContent = displayValue.toLocaleString();
        }

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Add a flash effect when number updates
            element.style.color = '#ffd700'; // Gold color
            setTimeout(() => {
                element.style.color = '';
            }, 300);
        }
    }

    requestAnimationFrame(animate);
}

function animateStats() {
    if (DEMO_MODE) {
        // Stats are already animated by live simulation
        return;
    }

    // Original static animation
    animateNumber('registeredCount', registrations.length, 2000);
    animateNumber('fundedAmount', donations.total, 2500, true);
}

function animateNumber(elementId, targetValue, duration, isCurrency = false) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const startValue = 0;
    const increment = targetValue / (duration / 16); // 60fps
    let currentValue = startValue;

    const timer = setInterval(() => {
        currentValue += increment;

        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }

        if (isCurrency) {
            element.textContent = `KSh ${Math.floor(currentValue).toLocaleString()}`;
        } else {
            element.textContent = Math.floor(currentValue).toLocaleString();
        }
    }, 16);
}

// Update statistics display
function updateStats() {
    const registeredCount = document.getElementById('registeredCount');
    const fundedAmount = document.getElementById('fundedAmount');

    if (registeredCount) {
        registeredCount.textContent = registrations.length.toLocaleString();
    }

    if (fundedAmount) {
        fundedAmount.textContent = `KSh ${donations.total.toLocaleString()}`;
    }
}

// Generate reference number
function generateReferenceNumber(prefix) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}${timestamp}${random}`;
}

// Setup form handlers
function setupFormHandlers() {
    // Registration Form
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
    }

    // Transport Form
    const transportForm = document.getElementById('transportForm');
    if (transportForm) {
        transportForm.addEventListener('submit', handleTransportSubmit);
    }

    // Legal Aid Form
    const legalForm = document.getElementById('legalForm');
    if (legalForm) {
        legalForm.addEventListener('submit', handleLegalSubmit);
    }
}

// Handle registration form submission
async function handleRegistrationSubmit(e) {
    e.preventDefault();

    const formData = {
        id: generateReferenceNumber('REG'),
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        location: document.getElementById('location').value,
        assemblyPoint: document.getElementById('assemblyPoint').value,
        needTransport: document.getElementById('needTransport').checked,
        timestamp: new Date().toISOString()
    };

    // Save to localStorage (backup)
    registrations.push(formData);
    localStorage.setItem('june25_registrations', JSON.stringify(registrations));

    // Send to Google Sheets
    if (typeof GOOGLE_SHEETS_CONFIG !== 'undefined' && GOOGLE_SHEETS_CONFIG.registrationURL) {
        await sendToGoogleSheets(GOOGLE_SHEETS_CONFIG.registrationURL, formData);
    }

    // Update stats
    updateStats();

    // Show success message
    document.getElementById('registrationForm').style.display = 'none';
    const successDiv = document.getElementById('registrationSuccess');
    successDiv.style.display = 'block';
    document.getElementById('refNumber').textContent = formData.id;

    // Send confirmation SMS (would be handled by backend in production)
    console.log('Registration submitted:', formData);

    // Simulate SMS confirmation
    simulateNotification(`SMS sent to ${formData.phone}: Thank you for registering for June 25 peaceful protest. Your ref: ${formData.id}. You will receive updates soon.`);

    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth' });
}

// Handle transport request submission
async function handleTransportSubmit(e) {
    e.preventDefault();

    const formData = {
        id: generateReferenceNumber('TRN'),
        name: document.getElementById('transportName').value,
        phone: document.getElementById('transportPhone').value,
        departurePoint: document.getElementById('departurePoint').value,
        passengerCount: document.getElementById('passengerCount').value,
        route: document.getElementById('transportRoute').value,
        timestamp: new Date().toISOString()
    };

    // Save to localStorage (backup)
    transportRequests.push(formData);
    localStorage.setItem('june25_transport', JSON.stringify(transportRequests));

    // Send to Google Sheets
    if (typeof GOOGLE_SHEETS_CONFIG !== 'undefined' && GOOGLE_SHEETS_CONFIG.transportURL) {
        await sendToGoogleSheets(GOOGLE_SHEETS_CONFIG.transportURL, formData);
    }

    // Show success message
    document.getElementById('transportForm').style.display = 'none';
    const successDiv = document.getElementById('transportSuccess');
    successDiv.style.display = 'block';

    console.log('Transport request submitted:', formData);

    // Simulate SMS confirmation
    simulateNotification(`SMS sent to ${formData.phone}: Your transport request has been received. Ref: ${formData.id}. You will be contacted within 24 hours with pickup details.`);

    successDiv.scrollIntoView({ behavior: 'smooth' });
}

// Handle legal aid request submission
async function handleLegalSubmit(e) {
    e.preventDefault();

    const formData = {
        id: generateReferenceNumber('LEG'),
        name: document.getElementById('legalName').value,
        phone: document.getElementById('legalPhone').value,
        email: document.getElementById('legalEmail').value,
        urgency: document.getElementById('urgency').value,
        issue: document.getElementById('legalIssue').value,
        location: document.getElementById('currentLocation').value,
        timestamp: new Date().toISOString()
    };

    // Save to localStorage (backup)
    legalRequests.push(formData);
    localStorage.setItem('june25_legal', JSON.stringify(legalRequests));

    // Send to Google Sheets
    if (typeof GOOGLE_SHEETS_CONFIG !== 'undefined' && GOOGLE_SHEETS_CONFIG.legalURL) {
        await sendToGoogleSheets(GOOGLE_SHEETS_CONFIG.legalURL, formData);
    }

    // Show success message
    document.getElementById('legalForm').style.display = 'none';
    const successDiv = document.getElementById('legalSuccess');
    successDiv.style.display = 'block';
    document.getElementById('caseRef').textContent = formData.id;

    console.log('Legal aid request submitted:', formData);

    // Determine response time based on urgency
    let responseTime = '30 minutes';
    if (formData.urgency === 'emergency') {
        responseTime = '10 minutes';
        // In production, this would trigger immediate alert to lawyers
        console.log('EMERGENCY LEGAL REQUEST - IMMEDIATE ATTENTION REQUIRED');
    } else if (formData.urgency === 'urgent') {
        responseTime = '20 minutes';
    }

    // Simulate SMS/Call
    simulateNotification(`URGENT: Legal aid request from ${formData.name}. Case: ${formData.id}. Priority: ${formData.urgency}. Contact within ${responseTime}.`);

    successDiv.scrollIntoView({ behavior: 'smooth' });
}

// Simulate notification (would be real SMS/email in production)
function simulateNotification(message) {
    console.log('📱 NOTIFICATION:', message);
}

// Phone number validation (Kenya format)
function validateKenyanPhone(phone) {
    const phoneRegex = /^(\+254|0)[17]\d{8}$/;
    return phoneRegex.test(phone);
}

// Add real-time phone validation
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    phoneInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const phone = this.value.trim();
            if (phone && !validateKenyanPhone(phone)) {
                this.style.borderColor = 'var(--secondary-color)';
                alert('Please enter a valid Kenyan phone number (e.g., 0712345678 or +254712345678)');
            } else {
                this.style.borderColor = 'var(--border-color)';
            }
        });
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Export data function (for organizers - in production would be protected)
function exportRegistrations() {
    const data = {
        registrations: registrations,
        transportRequests: transportRequests,
        legalRequests: legalRequests,
        stats: {
            totalRegistered: registrations.length,
            needTransport: registrations.filter(r => r.needTransport).length,
            transportRequests: transportRequests.length,
            legalRequests: legalRequests.length
        }
    };

    console.log('Export data:', data);
    return data;
}

// Admin stats (would be password protected in production)
function getAdminStats() {
    return {
        totalRegistrations: registrations.length,
        byLocation: registrations.reduce((acc, reg) => {
            acc[reg.location] = (acc[reg.location] || 0) + 1;
            return acc;
        }, {}),
        byAssemblyPoint: registrations.reduce((acc, reg) => {
            acc[reg.assemblyPoint] = (acc[reg.assemblyPoint] || 0) + 1;
            return acc;
        }, {}),
        needTransport: registrations.filter(r => r.needTransport).length,
        transportRequestsByRoute: transportRequests.reduce((acc, req) => {
            acc[req.route] = (acc[req.route] || 0) + 1;
            return acc;
        }, {}),
        legalRequestsByUrgency: legalRequests.reduce((acc, req) => {
            acc[req.urgency] = (acc[req.urgency] || 0) + 1;
            return acc;
        }, {}),
        recentRegistrations: registrations.slice(-10)
    };
}

// Console command to view stats (for organizers)
console.log('%cJune 25 Peaceful Protest Portal', 'font-size: 20px; font-weight: bold; color: #1e7e34;');
console.log('%cOrganizer Commands:', 'font-size: 14px; font-weight: bold;');
console.log('- getAdminStats() : View detailed statistics');
console.log('- exportRegistrations() : Export all data');
console.log('%cNote: In production, these would require authentication', 'color: #d32f2f;');
