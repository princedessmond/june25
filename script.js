// Privacy-first: personal data is NOT persisted on the device. Submitted data
// lives in the backend (Google Sheets). Any legacy PII left in localStorage from
// older versions is purged on load so names/phones/case details don't linger.
['june25_registrations', 'june25_transport', 'june25_legal'].forEach(function (key) {
    localStorage.removeItem(key);
});

// In-memory only (cleared on every page load) — used for the current session.
let registrations = [];
let transportRequests = [];
let legalRequests = [];
let donations = { total: 0 };

// Live demo mode - simulated realistic stats
const DEMO_MODE = true; // Set to false for production
let liveRegistrationCount = 0;
let liveFundAmount = 0;

// Carousel variables
let currentSlideIndex = 0;
let carouselInterval;

// Register the service worker for offline/PWA support.
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js')
            .catch(function (err) { console.warn('Service worker registration failed:', err); });
    });
}

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

// Persisted anchor so the counters keep RISING across page refreshes
// instead of resetting to a new random value every time the page loads.
const STATS_ANCHOR_KEY = 'june25_stats_anchor';
const REG_GROWTH_PER_SEC = 1 / 6;   // ~1 new registration every 6 seconds
const FUND_GROWTH_PER_SEC = 12;     // ~KSh 12 raised every second

// Load (or seed once) the growth anchor: a base value + the time it was set.
function loadStatsAnchor() {
    let anchor = null;
    try {
        anchor = JSON.parse(localStorage.getItem(STATS_ANCHOR_KEY));
    } catch (e) {
        anchor = null;
    }

    if (!anchor || typeof anchor.baseReg !== 'number' || typeof anchor.baseFund !== 'number') {
        // First ever visit on this device: seed a realistic starting point once.
        anchor = {
            startTime: Date.now(),
            baseReg: Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000,   // 2000-4000
            baseFund: Math.floor(Math.random() * (10000 - 8000 + 1)) + 8000  // 8000-10000
        };
        localStorage.setItem(STATS_ANCHOR_KEY, JSON.stringify(anchor));
    }
    return anchor;
}

// Persist the current values as the new anchor so the next load resumes
// from here (guarantees the numbers never drop on refresh).
function saveStatsAnchor() {
    localStorage.setItem(STATS_ANCHOR_KEY, JSON.stringify({
        startTime: Date.now(),
        baseReg: liveRegistrationCount,
        baseFund: liveFundAmount
    }));
}

// Initialize live stats from the persisted anchor + real elapsed time.
function initializeLiveStats() {
    const anchor = loadStatsAnchor();
    const elapsedSec = Math.max(0, (Date.now() - anchor.startTime) / 1000);
    liveRegistrationCount = anchor.baseReg + Math.floor(elapsedSec * REG_GROWTH_PER_SEC);
    liveFundAmount = anchor.baseFund + Math.floor(elapsedSec * FUND_GROWTH_PER_SEC);
}

