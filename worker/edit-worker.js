// Edit Worker Details JavaScript

console.log('=== Edit Worker JavaScript Loading ===');

// ============ API Configuration ============
const API_BASE_URL = 'https://api.keralahealthrecords.com'; // Replace with actual API URL

// ============ API Utility Functions ============
async function apiCall(endpoint, method = 'GET', data = null) {
    try {
        const url = ${API_BASE_URL}${endpoint};
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Bearer ${getAuthToken()}
            }
        };
        
        if (data && method !== 'GET') {
            options.body = JSON.stringify(data);
        }
        
        console.log(API Call: ${method} ${url}, data);
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(HTTP error! status: ${response.status});
        }
        
        const result = await response.json();
        console.log(API Response:, result);
        return result;
    } catch (error) {
        console.error(API Error for ${endpoint}:, error);
        return { success: false, error: error.message };
    }
}

function getAuthToken() {
    return localStorage.getItem('authToken') || 'demo-token';
}

// Global functions
function goBack() {
    console.log('Going back to dashboard...');
    window.location.href = 'worker-dashboard.html';
}

function resetForm() {
    console.log('Resetting form...');
    if (confirm('Are you sure you want to reset all changes? This will restore the original values.')) {
        document.getElementById('editWorkerForm').reset();
        // Restore original values
        loadWorkerData();
    }
}

function editWorkerDetails() {
    console.log('Navigating to edit worker details page...');
    window.location.href = 'edit-worker.html';
}

// Worker data (same as in main dashboard)
const workerData = {
    fullName: 'Ansh Kumar',
    dateOfBirth: '1996-03-15',
    age: 28,
    gender: 'Male',
    bloodGroup: 'O+',
    maritalStatus: 'Married',
    mobile: '+91 98765 43210',
    emergencyContact: '+91 87654 32109',
    address: 'Worker Camp, Kochi Construction Site',
    homeState: 'Bihar',
    jobRole: 'Construction Worker',
    workSite: 'Kochi Construction Site',
    startDate: '2024-01-15',
    contractor: 'ABC Construction Ltd.',
    workHours: '8:00 AM - 5:00 PM',
    safetyTraining: 'Completed (Nov 2024)',
    allergies: 'None known',
    chronicConditions: 'None',
    medications: '',
    emergencyMedicalContact: '108'
};

// Load worker data into form
function loadWorkerData() {
    console.log('Loading worker data into form...');
    
    // Personal Information
    document.getElementById('fullName').value = workerData.fullName;
    document.getElementById('dateOfBirth').value = workerData.dateOfBirth;
    document.getElementById('age').value = workerData.age;
    document.getElementById('gender').value = workerData.gender;
    document.getElementById('bloodGroup').value = workerData.bloodGroup;
    document.getElementById('maritalStatus').value = workerData.maritalStatus;
    
    // Contact Information
    document.getElementById('mobile').value = workerData.mobile;
    document.getElementById('emergencyContact').value = workerData.emergencyContact;
    document.getElementById('address').value = workerData.address;
    document.getElementById('homeState').value = workerData.homeState;
    
    // Work Information
    document.getElementById('jobRole').value = workerData.jobRole;
    document.getElementById('workSite').value = workerData.workSite;
    document.getElementById('startDate').value = workerData.startDate;
    document.getElementById('contractor').value = workerData.contractor;
    document.getElementById('workHours').value = workerData.workHours;
    document.getElementById('safetyTraining').value = workerData.safetyTraining;
    
    // Health Information
    document.getElementById('allergies').value = workerData.allergies;
    document.getElementById('chronicConditions').value = workerData.chronicConditions;
    document.getElementById('medications').value = workerData.medications;
    document.getElementById('emergencyMedicalContact').value = workerData.emergencyMedicalContact;
    
    console.log('Worker data loaded successfully');
}

// Calculate age from date of birth
function calculateAge() {
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    if (dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        document.getElementById('age').value = age;
    }
}

// Validate form
function validateForm() {
    const form = document.getElementById('editWorkerForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            field.style.borderColor = '#e5e7eb';
        }
    });
    
    // Validate mobile numbers
    const mobilePattern = /^\+91\s\d{5}\s\d{5}$/;
    const mobile = document.getElementById('mobile');
    const emergencyContact = document.getElementById('emergencyContact');
    
    if (mobile.value && !mobilePattern.test(mobile.value)) {
        mobile.style.borderColor = '#ef4444';
        isValid = false;
    }
    
    if (emergencyContact.value && !mobilePattern.test(emergencyContact.value)) {
        emergencyContact.style.borderColor = '#ef4444';
        isValid = false;
    }
    
    return isValid;
}

