// Kerala Health Records - Login Page JavaScript
// Clean, modern implementation

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Login page initialized');
    
    // Initialize all components
    initializeTabSwitching();
    initializeRoleBasedFields();
    initializeFormValidation();
    initializeAPIHandlers();
    initializeLanguageSelector();
    initializeKeyboardNavigation();
    
    console.log('✅ All login components initialized successfully');
});

// ========================================
// TAB SWITCHING FUNCTIONALITY
// ========================================
function initializeTabSwitching() {
    console.log('🔄 Initializing tab switching...');
    
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');
    const loginPanel = document.getElementById('loginPanel');
    const registerPanel = document.getElementById('registerPanel');
    
    if (!tabLogin || !tabRegister || !loginPanel || !registerPanel) {
        console.error('❌ Tab elements not found');
        return;
    }
    
    console.log('✅ Tab elements found');

  // Switch to Login tab
  function showLoginTab() {
        console.log('🔄 Switching to Login tab');
        
        // Update tab states
        tabLogin.classList.add('active');
        tabLogin.setAttribute('aria-selected', 'true');
        tabRegister.classList.remove('active');
        tabRegister.setAttribute('aria-selected', 'false');
        
        // Update panel visibility
        loginPanel.style.display = 'block';
        loginPanel.setAttribute('aria-hidden', 'false');
        registerPanel.style.display = 'none';
        registerPanel.setAttribute('aria-hidden', 'true');
        
        console.log('✅ Login tab activated');
  }

  // Switch to Register tab
  function showRegisterTab() {
        console.log('🔄 Switching to Register tab');
        
        // Update tab states
        tabRegister.classList.add('active');
        tabRegister.setAttribute('aria-selected', 'true');
        tabLogin.classList.remove('active');
        tabLogin.setAttribute('aria-selected', 'false');
        
        // Update panel visibility
        registerPanel.style.display = 'block';
        registerPanel.setAttribute('aria-hidden', 'false');
        loginPanel.style.display = 'none';
        loginPanel.setAttribute('aria-hidden', 'true');
        
        console.log('✅ Register tab activated');
    }
    
    // Event listeners
    tabLogin.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('🖱️ Login tab clicked');
      showLoginTab();
    });
    
    tabRegister.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('🖱️ Register tab clicked');
      showRegisterTab();
    });
    
    console.log('✅ Tab switching initialized');
}

// ========================================
// ROLE-BASED FIELD FUNCTIONALITY
// ========================================
function initializeRoleBasedFields() {
    console.log('🎯 Initializing role-based fields...');
    
    const roleRegister = document.getElementById('roleRegister');
    const workerFields = document.getElementById('workerFields');
    const healthCenterFields = document.getElementById('healthCenterFields');
    const nameFields = document.getElementById('nameFields');
    
    if (!roleRegister) {
        console.error('❌ Role register select not found');
      return;
    }
    
    console.log('✅ Role elements found:', {
        roleRegister: !!roleRegister,
        workerFields: !!workerFields,
        healthCenterFields: !!healthCenterFields,
        nameFields: !!nameFields
    });
    
    // Handle role change
    roleRegister.addEventListener('change', function() {
        const selectedRole = this.value;
        console.log('🎯 Role changed to:', selectedRole);
        
        // Hide all role-specific fields first
        if (workerFields) workerFields.style.display = 'none';
        if (healthCenterFields) healthCenterFields.style.display = 'none';
        
        // Handle name fields visibility
    if (nameFields) {
            if (selectedRole === 'Health Center') {
                nameFields.style.display = 'none';
                console.log('🏥 Hiding name fields for Health Center');
      } else {
        nameFields.style.display = 'block';
                console.log('👤 Showing name fields for other roles');
            }
        }
        
        // Show appropriate role-specific fields
        if (selectedRole === 'Worker' && workerFields) {
      workerFields.style.display = 'block';
            console.log('👷 Showing worker fields');
        } else if (selectedRole === 'Health Center' && healthCenterFields) {
      healthCenterFields.style.display = 'block';
            console.log('🏥 Showing health center fields');
        }
    });
    
    console.log('✅ Role-based fields initialized');
}