// Start live stats simulation
function startLiveStatsSimulation() {
    // Initial animation to current values
    animateNumber('registeredCount', liveRegistrationCount, 2000);
    animateNumber('fundedAmount', liveFundAmount, 2500, true);

    // Increment registrations slowly - one person at a time. Numbers only ever
    // go UP; we persist the anchor so a refresh resumes from here, never resets.
    setInterval(() => {
        liveRegistrationCount += 1; // Single registration at a time feels realistic
        updateLiveStat('registeredCount', liveRegistrationCount);
        saveStatsAnchor();
    }, Math.random() * (5000 - 2000) + 2000); // Random interval 2-5 seconds

    // Increment funds slowly - smaller amounts more frequently
    setInterval(() => {
        const increment = Math.floor(Math.random() * (200 - 50 + 1)) + 50; // KSh 50-200
        liveFundAmount += increment;
        updateLiveStat('fundedAmount', liveFundAmount, true);
        saveStatsAnchor();
    }, Math.random() * (8000 - 4000) + 4000); // Random interval 4-8 seconds

    // Occasional small spike every 30-60 seconds for a sense of momentum
    setInterval(() => {
        liveRegistrationCount += Math.floor(Math.random() * (8 - 3 + 1)) + 3; // 3-8 people at once
        updateLiveStat('registeredCount', liveRegistrationCount);

        // Also add funds during spike (proportional)
        liveFundAmount += Math.floor(Math.random() * (400 - 150 + 1)) + 150;
        updateLiveStat('fundedAmount', liveFundAmount, true);
        saveStatsAnchor();
    }, Math.random() * (60000 - 30000) + 30000); // Random spike 30-60 seconds
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

// Privacy: remove personally identifiable data from this device. Names, phones,
// emails and legal-case details should never linger in localStorage where a
// seized or shared device could expose participants. The submitted data lives
// in the backend (Google Sheets), so nothing is lost by clearing it locally.
function purgeLocalPII(storageKey) {
    localStorage.removeItem(storageKey);
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
    const form = e.target;

    // Anti-spam: honeypot + timing trap + per-device cooldown (no keys required)
    if (!passesAntiSpam(form, 'registration', 30000)) return;

    const formData = {
        id: generateReferenceNumber('REG'),
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        location: document.getElementById('location').value,
        assemblyPoint: document.getElementById('assemblyPoint').value,
        needTransport: document.getElementById('needTransport').checked,
        recaptchaToken: await getRecaptchaToken('register'),
        timestamp: new Date().toISOString()
    };

    // Send to Google Sheets (the backend is the source of truth).
    if (typeof GOOGLE_SHEETS_CONFIG !== 'undefined' && GOOGLE_SHEETS_CONFIG.registrationURL) {
        await sendToGoogleSheets(GOOGLE_SHEETS_CONFIG.registrationURL, formData);
    }

    // Privacy: purge any personal data from this device after submission.
    purgeLocalPII('june25_registrations');
    recordSubmit('registration');

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
    const form = e.target;

    // Anti-spam: honeypot + timing trap + per-device cooldown (no keys required)
    if (!passesAntiSpam(form, 'transport', 30000)) return;

    const formData = {
        id: generateReferenceNumber('TRN'),
        name: document.getElementById('transportName').value,
        phone: document.getElementById('transportPhone').value,
        departurePoint: document.getElementById('departurePoint').value,
        passengerCount: document.getElementById('passengerCount').value,
        route: document.getElementById('transportRoute').value,
        recaptchaToken: await getRecaptchaToken('transport'),
        timestamp: new Date().toISOString()
    };

    // Send to Google Sheets (the backend is the source of truth).
    if (typeof GOOGLE_SHEETS_CONFIG !== 'undefined' && GOOGLE_SHEETS_CONFIG.transportURL) {
        await sendToGoogleSheets(GOOGLE_SHEETS_CONFIG.transportURL, formData);
    }

    // Privacy: purge any personal data from this device after submission.
    purgeLocalPII('june25_transport');
    recordSubmit('transport');

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
    const form = e.target;

    // Anti-spam: honeypot + timing trap + per-device cooldown (no keys required)
    if (!passesAntiSpam(form, 'legal', 20000)) return;

    const formData = {
        id: generateReferenceNumber('LEG'),
        name: document.getElementById('legalName').value,
        phone: document.getElementById('legalPhone').value,
        email: document.getElementById('legalEmail').value,
        urgency: document.getElementById('urgency').value,
        issue: document.getElementById('legalIssue').value,
        location: document.getElementById('currentLocation').value,
        recaptchaToken: await getRecaptchaToken('legal'),
        timestamp: new Date().toISOString()
    };

    // Send to Google Sheets (the backend is the source of truth).
    if (typeof GOOGLE_SHEETS_CONFIG !== 'undefined' && GOOGLE_SHEETS_CONFIG.legalURL) {
        await sendToGoogleSheets(GOOGLE_SHEETS_CONFIG.legalURL, formData);
    }

    // Privacy: purge confidential case details from this device after submission.
    purgeLocalPII('june25_legal');
    recordSubmit('legal');

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

// ============================================
// POLICE ALERT SYSTEM WITH GPS & MAP
// ============================================

// Initialize Map
let policeMap;
let userMarker;
let alertMarkers = [];
let heatmapLayer;

function initializePoliceMap() {
    // Center on Kenya (Nairobi)
    const kenyaCenter = [-1.2921, 36.8219];

    // Initialize map
    policeMap = L.map('policeMap').setView(kenyaCenter, 12);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(policeMap);

    // Initialize heatmap layer
    heatmapLayer = L.heatLayer([], {
        radius: 25,
        blur: 35,
        maxZoom: 17,
        gradient: {
            0.0: '#4caf50',  // Green (safe)
            0.3: '#2196f3',  // Blue (info)
            0.6: '#ff9800',  // Orange (warning)
            1.0: '#f44336'   // Red (danger)
        }
    }).addTo(policeMap);

    // Load and display existing alerts on map
    loadAlertsOnMap();

    // Try to get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                // Add user location marker
                userMarker = L.marker([userLat, userLng], {
                    icon: L.divIcon({
                        html: '📍',
                        className: 'user-location-marker',
                        iconSize: [30, 30]
                    })
                }).addTo(policeMap);

                userMarker.bindPopup('Your Current Location').openPopup();

                // Center map on user's location
                policeMap.setView([userLat, userLng], 13);
            },
            (error) => {
                console.log('Geolocation not available:', error);
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    }
}

// GPS Location Detection
document.getElementById('detectLocationBtn').addEventListener('click', function() {
    const btn = this;
    const statusEl = document.getElementById('gpsStatus');

    if (!navigator.geolocation) {
        statusEl.textContent = '❌ GPS not supported on this device';
        statusEl.className = 'gps-status active error';
        return;
    }

    // Show loading state
    btn.classList.add('detecting');
    btn.textContent = '⏳ Detecting location...';
    statusEl.textContent = 'Getting your GPS coordinates...';
    statusEl.className = 'gps-status active loading';

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const accuracy = Math.round(position.coords.accuracy);

            // Store coordinates
            document.getElementById('latitude').value = lat;
            document.getElementById('longitude').value = lng;
            document.getElementById('gpsAccuracy').value = accuracy;

            // Update button state
            btn.classList.remove('detecting');
            btn.classList.add('detected');
            btn.textContent = '✅ Location Detected!';

            // Show success message
            statusEl.textContent = `✓ Location captured! (Accuracy: ±${accuracy}m)`;
            statusEl.className = 'gps-status active success';

            // Reverse geocode to get address (simplified - uses coordinates)
            reverseGeocode(lat, lng);

            // Add/update marker on map
            if (userMarker) {
                userMarker.setLatLng([lat, lng]);
            } else {
                userMarker = L.marker([lat, lng], {
                    icon: L.divIcon({
                        html: '📍',
                        className: 'user-location-marker',
                        iconSize: [30, 30]
                    })
                }).addTo(policeMap);
            }

            userMarker.bindPopup('Your Current Location').openPopup();
            policeMap.setView([lat, lng], 15);
        },
        (error) => {
            btn.classList.remove('detecting');
            let errorMessage = '';
            let helpText = '';

            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = '📍 GPS not available';
                    helpText = 'No worries! Simply select your county and enter the street name below. GPS is optional.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = '📍 GPS unavailable';
                    helpText = 'Please manually enter your county and location below. Your report will still be submitted successfully.';
                    break;
                case error.TIMEOUT:
                    errorMessage = '📍 GPS timeout';
                    helpText = 'No problem! Just fill in the county and street name below to continue.';
                    break;
                default:
                    errorMessage = '📍 GPS optional';
                    helpText = 'Select your county and enter the location below.';
            }

            statusEl.innerHTML = `<strong>${errorMessage}</strong><br><small>${helpText}</small>`;
            statusEl.className = 'gps-status active error';
            btn.textContent = '📍 Try GPS Again';

            // Log error for debugging
            console.error('Geolocation error:', error);
        },
        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }
    );
});

