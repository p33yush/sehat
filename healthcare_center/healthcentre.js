// Healthcare Centre Dashboard JavaScript - Restored Functionality

// ============ API Configuration ============
const API_BASE_URL = 'http://127.0.0.1:5000';
const API_ENDPOINTS = {
  dashboard: '/api/healthcare/dashboard',
  patients: '/api/healthcare/patients',
  appointments: '/api/healthcare/appointments',
  medicalRecords: '/api/healthcare/medical-records',
  addPatient: '/api/healthcare/patients',
  addAppointment: '/api/healthcare/appointments',
  addMedicalRecord: '/api/healthcare/medical-records'
};

// ============ API Utility Functions ============
async function apiCall(endpoint, method = 'GET', data = null) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`
      }
    };

    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }

    console.log(`API Call: ${method} ${url}`, data);
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(`API Response:`, result);
    return result;
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    return { success: false, message: 'Network error' };
  }
}

function getAuthToken() {
  return localStorage.getItem('token') || 'test-token';
}

// ============ Dashboard Functions ============

async function loadHealthcareProfile() {
  try {
    console.log('Loading healthcare center profile...');
    const response = await apiCall('/api/healthcare/profile');
    
    if (response.success) {
      console.log('Healthcare profile loaded:', response.data);
      updateHealthcareProfileUI(response.data);
    } else {
      console.error('Failed to load healthcare profile:', response.message);
      
      // Try to get user data from localStorage as fallback
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        console.log('Using fallback healthcare data from localStorage:', user);
        updateHealthcareProfileUI(user);
      }
    }
  } catch (error) {
    console.error('Error loading healthcare profile:', error);
    
    // Try to get user data from localStorage as fallback
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      console.log('Using fallback healthcare data from localStorage:', user);
      updateHealthcareProfileUI(user);
    }
  }
}

async function loadDashboardData() {
  try {
    console.log('Loading healthcare dashboard data...');
    const response = await apiCall(API_ENDPOINTS.dashboard);
    
    if (response.success) {
      console.log('Dashboard data loaded:', response.data);
      updateDashboardUI(response.data);
    } else {
      console.error('Failed to load dashboard:', response.message);
    }
  } catch (error) {
    console.error('Error loading dashboard:', error);
  }
}

async function loadPatients() {
  try {
    console.log('Loading patients...');
    const response = await apiCall(API_ENDPOINTS.patients);
    
    if (response.success) {
      console.log('Patients loaded:', response.data);
      updatePatientsUI(response.data);
    } else {
      console.error('Failed to load patients:', response.message);
    }
  } catch (error) {
    console.error('Error loading patients:', error);
  }
}

async function loadAppointments() {
  try {
    console.log('Loading appointments...');
    const response = await apiCall(API_ENDPOINTS.appointments);
    
    if (response.success) {
      console.log('Appointments loaded:', response.data);
      updateAppointmentsUI(response.data);
    } else {
      console.error('Failed to load appointments:', response.message);
    }
  } catch (error) {
    console.error('Error loading appointments:', error);
  }
}

// ============ UI Update Functions ============

function updateHealthcareProfileUI(healthcareData) {
  console.log('Updating healthcare profile UI with data:', healthcareData);
  
  // Update header profile name
  const profileNameElement = document.querySelector('.profile-name');
  if (profileNameElement && healthcareData.profile) {
    profileNameElement.textContent = healthcareData.profile.centerName || healthcareData.profile.firstName + ' ' + healthcareData.profile.lastName;
  }

  // Update header profile role
  const profileRoleElement = document.querySelector('.profile-role');
  if (profileRoleElement && healthcareData.profile) {
    profileRoleElement.textContent = healthcareData.profile.centerType || 'Medical Staff';
  }

  // Update welcome section if it exists
  const welcomeTitle = document.getElementById('welcomeTitle');
  if (welcomeTitle && healthcareData.profile) {
    welcomeTitle.textContent = `Welcome, ${healthcareData.profile.centerName || healthcareData.profile.firstName + ' ' + healthcareData.profile.lastName}`;
  }

  const welcomeInfo = document.getElementById('welcomeInfo');
  if (welcomeInfo && healthcareData.profile) {
    welcomeInfo.textContent = `Health Center ID: ${healthcareData._id} | ${healthcareData.profile.centerType || 'Health Center'} | ${healthcareData.profile.centerAddress || 'Location'}`;
  }

  // Update healthcare center details in any popups or modals
  updateHealthcareCenterDetails(healthcareData);
  
  console.log('Healthcare profile UI updated successfully');
}

function updateHealthcareCenterDetails(healthcareData) {
  // Update any healthcare center detail elements
  const centerName = document.getElementById('centerName');
  if (centerName && healthcareData.profile) {
    centerName.textContent = healthcareData.profile.centerName || 'Health Center';
  }

  const centerAddress = document.getElementById('centerAddress');
  if (centerAddress && healthcareData.profile) {
    centerAddress.textContent = healthcareData.profile.centerAddress || 'N/A';
  }

  const centerType = document.getElementById('centerType');
  if (centerType && healthcareData.profile) {
    centerType.textContent = healthcareData.profile.centerType || 'N/A';
  }

  const licenseNumber = document.getElementById('licenseNumber');
  if (licenseNumber && healthcareData.profile) {
    licenseNumber.textContent = healthcareData.profile.licenseNumber || 'N/A';
  }

  const services = document.getElementById('services');
  if (services && healthcareData.profile) {
    services.textContent = healthcareData.profile.services || 'N/A';
  }

  const contactPhone = document.getElementById('contactPhone');
  if (contactPhone && healthcareData.profile) {
    contactPhone.textContent = healthcareData.profile.phone || 'N/A';
  }
}

function updateDashboardUI(data) {
  // Update statistics
  if (data.stats) {
    const totalPatients = document.getElementById('totalPatients');
    const todayAppointments = document.getElementById('todayAppointments');
    const pendingAppointments = document.getElementById('pendingAppointments');
    
    if (totalPatients) totalPatients.textContent = data.stats.totalPatients;
    if (todayAppointments) todayAppointments.textContent = data.stats.todayAppointments;
    if (pendingAppointments) pendingAppointments.textContent = data.stats.pendingAppointments;
  }
  
  // Update recent patients
  if (data.recentPatients) {
    updateRecentPatientsUI(data.recentPatients);
  }
  
  // Update today's appointments
  if (data.todayAppointments) {
    updateTodayAppointmentsUI(data.todayAppointments);
  }
}

function updateRecentPatientsUI(patients) {
  const container = document.getElementById('recentPatientsContainer');
  if (!container) return;
  
  let html = '';
  patients.forEach(patient => {
    html += `
      <div class="patient-card">
        <div class="patient-info">
          <h4>${patient.personalInfo.firstName} ${patient.personalInfo.lastName}</h4>
          <p>ID: ${patient.patientId}</p>
          <p>Phone: ${patient.personalInfo.phone}</p>
        </div>
        <div class="patient-status">
          <span class="status-badge ${patient.status}">${patient.status}</span>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