// ========================================
// FORM VALIDATION
// ========================================
function initializeFormValidation() {
    console.log('✅ Initializing form validation...');
    
    // Validation functions
    const validators = {
        email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        phone: (phone) => /^[6-9]\d{9}$/.test(phone.replace(/\s/g, '')),
        password: (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(password),
        required: (value) => value && value.trim().length > 0
    };

  // Show error message
  function showError(element, message) {
        // Remove existing error
        const existingError = element.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

        // Create new error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            color: #dc2626;
            font-size: 12px;
            margin-top: 4px;
            font-weight: 500;
        `;
    errorDiv.textContent = message;
    element.parentNode.appendChild(errorDiv);

        // Style input
        element.style.borderColor = '#dc2626';
        element.style.boxShadow = '0 0 0 2px rgba(220, 38, 38, 0.1)';
  }

  // Clear error message
  function clearError(element) {
        const errorMessage = element.parentNode.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
        element.style.borderColor = '';
        element.style.boxShadow = '';
    }
    
    // Add input listeners to clear errors
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', () => clearError(input));
        input.addEventListener('change', () => clearError(input));
    });
    
    // Store validation functions globally
    window.validators = validators;
    window.showError = showError;
    window.clearError = clearError;
    
    console.log('✅ Form validation initialized');
}

// ========================================
// API HANDLERS
// ========================================
function initializeAPIHandlers() {
    console.log('🌐 Initializing API handlers...');
    
    // Login handler
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
        console.log('✅ Login button handler attached');
    }
    
    // Registration handler
    const registerForm = document.getElementById('registerPanel');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
        console.log('✅ Registration form handler attached');
    }
    
    console.log('✅ API handlers initialized');
}

// Handle login
async function handleLogin(e) {
    e.preventDefault();
    console.log('🔐 Handling login...');

    const roleLogin = document.getElementById('roleLogin');
    const userId = document.getElementById('userId');
    const pwd = document.getElementById('pwd');
    const loginBtn = document.getElementById('loginBtn');

    // Clear previous errors
    [roleLogin, userId, pwd].forEach(window.clearError);
    
    // Validate form
    let isValid = true;

    if (roleLogin.value === 'Choose your role') {
        window.showError(roleLogin, 'Please select your role');
      isValid = false;
    }

    if (!userId.value.trim()) {
        window.showError(userId, 'Please enter your email or worker ID');
      isValid = false;
    } else if (!window.validators.email(userId.value) && userId.value.length < 6) {
        window.showError(userId, 'Please enter a valid email or worker ID');
        isValid = false;
    }

    if (!pwd.value) {
        window.showError(pwd, 'Please enter your password');
      isValid = false;
    } else if (pwd.value.length < 6) {
        window.showError(pwd, 'Password must be at least 6 characters long');
      isValid = false;
    }

    if (!isValid) {
        console.log('❌ Login validation failed');
        return;
    }
    
      // Show loading state
    loginBtn.textContent = 'Signing In...';
      loginBtn.disabled = true;

      try {
        console.log('🚀 Making login API call...');
        
        const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userId.value,
            password: pwd.value,
                role: roleLogin.value === 'Health Center' ? 'healthcare_center' : roleLogin.value.toLowerCase()
          })
        });

        const data = await response.json();
        console.log('📊 Login response:', data);

        if (data.success) {
            // Store user data
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          
            console.log('✅ Login successful');
          alert(`Welcome ${data.user.profile.firstName}! Login successful.`);
          
          // Redirect based on role
            redirectBasedOnRole(roleLogin.value, data.user.role);
        } else {
            console.error('❌ Login failed:', data.message);
            window.showError(loginBtn, data.message || 'Login failed. Please try again.');
        }
      } catch (error) {
        console.error('❌ Login error:', error);
        window.showError(loginBtn, 'Network error. Please check your connection.');
    } finally {
        // Reset button state
        loginBtn.textContent = 'Access Health Records';
        loginBtn.disabled = false;
      }
    }

// Handle registration
async function handleRegistration(e) {
    e.preventDefault();
    console.log('📝 Handling registration...');
    
    const roleRegister = document.getElementById('roleRegister');
    const firstName = document.getElementById('firstName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const submitBtn = document.querySelector('#registerPanel button[type="submit"]');

    // Clear previous errors
    document.querySelectorAll('#registerPanel input, #registerPanel select').forEach(window.clearError);
    
    // Validate form
    let isValid = true;
    
    if (roleRegister.value === 'Choose your role') {
        window.showError(roleRegister, 'Please select your role');
      isValid = false;
    }

    // Validate name fields only if they exist
    const nameFields = document.getElementById('nameFields');
    if (nameFields && nameFields.style.display !== 'none') {
        if (!firstName.value.trim()) {
            window.showError(firstName, 'Name is required');
      isValid = false;
        }
    }
    
    if (!email.value.trim()) {
        window.showError(email, 'Email is required');
        isValid = false;
    } else if (!window.validators.email(email.value)) {
        window.showError(email, 'Please enter a valid email address');
      isValid = false;
    }

    if (!phone.value.trim()) {
        window.showError(phone, 'Phone number is required');
      isValid = false;
    } else if (!window.validators.phone(phone.value)) {
        window.showError(phone, 'Please enter a valid 10-digit phone number');
      isValid = false;
    }

    if (!password.value) {
        window.showError(password, 'Password is required');
      isValid = false;
    } else if (!window.validators.password(password.value)) {
        window.showError(password, 'Password must be at least 8 characters with letters and numbers');
      isValid = false;
    }

    if (!isValid) {
        console.log('❌ Registration validation failed');
        return;
    }
    
    // Show loading state
    submitBtn.textContent = 'Creating Account...';
      submitBtn.disabled = true;

      try {
        console.log('🚀 Making registration API call...');
        
        // Get additional data based on role
        let additionalData = {};
        const role = roleRegister.value;
        
        if (role === 'Worker') {
          additionalData = {
                dob: document.getElementById('dob')?.value || '',
                gender: document.getElementById('gender')?.value || '',
                bloodGroup: document.getElementById('bloodGroup')?.value || '',
                occupation: document.getElementById('occupation')?.value || '',
                workLocation: document.getElementById('workLocation')?.value || '',
                emergencyContact: document.getElementById('emergencyContact')?.value || ''
            };
        } else if (role === 'Health Center') {
          additionalData = {
                centerName: document.getElementById('centerName')?.value || '',
                centerAddress: document.getElementById('centerAddress')?.value || '',
                centerPincode: document.getElementById('centerPincode')?.value || '',
                centerType: document.getElementById('centerType')?.value || '',
                licenseNumber: document.getElementById('licenseNumber')?.value || '',
                services: document.getElementById('services')?.value || ''
            };
        }
        
        const requestData = {
            email: email.value,
            password: password.value,
            role: role === 'Health Center' ? 'healthcare_center' : role.toLowerCase(),
            profile: {
                ...(firstName && firstName.value && { firstName: firstName.value }),
                phone: phone.value,
                ...additionalData
            }
        };
        
        console.log('📦 Registration data:', requestData);

        const response = await fetch('http://127.0.0.1:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        console.log('📊 Registration response:', data);

        if (data.success) {
            // Store user data
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          
            console.log('✅ Registration successful');
            
            // Show success message
            const welcomeName = role === 'Health Center' 
                ? (data.user.profile.centerName || 'Healthcare Center')
                : data.user.profile.firstName;
            alert(`Registration successful! Welcome ${welcomeName}!`);
          
          // Redirect based on role
            redirectBasedOnRole(role, data.user.role);
        } else {
            console.error('❌ Registration failed:', data.message);
            window.showError(submitBtn, data.message || 'Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('❌ Registration error:', error);
        window.showError(submitBtn, 'Network error. Please check your connection.');
    } finally {
        // Reset button state
        submitBtn.textContent = 'Create Health Account';
        submitBtn.disabled = false;
      }
    }

// Redirect based on role
function redirectBasedOnRole(selectedRole, userRole) {
    console.log('🔄 Redirecting based on role:', { selectedRole, userRole });
    
    const role = selectedRole || userRole;
    
    if (role === 'Health Center' || role === 'healthcare_center') {
        console.log('🏥 Redirecting to healthcare center dashboard...');
        window.location.href = '../healthcare_center/healthcentre.html';
    } else if (role === 'Worker' || role === 'worker') {
        console.log('👷 Redirecting to worker dashboard...');
        window.location.href = '../worker/worker-dashboard.html';
    } else if (role === 'Admin' || role === 'admin') {
        console.log('👨‍💼 Redirecting to admin dashboard...');
        window.location.href = '../admin/admin-dashboard-new.html';
    } else {
        console.log('⚠️ Unknown role, using default redirect...');
        window.location.href = '../healthcare_center/healthcentre.html';
    }
}

// ========================================
// LANGUAGE SELECTOR
// ========================================
function initializeLanguageSelector() {
    console.log('🌐 Initializing language selector...');
    
    const languageSelect = document.getElementById('language');
    if (!languageSelect) {
        console.log('⚠️ Language selector not found');
        return;
    }
    
    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        console.log('🌐 Language changed to:', selectedLanguage);
        
        // Show language change notification
        const messages = {
            'ml': 'മലയാളം ഭാഷ തിരഞ്ഞെടുത്തു',
            'hi': 'हिन्दी भाषा चुनी गई',
            'ta': 'தமிழ் மொழி தேர்ந்தெடுக்கப்பட்டது',
            'bn': 'বাংলা ভাষা নির্বাচিত হয়েছে',
            'en': 'English language selected'
        };
        
        const message = messages[selectedLanguage] || 'Language changed';
        alert(message);
    });
    
    console.log('✅ Language selector initialized');
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================
function initializeKeyboardNavigation() {
    console.log('⌨️ Initializing keyboard navigation...');
    
    // Tab navigation
    document.addEventListener('keydown', function(e) {
        if (e.target.role === 'tab') {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
                const tabs = [
                    document.getElementById('tabLogin'),
                    document.getElementById('tabRegister')
                ];
        const currentIndex = tabs.indexOf(e.target);
                const nextIndex = e.key === 'ArrowRight' 
            ? (currentIndex + 1) % tabs.length
            : (currentIndex - 1 + tabs.length) % tabs.length;

        tabs[nextIndex].focus();
        tabs[nextIndex].click();
      }
    }
  });

    // Enter key for login
    const loginPanel = document.getElementById('loginPanel');
    if (loginPanel) {
        loginPanel.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
      e.preventDefault();
                const loginBtn = document.getElementById('loginBtn');
                if (loginBtn) {
      loginBtn.click();
                }
            }
        });
    }
    
    console.log('✅ Keyboard navigation initialized');
}

// ========================================
// PHONE NUMBER FORMATTING
// ========================================
function initializePhoneFormatting() {
    console.log('📱 Initializing phone formatting...');
    
    const phoneInput = document.getElementById('phone');
    if (!phoneInput) {
        console.log('⚠️ Phone input not found');
        return;
    }
    
    phoneInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, ''); // Remove non-digits
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        
        // Format as XXXXX XXXXX
        if (value.length > 5) {
            value = value.substring(0, 5) + ' ' + value.substring(5);
        }
        
        this.value = value;
    });
    
    console.log('✅ Phone formatting initialized');
}

// ========================================
// TESTING FUNCTIONS
// ========================================
function testLoginFunctionality() {
    console.log('🧪 === TESTING LOGIN FUNCTIONALITY ===');
    
    // Test tab elements
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');
    const loginPanel = document.getElementById('loginPanel');
    const registerPanel = document.getElementById('registerPanel');
    console.log(`✅ Tab elements found: Login=${!!tabLogin}, Register=${!!tabRegister}, LoginPanel=${!!loginPanel}, RegisterPanel=${!!registerPanel}`);
    
    // Test form elements
    const roleLogin = document.getElementById('roleLogin');
    const userId = document.getElementById('userId');
    const pwd = document.getElementById('pwd');
    const loginBtn = document.getElementById('loginBtn');
    console.log(`✅ Login form elements found: Role=${!!roleLogin}, UserId=${!!userId}, Password=${!!pwd}, Button=${!!loginBtn}`);
    
    // Test registration elements
    const roleRegister = document.getElementById('roleRegister');
    const firstName = document.getElementById('firstName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    console.log(`✅ Registration form elements found: Role=${!!roleRegister}, FirstName=${!!firstName}, Email=${!!email}, Phone=${!!phone}, Password=${!!password}`);
    
    // Test role-based fields
    const workerFields = document.getElementById('workerFields');
    const healthCenterFields = document.getElementById('healthCenterFields');
    const nameFields = document.getElementById('nameFields');
    console.log(`✅ Role-based fields found: Worker=${!!workerFields}, HealthCenter=${!!healthCenterFields}, Name=${!!nameFields}`);
    
    // Test language selector
    const languageSelect = document.getElementById('language');
    console.log(`✅ Language selector found: ${!!languageSelect}`);
    
    console.log('🎉 === ALL LOGIN FUNCTIONALITY TESTS COMPLETED ===');
}

// Export functions for global access
window.testLoginFunctionality = testLoginFunctionality;
window.handleLogin = handleLogin;
window.handleRegistration = handleRegistration;