// Simple reverse geocoding (determines county from coordinates)
function reverseGeocode(lat, lng) {
    // Kenyan county approximate centers (simplified mapping)
    const kenyaCounties = {
        'nairobi': { lat: -1.2921, lng: 36.8219 },
        'mombasa': { lat: -4.0435, lng: 39.6682 },
        'kisumu': { lat: -0.0917, lng: 34.7680 },
        'nakuru': { lat: -0.3031, lng: 36.0800 },
        'eldoret': { lat: 0.5143, lng: 35.2698 },
        'meru': { lat: 0.0469, lng: 37.6556 },
        'nyeri': { lat: -0.4194, lng: 36.9472 },
        'thika': { lat: -1.0332, lng: 37.0693 },
        'machakos': { lat: -1.5177, lng: 37.2634 },
        'kakamega': { lat: 0.2827, lng: 34.7519 }
    };

    // Find closest county
    let closestCounty = 'nairobi';
    let minDistance = Infinity;

    for (const [county, coords] of Object.entries(kenyaCounties)) {
        const distance = Math.sqrt(
            Math.pow(lat - coords.lat, 2) + Math.pow(lng - coords.lng, 2)
        );
        if (distance < minDistance) {
            minDistance = distance;
            closestCounty = county;
        }
    }

    // Auto-select county
    document.getElementById('alertCounty').value = closestCounty;
}

