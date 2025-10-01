// Kerala Health Records - Landing Page JavaScript
// Clean, modern implementation

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Landing page initialized');
    
    // Initialize all components
    initializeButtons();
    initializeFAQ();
    initializeSDGPopup();
    initializeSearchTabs();
    initializeScrollFeatures();
    initializeNavigation();
    
    console.log('✅ All components initialized successfully');
});

// ========================================
// BUTTON FUNCTIONALITY
// ========================================
function initializeButtons() {
    console.log('🔘 Initializing buttons...');
    
    // Get all step card buttons
    const registerBtn = document.querySelector('.step-card:nth-child(1) .btn-primary');
    const downloadBtn = document.querySelector('.step-card:nth-child(2) .btn-primary');
    const alertsBtn = document.querySelector('.step-card:nth-child(3) .btn-primary');
    
    // Register Now button
    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('📝 Register button clicked');
            window.location.href = '../login/login.html';
        });
        console.log('✅ Register button configured');
    }
    
    // Download App button
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('📱 Download button clicked');
            showAppDownloadModal();
        });
        console.log('✅ Download button configured');
    }
    
    // Health Alerts button
    if (alertsBtn) {
        alertsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🚨 Alerts button clicked');
            showHealthAlertsModal();
        });
        console.log('✅ Alerts button configured');
    }
}

// App Download Modal
function showAppDownloadModal() {
    const modal = createModal('Download Mobile Health App', `
        <div class="app-download-info">
            <div class="app-icon">
                <i class="fas fa-mobile-alt"></i>
            </div>
            <h4>SEHAT Mobile App</h4>
            <p>Access your health records, emergency alerts, and health services on-the-go</p>
            <div class="download-buttons">
                <a href="#" class="download-btn android">
                    <i class="fab fa-google-play"></i>
                    <span>Download for Android</span>
                </a>
                <a href="#" class="download-btn ios">
                    <i class="fab fa-apple"></i>
                    <span>Download for iOS</span>
                </a>
            </div>
            <p class="coming-soon">Coming Soon - Available in all app stores</p>
        </div>
    `);
    
    document.body.appendChild(modal);
}

// ========================================
// FAQ FUNCTIONALITY
// ========================================
function initializeFAQ() {
    console.log('❓ Initializing FAQ...');
    
    const faqItems = document.querySelectorAll('.faq-item');
    const faqTabs = document.querySelectorAll('.faq-tab');
    
    console.log(`Found ${faqItems.length} FAQ items and ${faqTabs.length} FAQ tabs`);
    
    // Show only General questions initially
    faqItems.forEach(item => {
        const category = item.getAttribute('data-category');
        item.style.display = category === 'general' ? 'block' : 'none';
    });
    
    // FAQ question click handlers
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('❓ FAQ question clicked');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
    
    // FAQ tab click handlers
    faqTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabText = this.textContent.trim();
            console.log(`📑 FAQ tab clicked: ${tabText}`);
            
            // Update active tab
            faqTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items by category
            const categoryMap = {
                'General': 'general',
                'Registration': 'registration',
                'Health Services': 'health-services',
                'Emergency': 'emergency'
            };
            
            const category = categoryMap[tabText] || 'general';
            
            faqItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (itemCategory === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                    item.classList.remove('active');
                }
            });
        });
    });
    
    console.log('✅ FAQ functionality initialized');
}