function updateTodayAppointmentsUI(appointments) {
  const container = document.getElementById('todayAppointmentsContainer');
  if (!container) return;
  
  let html = '';
  appointments.forEach(appointment => {
    html += `
      <div class="appointment-card">
        <div class="appointment-time">${appointment.appointmentTime}</div>
        <div class="appointment-details">
          <h4>${appointment.patientId.personalInfo.firstName} ${appointment.patientId.personalInfo.lastName}</h4>
          <p>Dr. ${appointment.doctor.name}</p>
          <p>${appointment.reason}</p>
        </div>
        <div class="appointment-status">
          <span class="status-badge ${appointment.status}">${appointment.status}</span>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

function updatePatientsUI(data) {
  const container = document.getElementById('patientsContainer');
  if (!container) return;
  
  let html = '';
  data.patients.forEach(patient => {
    html += `
      <div class="patient-row">
        <div class="patient-info">
          <h4>${patient.personalInfo.firstName} ${patient.personalInfo.lastName}</h4>
          <p>ID: ${patient.patientId}</p>
          <p>Phone: ${patient.personalInfo.phone}</p>
        </div>
        <div class="patient-actions">
          <button class="btn btn-primary" onclick="viewPatient('${patient._id}')">View</button>
          <button class="btn btn-secondary" onclick="editPatient('${patient._id}')">Edit</button>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

function updateAppointmentsUI(data) {
  const container = document.getElementById('appointmentsContainer');
  if (!container) return;
  
  let html = '';
  data.appointments.forEach(appointment => {
    html += `
      <div class="appointment-row">
        <div class="appointment-info">
          <h4>${appointment.patientId.personalInfo.firstName} ${appointment.patientId.personalInfo.lastName}</h4>
          <p>Dr. ${appointment.doctor.name}</p>
          <p>${appointment.appointmentDate} at ${appointment.appointmentTime}</p>
        </div>
        <div class="appointment-actions">
          <span class="status-badge ${appointment.status}">${appointment.status}</span>
          <button class="btn btn-primary" onclick="updateAppointmentStatus('${appointment._id}')">Update</button>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

// ============ Form Handlers ============
async function addPatient(formData) {
  try {
    const response = await apiCall(API_ENDPOINTS.addPatient, 'POST', formData);
    
    if (response.success) {
      alert('✅ Patient added successfully!');
      loadPatients();
      loadDashboardData();
    } else {
      alert('❌ Failed to add patient: ' + response.message);
    }
  } catch (error) {
    console.error('Error adding patient:', error);
    alert('❌ Network error. Please try again.');
  }
}

async function addAppointment(formData) {
  try {
    const response = await apiCall(API_ENDPOINTS.addAppointment, 'POST', formData);
    
    if (response.success) {
      alert('✅ Appointment scheduled successfully!');
      loadAppointments();
      loadDashboardData();
    } else {
      alert('❌ Failed to schedule appointment: ' + response.message);
    }
  } catch (error) {
    console.error('Error adding appointment:', error);
    alert('❌ Network error. Please try again.');
  }
}

async function addMedicalRecord(formData) {
  try {
    const response = await apiCall(API_ENDPOINTS.addMedicalRecord, 'POST', formData);
    
    if (response.success) {
      alert('✅ Medical record added successfully!');
      loadDashboardData();
    } else {
      alert('❌ Failed to add medical record: ' + response.message);
    }
  } catch (error) {
    console.error('Error adding medical record:', error);
    alert('❌ Network error. Please try again.');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('Healthcare Dashboard initialized');
  
  // Load healthcare profile first
  loadHealthcareProfile();
  
  // Load dashboard data from backend
  loadDashboardData();
  loadPatients();
  loadAppointments();
  
  // Initialize all components
  initializeSidebar();
  initializeSearch();
  initializeNotifications();
  initializeModals();
  initializeCharts();
  initializeThemeToggle();
  initializeLanguageSelector();
  initializeStaffCards();
  initializeFormHandlers();
  initializeSidebarOverlays();
  initializeNotificationEnhancements();
});

// Sidebar functionality
function initializeSidebar() {
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all items
      navItems.forEach(nav => nav.classList.remove('active'));
      
      // Add active class to clicked item
      this.classList.add('active');
      
      // Handle submenu toggle
      const chevron = this.querySelector('.fa-chevron-right, .fa-chevron-down');
      if (chevron) {
        const submenu = this.nextElementSibling;
        if (submenu && submenu.classList.contains('nav-submenu')) {
          chevron.classList.toggle('fa-chevron-right');
          chevron.classList.toggle('fa-chevron-down');
          submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
        }
      }
    });
  });
}

// Search functionality
function initializeSearch() {
  const searchInput = document.querySelector('.search-bar input');
  
  if (searchInput) {
    searchInput.addEventListener('focus', function () {
      this.style.borderColor = 'var(--white)';
      this.style.background = 'rgba(255, 255, 255, 0.2)';
      this.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1)';
    });

    searchInput.addEventListener('blur', function () {
      this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      this.style.background = 'rgba(255, 255, 255, 0.1)';
      this.style.boxShadow = 'none';
    });

    searchInput.addEventListener('input', function () {
      const searchTerm = this.value.toLowerCase();
      filterPatients(searchTerm);
    });
  }
}

// Filter patients function
function filterPatients(searchTerm) {
  const patientItems = document.querySelectorAll('.patient-item');
  
  patientItems.forEach(item => {
    const patientName = item.querySelector('h4').textContent.toLowerCase();
    const patientId = item.querySelector('p').textContent.toLowerCase();
    
    if (patientName.includes(searchTerm) || patientId.includes(searchTerm)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// Notifications functionality
function initializeNotifications() {
  const notificationBadge = document.querySelector('#notificationTrigger');
  const notificationCountEl = document.querySelector('#notificationCount');
  
  if (notificationBadge) {
    // Set initial notification count
    if (notificationCountEl) {
      notificationCountEl.textContent = '7';
    }
    
    notificationBadge.addEventListener('click', function() {
      showNotificationModal();
    });
  }
  
  // Healthcare info trigger
  const healthcareInfoTrigger = document.querySelector('#healthcareInfoTrigger');
  if (healthcareInfoTrigger) {
    healthcareInfoTrigger.addEventListener('click', function() {
      showHealthcareInfoModal();
    });
  }
}

// Enhanced notification system
let notifications = [
  {
    id: 1,
    title: 'New Patient Registration',
    message: 'Rajesh Kumar has been registered successfully in the healthcare system',
    time: '2 minutes ago',
    type: 'success',
    unread: true,
    icon: 'user-plus'
  },
  {
    id: 2,
    title: 'Lab Report Ready',
    message: 'Blood test results for Anurag Ben are now available for review',
    time: '15 minutes ago',
    type: 'info',
    unread: true,
    icon: 'file-medical'
  },
  {
    id: 3,
    title: 'Urgent Medical Alert',
    message: 'Patient Mohammad Khan (PAT-MK-003) requires immediate ICU monitoring',
    time: '1 hour ago',
    type: 'urgent',
    unread: true,
    icon: 'exclamation-triangle'
  },
  {
    id: 7,
    title: 'Critical Patient Alert',
    message: 'Rajesh Singh (PAT-RS-004) has workplace injury requiring emergency surgery',
    time: '45 minutes ago',
    type: 'urgent',
    unread: true,
    icon: 'ambulance'
  },
  {
    id: 8,
    title: 'Dehydration Emergency',
    message: 'Sunita Devi (PAT-SD-005) needs immediate IV fluids administration',
    time: '30 minutes ago',
    type: 'urgent',
    unread: true,
    icon: 'tint'
  },
  {
    id: 4,
    title: 'Appointment Reminder',
    message: 'Scheduled appointment with Dr. Smith at 2:00 PM today',
    time: '2 hours ago',
    type: 'info',
    unread: false,
    icon: 'calendar-check'
  },
  {
    id: 5,
    title: 'System Maintenance',
    message: 'Scheduled system maintenance will occur tonight at 11 PM',
    time: '3 hours ago',
    type: 'warning',
    unread: false,
    icon: 'tools'
  },
  {
    id: 6,
    title: 'Report Generated',
    message: 'Monthly health statistics report has been generated successfully',
    time: '1 day ago',
    type: 'success',
    unread: false,
    icon: 'chart-bar'
  }
];

let currentFilter = 'all';

// Show notification modal
function showNotificationModal() {
  const modal = document.getElementById('notificationModal');
  const notificationList = document.getElementById('notificationList');
  
  if (modal && notificationList) {
    renderNotifications();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

// Render notifications based on current filter
function renderNotifications() {
  const notificationList = document.getElementById('notificationList');
  const modalNotificationCount = document.getElementById('modalNotificationCount');
  
  if (!notificationList) return;
  
  let filteredNotifications = notifications;
  if (currentFilter !== 'all') {
    filteredNotifications = notifications.filter(notif => notif.type === currentFilter);
  }
  
  if (filteredNotifications.length === 0) {
    notificationList.innerHTML = `
      <div class="notification-empty">
        <i class="fas fa-bell-slash"></i>
        <h4>No notifications</h4>
        <p>No ${currentFilter === 'all' ? '' : currentFilter + ' '}notifications to display</p>
      </div>
    `;
  } else {
    notificationList.innerHTML = filteredNotifications.map(notif => `
      <div class="notification-item ${notif.type} ${notif.unread ? 'unread' : ''}" data-id="${notif.id}">
        <div class="notification-icon">
          <i class="fas fa-${notif.icon}"></i>
        </div>
        <div class="notification-content">
          <h4>${notif.title}</h4>
          <p>${notif.message}</p>
          <div class="notification-actions">
            <span class="notification-time">${notif.time}</span>
            ${notif.unread ? `<button class="btn btn-sm btn-outline" onclick="markAsRead(${notif.id})">Mark as Read</button>` : ''}
          </div>
        </div>
      </div>
    `).join('');
  }
  
  // Update notification count
  const unreadCount = notifications.filter(notif => notif.unread).length;
  if (modalNotificationCount) {
    modalNotificationCount.textContent = unreadCount;
  }
  
  // Update header badge
  const headerBadge = document.getElementById('notificationCount');
  if (headerBadge) {
    headerBadge.textContent = unreadCount;
  }
}

// Mark notification as read
function markAsRead(notificationId) {
  const notification = notifications.find(notif => notif.id === notificationId);
  if (notification) {
    notification.unread = false;
    renderNotifications();
  }
}

// Mark all notifications as read
function markAllAsRead() {
  notifications.forEach(notif => notif.unread = false);
  renderNotifications();
  showToast('All notifications marked as read', 'success');
}

// Clear all notifications
function clearAllNotifications() {
  if (confirm('Are you sure you want to clear all notifications?')) {
    notifications = [];
    renderNotifications();
    showToast('All notifications cleared', 'info');
  }
}

// Filter notifications
function filterNotifications(filter) {
  currentFilter = filter;
  
  // Update filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
  
  renderNotifications();
}

// Show medical staff modal
function showMedicalStaffModal() {
  // Create modal if it doesn't exist
  let modal = document.getElementById('medicalStaffModal');
  if (!modal) {
    modal = createMedicalStaffModal();
  }
  
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// Create medical staff modal
function createMedicalStaffModal() {
  const modal = document.createElement('div');
  modal.id = 'medicalStaffModal';
  modal.className = 'modal';
  modal.style.display = 'none';
  
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3><i class="fas fa-user-md"></i> Medical Staff Management</h3>
        <button class="modal-close" data-close-modal onclick="closeModal('medicalStaffModal')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="staff-management">
          <div class="staff-actions">
            <button class="btn btn-primary" onclick="addNewStaff()">
              <i class="fas fa-user-plus"></i> Add New Staff
            </button>
            <button class="btn btn-outline" onclick="exportStaffData()">
              <i class="fas fa-download"></i> Export Staff Data
            </button>
          </div>
          
          <div class="staff-list">
            <div class="staff-item">
              <div class="staff-avatar">
                <i class="fas fa-user-md"></i>
              </div>
              <div class="staff-info">
                <h4>Dr. Sarah Johnson</h4>
                <p>Chief Medical Officer</p>
                <span class="staff-specialty">Internal Medicine</span>
                <div class="staff-status">
                  <span class="status-badge status-active">Active</span>
                </div>
              </div>
              <div class="staff-actions">
                <button class="btn btn-sm btn-outline" onclick="editStaff(1)">
                  <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm btn-danger" onclick="removeStaff(1)">
                  <i class="fas fa-trash"></i> Remove
                </button>
              </div>
            </div>
            
            <div class="staff-item">
              <div class="staff-avatar">
                <i class="fas fa-user-md"></i>
              </div>
              <div class="staff-info">
                <h4>Dr. Michael Chen</h4>
                <p>Emergency Medicine</p>
                <span class="staff-specialty">Emergency Care</span>
                <div class="staff-status">
                  <span class="status-badge status-active">Active</span>
                </div>
              </div>
              <div class="staff-actions">
                <button class="btn btn-sm btn-outline" onclick="editStaff(2)">
                  <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm btn-danger" onclick="removeStaff(2)">
                  <i class="fas fa-trash"></i> Remove
                </button>
              </div>
            </div>
            
            <div class="staff-item">
              <div class="staff-avatar">
                <i class="fas fa-user-md"></i>
              </div>
              <div class="staff-info">
                <h4>Dr. Priya Sharma</h4>
                <p>Cardiologist</p>
                <span class="staff-specialty">Cardiology</span>
                <div class="staff-status">
                  <span class="status-badge status-active">Active</span>
                </div>
              </div>
              <div class="staff-actions">
                <button class="btn btn-sm btn-outline" onclick="editStaff(3)">
                  <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm btn-danger" onclick="removeStaff(3)">
                  <i class="fas fa-trash"></i> Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  return modal;
}

// Show settings modal
function showSettingsModal() {
  // Create modal if it doesn't exist
  let modal = document.getElementById('settingsModal');
  if (!modal) {
    modal = createSettingsModal();
  }
  
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// Create settings modal
function createSettingsModal() {
  const modal = document.createElement('div');
  modal.id = 'settingsModal';
  modal.className = 'modal';
  modal.style.display = 'none';
  
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3><i class="fas fa-cog"></i> Healthcare Center Settings</h3>
        <button class="modal-close" data-close-modal onclick="closeModal('settingsModal')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="settings-tabs">
          <div class="tab-buttons">
            <button class="tab-btn active" data-tab="general">General</button>
            <button class="tab-btn" data-tab="notifications">Notifications</button>
            <button class="tab-btn" data-tab="security">Security</button>
            <button class="tab-btn" data-tab="backup">Backup</button>
          </div>
          
          <div class="tab-content">
            <div class="tab-panel active" id="general-tab">
              <div class="setting-group">
                <h4>Healthcare Center Information</h4>
                <div class="setting-item">
                  <label>Center Name</label>
                  <input type="text" value="Kochi Government Health Centre" />
                </div>
                <div class="setting-item">
                  <label>Address</label>
                  <textarea>Medical College Road, Kochi, Kerala 682011</textarea>
                </div>
                <div class="setting-item">
                  <label>Emergency Contact</label>
                  <input type="tel" value="+91 484 123 4567" />
                </div>
                <div class="setting-item">
                  <label>Email</label>
                  <input type="email" value="healthcare@kerala.gov.in" />
                </div>
              </div>
            </div>
            
            <div class="tab-panel" id="notifications-tab">
              <div class="setting-group">
                <h4>Notification Preferences</h4>
                <div class="setting-item">
                  <label class="toggle-label">
                    <input type="checkbox" checked />
                    <span class="toggle-slider"></span>
                    Email Notifications
                  </label>
                </div>
                <div class="setting-item">
                  <label class="toggle-label">
                    <input type="checkbox" checked />
                    <span class="toggle-slider"></span>
                    SMS Notifications
                  </label>
                </div>
                <div class="setting-item">
                  <label class="toggle-label">
                    <input type="checkbox" />
                    <span class="toggle-slider"></span>
                    Push Notifications
                  </label>
                </div>
              </div>
            </div>
            
            <div class="tab-panel" id="security-tab">
              <div class="setting-group">
                <h4>Security Settings</h4>
                <div class="setting-item">
                  <label>Session Timeout (minutes)</label>
                  <input type="number" value="30" min="5" max="120" />
                </div>
                <div class="setting-item">
                  <label class="toggle-label">
                    <input type="checkbox" checked />
                    <span class="toggle-slider"></span>
                    Two-Factor Authentication
                  </label>
                </div>
                <div class="setting-item">
                  <label class="toggle-label">
                    <input type="checkbox" checked />
                    <span class="toggle-slider"></span>
                    Password Complexity Requirements
                  </label>
                </div>
              </div>
            </div>
            
            <div class="tab-panel" id="backup-tab">
              <div class="setting-group">
                <h4>Data Backup</h4>
                <div class="setting-item">
                  <label>Backup Frequency</label>
                  <select>
                    <option value="daily">Daily</option>
                    <option value="weekly" selected>Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div class="setting-item">
                  <label class="toggle-label">
                    <input type="checkbox" checked />
                    <span class="toggle-slider"></span>
                    Automatic Backup
                  </label>
                </div>
                <div class="setting-actions">
                  <button class="btn btn-primary" onclick="createBackup()">
                    <i class="fas fa-download"></i> Create Backup Now
                  </button>
                  <button class="btn btn-outline" onclick="restoreBackup()">
                    <i class="fas fa-upload"></i> Restore from Backup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="btn btn-outline" data-close-modal onclick="closeModal('settingsModal')">Cancel</button>
          <button class="btn btn-primary" onclick="saveSettings()">
            <i class="fas fa-save"></i> Save Settings
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  return modal;
}

// Show healthcare info modal
function showHealthcareInfoModal() {
  const modal = document.getElementById('healthcareInfoModal');
  const modalBody = document.getElementById('healthcareInfoBody');
  
  if (modal && modalBody) {
    modalBody.innerHTML = `
      <div class="healthcare-info">
        <div class="healthcare-hero">
          <div class="hero-content">
            <div class="hero-icon">
              <i class="fas fa-hospital"></i>
            </div>
            <div class="hero-text">
              <h2>Kochi Government Health Centre</h2>
              <p class="hero-subtitle">Comprehensive Healthcare for Migrant Workers</p>
            </div>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">24/7</span>
              <span class="stat-label">Emergency</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">50+</span>
              <span class="stat-label">Staff</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">1000+</span>
              <span class="stat-label">Patients</span>
            </div>
          </div>
        </div>

        <div class="info-sections">
          <div class="info-section">
            <div class="section-header">
              <i class="fas fa-map-marker-alt"></i>
              <h4>Centre Details</h4>
            </div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">
                  <i class="fas fa-building"></i>
                  <span>Centre Name</span>
                </div>
                <div class="info-value">Kochi Government Health Centre</div>
              </div>
              <div class="info-item">
                <div class="info-label">
                  <i class="fas fa-map-pin"></i>
                  <span>Address</span>
                </div>
                <div class="info-value">Medical College Road, Kochi, Kerala 682011</div>
              </div>
              <div class="info-item">
                <div class="info-label">
                  <i class="fas fa-phone"></i>
                  <span>Emergency Contact</span>
                </div>
                <div class="info-value">+91 484 123 4567</div>
              </div>
              <div class="info-item">
                <div class="info-label">
                  <i class="fas fa-envelope"></i>
                  <span>Email</span>
                </div>
                <div class="info-value">healthcare@kerala.gov.in</div>
              </div>
              <div class="info-item">
                <div class="info-label">
                  <i class="fas fa-clock"></i>
                  <span>Operating Hours</span>
                </div>
                <div class="info-value">24/7 Emergency Services Available</div>
              </div>
              <div class="info-item">
                <div class="info-label">
                  <i class="fas fa-stethoscope"></i>
                  <span>Specialties</span>
                </div>
                <div class="info-value">General Medicine, Emergency Care, Lab Services, Cardiology</div>
              </div>
            </div>
          </div>
          
          <div class="info-section">
            <div class="section-header">
              <i class="fas fa-users"></i>
              <h4>Medical Staff</h4>
            </div>
            <div class="staff-grid">
              <div class="staff-card">
                <div class="staff-avatar">
                  <i class="fas fa-user-md"></i>
                </div>
                <div class="staff-info">
                  <h5>Dr. Sarah Johnson</h5>
                  <p>Chief Medical Officer</p>
                  <span class="staff-specialty">Internal Medicine</span>
                </div>
              </div>
              <div class="staff-card">
                <div class="staff-avatar">
                  <i class="fas fa-user-md"></i>
                </div>
                <div class="staff-info">
                  <h5>Dr. Rajesh Kumar</h5>
                  <p>Emergency Medicine Specialist</p>
                  <span class="staff-specialty">Emergency Care</span>
                </div>
              </div>
              <div class="staff-card">
                <div class="staff-avatar">
                  <i class="fas fa-user-nurse"></i>
                </div>
                <div class="staff-info">
                  <h5>Nurse Priya</h5>
                  <p>Senior Staff Nurse</p>
                  <span class="staff-specialty">Critical Care</span>
                </div>
              </div>
              <div class="staff-card">
                <div class="staff-avatar">
                  <i class="fas fa-user-md"></i>
                </div>
                <div class="staff-info">
                  <h5>Dr. Amit Patel</h5>
                  <p>Cardiologist</p>
                  <span class="staff-specialty">Cardiology</span>
                </div>
              </div>
            </div>
          </div>

          <div class="info-section">
            <div class="section-header">
              <i class="fas fa-chart-line"></i>
              <h4>Centre Statistics</h4>
            </div>
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="fas fa-bed"></i>
                </div>
                <div class="stat-content">
                  <span class="stat-number">25</span>
                  <span class="stat-label">Beds Available</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="fas fa-ambulance"></i>
                </div>
                <div class="stat-content">
                  <span class="stat-number">3</span>
                  <span class="stat-label">Emergency Vehicles</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="fas fa-microscope"></i>
                </div>
                <div class="stat-content">
                  <span class="stat-number">2</span>
                  <span class="stat-label">Lab Facilities</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="fas fa-x-ray"></i>
                </div>
                <div class="stat-content">
                  <span class="stat-number">1</span>
                  <span class="stat-label">X-Ray Machine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

// Theme toggle functionality
function initializeThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const icon = this.querySelector('i');
      const isDark = document.body.classList.contains('dark-theme');
      
      if (isDark) {
        document.body.classList.remove('dark-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
      } else {
        document.body.classList.add('dark-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
      }
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.remove('dark-theme');
      themeToggle.querySelector('i').classList.remove('fa-moon');
      themeToggle.querySelector('i').classList.add('fa-sun');
    }
  }
}

// Language selector functionality
function initializeLanguageSelector() {
  const languageSelector = document.querySelector('.language-selector select');
  
  if (languageSelector) {
    languageSelector.addEventListener('change', function () {
      const selectedLanguage = this.value;
      console.log('Language changed to:', selectedLanguage);
      showToast(`Language changed to ${selectedLanguage}`, 'info');
    });
  }
}

// Modal functionality
function initializeModals() {
  // Add Patient Modal
  const addPatientBtns = document.querySelectorAll('#addPatientBtnTop, #addPatientBtnSide');
  const addPatientModal = document.getElementById('addPatientModal');
  
  addPatientBtns.forEach(btn => {
    if (btn && addPatientModal) {
      btn.addEventListener('click', function() {
        addPatientModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    }
  });
  
  // Upload Report Modal
  const uploadReportBtns = document.querySelectorAll('#uploadReportBtnTop, #uploadReportBtnSide');
  const uploadReportModal = document.getElementById('uploadReportModal');
  
  uploadReportBtns.forEach(btn => {
    if (btn && uploadReportModal) {
      btn.addEventListener('click', function() {
        uploadReportModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    }
  });
  
  // Generate Report Modal
  const generateReportBtns = document.querySelectorAll('#generateReportBtnTop, #generateReportBtnSide');
  const generateReportModal = document.getElementById('generateReportModal');
  
  generateReportBtns.forEach(btn => {
    if (btn && generateReportModal) {
      btn.addEventListener('click', function() {
        generateReportModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    }
  });
  
  // Close modal functionality
  const closeButtons = document.querySelectorAll('[data-close-modal]');
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  });
  
  // Close modal when clicking outside
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  });
}

// Form handlers
function initializeFormHandlers() {
  // Add Patient Form
  const addPatientForm = document.getElementById('addPatientForm');
  if (addPatientForm) {
    addPatientForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const patientData = Object.fromEntries(formData);
      
      console.log('New patient data:', patientData);
      showToast('Patient added successfully!', 'success');
      
      // Close modal
      const modal = this.closest('.modal');
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      
      // Reset form
      this.reset();
    });
  }
  
  // Upload Report Form
  const uploadReportForm = document.getElementById('uploadReportForm');
  if (uploadReportForm) {
    uploadReportForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const reportData = Object.fromEntries(formData);
      
      console.log('Report upload data:', reportData);
      showToast('Lab report uploaded successfully!', 'success');
      
      // Close modal
      const modal = this.closest('.modal');
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      
      // Reset form
      this.reset();
    });
  }
  
  // Generate Report Form
  const generateReportForm = document.getElementById('generateReportForm');
  if (generateReportForm) {
    generateReportForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const reportData = Object.fromEntries(formData);
      
      console.log('Report generation data:', reportData);
      showToast('Report generated successfully!', 'success');
      
      // Close modal
      const modal = this.closest('.modal');
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      
      // Reset form
      this.reset();
    });
  }
}

// Chart initialization
function initializeCharts() {
  // Initialize health statistics chart
  initializeHealthChart();
  
  // Initialize appointment chart
  initializeAppointmentChart();
}

function initializeHealthChart() {
  const canvas = document.getElementById('healthChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Sample data for health statistics
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Patient Visits',
      data: [12, 19, 15, 25, 22, 18, 14],
      borderColor: '#007b83',
      backgroundColor: 'rgba(0, 123, 131, 0.1)',
      tension: 0.4,
      fill: true
    }, {
      label: 'Health Screenings',
      data: [8, 12, 10, 18, 16, 12, 9],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };
  
  // Simple line chart implementation
  drawLineChart(ctx, data, canvas.width, canvas.height);
}

function initializeAppointmentChart() {
  const canvas = document.getElementById('appointmentChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Sample data for appointments
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Appointments',
      data: [45, 52, 38, 61, 55, 48],
      backgroundColor: 'rgba(0, 123, 131, 0.8)',
      borderColor: '#007b83',
      borderWidth: 1
    }]
  };
  
  // Simple bar chart implementation
  drawBarChart(ctx, data, canvas.width, canvas.height);
}