// Load existing alerts on map
function loadAlertsOnMap() {
    const alerts = getPoliceAlerts();
    const heatmapData = [];

    alerts.forEach(alert => {
        if (alert.latitude && alert.longitude) {
            const marker = createMapMarker(alert);
            alertMarkers.push(marker);

            // Add to heatmap with severity weighting
            const intensity = getSeverityIntensity(alert.activityType);
            heatmapData.push([alert.latitude, alert.longitude, intensity]);
        }
    });

    // Update heatmap
    if (heatmapData.length > 0) {
        heatmapLayer.setLatLngs(heatmapData);
    }
}

// Create map marker for alert
function createMapMarker(alert) {
    const markerColor = getMarkerColor(alert.activityType);
    const icon = L.divIcon({
        html: markerColor,
        className: 'alert-map-marker',
        iconSize: [20, 20]
    });

    const marker = L.marker([alert.latitude, alert.longitude], { icon })
        .addTo(policeMap);

    // Popup content
    const popupContent = `
        <div class="map-popup">
            <strong>${formatActivityType(alert.activityType)}</strong><br>
            <em>${alert.county} - ${alert.specificLocation}</em><br>
            <small>${getTimeAgo(alert.timestamp)}</small>
        </div>
    `;

    marker.bindPopup(popupContent);
    return marker;
}

// Get marker color based on activity type
function getMarkerColor(activityType) {
    const dangerTypes = ['teargas', 'arrests', 'dispersal'];
    const warningTypes = ['large-deployment'];
    const safeTypes = ['peaceful'];

    if (dangerTypes.includes(activityType)) return '🔴';
    if (warningTypes.includes(activityType)) return '🟠';
    if (safeTypes.includes(activityType)) return '🟢';
    return '🔵';
}

// Get severity intensity for heatmap
function getSeverityIntensity(activityType) {
    const dangerTypes = ['teargas', 'arrests', 'dispersal'];
    const warningTypes = ['large-deployment'];
    const safeTypes = ['peaceful'];

    if (dangerTypes.includes(activityType)) return 1.0;
    if (warningTypes.includes(activityType)) return 0.7;
    if (safeTypes.includes(activityType)) return 0.3;
    return 0.5;
}

// Police Alert Form Submission
document.getElementById('policeReportForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;

    // Anti-spam: honeypot + timing trap + per-device cooldown (shorter cooldown
    // here since rapid, repeated safety reports are legitimate during a protest).
    if (!passesAntiSpam(form, 'policeAlert', 15000)) return;

    const formData = {
        id: 'POL' + Date.now(),
        timestamp: new Date().toISOString(),
        recaptchaToken: await getRecaptchaToken('police_alert'),
        county: document.getElementById('alertCounty').value,
        specificLocation: document.getElementById('specificLocation').value,
        activityType: document.getElementById('activityType').value,
        officerCount: document.getElementById('officerCount').value,
        vehicleCount: document.getElementById('vehicleCount').value,
        description: document.getElementById('alertDescription').value,
        reporterContact: document.getElementById('reporterContact').value,
        latitude: document.getElementById('latitude').value || '',
        longitude: document.getElementById('longitude').value || '',
        gpsAccuracy: document.getElementById('gpsAccuracy').value || ''
    };

    // Save to localStorage (PII stripped inside savePoliceAlert)
    savePoliceAlert(formData);
    recordSubmit('policeAlert');

    // Send to Google Sheets
    console.log('📤 Sending police alert to Google Sheets...');
    console.log('Data to send:', formData);

    if (typeof GOOGLE_SHEETS_CONFIG !== 'undefined' && GOOGLE_SHEETS_CONFIG.policeAlertURL) {
        console.log('Google Sheets URL:', GOOGLE_SHEETS_CONFIG.policeAlertURL);
        try {
            await sendToGoogleSheets(GOOGLE_SHEETS_CONFIG.policeAlertURL, formData);
            console.log('✅ Data sent successfully to Google Sheets');
        } catch (error) {
            console.error('❌ Error sending to Google Sheets:', error);
        }
    } else {
        console.error('❌ Google Sheets config not found or URL missing');
    }

    // Show success message
    document.getElementById('policeReportForm').style.display = 'none';
    document.getElementById('alertSuccess').style.display = 'block';
    document.getElementById('alertRefNumber').textContent = formData.id;

    // Add to live feed immediately
    addAlertToFeed(formData);

    // Add to map if has coordinates
    if (formData.latitude && formData.longitude) {
        const marker = createMapMarker(formData);
        alertMarkers.push(marker);

        // Update heatmap
        const alerts = getPoliceAlerts();
        const heatmapData = alerts
            .filter(a => a.latitude && a.longitude)
            .map(a => [a.latitude, a.longitude, getSeverityIntensity(a.activityType)]);
        heatmapLayer.setLatLngs(heatmapData);

        // Pan map to new alert
        policeMap.setView([formData.latitude, formData.longitude], 15);
    }

    // Reset form and show it again after 3 seconds
    setTimeout(() => {
        document.getElementById('policeReportForm').reset();
        document.getElementById('policeReportForm').style.display = 'block';
        document.getElementById('alertSuccess').style.display = 'none';
    }, 3000);
});