// ========================================
// SDG POPUP FUNCTIONALITY
// ========================================
function initializeSDGPopup() {
    console.log('🌍 Initializing SDG popup...');
    
    const sdgBtn = document.getElementById('sdgImpactBtn');
    const sdgPopup = document.getElementById('sdgPopup');
    const closeBtn = document.getElementById('closeSdgPopup');
    
    if (!sdgBtn || !sdgPopup) {
        console.log('❌ SDG popup elements not found');
        return;
    }
    
    console.log('✅ SDG popup elements found');
    
    // Open popup
    sdgBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('🌍 SDG button clicked');
        sdgPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close popup
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('❌ SDG popup close button clicked');
            closeSDGPopup();
        });
    }
    
    // Close popup when clicking outside
    sdgPopup.addEventListener('click', function(e) {
        if (e.target === sdgPopup) {
            console.log('🖱️ SDG popup background clicked');
            closeSDGPopup();
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sdgPopup.classList.contains('active')) {
            console.log('⌨️ Escape key pressed, closing SDG popup');
            closeSDGPopup();
        }
    });
    
    function closeSDGPopup() {
        sdgPopup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    console.log('✅ SDG popup functionality initialized');
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================
function initializeSearchTabs() {
    console.log('🔍 Initializing search tabs...');
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const pinCodeInput = document.getElementById('pinCode');
    const searchByPinBtn = document.getElementById('searchByPin');
    const searchByDistrictBtn = document.getElementById('searchByDistrict');
    
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            console.log(`🔍 Switching to tab: ${targetTab}`);
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // PIN code input validation
    if (pinCodeInput) {
        pinCodeInput.addEventListener('input', function() {
            // Only allow numbers
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Limit to 6 digits
            if (this.value.length > 6) {
                this.value = this.value.slice(0, 6);
            }
        });
        
        pinCodeInput.addEventListener('keypress', function(e) {
            // Only allow numbers
            if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Enter'].includes(e.key)) {
                e.preventDefault();
            }
        });
    }
    
    // PIN code search
    if (searchByPinBtn) {
        searchByPinBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const pinCode = pinCodeInput.value.trim();
            
            if (pinCode.length === 6) {
                console.log(`🔍 Searching by PIN code: ${pinCode}`);
                searchHealthCentersByPin(pinCode);
            } else {
                alert('Please enter a valid 6-digit PIN code');
                pinCodeInput.focus();
            }
        });
    }
    
    // District search
    if (searchByDistrictBtn) {
        searchByDistrictBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🔍 Searching by district');
            searchHealthCentersByDistrict();
        });
    }
    
    console.log('✅ Search functionality initialized');
}

// Search health centers by PIN code
function searchHealthCentersByPin(pinCode) {
    console.log(`🔍 Searching health centers for PIN code: ${pinCode}`);
    
    // Sample data for demonstration
    const healthCentersData = {
        695001: [
            { name: 'Thiruvananthapuram Medical College', type: 'District Hospital', distance: '2.5 km' },
            { name: 'Primary Health Center, Thycaud', type: 'Primary Health Center', distance: '1.2 km' },
            { name: 'Community Health Center, Pettah', type: 'Community Health Center', distance: '3.1 km' }
        ],
        682001: [
            { name: 'Ernakulam General Hospital', type: 'District Hospital', distance: '1.8 km' },
            { name: 'Primary Health Center, Fort Kochi', type: 'Primary Health Center', distance: '2.3 km' },
            { name: 'Specialty Clinic, MG Road', type: 'Specialty Clinic', distance: '0.9 km' }
        ],
        673001: [
            { name: 'Kozhikode Medical College', type: 'District Hospital', distance: '3.2 km' },
            { name: 'Primary Health Center, Beach Road', type: 'Primary Health Center', distance: '1.5 km' },
            { name: 'Community Health Center, Mavoor', type: 'Community Health Center', distance: '4.1 km' }
        ],
        680001: [
            { name: 'Thrissur Medical College', type: 'District Hospital', distance: '2.8 km' },
            { name: 'Primary Health Center, Round', type: 'Primary Health Center', distance: '1.1 km' },
            { name: 'Specialty Clinic, Sakthan Thampuran', type: 'Specialty Clinic', distance: '2.0 km' }
        ]
    };
    
    const centers = healthCentersData[pinCode] || [
        { name: 'No health centers found for this PIN code', type: 'N/A', distance: 'N/A' }
    ];
    
    displaySearchResults(centers, `Health Centers near PIN Code ${pinCode}`);
}