// Simple chart drawing functions
function drawLineChart(ctx, data, width, height) {
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Draw grid
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  
  // Vertical grid lines
  for (let i = 0; i <= data.labels.length; i++) {
    const x = padding + (i * chartWidth / data.labels.length);
    ctx.beginPath();
    ctx.moveTo(x, padding);
    ctx.lineTo(x, height - padding);
    ctx.stroke();
  }
  
  // Horizontal grid lines
  for (let i = 0; i <= 5; i++) {
    const y = padding + (i * chartHeight / 5);
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }
  
  // Draw datasets
  data.datasets.forEach((dataset, datasetIndex) => {
    ctx.strokeStyle = dataset.borderColor;
    ctx.fillStyle = dataset.backgroundColor;
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    dataset.data.forEach((value, index) => {
      const x = padding + (index * chartWidth / (data.labels.length - 1));
      const y = height - padding - (value * chartHeight / 30);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
  });
}

function drawBarChart(ctx, data, width, height) {
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const barWidth = chartWidth / data.labels.length * 0.6;
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Draw bars
  data.datasets[0].data.forEach((value, index) => {
    const x = padding + (index * chartWidth / data.labels.length) + (chartWidth / data.labels.length - barWidth) / 2;
    const barHeight = (value / 70) * chartHeight;
    const y = height - padding - barHeight;
    
    ctx.fillStyle = data.datasets[0].backgroundColor;
    ctx.fillRect(x, y, barWidth, barHeight);
  });
}

// Staff cards initialization
function initializeStaffCards() {
  const staffGrid = document.getElementById('staffCards');
  if (!staffGrid) return;
  
  const staffData = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      specialty: 'General Medicine',
      experience: '15 years',
      availability: 'Available',
      contact: '+91 98765 43210'
    },
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Emergency Medicine',
      specialty: 'Emergency Care',
      experience: '12 years',
      availability: 'On Call',
      contact: '+91 98765 43211'
    },
    {
      name: 'Nurse Priya',
      role: 'Senior Staff Nurse',
      specialty: 'Patient Care',
      experience: '8 years',
      availability: 'Available',
      contact: '+91 98765 43212'
    },
    {
      name: 'Dr. Anil Kumar',
      role: 'Lab Technician',
      specialty: 'Diagnostics',
      experience: '10 years',
      availability: 'Available',
      contact: '+91 98765 43213'
    }
  ];
  
  staffGrid.innerHTML = staffData.map(staff => `
    <div class="staff-card">
      <div class="staff-avatar">${staff.name.split(' ').map(n => n[0]).join('')}</div>
      <div class="staff-info">
        <h4>${staff.name}</h4>
        <p class="staff-role">${staff.role}</p>
        <p class="staff-specialty">${staff.specialty}</p>
        <div class="staff-details">
          <span class="experience">${staff.experience}</span>
          <span class="availability ${staff.availability.toLowerCase().replace(' ', '-')}">${staff.availability}</span>
        </div>
        <div class="staff-contact">
          <i class="fas fa-phone"></i>
          <span>${staff.contact}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Toast notification system
function showToast(message, type = 'info') {
  // Create notification element
  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <i class="fas fa-${getToastIcon(type)}"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add styles
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--white);
    border: 1px solid var(--border-light);
    border-radius: 8px;
    padding: 16px 20px;
    color: var(--text-dark);
    box-shadow: var(--shadow-lg);
    z-index: 3000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
    display: flex;
    align-items: center;
    gap: 12px;
  `;
  
  // Add to document
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

function getToastIcon(type) {
  const icons = {
    success: 'check-circle',
    error: 'exclamation-circle',
    warning: 'exclamation-triangle',
    info: 'info-circle'
  };
  return icons[type] || 'info-circle';
}

// Patient management functions
function viewPatientDetails(patientId) {
  console.log('Viewing patient details for:', patientId);
  showToast(`Opening patient details for ${patientId}`, 'info');
}

function editPatient() {
  showToast('Edit patient functionality coming soon!', 'info');
}

function scheduleAppointment() {
  showToast('Schedule appointment functionality coming soon!', 'info');
}

function viewMedicalHistory() {
  showToast('Medical history functionality coming soon!', 'info');
}

function printPatientInfo() {
  showToast('Print functionality coming soon!', 'info');
}

// Sidebar Overlay functionality
function initializeSidebarOverlays() {
  // Add Patient Overlay
  const addPatientNav = document.getElementById('addPatientNav');
  const addPatientOverlay = document.getElementById('addPatientOverlay');
  
  if (addPatientNav && addPatientOverlay) {
    addPatientNav.addEventListener('click', function(e) {
      e.preventDefault();
      addPatientOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  }

  // All Patients Overlay
  const allPatientsNav = document.getElementById('allPatientsNav');
  const allPatientsOverlay = document.getElementById('allPatientsOverlay');
  
  if (allPatientsNav && allPatientsOverlay) {
    allPatientsNav.addEventListener('click', function(e) {
      e.preventDefault();
      allPatientsOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  }

  // Upload Reports Overlay
  const uploadReportsNav = document.getElementById('uploadReportsNav');
  const uploadReportsOverlay = document.getElementById('uploadReportsOverlay');
  
  if (uploadReportsNav && uploadReportsOverlay) {
    uploadReportsNav.addEventListener('click', function(e) {
      e.preventDefault();
      uploadReportsOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  }

  // Generate Reports Overlay
  const generateReportsNav = document.getElementById('generateReportsNav');
  const generateReportsOverlay = document.getElementById('generateReportsOverlay');
  
  if (generateReportsNav && generateReportsOverlay) {
    generateReportsNav.addEventListener('click', function(e) {
      e.preventDefault();
      generateReportsOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  }

  // Medical Staff functionality
  const medicalStaffNav = document.querySelector('.nav-item:has(.fa-user-md)');
  if (medicalStaffNav) {
    medicalStaffNav.addEventListener('click', function(e) {
      e.preventDefault();
      showMedicalStaffModal();
    });
  }

  // Settings functionality
  const settingsNav = document.querySelector('.nav-item:has(.fa-cog)');
  if (settingsNav) {
    settingsNav.addEventListener('click', function(e) {
      e.preventDefault();
      showSettingsModal();
      // Initialize settings tabs after modal is shown
      setTimeout(() => {
        initializeSettingsTabs();
      }, 100);
    });
  }

  // Logout functionality
  const logoutNav = document.querySelector('.nav-item:has(.fa-sign-out-alt)');
  if (logoutNav) {
    logoutNav.addEventListener('click', function(e) {
      e.preventDefault();
      handleLogout();
    });
  }

  // Close overlay functionality
  const closeButtons = document.querySelectorAll('[data-close-overlay]');
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const overlay = this.closest('.overlay');
      if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Close modal functionality using event delegation
  document.addEventListener('click', function(e) {
    if (e.target.matches('[data-close-modal]')) {
      const modal = e.target.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    }
  });

  // Close overlay when clicking outside
  const overlays = document.querySelectorAll('.overlay');
  overlays.forEach(overlay => {
    overlay.addEventListener('click', function(e) {
      if (e.target === this) {
        this.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Close modal when clicking outside using event delegation
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Form submission handlers
  const addPatientForm = document.getElementById('addPatientOverlayForm');
  if (addPatientForm) {
    addPatientForm.addEventListener('submit', function(e) {
      e.preventDefault();
      showToast('Patient added successfully!', 'success');
      this.reset();
      addPatientOverlay.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }

  const uploadReportForm = document.getElementById('uploadReportOverlayForm');
  if (uploadReportForm) {
    uploadReportForm.addEventListener('submit', function(e) {
      e.preventDefault();
      showToast('Report uploaded successfully!', 'success');
      this.reset();
      uploadReportsOverlay.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }

  const generateReportForm = document.getElementById('generateReportOverlayForm');
  if (generateReportForm) {
    generateReportForm.addEventListener('submit', function(e) {
      e.preventDefault();
      showToast('Report generated successfully!', 'success');
      this.reset();
      generateReportsOverlay.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }
}

// Initialize notification enhancements
function initializeNotificationEnhancements() {
  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      filterNotifications(filter);
    });
  });

  // Mark all as read button
  const markAllReadBtn = document.getElementById('markAllReadBtn');
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', markAllAsRead);
  }

  // Clear all button
  const clearAllBtn = document.getElementById('clearAllBtn');
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', clearAllNotifications);
  }

  // Initialize notification count
  renderNotifications();
}

// Staff management functions
function addNewStaff() {
  showToast('Add new staff functionality coming soon!', 'info');
}

function editStaff(staffId) {
  showToast(`Edit staff ${staffId} functionality coming soon!`, 'info');
}

function removeStaff(staffId) {
  if (confirm('Are you sure you want to remove this staff member?')) {
    showToast(`Staff member ${staffId} removed successfully!`, 'success');
  }
}

function exportStaffData() {
  showToast('Staff data export functionality coming soon!', 'info');
}

// Settings functions
function saveSettings() {
  showToast('Settings saved successfully!', 'success');
  const modal = document.getElementById('settingsModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

function createBackup() {
  showToast('Creating backup...', 'info');
  setTimeout(() => {
    showToast('Backup created successfully!', 'success');
  }, 2000);
}

function restoreBackup() {
  showToast('Restore backup functionality coming soon!', 'info');
}

// Initialize settings tabs
function initializeSettingsTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));
      
      // Add active class to clicked button and corresponding panel
      this.classList.add('active');
      const targetPanel = document.getElementById(`${targetTab}-tab`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

// Close modal function
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Close all modals function
function closeAllModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.style.display = 'none';
  });
  document.body.style.overflow = 'auto';
}

// Logout functionality
function handleLogout() {
  // Show confirmation dialog
  if (confirm('Are you sure you want to logout?')) {
    // Show loading message
    showToast('Logging out...', 'info');
    
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('healthcareProfile');
    
    // Simulate logout delay
    setTimeout(() => {
      showToast('Logged out successfully!', 'success');
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = '../login/login.html';
      }, 1500);
    }, 1000);
  }
}

// Export functions for global access
window.viewPatientDetails = viewPatientDetails;
window.editPatient = editPatient;
window.scheduleAppointment = scheduleAppointment;
window.viewMedicalHistory = viewMedicalHistory;
window.printPatientInfo = printPatientInfo;
window.markAsRead = markAsRead;
window.markAllAsRead = markAllAsRead;
window.clearAllNotifications = clearAllNotifications;
window.filterNotifications = filterNotifications;
window.addNewStaff = addNewStaff;
window.editStaff = editStaff;
window.removeStaff = removeStaff;
window.exportStaffData = exportStaffData;
window.saveSettings = saveSettings;
window.createBackup = createBackup;
window.restoreBackup = restoreBackup;
window.closeModal = closeModal;
window.closeAllModals = closeAllModals;
window.handleLogout = handleLogout;