// Save police alert to localStorage
function savePoliceAlert(alertData) {
    let alerts = JSON.parse(localStorage.getItem('policeAlerts') || '[]');
    // Privacy: strip the reporter's phone number before storing locally. We keep
    // the alert content and coordinates (needed for the map/feed) but never let
    // a reporter's personal contact linger on the device.
    const { reporterContact, ...safeAlert } = alertData;
    alerts.push(safeAlert);
    // Keep only last 50 alerts
    if (alerts.length > 50) {
        alerts = alerts.slice(-50);
    }
    localStorage.setItem('policeAlerts', JSON.stringify(alerts));
}

// Get all police alerts
function getPoliceAlerts() {
    return JSON.parse(localStorage.getItem('policeAlerts') || '[]');
}

// Add alert to live feed
function addAlertToFeed(alertData) {
    const feedContainer = document.getElementById('alertFeedContainer');
    const alertItem = createAlertElement(alertData);

    // Add to beginning of feed
    feedContainer.insertBefore(alertItem, feedContainer.firstChild);

    // Remove oldest if more than 20
    const alerts = feedContainer.querySelectorAll('.alert-item');
    if (alerts.length > 20) {
        alerts[alerts.length - 1].remove();
    }
}

// Escape user-supplied text before inserting into HTML (prevents injection)
function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ---- Alert confirmations (per-device) --------------------------------------
// A "Confirm sighting" lets people corroborate a report. Counts are stored
// locally and de-duplicated per device (one confirmation per alert per device).
function getConfirmCounts() {
    try { return JSON.parse(localStorage.getItem('june25_alert_confirms') || '{}'); }
    catch (e) { return {}; }
}
function getMyConfirms() {
    try { return JSON.parse(localStorage.getItem('june25_alert_confirmed') || '[]'); }
    catch (e) { return []; }
}
function formatConfirmCount(c) {
    if (!c) return 'No confirmations yet';
    return c === 1 ? '✓ 1 person confirmed' : `✓ ${c} people confirmed`;
}
function confirmAlert(id, btn) {
    const mine = getMyConfirms();
    if (mine.includes(id)) return; // one confirmation per device
    const counts = getConfirmCounts();
    counts[id] = (counts[id] || 0) + 1;
    localStorage.setItem('june25_alert_confirms', JSON.stringify(counts));
    mine.push(id);
    localStorage.setItem('june25_alert_confirmed', JSON.stringify(mine));
    updateConfirmDisplay(id);
}
function updateConfirmDisplay(id) {
    const counts = getConfirmCounts();
    const confirmed = getMyConfirms().includes(id);
    document.querySelectorAll('.alert-confirm-count[data-alert-id="' + id + '"]').forEach(el => {
        el.textContent = formatConfirmCount(counts[id] || 0);
    });
    document.querySelectorAll('.alert-confirm-btn[data-alert-id="' + id + '"]').forEach(b => {
        if (confirmed) {
            b.disabled = true;
            b.textContent = '✓ Confirmed';
            b.classList.add('confirmed');
        }
    });
}
// Sync confirmation counts onto any alerts already in the DOM (e.g. demo alerts)
function initConfirmDisplays() {
    document.querySelectorAll('[data-alert-id]').forEach(el => {
        const id = el.getAttribute('data-alert-id');
        if (id) updateConfirmDisplay(id);
    });
}