// Search health centers by district
function searchHealthCentersByDistrict() {
    console.log('🔍 Searching health centers by district');
    
    const sampleCenters = [
        { name: 'District General Hospital', type: 'District Hospital', distance: '1.5 km' },
        { name: 'Primary Health Center', type: 'Primary Health Center', distance: '2.0 km' },
        { name: 'Community Health Center', type: 'Community Health Center', distance: '3.2 km' }
    ];
    
    displaySearchResults(sampleCenters, 'Health Centers in Selected District');
}

// Display search results
function displaySearchResults(centers, title) {
    let resultsContainer = document.querySelector('.search-results');
    
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';
        resultsContainer.style.cssText = `
            margin-top: 30px;
            padding: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
        `;
        
        const searchContent = document.querySelector('.search-content');
        if (searchContent) {
            searchContent.appendChild(resultsContainer);
        }
    }
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    // Add title
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    titleElement.style.cssText = `
        color: #017e7e;
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: 600;
    `;
    resultsContainer.appendChild(titleElement);
    
    // Add centers
    centers.forEach(center => {
        const centerElement = document.createElement('div');
        centerElement.className = 'health-center-card';
        centerElement.style.cssText = `
            padding: 15px;
            margin-bottom: 15px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            background: #f8fafc;
            transition: all 0.3s ease;
        `;
        
        centerElement.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                <h4 style="color: #1e293b; margin: 0; font-size: 16px; font-weight: 600;">${center.name}</h4>
                <span style="background: #017e7e; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500;">${center.type}</span>
            </div>
            <p style="color: #64748b; margin: 0; font-size: 14px;">Distance: ${center.distance}</p>
        `;
        
        centerElement.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(1, 126, 126, 0.15)';
        });
        
        centerElement.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        resultsContainer.appendChild(centerElement);
    });
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ========================================
// SCROLL FUNCTIONALITY
// ========================================
function initializeScrollFeatures() {
    console.log('📜 Initializing scroll features...');
    
    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const scrollProgress = document.getElementById('scrollProgress');
    
    // Scroll event listener
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Update scroll progress
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }
        
        // Show/hide scroll to top button
        if (scrollToTopBtn) {
            if (scrollTop > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        }
    });
    
    // Scroll to top functionality
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('⬆️ Scroll to top clicked');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    console.log('✅ Scroll features initialized');
}

// ========================================
// NAVIGATION FUNCTIONALITY
// ========================================
function initializeNavigation() {
    console.log('🧭 Initializing navigation...');
    
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                console.log(`🧭 Navigating to section: ${targetId}`);
                
                // Calculate offset for sticky header
                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                const topHeaderHeight = document.querySelector('.top-header')?.offsetHeight || 0;
                const totalOffset = headerHeight + topHeaderHeight + 20;
                
                const targetPosition = targetSection.offsetTop - totalOffset;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Visual feedback
                this.style.color = '#017e7e';
                setTimeout(() => {
                    this.style.color = '';
                }, 1000);
            }
        });
    });
    
    console.log('✅ Navigation initialized');
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    return modal;
}

// ========================================
// TESTING FUNCTIONS
// ========================================
function testAllFunctionality() {
    console.log('🧪 === TESTING ALL FUNCTIONALITY ===');
    
    // Test buttons
    const buttons = document.querySelectorAll('.step-card .btn-primary');
    console.log(`✅ Found ${buttons.length} step card buttons`);
    
    // Test FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    const faqTabs = document.querySelectorAll('.faq-tab');
    console.log(`✅ Found ${faqItems.length} FAQ items and ${faqTabs.length} FAQ tabs`);
    
    // Test SDG popup
    const sdgBtn = document.getElementById('sdgImpactBtn');
    const sdgPopup = document.getElementById('sdgPopup');
    console.log(`✅ SDG button exists: ${!!sdgBtn}, SDG popup exists: ${!!sdgPopup}`);
    
    // Test search
    const searchTabs = document.querySelectorAll('.tab-btn');
    const pinCodeInput = document.getElementById('pinCode');
    console.log(`✅ Found ${searchTabs.length} search tabs, PIN input exists: ${!!pinCodeInput}`);
    
    // Test scroll
    const scrollToTop = document.getElementById('scrollToTop');
    const scrollProgress = document.getElementById('scrollProgress');
    console.log(`✅ Scroll to top exists: ${!!scrollToTop}, Scroll progress exists: ${!!scrollProgress}`);
    
    console.log('🎉 === ALL FUNCTIONALITY TESTS COMPLETED ===');
}

// Export functions for global access
window.testAllFunctionality = testAllFunctionality;
window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Health Alerts Modal
function showHealthAlertsModal() {
    const modal = createModal('Health Alerts & Notifications', `
        <div class="alerts-info">
            <div class="alert-icon">
                <i class="fas fa-bell"></i>
            </div>
            <h4>Stay Informed</h4>
            <p>Get real-time health alerts and important notifications</p>
            <div class="alert-features">
                <div class="feature-item">
                    <i class="fas fa-virus"></i>
                    <span>Disease outbreak alerts</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-calendar-check"></i>
                    <span>Vaccination reminders</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-ambulance"></i>
                    <span>Emergency health notifications</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-shield-alt"></i>
                    <span>Preventive health tips</span>
                </div>
            </div>
            <div class="alert-actions">
                <button class="btn btn-primary">Subscribe to Alerts</button>
                <button class="btn btn-secondary">View Current Alerts</button>
            </div>
        </div>
    `);
    
    document.body.appendChild(modal);
}

// ========================================
// FAQ FUNCTIONALITY
// ========================================
function initializeFAQ() {
    console.log('❓ Initializing FAQ...');
    
    const faqItems = document.querySelectorAll('.faq-item');
    const faqTabs = document.querySelectorAll('.faq-tab');
    
    console.log(`Found ${faqItems.length} FAQ items and ${faqTabs.length} FAQ tabs`);
    
    // Show only General questions initially
    faqItems.forEach(item => {
        const category = item.getAttribute('data-category');
        item.style.display = category === 'general' ? 'block' : 'none';
    });
    
    // FAQ question click handlers
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('❓ FAQ question clicked');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
    
    // FAQ tab click handlers
    faqTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabText = this.textContent.trim();
            console.log(`📑 FAQ tab clicked: ${tabText}`);
            
            // Update active tab
            faqTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items by category
            const categoryMap = {
                'General': 'general',
                'Registration': 'registration',
                'Health Services': 'health-services',
                'Emergency': 'emergency'
            };
            
            const category = categoryMap[tabText] || 'general';
            
            faqItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (itemCategory === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                    item.classList.remove('active');
                }
            });
        });
    });
    
    console.log('✅ FAQ functionality initialized');
}

// ========================================
// SDG POPUP FUNCTIONALITY
// ========================================
function initializeSDGPopup() {
    console.log('🌍 Initializing SDG popup...');
    
    const sdgBtn = document.getElementById('sdgImpactBtn');
    const sdgPopup = document.getElementById('sdgPopup');
    const closeBtn = document.getElementById('closeSdgPopup');
    
    if (!sdgBtn || !sdgPopup) {
        console.log('❌ SDG popup elements not found');
        return;
    }
    
    console.log('✅ SDG popup elements found');
    
    // Open popup
    sdgBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('🌍 SDG button clicked');
        sdgPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close popup
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('❌ SDG popup close button clicked');
            closeSDGPopup();
        });
    }
    
    // Close popup when clicking outside
    sdgPopup.addEventListener('click', function(e) {
        if (e.target === sdgPopup) {
            console.log('🖱️ SDG popup background clicked');
            closeSDGPopup();
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sdgPopup.classList.contains('active')) {
            console.log('⌨️ Escape key pressed, closing SDG popup');
            closeSDGPopup();
        }
    });
    
    function closeSDGPopup() {
        sdgPopup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    console.log('✅ SDG popup functionality initialized');
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================
function initializeSearchTabs() {
    console.log('🔍 Initializing search tabs...');
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const pinCodeInput = document.getElementById('pinCode');
    const searchByPinBtn = document.getElementById('searchByPin');
    const searchByDistrictBtn = document.getElementById('searchByDistrict');
    
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            console.log(`🔍 Switching to tab: ${targetTab}`);
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // PIN code input validation
    if (pinCodeInput) {
        pinCodeInput.addEventListener('input', function() {
            // Only allow numbers
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Limit to 6 digits
            if (this.value.length > 6) {
                this.value = this.value.slice(0, 6);
            }
        });
        
        pinCodeInput.addEventListener('keypress', function(e) {
            // Only allow numbers
            if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Enter'].includes(e.key)) {
                e.preventDefault();
            }
        });
    }
    
    // PIN code search
    if (searchByPinBtn) {
        searchByPinBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const pinCode = pinCodeInput.value.trim();
            
            if (pinCode.length === 6) {
                console.log(`🔍 Searching by PIN code: ${pinCode}`);
                searchHealthCentersByPin(pinCode);
            } else {
                alert('Please enter a valid 6-digit PIN code');
                pinCodeInput.focus();
            }
        });
    }
    
    // District search
    if (searchByDistrictBtn) {
        searchByDistrictBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🔍 Searching by district');
            searchHealthCentersByDistrict();
        });
    }
    
    console.log('✅ Search functionality initialized');
}

// Search health centers by PIN code
function searchHealthCentersByPin(pinCode) {
    console.log(`🔍 Searching health centers for PIN code: ${pinCode}`);
    
    // Sample data for demonstration
    const healthCentersData = {
        695001: [
            { name: 'Thiruvananthapuram Medical College', type: 'District Hospital', distance: '2.5 km' },
            { name: 'Primary Health Center, Thycaud', type: 'Primary Health Center', distance: '1.2 km' },
            { name: 'Community Health Center, Pettah', type: 'Community Health Center', distance: '3.1 km' }
        ],
        682001: [
            { name: 'Ernakulam General Hospital', type: 'District Hospital', distance: '1.8 km' },
            { name: 'Primary Health Center, Fort Kochi', type: 'Primary Health Center', distance: '2.3 km' },
            { name: 'Specialty Clinic, MG Road', type: 'Specialty Clinic', distance: '0.9 km' }
        ],
        673001: [
            { name: 'Kozhikode Medical College', type: 'District Hospital', distance: '3.2 km' },
            { name: 'Primary Health Center, Beach Road', type: 'Primary Health Center', distance: '1.5 km' },
            { name: 'Community Health Center, Mavoor', type: 'Community Health Center', distance: '4.1 km' }
        ],
        680001: [
            { name: 'Thrissur Medical College', type: 'District Hospital', distance: '2.8 km' },
            { name: 'Primary Health Center, Round', type: 'Primary Health Center', distance: '1.1 km' },
            { name: 'Specialty Clinic, Sakthan Thampuran', type: 'Specialty Clinic', distance: '2.0 km' }
        ]
    };
    
    const centers = healthCentersData[pinCode] || [
        { name: 'No health centers found for this PIN code', type: 'N/A', distance: 'N/A' }
    ];
    
    displaySearchResults(centers, `Health Centers near PIN Code ${pinCode}`);
}

// Search health centers by district
function searchHealthCentersByDistrict() {
    console.log('🔍 Searching health centers by district');
    
    const sampleCenters = [
        { name: 'District General Hospital', type: 'District Hospital', distance: '1.5 km' },
        { name: 'Primary Health Center', type: 'Primary Health Center', distance: '2.0 km' },
        { name: 'Community Health Center', type: 'Community Health Center', distance: '3.2 km' }
    ];
    
    displaySearchResults(sampleCenters, 'Health Centers in Selected District');
}

// Display search results
function displaySearchResults(centers, title) {
    let resultsContainer = document.querySelector('.search-results');
    
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';
        resultsContainer.style.cssText = `
            margin-top: 30px;
            padding: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
        `;
        
        const searchContent = document.querySelector('.search-content');
        if (searchContent) {
            searchContent.appendChild(resultsContainer);
        }
    }
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    // Add title
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    titleElement.style.cssText = `
        color: #017e7e;
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: 600;
    `;
    resultsContainer.appendChild(titleElement);
    
    // Add centers
    centers.forEach(center => {
        const centerElement = document.createElement('div');
        centerElement.className = 'health-center-card';
        centerElement.style.cssText = `
            padding: 15px;
            margin-bottom: 15px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            background: #f8fafc;
            transition: all 0.3s ease;
        `;
        
        centerElement.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                <h4 style="color: #1e293b; margin: 0; font-size: 16px; font-weight: 600;">${center.name}</h4>
                <span style="background: #017e7e; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500;">${center.type}</span>
            </div>
            <p style="color: #64748b; margin: 0; font-size: 14px;">Distance: ${center.distance}</p>
        `;
        
        centerElement.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(1, 126, 126, 0.15)';
        });
        
        centerElement.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        resultsContainer.appendChild(centerElement);
    });
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ========================================
// SCROLL FUNCTIONALITY
// ========================================
function initializeScrollFeatures() {
    console.log('📜 Initializing scroll features...');
    
    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const scrollProgress = document.getElementById('scrollProgress');
    
    // Scroll event listener
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Update scroll progress
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }
        
        // Show/hide scroll to top button
        if (scrollToTopBtn) {
            if (scrollTop > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        }
    });
    
    // Scroll to top functionality
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('⬆️ Scroll to top clicked');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    console.log('✅ Scroll features initialized');
}