// Save worker data
async function saveWorkerData() {
    console.log('Saving worker data...');
    
    if (!validateForm()) {
        alert('Please fill in all required fields correctly.');
        return;
    }
    
    // Collect form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        bloodGroup: document.getElementById('bloodGroup').value,
        maritalStatus: document.getElementById('maritalStatus').value,
        mobile: document.getElementById('mobile').value,
        emergencyContact: document.getElementById('emergencyContact').value,
        address: document.getElementById('address').value,
        homeState: document.getElementById('homeState').value,
        jobRole: document.getElementById('jobRole').value,
        workSite: document.getElementById('workSite').value,
        startDate: document.getElementById('startDate').value,
        contractor: document.getElementById('contractor').value,
        workHours: document.getElementById('workHours').value,
        safetyTraining: document.getElementById('safetyTraining').value,
        allergies: document.getElementById('allergies').value,
        chronicConditions: document.getElementById('chronicConditions').value,
        medications: document.getElementById('medications').value,
        emergencyMedicalContact: document.getElementById('emergencyMedicalContact').value
    };
    
    console.log('Form data collected:', formData);
    
    try {
        // Save to backend via API
        const response = await apiCall('/api/worker/update', 'PUT', formData);
        
        if (response.success) {
            // Show success message
            showSuccessMessage();
            
            // Update local worker data
            Object.assign(workerData, formData);
        } else {
            alert('Failed to save changes. Please try again.');
        }
    } catch (error) {
        console.error('Error saving worker data:', error);
        alert('Failed to save changes. Please try again.');
    }
}

// Show success message
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    successDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 18px;">✅</span>
            <span>Worker details updated successfully!</span>
        </div>
    `;
    
    // Add animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    if (!document.head.querySelector('style[data-success]')) {
        style.setAttribute('data-success', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(successDiv);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== Edit Worker Page Loaded ===');
    
    // Load worker data
    loadWorkerData();
    
    // Add event listeners
    const form = document.getElementById('editWorkerForm');
    const dateOfBirth = document.getElementById('dateOfBirth');
    
    // Calculate age when date of birth changes
    if (dateOfBirth) {
        dateOfBirth.addEventListener('change', calculateAge);
    }
    
    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            saveWorkerData();
        });
    }
    
    // Add input validation on blur
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#e5e7eb';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(239, 68, 68)') {
                this.style.borderColor = '#e5e7eb';
            }
        });
    });
    
    // Initialize floating headlines
    initializeFloatingHeadlines();
    
    console.log('Edit worker page initialized successfully');
});

// Floating headlines functionality (reused from main dashboard)
function initializeFloatingHeadlines() {
    console.log('Initializing floating headlines...');
    
    const headlineItems = document.querySelectorAll('.headline-item');
    
    headlineItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const headlineText = this.querySelector('.headline-text').textContent;
            console.log('Headline clicked:', headlineText);
            
            // Show a notification or popup about the health camp
            showHealthCampNotification(headlineText);
        });
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    console.log('Floating headlines initialized with', headlineItems.length, 'items');
}

function showHealthCampNotification(headlineText) {
    // Create a notification popup for the health camp
    const notification = document.createElement('div');
    notification.className = 'health-camp-notification';
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #008080, #006666);
        color: white;
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        max-width: 400px;
        text-align: center;
        animation: slideIn 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <div style="font-size: 24px; margin-bottom: 12px;">🏥</div>
        <h3 style="margin: 0 0 12px 0; color: white; font-size: 18px;">Health Camp Information</h3>
        <p style="margin: 0 0 16px 0; line-height: 1.5; font-size: 14px;">${headlineText}</p>
        <div style="display: flex; gap: 12px; justify-content: center;">
            <button onclick="this.closest('.health-camp-notification').remove()" style="
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: white;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.2s;
            " onmouseover="this.style.background='rgba(255, 255, 255, 0.3)'" onmouseout="this.style.background='rgba(255, 255, 255, 0.2)'">
                Close
            </button>
            <button onclick="bookHealthCamp('${headlineText}')" style="
                background: #ffffff;
                border: none;
                color: #008080;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 600;
                transition: all 0.2s;
            " onmouseover="this.style.background='#f0f0f0'" onmouseout="this.style.background='#ffffff'">
                Register
            </button>
        </div>
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translate(-50%, -60%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }
    `;
    if (!document.head.querySelector('style[data-health-camp]')) {
        style.setAttribute('data-health-camp', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 10000);
    
    // Close on background click
    notification.addEventListener('click', (e) => {
        if (e.target === notification) {
            notification.remove();
        }
    });
}

function bookHealthCamp(campInfo) {
    console.log('Booking health camp:', campInfo);
    
    // Show booking confirmation
    alert("Registration for ${campInfo} has been initiated! You will receive a confirmation SMS shortly.");
    
    // Close the notification
    const notification = document.querySelector('.health-camp-notification');
    if (notification) {
        notification.remove();
    }
}

// Make functions globally available
window.goBack = goBack;
window.resetForm = resetForm;
window.editWorkerDetails = editWorkerDetails;
window.bookHealthCamp = bookHealthCamp;