// Create alert HTML element
function createAlertElement(alertData) {
    const div = document.createElement('div');
    const alertClass = getAlertClass(alertData.activityType);
    const timeAgo = getTimeAgo(alertData.timestamp);
    const id = alertData.id || ('POL' + (alertData.timestamp || Date.now()));
    const counts = getConfirmCounts();
    const confirmed = getMyConfirms().includes(id);
    const count = counts[id] || 0;

    div.className = `alert-item ${alertClass}`;
    div.setAttribute('data-alert-id', id);
    div.innerHTML = `
        <div class="alert-header">
            <span class="alert-type">${escapeHtml(formatActivityType(alertData.activityType))}</span>
            <span class="alert-time" data-timestamp="${escapeHtml(alertData.timestamp || '')}">🕒 ${timeAgo}</span>
        </div>
        <div class="alert-location">📍 ${escapeHtml(alertData.county)} - ${escapeHtml(alertData.specificLocation)}</div>
        <div class="alert-details">
            ${escapeHtml(alertData.description || formatAlertDetails(alertData))}
        </div>
        <div class="alert-confirm-row">
            <button type="button" class="alert-confirm-btn ${confirmed ? 'confirmed' : ''}" data-alert-id="${id}" onclick="confirmAlert('${id}', this)" ${confirmed ? 'disabled' : ''}>
                ${confirmed ? '✓ Confirmed' : '✓ Confirm sighting'}
            </button>
            <span class="alert-confirm-count" data-alert-id="${id}">${formatConfirmCount(count)}</span>
        </div>
    `;

    return div;
}

// Determine alert severity class
function getAlertClass(activityType) {
    const dangerTypes = ['teargas', 'arrests', 'dispersal'];
    const warningTypes = ['large-deployment'];
    const safeTypes = ['peaceful'];

    if (dangerTypes.includes(activityType)) return 'alert-danger';
    if (warningTypes.includes(activityType)) return 'alert-warning';
    if (safeTypes.includes(activityType)) return 'alert-safe';
    return 'alert-info';
}

// Format activity type for display
function formatActivityType(type) {
    const types = {
        'patrol': 'Regular Patrol',
        'roadblock': 'Roadblock',
        'large-deployment': 'Large Deployment',
        'dispersal': 'Crowd Dispersal',
        'teargas': 'Tear Gas',
        'arrests': 'Making Arrests',
        'peaceful': 'Peaceful Monitoring',
        'other': 'Other Activity'
    };
    return types[type] || type;
}

// Format alert details
function formatAlertDetails(alertData) {
    let details = '';
    if (alertData.officerCount) {
        details += `Approximately ${alertData.officerCount} officers`;
    }
    if (alertData.vehicleCount && alertData.vehicleCount !== '0') {
        details += details ? ` with ${alertData.vehicleCount} vehicles` : `${alertData.vehicleCount} vehicles`;
    }
    return details || 'Police activity reported in the area';
}

// Get time ago string
function getTimeAgo(timestamp) {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
}

// Load and display recent alerts on page load
function loadRecentAlerts() {
    const alerts = getPoliceAlerts();
    const feedContainer = document.getElementById('alertFeedContainer');

    // Clear demo alerts
    feedContainer.innerHTML = '';

    // If no alerts, show demo alerts
    if (alerts.length === 0) {
        // Keep the demo alerts that are already in HTML
        return;
    }

    // Show real alerts (most recent first)
    alerts.slice(-20).reverse().forEach(alert => {
        const alertElement = createAlertElement(alert);
        feedContainer.appendChild(alertElement);
    });
}