// ========================================
// NAVIGATION FUNCTIONALITY
// ========================================
function initializeNavigation() {
    console.log('🧭 Initializing navigation...');
    
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                console.log(`🧭 Navigating to section: ${targetId}`);
                
                // Calculate offset for sticky header
                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                const topHeaderHeight = document.querySelector('.top-header')?.offsetHeight || 0;
                const totalOffset = headerHeight + topHeaderHeight + 20;
                
                const targetPosition = targetSection.offsetTop - totalOffset;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Visual feedback
                this.style.color = '#017e7e';
                setTimeout(() => {
                    this.style.color = '';
                }, 1000);
            }
        });
    });
    
    console.log('✅ Navigation initialized');
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    return modal;
}

// ========================================
// TESTING FUNCTIONS
// ========================================
function testAllFunctionality() {
    console.log('🧪 === TESTING ALL FUNCTIONALITY ===');
    
    // Test buttons
    const buttons = document.querySelectorAll('.step-card .btn-primary');
    console.log(`✅ Found ${buttons.length} step card buttons`);
    
    // Test FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    const faqTabs = document.querySelectorAll('.faq-tab');
    console.log(`✅ Found ${faqItems.length} FAQ items and ${faqTabs.length} FAQ tabs`);
    
    // Test SDG popup
    const sdgBtn = document.getElementById('sdgImpactBtn');
    const sdgPopup = document.getElementById('sdgPopup');
    console.log(`✅ SDG button exists: ${!!sdgBtn}, SDG popup exists: ${!!sdgPopup}`);
    
    // Test search
    const searchTabs = document.querySelectorAll('.tab-btn');
    const pinCodeInput = document.getElementById('pinCode');
    console.log(`✅ Found ${searchTabs.length} search tabs, PIN input exists: ${!!pinCodeInput}`);
    
    // Test scroll
    const scrollToTop = document.getElementById('scrollToTop');
    const scrollProgress = document.getElementById('scrollProgress');
    console.log(`✅ Scroll to top exists: ${!!scrollToTop}, Scroll progress exists: ${!!scrollProgress}`);
    
    console.log('🎉 === ALL FUNCTIONALITY TESTS COMPLETED ===');
}

// Export functions for global access
window.testAllFunctionality = testAllFunctionality;
window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