// County filter functionality
document.getElementById('filterCounty').addEventListener('change', function() {
    const selectedCounty = this.value;
    const alertItems = document.querySelectorAll('.alert-item');

    alertItems.forEach(item => {
        const locationText = item.querySelector('.alert-location').textContent.toLowerCase();

        if (selectedCounty === 'all' || locationText.includes(selectedCounty.toLowerCase())) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// Update "time ago" labels every minute using each alert's own timestamp
setInterval(() => {
    document.querySelectorAll('.alert-time[data-timestamp]').forEach(el => {
        const ts = el.getAttribute('data-timestamp');
        if (ts) el.textContent = '🕒 ' + getTimeAgo(ts);
    });
}, 60000);

// Load alerts when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Slight delay to ensure HTML is fully rendered
    setTimeout(loadRecentAlerts, 100);

    // Initialize map
    setTimeout(initializePoliceMap, 200);

    // Apply any saved confirmation counts to alerts already in the DOM
    setTimeout(initConfirmDisplays, 150);
});

// ============================================
// MEMORIAL GALLERY - HORIZONTAL SCROLL & LIGHTBOX
// ============================================

const galleryImages = [
    'gallery/signal-2026-06-22-11-31-06-749.png',
    'gallery/signal-2026-06-22-11-31-06-749_002.png',
    'gallery/signal-2026-06-22-11-31-06-749_003.png',
    'gallery/signal-2026-06-22-11-31-06-749_004.png',
    'gallery/signal-2026-06-22-11-31-06-749_005.png',
    'gallery/signal-2026-06-22-11-31-06-749_006.png',
    'gallery/signal-2026-06-22-11-31-06-749_007.png'
];

let currentImageIndex = 0;
let galleryAutoScrollInterval = null;
let isGalleryHovered = false;
let userHasScrolled = false;

// Smooth horizontal scroll for gallery
function scrollGallery(direction) {
    const gallery = document.getElementById('memorialGallery');
    const scrollAmount = 450; // Scroll by approximately one card width

    if (direction === -1) {
        gallery.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        gallery.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    // Reset auto-scroll when user manually scrolls
    userHasScrolled = true;
    resetGalleryAutoScroll();
}

// Auto-scroll gallery function
function autoScrollGallery() {
    const gallery = document.getElementById('memorialGallery');

    if (!gallery || isGalleryHovered || userHasScrolled) {
        return;
    }

    const maxScroll = gallery.scrollWidth - gallery.clientWidth;
    const currentScroll = gallery.scrollLeft;

    // If we've reached the end, loop back to the beginning
    if (currentScroll >= maxScroll - 10) {
        gallery.scrollTo({
            left: 0,
            behavior: 'smooth'
        });
    } else {
        // Scroll slowly to the right (one card at a time)
        gallery.scrollBy({
            left: 420, // Scroll by one card width + gap
            behavior: 'smooth'
        });
    }
}

// Initialize auto-scroll for gallery
function initGalleryAutoScroll() {
    const gallery = document.getElementById('memorialGallery');

    if (!gallery) return;

    // Start auto-scrolling every 4 seconds
    galleryAutoScrollInterval = setInterval(autoScrollGallery, 4000);

    // Pause auto-scroll on hover
    gallery.addEventListener('mouseenter', () => {
        isGalleryHovered = true;
    });

    gallery.addEventListener('mouseleave', () => {
        isGalleryHovered = false;
    });

    // Detect manual scroll by user
    gallery.addEventListener('scroll', () => {
        // This gets called during auto-scroll too, but we only care about manual scrolls
        // We'll reset the interval to give smooth experience
    }, { passive: true });

    // Pause on touch (mobile)
    gallery.addEventListener('touchstart', () => {
        userHasScrolled = true;
        clearInterval(galleryAutoScrollInterval);
    }, { passive: true });
}

// Reset auto-scroll timer
function resetGalleryAutoScroll() {
    if (galleryAutoScrollInterval) {
        clearInterval(galleryAutoScrollInterval);
    }
    // Resume auto-scroll after 10 seconds of inactivity
    setTimeout(() => {
        userHasScrolled = false;
        if (!galleryAutoScrollInterval) {
            galleryAutoScrollInterval = setInterval(autoScrollGallery, 4000);
        }
    }, 10000);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery auto-scroll with a slight delay
    setTimeout(initGalleryAutoScroll, 2000);
});

// Open lightbox with specific image
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');

    lightboxImage.src = galleryImages[currentImageIndex];
    lightbox.classList.add('active');

    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');

    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Change image in lightbox
function changeLightboxImage(direction) {
    currentImageIndex += direction;

    // Wrap around if at the end or beginning
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }

    const lightboxImage = document.getElementById('lightbox-image');
    lightboxImage.src = galleryImages[currentImageIndex];
}

// Close lightbox when clicking outside the image
document.getElementById('lightbox')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeLightboxImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeLightboxImage(1);
        }
    }
});
