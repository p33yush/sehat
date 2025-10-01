// Worker Dashboard JavaScript

console.log('=== Worker Dashboard JavaScript Loading ===');
alert('JavaScript is loading! Check console for details.');

// ============ API Configuration ============
const API_BASE_URL = 'http://127.0.0.1:5000'; // Backend server URL
const API_ENDPOINTS = {
  workerDashboard: '/api/worker/dashboard',
  workerProfile: '/api/worker/profile',
  healthRecords: '/api/worker/health-records',
  healthStats: '/api/worker/health-stats',
  healthStatus: '/api/worker/health-stats',
  appointments: '/api/worker/health-records',
  medicalRecords: '/api/worker/health-records',
  notifications: '/api/worker/notifications',
  nearbyCenters: '/api/worker/healthcare-centers/nearby',
  updateWorker: '/api/worker/profile',
};

// ============ API Utility Functions ============
async function apiCall(endpoint, method = 'GET', data = null) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`, // Get from localStorage or session
      },
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
    // Return fallback data or show error message
    return getFallbackData(endpoint);
  }
}

// ============ Worker Dashboard Functions ============
async function loadWorkerDashboard() {
  try {
    console.log('Loading worker dashboard data...');
    const response = await apiCall(API_ENDPOINTS.workerDashboard);
    
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

async function loadWorkerHealthRecords() {
  try {
    console.log('Loading worker health records...');
    const response = await apiCall(API_ENDPOINTS.healthRecords);
    
    if (response.success) {
      console.log('Health records loaded:', response.data);
      updateHealthRecordsUI(response.data);
    } else {
      console.error('Failed to load health records:', response.message);
    }
  } catch (error) {
    console.error('Error loading health records:', error);
  }
}

async function loadWorkerHealthStats() {
  try {
    console.log('Loading worker health statistics...');
    const response = await apiCall(API_ENDPOINTS.healthStats);
    
    if (response.success) {
      console.log('Health stats loaded:', response.data);
      updateHealthStatsUI(response.data);
    } else {
      console.error('Failed to load health stats:', response.message);
    }
  } catch (error) {
    console.error('Error loading health stats:', error);
  }
}

async function loadNearbyHealthcareCenters() {
  try {
    console.log('Loading nearby healthcare centers...');
    // Get user's location (you can implement geolocation here)
    const response = await apiCall(`${API_ENDPOINTS.nearbyCenters}?lat=10.8505&lng=76.2711`);
    
    if (response.success) {
      console.log('Nearby centers loaded:', response.data);
      updateNearbyCentersUI(response.data);
    } else {
      console.error('Failed to load nearby centers:', response.message);
    }
  } catch (error) {
    console.error('Error loading nearby centers:', error);
  }
}

// ============ UI Update Functions ============
function updateDashboardUI(data) {
  // Update worker profile
  if (data.worker) {
    const workerName = document.getElementById('workerName');
    const workerEmail = document.getElementById('workerEmail');
    const workerPhone = document.getElementById('workerPhone');
    
    if (workerName) workerName.textContent = `${data.worker.profile.firstName} ${data.worker.profile.lastName}`;
    if (workerEmail) workerEmail.textContent = data.worker.email;
    if (workerPhone) workerPhone.textContent = data.worker.profile.phone;
  }
  
  // Update statistics
  if (data.stats) {
    const totalRecords = document.getElementById('totalRecords');
    const recentRecords = document.getElementById('recentRecords');
    const lastCheckup = document.getElementById('lastCheckup');
    
    if (totalRecords) totalRecords.textContent = data.stats.totalRecords;
    if (recentRecords) recentRecords.textContent = data.stats.recentRecords;
    if (lastCheckup) lastCheckup.textContent = data.stats.lastCheckup ? new Date(data.stats.lastCheckup).toLocaleDateString() : 'No recent checkup';
  }
}

function updateHealthRecordsUI(data) {
  const recordsContainer = document.getElementById('healthRecordsContainer');
  if (!recordsContainer) return;
  
  let html = '';
  data.healthRecords.forEach(record => {
    html += `
      <div class="health-record-card">
        <div class="record-header">
          <h4>${record.recordType.charAt(0).toUpperCase() + record.recordType.slice(1)}</h4>
          <span class="record-date">${new Date(record.date).toLocaleDateString()}</span>
        </div>
        <div class="record-details">
          <p><strong>Diagnosis:</strong> ${record.diagnosis || 'N/A'}</p>
          <p><strong>Treatment:</strong> ${record.treatment || 'N/A'}</p>
          <p><strong>Healthcare Center:</strong> ${record.healthcareCenterId?.name || 'N/A'}</p>
        </div>
        <div class="record-status">
          <span class="status-badge ${record.status}">${record.status}</span>
        </div>
      </div>
    `;
  });
  
  recordsContainer.innerHTML = html;
}

function updateHealthStatsUI(data) {
  // Update health statistics charts or displays
  console.log('Updating health stats UI with:', data);
}

function updateNearbyCentersUI(data) {
  const centersContainer = document.getElementById('nearbyCentersContainer');
  if (!centersContainer) return;
  
  let html = '';
  data.forEach(center => {
    html += `
      <div class="healthcare-center-card">
        <h4>${center.name}</h4>
        <p><strong>Type:</strong> ${center.type}</p>
        <p><strong>Address:</strong> ${center.address?.street}, ${center.address?.city}</p>
        <p><strong>Phone:</strong> ${center.contact?.phone || 'N/A'}</p>
        <p><strong>Services:</strong> ${center.services?.join(', ') || 'N/A'}</p>
      </div>
    `;
  });
  
  centersContainer.innerHTML = html;
}
// ============ Initialize Dashboard ============
document.addEventListener('DOMContentLoaded', function() {
  console.log('Worker Dashboard initialized');
  
  // Load dashboard data
  loadWorkerDashboard();
  loadWorkerHealthRecords();
  loadWorkerHealthStats();
  loadNearbyHealthcareCenters();
  
  // Set up event listeners
  setupEventListeners();
});

function setupEventListeners() {
  // Add any event listeners for buttons, forms, etc.
  console.log('Setting up event listeners...');
}

// coursal
const images = [
  '../assets/ad1.jpg',
  '../assets/ad2.jpg',
  '../assets/ad3.jpg',
  '../assets/ad4.jpg',
];

let index = 0;
const slide = document.getElementById('slide');

// Show first image
slide.src = images[index];

// Change image every 3 seconds
setInterval(() => {
  index = (index + 1) % images.length;
  slide.src = images[index];
}, 3000);

function getAuthToken() {
  // Get authentication token from localStorage or session
  return localStorage.getItem('token') || localStorage.getItem('authToken') || 'demo-token';
}

function getFallbackData(endpoint) {
  // Return fallback data when API fails
  const fallbackData = {
    '/api/worker/profile': {
      fullName: 'Ansh Kumar',
      workerId: 'KL2024-MW-00123',
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
      currentStatus: 'Healthy',
      lastCheckup: '2024-12-08',
      nextAppointment: '2024-12-28',
      vaccinationStatus: 'Up to Date',
    },
    '/api/worker/health-status': {
      status: 'Healthy',
      lastCheckup: '2024-12-08',
      daysSinceLastCheckup: 15,
      issues: [],
    },
    '/api/worker/appointments': {
      nextAppointment: {
        date: '2024-12-28',
        type: 'Routine Health Checkup',
        daysUntil: 5,
      },
    },
    '/api/worker/medical-records': [],
    '/api/worker/notifications': [],
    '/api/healthcare/providers': [
      { value: 'primary', label: 'Primary Health Center' },
      { value: 'community', label: 'Community Health Center' },
      { value: 'district', label: 'District Hospital' },
      { value: 'specialty', label: 'Specialty Clinic' },
    ],
    '/api/healthcare/doctors': [
      { value: 'dr1', label: 'Dr. സുമിത്ര നായർ (General Physician)' },
      { value: 'dr2', label: 'Dr. Rajesh Kumar (Occupational Health)' },
      { value: 'dr3', label: 'Dr. Priya Sharma (Internal Medicine)' },
      { value: 'dr4', label: 'Dr. Anil Menon (Pulmonology)' },
    ],
    '/api/healthcare/appointment-slots': [
      { value: '09:00-10:00', label: '09:00 AM - 10:00 AM' },
      { value: '10:00-11:00', label: '10:00 AM - 11:00 AM' },
      { value: '11:00-12:00', label: '11:00 AM - 12:00 PM' },
      { value: '14:00-15:00', label: '02:00 PM - 03:00 PM' },
      { value: '15:00-16:00', label: '03:00 PM - 04:00 PM' },
      { value: '16:00-17:00', label: '04:00 PM - 05:00 PM' },
    ],
  };

  return fallbackData[endpoint] || null;
}

// Global popup functions (available immediately)
function openPopup(popupId) {
  console.log('Attempting to open popup:', popupId);
  const popup = document.getElementById(popupId);
  console.log('Popup element found:', !!popup);

  if (popup) {
    popup.classList.add('active');
    popup.style.display = 'flex'; // Ensure it's visible
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    console.log('Popup opened successfully');

    // Populate data based on popup type
    if (popupId === 'notificationPopup') {
      populateNotifications();
    } else if (popupId === 'bookCheckupPopup') {
      populatePatientInfo();
    } else if (popupId === 'viewRecordPopup') {
      console.log(
        'Opening viewRecordPopup, calling populateRecentHealthRecords'
      );
      populateRecentHealthRecords();
    } else if (popupId === 'migrantWorkerPopup') {
      // Data is already static in HTML
    }
  } else {
    console.error('Popup not found:', popupId);
  }
}

function closePopup(popupId) {
  console.log('Attempting to close popup:', popupId);
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.classList.remove('active');
    popup.style.display = 'none'; // Ensure it's hidden
    document.body.style.overflow = 'auto'; // Restore scrolling
    console.log('Popup closed successfully');
  } else {
    console.error('Popup not found for closing:', popupId);
  }
}

// Dynamic data variables (will be populated from API)
let workerProfile = null;
let healthStatus = null;
let appointments = null;
let medicalRecords = [];
let notifications = [];
let healthcareProviders = [];
let doctors = [];
let appointmentSlots = [];

// Legacy variables for backward compatibility
let sampleNotifications = [];
let patientData = {};
let healthRecords = [];

// ============ Data Loading Functions ============

async function loadWorkerProfile() {
  console.log('Loading worker profile...');
  try {
    const response = await apiCall(API_ENDPOINTS.workerProfile);
    console.log('Worker profile API response:', response);
    
    if (response && response.success) {
      workerProfile = response.data;
      console.log('Worker profile data:', workerProfile);

      // Update patient data for backward compatibility with real data
      const age = workerProfile.profile.dob ? 
        Math.floor((new Date() - new Date(workerProfile.profile.dob)) / (365.25 * 24 * 60 * 60 * 1000)) : 'N/A';
      
      patientData = {
        name: `${workerProfile.profile.firstName} ${workerProfile.profile.lastName}`,
        workerId: workerProfile._id,
        age: `${age} years`,
        contact: workerProfile.profile.phone,
        bloodGroup: workerProfile.profile.bloodGroup || 'N/A',
        allergies: workerProfile.profile.allergies || 'N/A',
        chronicConditions: workerProfile.profile.chronicConditions || 'N/A',
      };

      // Update UI elements with real data
      updateWorkerProfileUI();
      console.log('Worker profile loaded successfully with real data:', workerProfile);
    } else {
      console.error('Worker profile API failed:', response?.message || 'No response');
      
      // Try to get user data from localStorage as fallback
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        console.log('Using fallback user data from localStorage:', user);
        
        // Create a mock worker profile from localStorage data
        workerProfile = {
          _id: user._id || 'temp-id',
          profile: user.profile || {
            firstName: user.firstName || 'Worker',
            lastName: user.lastName || 'User',
            phone: user.phone || 'N/A',
            dob: user.dob || null,
            gender: user.gender || 'N/A',
            bloodGroup: user.bloodGroup || 'N/A',
            occupation: user.occupation || 'Worker',
            workLocation: user.workLocation || 'Work Site'
          }
        };
        
        updateWorkerProfileUI();
        console.log('Using fallback worker profile:', workerProfile);
      }
    }
  } catch (error) {
    console.error('Error loading worker profile:', error);
    
    // Try to get user data from localStorage as fallback
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      console.log('Using fallback user data from localStorage:', user);
      
      // Create a mock worker profile from localStorage data
      workerProfile = {
        _id: user._id || 'temp-id',
        profile: user.profile || {
          firstName: user.firstName || 'Worker',
          lastName: user.lastName || 'User',
          phone: user.phone || 'N/A',
          dob: user.dob || null,
          gender: user.gender || 'N/A',
          bloodGroup: user.bloodGroup || 'N/A',
          occupation: user.occupation || 'Worker',
          workLocation: user.workLocation || 'Work Site'
        }
      };
      
      updateWorkerProfileUI();
      console.log('Using fallback worker profile:', workerProfile);
    }
  }
}

async function loadHealthStatus() {
  console.log('Loading health status...');
  try {
    const response = await apiCall(API_ENDPOINTS.healthStats);
    
    // Create health status from backend data
    healthStatus = {
      status: response.data?.healthStatus || 'Healthy',
      lastCheckup: response.data?.lastCheckup || null,
      daysSinceLastCheckup: response.data?.daysSinceLastCheckup || 0,
      issues: response.data?.issues || []
    };
    
    updateHealthStatusUI();
    console.log('Health status loaded successfully:', healthStatus);
  } catch (error) {
    console.error('Error loading health status:', error);
    // Use fallback data
    healthStatus = {
      status: 'Healthy',
      lastCheckup: null,
      daysSinceLastCheckup: 0,
      issues: []
    };
    updateHealthStatusUI();
  }
}

async function loadAppointments() {
  console.log('Loading appointments...');
  try {
    const response = await apiCall(API_ENDPOINTS.healthRecords);
    
    // Create appointments from backend data
    const recentRecords = response.data?.healthRecords || [];
    const nextAppointment = recentRecords.find(record => 
      new Date(record.date) > new Date()
    ) || null;
    
    appointments = {
      nextAppointment: nextAppointment ? {
        date: nextAppointment.date,
        type: nextAppointment.recordType || 'Health Checkup',
        daysUntil: Math.ceil((new Date(nextAppointment.date) - new Date()) / (1000 * 60 * 60 * 24))
      } : null
    };
    
    updateAppointmentsUI();
    console.log('Appointments loaded successfully:', appointments);
  } catch (error) {
    console.error('Error loading appointments:', error);
    // Use fallback data
    appointments = {
      nextAppointment: null
    };
    updateAppointmentsUI();
  }
}

async function loadMedicalRecords() {
  console.log('Loading medical records...');
  try {
    const response = await apiCall(API_ENDPOINTS.healthRecords);
    
    // Get health records from backend
    medicalRecords = response.data?.healthRecords || [];
    
    // Update healthRecords for backward compatibility
    healthRecords = medicalRecords.map((record) => ({
      id: record._id,
      date: formatDate(record.date),
      type: record.recordType || 'Health Checkup',
      doctor: record.doctorName || 'Dr. Unknown',
      diagnosis: record.diagnosis || 'No diagnosis',
      treatment: record.treatment || 'No treatment',
      vitalSigns: record.vitalSigns || {},
      notes: record.notes || 'No notes',
      status: record.status || 'Completed',
      icon: getRecordIcon(record.recordType || 'Health Checkup'),
    }));

    updateMedicalRecordsUI();
    console.log('Medical records loaded successfully:', healthRecords);
  } catch (error) {
    console.error('Error loading medical records:', error);
    // Use fallback data
    medicalRecords = [];
    healthRecords = [];
    updateMedicalRecordsUI();
  }
}

async function loadNotifications() {
  console.log('Loading notifications...');
  try {
    const response = await apiCall(API_ENDPOINTS.notifications);
    
    // Get notifications from backend
    notifications = response.data?.notifications || [];
    
    // Update sampleNotifications for backward compatibility
    sampleNotifications = notifications.map((notification) => ({
      id: notification._id,
      icon: getNotificationIcon(notification.type),
      title: notification.title,
      message: notification.message,
      time: formatTimeAgo(notification.createdAt),
      type: notification.type,
    }));

    updateNotificationsUI();
    console.log('Notifications loaded successfully:', sampleNotifications);
  } catch (error) {
    console.error('Error loading notifications:', error);
    // Use fallback data
    notifications = [];
    sampleNotifications = [];
    updateNotificationsUI();
  }
}

async function loadHealthcareProviders() {
  console.log('Loading healthcare providers...');
  try {
    const response = await apiCall(API_ENDPOINTS.nearbyCenters);
    
    // Get healthcare providers from backend
    healthcareProviders = (response.data?.healthcareCenters || []).map(center => ({
      value: center._id,
      label: center.name
    }));
    
    updateHealthcareProvidersUI();
    console.log('Healthcare providers loaded successfully:', healthcareProviders);
  } catch (error) {
    console.error('Error loading healthcare providers:', error);
    // Use fallback data
    healthcareProviders = [
      { value: 'primary', label: 'Primary Health Center' },
      { value: 'community', label: 'Community Health Center' },
      { value: 'district', label: 'District Hospital' }
    ];
    updateHealthcareProvidersUI();
  }
}

async function loadDoctors() {
  console.log('Loading doctors...');
  try {
    // For now, use fallback data as doctors endpoint might not exist
    doctors = [
      { value: 'dr1', label: 'Dr. Smith' },
      { value: 'dr2', label: 'Dr. Johnson' },
      { value: 'dr3', label: 'Dr. Williams' }
    ];
    updateDoctorsUI();
    console.log('Doctors loaded successfully:', doctors);
  } catch (error) {
    console.error('Error loading doctors:', error);
    doctors = [];
    updateDoctorsUI();
  }
}

async function loadAppointmentSlots() {
  console.log('Loading appointment slots...');
  try {
    // For now, use fallback data as appointment slots endpoint might not exist
    appointmentSlots = [
      { value: 'morning', label: 'Morning (9:00 AM - 12:00 PM)' },
      { value: 'afternoon', label: 'Afternoon (1:00 PM - 5:00 PM)' },
      { value: 'evening', label: 'Evening (6:00 PM - 8:00 PM)' }
    ];
    updateAppointmentSlotsUI();
    console.log('Appointment slots loaded successfully:', appointmentSlots);
  } catch (error) {
    console.error('Error loading appointment slots:', error);
    appointmentSlots = [];
    updateAppointmentSlotsUI();
  }
}

// ============ UI Update Functions ============

function updateWorkerProfileUI() {
  if (!workerProfile) {
    console.log('No worker profile data available');
    return;
  }

  console.log('Updating worker profile UI with data:', workerProfile);

  // Update header user info
  const userNameElement = document.querySelector('.user-name');
  if (userNameElement) {
    userNameElement.textContent = workerProfile.profile.firstName;
    console.log('Updated user name:', workerProfile.profile.firstName);
  }

  // Update welcome section with dynamic data
  const welcomeTitle = document.getElementById('welcomeTitle');
  if (welcomeTitle) {
    welcomeTitle.textContent = `Welcome, ${workerProfile.profile.firstName} ${workerProfile.profile.lastName}`;
    console.log('Updated welcome title');
  }

  const welcomeInfo = document.getElementById('welcomeInfo');
  if (welcomeInfo) {
    welcomeInfo.textContent = `Worker ID: ${workerProfile._id} | ${workerProfile.profile.occupation || 'Worker'} | ${workerProfile.profile.workLocation || 'Work Site'}`;
    console.log('Updated welcome info');
  }

  // Update ALL dashboard elements with registered data
  updateAllDashboardElements();

  // Update migrant worker popup with real data
  updateMigrantWorkerPopup();

  console.log('Worker profile UI updated successfully');
}

function updateAllDashboardElements() {
  if (!workerProfile) return;

  // Update patient info in book checkup popup
  const patientName = document.getElementById('patientName');
  if (patientName) {
    patientName.textContent = `${workerProfile.profile.firstName} ${workerProfile.profile.lastName}`;
  }

  const workerId = document.getElementById('workerId');
  if (workerId) {
    workerId.textContent = workerProfile._id;
  }

  // Update summary elements
  const summaryName = document.getElementById('summaryName');
  if (summaryName) {
    summaryName.textContent = `${workerProfile.profile.firstName} ${workerProfile.profile.lastName}`;
  }

  const summaryWorkerId = document.getElementById('summaryWorkerId');
  if (summaryWorkerId) {
    summaryWorkerId.textContent = workerProfile._id;
  }

  // Update QR code text and generate QR code
  const qrWorkerId = document.getElementById('qrWorkerId');
  if (qrWorkerId) {
    qrWorkerId.textContent = workerProfile._id;
  }
  
  // Generate QR code with actual worker ID
  generateQRCode(workerProfile._id);

  // Update worker name and role in popup
  const workerName = document.getElementById('workerName');
  if (workerName) {
    workerName.textContent = `${workerProfile.profile.firstName} ${workerProfile.profile.lastName}`;
  }

  const workerRole = document.getElementById('workerRole');
  if (workerRole) {
    workerRole.textContent = workerProfile.profile.occupation || 'Worker';
  }

  // Update full name in details
  const fullName = document.getElementById('fullName');
  if (fullName) {
    fullName.textContent = `${workerProfile.profile.firstName} ${workerProfile.profile.lastName}`;
  }

  console.log('All dashboard elements updated with registered worker data');
}

function updateHealthStatusUI() {
  if (!healthStatus) return;

  const statusMain = document.querySelector('.status-main');
  const statusDetail = document.querySelector('.status-detail');
  const statusBtn = document.querySelector('.status-btn');

  if (statusMain) {
    statusMain.textContent = healthStatus.status;
  }

  if (statusDetail) {
    statusDetail.textContent = `Last checkup: ${healthStatus.daysSinceLastCheckup} days ago`;
  }

  if (statusBtn) {
    statusBtn.textContent =
      healthStatus.issues.length > 0
        ? `${healthStatus.issues.length} Issues Found`
        : 'No Issues Found';
  }
}

function updateAppointmentsUI() {
  if (!appointments || !appointments.nextAppointment) return;

  const appointmentDate = document.querySelector('.appointment-date');
  const appointmentType = document.querySelector('.appointment-type');
  const countdown = document.querySelector('.countdown span:last-child');

  if (appointmentDate) {
    appointmentDate.textContent = formatDateShort(
      appointments.nextAppointment.date
    );
  }

  if (appointmentType) {
    appointmentType.textContent = appointments.nextAppointment.type;
  }

  if (countdown) {
    countdown.textContent = `In ${appointments.nextAppointment.daysUntil} days`;
  }
}

function updateMedicalRecordsUI() {
  // This will be handled by the existing showRecentRecords and showAllRecords functions
  // which use the healthRecords array that gets updated in loadMedicalRecords
}

function updateNotificationsUI() {
  // This will be handled by the existing populateNotifications function
  // which uses the sampleNotifications array that gets updated in loadNotifications
}

function updateHealthcareProvidersUI() {
  if (!healthcareProviders.length) return;

  const healthProviderSelect = document.getElementById('healthProvider');
  if (healthProviderSelect) {
    // Clear existing options except the first one
    while (healthProviderSelect.children.length > 1) {
      healthProviderSelect.removeChild(healthProviderSelect.lastChild);
    }

    // Add new options
    healthcareProviders.forEach((provider) => {
      const option = document.createElement('option');
      option.value = provider.value;
      option.textContent = provider.label;
      healthProviderSelect.appendChild(option);
    });
  }
}

function updateDoctorsUI() {
  if (!doctors.length) return;

  const doctorSelect = document.getElementById('doctor');
  if (doctorSelect) {
    // Clear existing options except the first one
    while (doctorSelect.children.length > 1) {
      doctorSelect.removeChild(doctorSelect.lastChild);
    }

    // Add new options
    doctors.forEach((doctor) => {
      const option = document.createElement('option');
      option.value = doctor.value;
      option.textContent = doctor.label;
      doctorSelect.appendChild(option);
    });
  }
}

function updateAppointmentSlotsUI() {
  if (!appointmentSlots.length) return;

  const timeSlotSelect = document.getElementById('timeSlot');
  if (timeSlotSelect) {
    // Clear existing options except the first one
    while (timeSlotSelect.children.length > 1) {
      timeSlotSelect.removeChild(timeSlotSelect.lastChild);
    }

    // Add new options
    appointmentSlots.forEach((slot) => {
      const option = document.createElement('option');
      option.value = slot.value;
      option.textContent = slot.label;
      timeSlotSelect.appendChild(option);
    });
  }
}

function updateMigrantWorkerPopup() {
  if (!workerProfile) return;

  // Calculate age from date of birth
  const age = workerProfile.profile.dob ? 
    Math.floor((new Date() - new Date(workerProfile.profile.dob)) / (365.25 * 24 * 60 * 60 * 1000)) : 'N/A';

  // Update all the detail elements in the migrant worker popup with real data from registration
  const elements = {
    workerName: `${workerProfile.profile.firstName} ${workerProfile.profile.lastName}`,
    workerRole: workerProfile.profile.occupation || 'Worker',
    workerId: `ID: ${workerProfile._id}`,
    fullName: `${workerProfile.profile.firstName} ${workerProfile.profile.lastName}`,
    dateOfBirth: workerProfile.profile.dob ? formatDateLong(workerProfile.profile.dob) : 'N/A',
    age: `${age} years`,
    gender: workerProfile.profile.gender || 'N/A',
    bloodGroup: workerProfile.profile.bloodGroup || 'N/A',
    maritalStatus: workerProfile.profile.maritalStatus || 'N/A',
    mobile: workerProfile.profile.phone,
    emergencyContact: workerProfile.profile.emergencyContact || 'N/A',
    address: workerProfile.profile.address || 'N/A',
    homeState: workerProfile.profile.homeState || 'N/A',
    jobRole: workerProfile.profile.occupation || 'Worker',
    workSite: workerProfile.profile.workLocation || 'N/A',
    startDate: workerProfile.profile.startDate ? formatDateLong(workerProfile.profile.startDate) : 'N/A',
    contractor: workerProfile.profile.contractor || 'N/A',
    workHours: workerProfile.profile.workHours || 'N/A',
    safetyTraining: workerProfile.profile.safetyTraining || 'N/A',
    currentStatus: workerProfile.isActive ? 'Active' : 'Inactive',
    lastCheckup: 'N/A', // Will be updated when health records are loaded
    nextAppointment: 'N/A', // Will be updated when appointments are loaded
    vaccinationStatus: workerProfile.profile.vaccinationStatus || 'N/A',
    allergies: workerProfile.profile.allergies || 'None known',
    chronicConditions: workerProfile.profile.chronicConditions || 'None',
  };

  Object.entries(elements).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  });
}

// ============ Utility Functions ============

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatDateShort(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function formatDateLong(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function getRecordIcon(type) {
  const iconMap = {
    'General Checkup': '❤️',
    'Occupational Health Assessment': '🏗️',
    'Vaccination Update': '💉',
    'Minor Injury Treatment': '🩹',
    'Pre-employment Medical': '✅',
    'Emergency Visit': '🚨',
    'Follow-up': '🔄',
  };
  return iconMap[type] || '📋';
}

function getNotificationIcon(type) {
  const iconMap = {
    'info': 'ℹ️',
    'warning': '⚠️',
    'error': '❌',
    'success': '✅',
    'system': '🔧',
  };
  return iconMap[type] || '📢';
}

function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

// ============ Main Data Loading Function ============

async function loadAllData() {
  console.log('Loading all data from APIs...');

  try {
    // Load all data in parallel for better performance
    await Promise.all([
      loadWorkerProfile(),
      loadHealthStatus(),
      loadAppointments(),
      loadMedicalRecords(),
      loadNotifications(),
      loadHealthcareProviders(),
      loadDoctors(),
      loadAppointmentSlots(),
    ]);

    // Initialize UI after data is loaded
    setTimeout(() => {
      populateRecentHealthRecords();
      populateNotifications();
      updateNotificationCount();
    }, 500);

    console.log('All data loaded successfully');
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Enhanced Notification System for Worker Dashboard
let workerNotifications = [
    {
        id: 1,
        title: "Health Checkup Reminder",
        message: "Your monthly health checkup is scheduled for tomorrow at 10:00 AM",
        type: "info",
        icon: "calendar-check",
        time: "2 hours ago",
        unread: true
    },
    {
        id: 2,
        title: "Vaccination Due",
        message: "Your annual vaccination is due. Please visit the health center",
        type: "urgent",
        icon: "syringe",
        time: "1 day ago",
        unread: true
    },
    {
        id: 3,
        title: "Health Record Updated",
        message: "Your latest health screening results have been added to your record",
        type: "success",
        icon: "file-medical",
        time: "3 days ago",
        unread: false
    },
    {
        id: 4,
        title: "Health Camp Notification",
        message: "Free health camp will be conducted at your work site next week",
        type: "info",
        icon: "hospital",
        time: "5 days ago",
        unread: false
    },
    {
        id: 5,
        title: "Insurance Renewal",
        message: "Your health insurance is due for renewal. Please contact admin",
        type: "warning",
        icon: "shield-alt",
        time: "1 week ago",
        unread: true
    }
];

let currentFilter = 'all';

// Show notification modal
function showNotificationModal() {
    const modal = document.getElementById('notificationPopup');
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
    
    let filteredNotifications = workerNotifications;
    if (currentFilter !== 'all') {
        filteredNotifications = workerNotifications.filter(notif => notif.type === currentFilter);
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
    const unreadCount = workerNotifications.filter(notif => notif.unread).length;
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
    const notification = workerNotifications.find(notif => notif.id === notificationId);
    if (notification) {
        notification.unread = false;
        renderNotifications();
    }
}

// Mark all notifications as read
function markAllAsRead() {
    workerNotifications.forEach(notif => notif.unread = false);
    renderNotifications();
    showToast('All notifications marked as read', 'success');
}

// Clear all notifications
function clearAllNotifications() {
    if (confirm('Are you sure you want to clear all notifications?')) {
        workerNotifications = [];
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
    
    const activeBtn = document.querySelector(`[data-filter="${filter}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    renderNotifications();
}

// Initialize enhanced notification system
function initializeEnhancedNotifications() {
    console.log('🔔 Initializing enhanced notification system for worker...');
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterNotifications(filter);
        });
    });
    
    // Mark all read button
    const markAllReadBtn = document.getElementById('markAllReadBtn');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', markAllAsRead);
    }
    
    // Clear all button
    const clearAllBtn = document.getElementById('clearAllBtn');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', clearAllNotifications);
    }
    
    // Initialize with current notifications
    renderNotifications();
    
    console.log('✅ Enhanced notification system initialized for worker');
}

// Legacy function for backward compatibility
function populateNotifications() {
    renderNotifications();
}

function updateNotificationCount() {
  const notificationCountElement = document.getElementById('notificationCount');
  if (notificationCountElement) {
    const count = sampleNotifications.length;
    notificationCountElement.textContent = count;

    // Hide badge if no notifications
    if (count === 0) {
      notificationCountElement.style.display = 'none';
    } else {
      notificationCountElement.style.display = 'block';
    }
  }
}

// Function to add a new notification
function addNotification(notification) {
  const newId = Math.max(...sampleNotifications.map((n) => n.id)) + 1;
  notification.id = newId;
  sampleNotifications.unshift(notification); // Add to beginning
  updateNotificationCount();

  // Refresh the notification list if popup is open
  const popup = document.getElementById('notificationPopup');
  if (popup && popup.classList.contains('active')) {
    populateNotifications();
  }
}

// Function to remove a notification
function removeNotification(notificationId) {
  const index = sampleNotifications.findIndex((n) => n.id === notificationId);
  if (index > -1) {
    sampleNotifications.splice(index, 1);
    updateNotificationCount();

    // Refresh the notification list if popup is open
    const popup = document.getElementById('notificationPopup');
    if (popup && popup.classList.contains('active')) {
      populateNotifications();
    }
  }
}

// Function to handle worker photo upload
function uploadWorkerPhoto() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        // Update both welcome section and popup photo
        const photoPlaceholders = document.querySelectorAll(
          '.photo-placeholder, .photo-placeholder-large'
        );
        photoPlaceholders.forEach((placeholder) => {
          placeholder.classList.add('has-photo');
          placeholder.innerHTML = `<img src="${e.target.result}" alt="Worker Photo">`;
        });
      };
      reader.readAsDataURL(file);
    }
  };
  input.click();
}

// Function to generate QR code
function generateQRCode(workerId) {
  const qrElement = document.getElementById('workerQRCode');
  if (qrElement) {
    // Create QR code using a simple pattern (simulated QR code)
    const qrSize = 120;
    const moduleSize = 4;
    const modules = Math.floor(qrSize / moduleSize);

    // Create canvas for QR code
    const canvas = document.createElement('canvas');
    canvas.width = qrSize;
    canvas.height = qrSize;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, qrSize, qrSize);

    // Generate QR-like pattern based on worker ID
    const hash = workerId.split('').reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

    // Draw QR-like pattern
    ctx.fillStyle = '#000000';
    for (let i = 0; i < modules; i++) {
      for (let j = 0; j < modules; j++) {
        // Create deterministic pattern based on position and hash
        const shouldFill =
          (i * modules + j + hash) % 3 === 0 ||
          (i < 3 && j < 3) || // Top-left corner
          (i < 3 && j >= modules - 3) || // Top-right corner
          (i >= modules - 3 && j < 3) || // Bottom-left corner
          (i === 6 && j < 9) || // Left timing pattern
          (j === 6 && i < 9); // Top timing pattern

        if (shouldFill) {
          ctx.fillRect(j * moduleSize, i * moduleSize, moduleSize, moduleSize);
        }
      }
    }

    // Add corner squares (finder patterns)
    const cornerSize = 7;
    const drawCorner = (x, y) => {
      // Outer square
      ctx.fillStyle = '#000000';
      ctx.fillRect(x, y, cornerSize * moduleSize, cornerSize * moduleSize);
      // Inner white square
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(
        x + moduleSize,
        y + moduleSize,
        5 * moduleSize,
        5 * moduleSize
      );
      // Center black square
      ctx.fillStyle = '#000000';
      ctx.fillRect(
        x + 2 * moduleSize,
        y + 2 * moduleSize,
        3 * moduleSize,
        3 * moduleSize
      );
    };

    // Draw finder patterns at corners
    drawCorner(0, 0);
    drawCorner((modules - 7) * moduleSize, 0);
    drawCorner(0, (modules - 7) * moduleSize);

    // Convert canvas to image and display
    const img = new Image();
    img.onload = function () {
      qrElement.innerHTML = '';
      qrElement.appendChild(img);
    };
    img.src = canvas.toDataURL();
  }
}

function populatePatientInfo() {
  const patientName = document.getElementById('patientName');
  const workerId = document.getElementById('workerId');
  const patientAge = document.getElementById('patientAge');
  const patientContact = document.getElementById('patientContact');

  if (patientName) patientName.textContent = patientData.name;
  if (workerId) workerId.textContent = patientData.workerId;
  if (patientAge) patientAge.textContent = patientData.age;
  if (patientContact) patientContact.textContent = patientData.contact;
}

function populateRecentHealthRecords() {
  console.log('populateRecentHealthRecords called');
  showSingleRecord();
}

function showRecentRecords() {
  const recordsList = document.querySelector('.records-list');
  console.log('showRecentRecords called, recordsList found:', !!recordsList);

  if (!recordsList) {
    console.error('records-list container not found');
    return;
  }

  // Clear existing records
  recordsList.innerHTML = '';
  console.log('Cleared existing records');

  // Get the 3 most recent records
  const recentRecords = healthRecords.slice(0, 3);
  console.log('Recent records:', recentRecords);

  recentRecords.forEach((record, index) => {
    console.log(`Creating record ${index + 1}:`, record.type);
    const recordItem = document.createElement('div');
    recordItem.className = 'record-item';
    recordItem.innerHTML = `
            <span class="record-icon">${record.icon}</span>
            <div class="record-details">
                <h4>${record.type}</h4>
                <p>${record.doctor}</p>
                <span class="record-date">${record.date}</span>
            </div>
            <span class="status-badge ${record.status
              .toLowerCase()
              .replace(' ', '-')}">${record.status}</span>
        `;

    // Add click event to show full record details
    recordItem.addEventListener('click', () => {
      showRecordDetails(record);
    });

    recordsList.appendChild(recordItem);
    console.log(`Added record ${index + 1} to DOM`);
  });

  // Ensure records are visible when populated
  recordsList.style.display = 'block';

  // Update button states
  const showBtn = document.getElementById('showRecordsBtn');
  const hideBtn = document.getElementById('hideRecordsBtn');
  if (showBtn) {
    showBtn.textContent = 'Show All Records';
    showBtn.classList.remove('btn-primary');
    showBtn.classList.add('btn-outline');
  }
  if (hideBtn) {
    hideBtn.textContent = 'Hide Records';
    hideBtn.classList.remove('btn-primary');
    hideBtn.classList.add('btn-secondary');
  }

  console.log('showRecentRecords completed');
}

function showAllRecords() {
  const recordsList = document.querySelector('.records-list');
  console.log('showAllRecords called, recordsList found:', !!recordsList);

  if (!recordsList) {
    console.error('records-list container not found');
    return;
  }

  // Clear existing records
  recordsList.innerHTML = '';
  console.log('Cleared existing records');

  // Get all 5 records
  console.log('All records:', healthRecords);

  healthRecords.forEach((record, index) => {
    console.log(`Creating record ${index + 1}:`, record.type);
    const recordItem = document.createElement('div');
    recordItem.className = 'record-item';
    recordItem.innerHTML = `
            <span class="record-icon">${record.icon}</span>
            <div class="record-details">
                <h4>${record.type}</h4>
                <p>${record.doctor}</p>
                <span class="record-date">${record.date}</span>
            </div>
            <span class="status-badge ${record.status
              .toLowerCase()
              .replace(' ', '-')}">${record.status}</span>
        `;

    // Add click event to show full record details
    recordItem.addEventListener('click', () => {
      showRecordDetails(record);
    });

    recordsList.appendChild(recordItem);
    console.log(`Added record ${index + 1} to DOM`);
  });

  // Ensure records are visible when populated
  recordsList.style.display = 'block';

  // Update button states
  const showBtn = document.getElementById('showRecordsBtn');
  const hideBtn = document.getElementById('hideRecordsBtn');
  if (showBtn) {
    showBtn.textContent = 'Show All Records';
    showBtn.classList.remove('btn-primary');
    showBtn.classList.add('btn-outline');
  }
  if (hideBtn) {
    hideBtn.textContent = 'Hide Records';
    hideBtn.classList.remove('btn-primary');
    hideBtn.classList.add('btn-secondary');
  }

  console.log('showAllRecords completed');
}

function showSingleRecord() {
  const recordsList = document.querySelector('.records-list');
  console.log('showSingleRecord called, recordsList found:', !!recordsList);

  if (!recordsList) {
    console.error('records-list container not found');
    return;
  }

  // Clear existing records
  recordsList.innerHTML = '';
  console.log('Cleared existing records');

  // Get only the most recent record
  const singleRecord = healthRecords.slice(0, 1);
  console.log('Single record:', singleRecord);

  singleRecord.forEach((record, index) => {
    console.log(`Creating record ${index + 1}:`, record.type);
    const recordItem = document.createElement('div');
    recordItem.className = 'record-item';
    recordItem.innerHTML = `
            <span class="record-icon">${record.icon}</span>
            <div class="record-details">
                <h4>${record.type}</h4>
                <p>${record.doctor}</p>
                <span class="record-date">${record.date}</span>
            </div>
            <span class="status-badge ${record.status
              .toLowerCase()
              .replace(' ', '-')}">${record.status}</span>
        `;

    // Add click event to show full record details
    recordItem.addEventListener('click', () => {
      showRecordDetails(record);
    });

    recordsList.appendChild(recordItem);
    console.log(`Added record ${index + 1} to DOM`);
  });

  // Ensure records are visible when populated
  recordsList.style.display = 'block';

  // Update button states
  const showBtn = document.getElementById('showRecordsBtn');
  const hideBtn = document.getElementById('hideRecordsBtn');
  if (showBtn) {
    showBtn.textContent = 'Show Recent Records';
    showBtn.classList.remove('btn-outline');
    showBtn.classList.add('btn-primary');
  }
  if (hideBtn) {
    hideBtn.textContent = 'Hide Records';
    hideBtn.classList.remove('btn-primary');
    hideBtn.classList.add('btn-secondary');
  }

  console.log('showSingleRecord completed');
}

function showRecordDetails(record) {
  // Create a modal or expand the record to show full details
  const modal = document.createElement('div');
  modal.className = 'record-details-modal';
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
    `;

  modal.innerHTML = `
        <div style="
            background: white;
            padding: 24px;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        ">
            <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 12px;
                border-bottom: 2px solid #e5e7eb;
            ">
                <h3 style="margin: 0; color: #008080; display: flex; align-items: center; gap: 8px;">
                    ${record.icon} ${record.type}
                </h3>
                <button onclick="this.closest('.record-details-modal').remove()" style="
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                ">&times;</button>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; justify-content: space-between;">
                    <strong>Date:</strong>
                    <span>${record.date}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <strong>Doctor:</strong>
                    <span>${record.doctor}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <strong>Diagnosis:</strong>
                    <span>${record.diagnosis}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <strong>Treatment:</strong>
                    <span>${record.treatment}</span>
                </div>
                ${
                  record.vitalSigns
                    ? `
                <div style="display: flex; justify-content: space-between;">
                    <strong>Vital Signs:</strong>
                    <span>${record.vitalSigns}</span>
                </div>
                `
                    : ''
                }
                ${
                  record.notes
                    ? `
                <div style="display: flex; justify-content: space-between;">
                    <strong>Notes:</strong>
                    <span>${record.notes}</span>
                </div>
                `
                    : ''
                }
                <div style="display: flex; justify-content: space-between;">
                    <strong>Status:</strong>
                    <span class="status-badge ${record.status
                      .toLowerCase()
                      .replace(' ', '-')}" style="
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-size: 0.8rem;
                        font-weight: 600;
                        background: #e0f2f1;
                        color: #008080;
                    ">${record.status}</span>
                </div>
            </div>
        </div>
    `;

  document.body.appendChild(modal);

  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('=== DOMContentLoaded Event Fired ===');

  // Initialize notification count
  updateNotificationCount();

  // Add click event to photo placeholders
  const photoPlaceholders = document.querySelectorAll(
    '.photo-placeholder, .photo-placeholder-large'
  );
  photoPlaceholders.forEach((placeholder) => {
    placeholder.addEventListener('click', uploadWorkerPhoto);
  });

  // Generate QR code for worker ID
  // Generate QR code will be called after worker profile is loaded
  generateQRCode('Loading...');

  // Load all data from APIs
  loadAllData();
  
  // Add a fallback check after 2 seconds to ensure data is loaded
  setTimeout(() => {
    if (!workerProfile) {
      console.log('No worker profile loaded after 2 seconds, checking localStorage...');
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        console.log('Found user data in localStorage:', user);
        
        // Create worker profile from localStorage
        workerProfile = {
          _id: user._id || 'temp-id',
          profile: user.profile || {
            firstName: user.firstName || 'Worker',
            lastName: user.lastName || 'User',
            phone: user.phone || 'N/A',
            dob: user.dob || null,
            gender: user.gender || 'N/A',
            bloodGroup: user.bloodGroup || 'N/A',
            occupation: user.occupation || 'Worker',
            workLocation: user.workLocation || 'Work Site'
          }
        };
        
        updateWorkerProfileUI();
        console.log('Worker profile created from localStorage:', workerProfile);
      }
    }
  }, 2000);

  // Initialize floating headlines
  initializeFloatingHeadlines();

  // Initialize record buttons with a small delay to ensure DOM is ready
  setTimeout(() => {
    initializeRecordButtons();
  }, 500);

  // Language dropdown functionality
  const langSelect = document.querySelector('.lang-select');
  const langTrigger = document.querySelector('.lang-trigger');
  const langDropdown = document.querySelector('.lang-dropdown');
  const langOptions = document.querySelectorAll('.lang-option');
  const langText = document.querySelector('.lang-text');

  // Toggle dropdown on click
  langTrigger.addEventListener('click', function (e) {
    e.stopPropagation();
    langDropdown.classList.toggle('active');
  });

  // Handle language option selection
  langOptions.forEach((option) => {
    option.addEventListener('click', function (e) {
      e.stopPropagation();

      // Remove selected class from all options
      langOptions.forEach((opt) => opt.classList.remove('selected'));

      // Add selected class to clicked option
      this.classList.add('selected');

      // Update the trigger text
      const selectedText = this.querySelector('span').textContent;
      langText.textContent = selectedText;

      // Get the language value
      const langValue = this.getAttribute('data-value');

      // Close dropdown
      langDropdown.classList.remove('active');

      // Update chatbot language
      currentLanguage = langValue;
      console.log('Selected language:', langValue);

      // Update chatbot welcome message in new language
      const welcomeMessage = chatbotResponses[langValue].greetings[0];
      addChatbotMessage(welcomeMessage, 'bot');

      // You can add actual language switching functionality here
      // For example, changing the page content based on selected language
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    if (!langSelect.contains(e.target)) {
      langDropdown.classList.remove('active');
    }
  });

  // Prevent dropdown from closing when clicking inside it
  langDropdown.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  // Enhanced Chatbot functionality
  const chatbotInput = document.querySelector('.chatbot-input input');
  const chatbotButton = document.querySelector('.chatbot-input button');
  const chatbotMessages = document.querySelector('.chatbot-messages');
  let currentLanguage = 'en'; // Default language

  // Debug: Check if elements are found
  console.log('Chatbot elements found:', {
    input: !!chatbotInput,
    button: !!chatbotButton,
    messages: !!chatbotMessages,
  });

  // Health-specific responses in multiple languages
  const chatbotResponses = {
    en: {
      greetings: [
        "Hello! I'm your health assistant. How can I help you today?",
        "Hi there! I'm here to help with your health queries.",
        'Welcome! What health information do you need?',
      ],
      health: {
        symptoms:
          "If you're experiencing symptoms, please describe them clearly. For serious symptoms, contact emergency services immediately. Common construction site health concerns include heat exhaustion, respiratory issues, and injuries.",
        appointment:
          "To book an appointment, click the 'Book Checkup' button on your dashboard or contact your site health officer. You can also call the health helpline at +91-XXX-XXXX-XXXX.",
        records:
          "You can view your health records by clicking 'View Full Record' or 'View All Records' on your dashboard. Your records include medical history, vaccinations, and workplace health assessments.",
        emergency:
          'For medical emergencies, call 108 immediately. Your emergency contacts are available in the right panel. For workplace accidents, also contact your supervisor immediately.',
        medication:
          'Please consult with your doctor before taking any medication. Keep track of your prescriptions in your health records. Never share medications with other workers.',
        checkup:
          'Your next checkup is scheduled for Dec 28. Regular checkups help maintain your health and safety at work. Bring your health card and any previous reports.',
        vaccination:
          "Make sure you're up to date with all required vaccinations. Check your vaccination records in your health profile.",
        safety:
          'Always wear PPE (Personal Protective Equipment), stay hydrated, take regular breaks, and report unsafe conditions immediately.',
        mental_health:
          "Mental health is important. If you're feeling stressed, anxious, or depressed, speak to your supervisor or contact the employee assistance program.",
      },
      general: {
        help: 'I can help you with: health information, appointment booking, emergency contacts, health records, and general health tips.',
        work: 'Your work location is Kochi Construction Site. Make sure to follow all safety protocols and report any health concerns immediately.',
        safety:
          'Always wear your safety equipment, stay hydrated, and report any workplace hazards to your supervisor.',
        thank_you:
          "You're welcome! I'm here to help with any health questions you have. Stay safe and healthy!",
        goodbye:
          "Take care! Remember to stay hydrated, wear your safety equipment, and don't hesitate to reach out if you need any health assistance.",
        first_aid:
          'For basic first aid: 1) Stop bleeding with clean cloth, 2) Clean wounds with water, 3) Apply bandage, 4) For serious injuries, call 108 immediately. Always have a first aid kit at your work site.',
        hydration:
          'Stay hydrated! Drink at least 8-10 glasses of water daily, especially in hot weather. Dehydration can cause dizziness, fatigue, and heat stroke.',
        nutrition:
          'Eat balanced meals with fruits, vegetables, proteins, and carbohydrates. Avoid skipping meals during work hours. Pack healthy snacks like nuts and fruits.',
        rest: 'Get 7-8 hours of sleep daily. Take regular breaks during work. Fatigue can lead to accidents and health problems.',
        hygiene:
          'Maintain good hygiene: wash hands frequently, keep work clothes clean, shower after work, and keep your living area clean to prevent infections.',
      },
      fallback:
        "I understand you're asking about health matters. Could you be more specific? I can help with appointments, records, emergencies, or general health information.",
    },
    ml: {
      greetings: [
        'നമസ്കാരം! ഞാൻ നിങ്ങളുടെ ആരോഗ്യ സഹായിയാണ്. ഇന്ന് എങ്ങനെ സഹായിക്കാം?',
        'ഹലോ! നിങ്ങളുടെ ആരോഗ്യ ചോദ്യങ്ങൾക്ക് ഞാൻ ഇവിടെയുണ്ട്.',
        'സ്വാഗതം! എന്ത് ആരോഗ്യ വിവരങ്ങളാണ് നിങ്ങൾക്ക് വേണ്ടത്?',
      ],
      health: {
        symptoms:
          'നിങ്ങൾ ലക്ഷണങ്ങൾ അനുഭവിക്കുന്നുവെങ്കിൽ, അവ വ്യക്തമായി വിവരിക്കുക. ഗുരുതരമായ ലക്ഷണങ്ങൾക്ക് ഉടനെ അടിയന്തിര സേവനങ്ങളെ ബന്ധപ്പെടുക. കൺസ്ട്രക്ഷൻ സൈറ്റിലെ പൊതുവായ ആരോഗ്യ പ്രശ്നങ്ങൾ ചൂട് ക്ഷീണം, ശ്വസന പ്രശ്നങ്ങൾ, പരിക്കുകൾ എന്നിവയാണ്.',
        appointment:
          "അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യാൻ, നിങ്ങളുടെ ഡാഷ്ബോർഡിലെ 'Book Checkup' ബട്ടൺ ക്ലിക്ക് ചെയ്യുക. നിങ്ങൾക്ക് ഹെൽത്ത് ഹെൽപ്ലൈനിൽ +91-XXX-XXXX-XXXX വിളിക്കാനും കഴിയും.",
        records:
          "നിങ്ങളുടെ ആരോഗ്യ റെക്കോർഡുകൾ കാണാൻ ഡാഷ്ബോർഡിലെ 'View Full Record' ക്ലിക്ക് ചെയ്യുക. നിങ്ങളുടെ റെക്കോർഡുകളിൽ മെഡിക്കൽ ഹിസ്റ്ററി, വാക്സിനേഷനുകൾ, ജോലിസ്ഥല ആരോഗ്യ വിലയിരുത്തലുകൾ എന്നിവ ഉൾപ്പെടുന്നു.",
        emergency:
          'ആരോഗ്യ അടിയന്തിര സാഹചര്യങ്ങൾക്ക് 108-നെ ഉടനെ വിളിക്കുക. നിങ്ങളുടെ അടിയന്തിര കോൺടാക്റ്റുകൾ വലത് പാനലിൽ ലഭ്യമാണ്. ജോലിസ്ഥല അപകടങ്ങൾക്ക്, നിങ്ങളുടെ സൂപ്പർവൈസറെയും ഉടനെ ബന്ധപ്പെടുക.',
        medication:
          'ഏതെങ്കിലും മരുന്ന് കഴിക്കുന്നതിന് മുമ്പ് നിങ്ങളുടെ ഡോക്ടറുമായി കൂടിയാലോചിക്കുക. നിങ്ങളുടെ ആരോഗ്യ റെക്കോർഡുകളിൽ നിങ്ങളുടെ പ്രിസ്ക്രിപ്ഷനുകൾ ട്രാക്ക് ചെയ്യുക. മറ്റ് തൊഴിലാളികളുമായി മരുന്നുകൾ പങ്കിടരുത്.',
        checkup:
          'നിങ്ങളുടെ അടുത്ത ചെക്കപ്പ് ഡിസംബർ 28-ന് ഷെഡ്യൂൾ ചെയ്തിരിക്കുന്നു. ക്രമമായ ചെക്കപ്പുകൾ ജോലിയിൽ നിങ്ങളുടെ ആരോഗ്യവും സുരക്ഷയും നിലനിർത്താൻ സഹായിക്കുന്നു. നിങ്ങളുടെ ആരോഗ്യ കാർഡും മുമ്പത്തെ റിപ്പോർട്ടുകളും കൊണ്ടുവരുക.',
        vaccination:
          'എല്ലാ ആവശ്യമായ വാക്സിനേഷനുകളും നിങ്ങൾ അപ്ഡേറ്റ് ചെയ്തിരിക്കുന്നുവെന്ന് ഉറപ്പാക്കുക. നിങ്ങളുടെ ആരോഗ്യ പ്രൊഫൈലിൽ നിങ്ങളുടെ വാക്സിനേഷൻ റെക്കോർഡുകൾ പരിശോധിക്കുക.',
        safety:
          'എപ്പോഴും PPE (വ്യക്തിഗത സംരക്ഷണ ഉപകരണങ്ങൾ) ധരിക്കുക, ഹൈഡ്രേറ്റഡ് ആയിരിക്കുക, ക്രമമായ ബ്രേക്കുകൾ എടുക്കുക, അസുരക്ഷിതമായ അവസ്ഥകൾ ഉടനെ റിപ്പോർട്ട് ചെയ്യുക.',
        mental_health:
          'മാനസികാരോഗ്യം പ്രധാനമാണ്. നിങ്ങൾ സമ്മർദ്ദം, വിഷാദം അല്ലെങ്കിൽ ഉത്കണ്ഠ അനുഭവിക്കുന്നുവെങ്കിൽ, നിങ്ങളുടെ സൂപ്പർവൈസറുമായി സംസാരിക്കുക അല്ലെങ്കിൽ എംപ്ലോയി അസിസ്റ്റൻസ് പ്രോഗ്രാമിൽ ബന്ധപ്പെടുക.',
      },
      general: {
        help: 'ഞാൻ സഹായിക്കാനാകുന്നത്: ആരോഗ്യ വിവരങ്ങൾ, അപ്പോയിന്റ്മെന്റ് ബുക്കിംഗ്, അടിയന്തിര കോൺടാക്റ്റുകൾ, ആരോഗ്യ റെക്കോർഡുകൾ.',
        work: 'നിങ്ങളുടെ ജോലി സ്ഥലം കൊച്ചി കൺസ്ട്രക്ഷൻ സൈറ്റാണ്. എല്ലാ സുരക്ഷാ നടപടികളും പാലിക്കുക.',
        safety: 'എപ്പോഴും സുരക്ഷാ ഉപകരണങ്ങൾ ധരിക്കുക, ഹൈഡ്രേറ്റഡ് ആയിരിക്കുക.',
        thank_you:
          'നിങ്ങൾക്ക് സ്വാഗതം! നിങ്ങളുടെ ആരോഗ്യ ചോദ്യങ്ങൾക്ക് ഞാൻ ഇവിടെയുണ്ട്. സുരക്ഷിതവും ആരോഗ്യവും നിലനിർത്തുക!',
        goodbye:
          'ശ്രദ്ധയോടെ! ഹൈഡ്രേറ്റഡ് ആയിരിക്കുക, സുരക്ഷാ ഉപകരണങ്ങൾ ധരിക്കുക, ആരോഗ്യ സഹായം വേണമെങ്കിൽ ബന്ധപ്പെടുക.',
        first_aid:
          'അടിസ്ഥാന ആദ്യ സഹായം: 1) വൃത്തിയായ തുണി കൊണ്ട് രക്തസ്രാവം നിർത്തുക, 2) വെള്ളം കൊണ്ട് മുറിവുകൾ വൃത്തിയാക്കുക, 3) ബാൻഡേജ് ഇടുക, 4) ഗുരുതരമായ പരിക്കുകൾക്ക് ഉടനെ 108 വിളിക്കുക.',
        hydration:
          'ഹൈഡ്രേറ്റഡ് ആയിരിക്കുക! പ്രതിദിനം കുറഞ്ഞത് 8-10 ഗ്ലാസ് വെള്ളം കുടിക്കുക, പ്രത്യേകിച്ച് ചൂടുള്ള കാലാവസ്ഥയിൽ. ഡിഹൈഡ്രേഷൻ തലവേദന, ക്ഷീണം, ചൂട് സ്ട്രോക്ക് എന്നിവയ്ക്ക് കാരണമാകും.',
        nutrition:
          'ഫലങ്ങൾ, പച്ചക്കറികൾ, പ്രോട്ടീനുകൾ, കാർബോഹൈഡ്രേറ്റുകൾ എന്നിവ ഉൾപ്പെടുത്തിയ സമതുലിതമായ ഭക്ഷണം കഴിക്കുക. ജോലി സമയത്ത് ഭക്ഷണം ഒഴിവാക്കരുത്.',
        rest: 'പ്രതിദിനം 7-8 മണിക്കൂർ ഉറക്കം എടുക്കുക. ജോലി സമയത്ത് ക്രമമായ ബ്രേക്കുകൾ എടുക്കുക. ക്ഷീണം അപകടങ്ങൾക്കും ആരോഗ്യ പ്രശ്നങ്ങൾക്കും കാരണമാകും.',
        hygiene:
          'നല്ല ശുചിത്വം പാലിക്കുക: കൈകൾ പതിവായി കഴുകുക, ജോലി വസ്ത്രങ്ങൾ വൃത്തിയായി സൂക്ഷിക്കുക, ജോലിക്ക് ശേഷം കുളിക്കുക, അണുബാധകൾ തടയാൻ നിങ്ങളുടെ താമസസ്ഥലം വൃത്തിയായി സൂക്ഷിക്കുക.',
      },
      fallback:
        'നിങ്ങൾ ആരോഗ്യ കാര്യങ്ങളെക്കുറിച്ചാണ് ചോദിക്കുന്നതെന്ന് മനസ്സിലാകുന്നു. കൂടുതൽ വിശദമായി പറയാമോ?',
    },
  };

  // Quick action buttons
  const quickActions = [
    { text: 'Book Appointment', action: 'appointment' },
    { text: 'View Records', action: 'records' },
    { text: 'Emergency Help', action: 'emergency' },
    { text: 'First Aid', action: 'first_aid' },
    { text: 'Hydration Tips', action: 'hydration' },
    { text: 'Nutrition', action: 'nutrition' },
    { text: 'Rest & Sleep', action: 'rest' },
    { text: 'Hygiene', action: 'hygiene' },
  ];

  if (chatbotButton) {
    console.log('Adding click listener to chatbot button');
    chatbotButton.addEventListener('click', function () {
      console.log('Chatbot button clicked');
      const message = chatbotInput.value.trim();
      console.log('Message:', message);
      if (message) {
        addChatbotMessage(message, 'user');
        chatbotInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Generate intelligent response
        setTimeout(() => {
          hideTypingIndicator();
          const response = generateResponse(message);
          addChatbotMessage(response, 'bot');
        }, 1500);
      }
    });
  } else {
    console.error('Chatbot button not found!');
  }

  if (chatbotInput) {
    chatbotInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        chatbotButton.click();
      }
    });
  }

  // Add quick action buttons
  addQuickActionButtons();

  // Add clear chat button
  addClearChatButton();

  // Initialize carousel
  initializeCarousel();

  function addQuickActionButtons() {
    const quickActionsContainer = document.createElement('div');
    quickActionsContainer.className = 'quick-actions';
    quickActionsContainer.style.cssText = `
            padding: 8px;
            border-top: 1px solid #e5e7eb;
            background: #f9fafb;
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
        `;

    quickActions.forEach((action) => {
      const button = document.createElement('button');
      button.textContent = action.text;
      button.style.cssText = `
                padding: 4px 8px;
                font-size: 0.75rem;
                background: #e5e7eb;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                transition: background 0.2s;
            `;
      button.addEventListener('click', () => {
        addChatbotMessage(action.text, 'user');
        showTypingIndicator();
        setTimeout(() => {
          hideTypingIndicator();
          const response = generateResponse(action.action);
          addChatbotMessage(response, 'bot');
        }, 1000);
      });
      button.addEventListener('mouseenter', () => {
        button.style.background = '#d1d5db';
      });
      button.addEventListener('mouseleave', () => {
        button.style.background = '#e5e7eb';
      });
      quickActionsContainer.appendChild(button);
    });

    chatbotMessages.parentNode.insertBefore(
      quickActionsContainer,
      chatbotInput
    );
  }

  function addClearChatButton() {
    const clearButton = document.createElement('button');
    clearButton.innerHTML = '🗑️ Clear Chat';
    clearButton.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 4px 8px;
            font-size: 0.7rem;
            background: #f3f4f6;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            cursor: pointer;
            color: #6b7280;
            transition: all 0.2s;
        `;

    clearButton.addEventListener('click', clearChatHistory);
    clearButton.addEventListener('mouseenter', () => {
      clearButton.style.background = '#e5e7eb';
      clearButton.style.color = '#374151';
    });
    clearButton.addEventListener('mouseleave', () => {
      clearButton.style.background = '#f3f4f6';
      clearButton.style.color = '#6b7280';
    });

    // Add to chatbot header
    const chatbotHeader = document.querySelector('.chatbot-header');
    if (chatbotHeader) {
      chatbotHeader.style.position = 'relative';
      chatbotHeader.appendChild(clearButton);
    }
  }

  function generateResponse(message) {
    const lang = currentLanguage;
    const responses = chatbotResponses[lang];
    const lowerMessage = message.toLowerCase();

    // Check for greetings
    if (
      lowerMessage.includes('hello') ||
      lowerMessage.includes('hi') ||
      lowerMessage.includes('hey')
    ) {
      return responses.greetings[
        Math.floor(Math.random() * responses.greetings.length)
      ];
    }

    // Check for health-related queries
    if (
      lowerMessage.includes('symptom') ||
      lowerMessage.includes('pain') ||
      lowerMessage.includes('sick') ||
      lowerMessage.includes('fever') ||
      lowerMessage.includes('headache')
    ) {
      return responses.health.symptoms;
    }
    if (
      lowerMessage.includes('appointment') ||
      lowerMessage.includes('book') ||
      lowerMessage.includes('schedule') ||
      lowerMessage.includes('visit')
    ) {
      return responses.health.appointment;
    }
    if (
      lowerMessage.includes('record') ||
      lowerMessage.includes('report') ||
      lowerMessage.includes('history') ||
      lowerMessage.includes('medical')
    ) {
      return responses.health.records;
    }
    if (
      lowerMessage.includes('emergency') ||
      lowerMessage.includes('urgent') ||
      lowerMessage.includes('help') ||
      lowerMessage.includes('accident')
    ) {
      return responses.health.emergency;
    }
    if (
      lowerMessage.includes('medication') ||
      lowerMessage.includes('medicine') ||
      lowerMessage.includes('drug') ||
      lowerMessage.includes('pill') ||
      lowerMessage.includes('tablet')
    ) {
      return responses.health.medication;
    }
    if (
      lowerMessage.includes('checkup') ||
      lowerMessage.includes('check-up') ||
      lowerMessage.includes('examination') ||
      lowerMessage.includes('test')
    ) {
      return responses.health.checkup;
    }
    if (
      lowerMessage.includes('vaccination') ||
      lowerMessage.includes('vaccine') ||
      lowerMessage.includes('immunization') ||
      lowerMessage.includes('injection')
    ) {
      return responses.health.vaccination;
    }
    if (
      lowerMessage.includes('safety') ||
      lowerMessage.includes('ppe') ||
      lowerMessage.includes('equipment') ||
      lowerMessage.includes('helmet') ||
      lowerMessage.includes('gloves')
    ) {
      return responses.health.safety;
    }
    if (
      lowerMessage.includes('mental') ||
      lowerMessage.includes('stress') ||
      lowerMessage.includes('anxiety') ||
      lowerMessage.includes('depression') ||
      lowerMessage.includes('sad')
    ) {
      return responses.health.mental_health;
    }

    // Check for general queries
    if (
      lowerMessage.includes('help') ||
      lowerMessage.includes('what can you do')
    ) {
      return responses.general.help;
    }
    if (
      lowerMessage.includes('work') ||
      lowerMessage.includes('job') ||
      lowerMessage.includes('site')
    ) {
      return responses.general.work;
    }
    if (
      lowerMessage.includes('safety') ||
      lowerMessage.includes('equipment') ||
      lowerMessage.includes('hazard')
    ) {
      return responses.general.safety;
    }

    // Check for gratitude and politeness
    if (
      lowerMessage.includes('thank') ||
      lowerMessage.includes('thanks') ||
      lowerMessage.includes('appreciate')
    ) {
      return responses.general.thank_you;
    }
    if (
      lowerMessage.includes('bye') ||
      lowerMessage.includes('goodbye') ||
      lowerMessage.includes('see you')
    ) {
      return responses.general.goodbye;
    }

    // Check for basic health aids and general health
    if (
      lowerMessage.includes('first aid') ||
      lowerMessage.includes('firstaid') ||
      lowerMessage.includes('injury') ||
      lowerMessage.includes('wound') ||
      lowerMessage.includes('cut')
    ) {
      return responses.general.first_aid;
    }
    if (
      lowerMessage.includes('water') ||
      lowerMessage.includes('hydrat') ||
      lowerMessage.includes('thirst') ||
      lowerMessage.includes('dehydrat')
    ) {
      return responses.general.hydration;
    }
    if (
      lowerMessage.includes('food') ||
      lowerMessage.includes('eat') ||
      lowerMessage.includes('meal') ||
      lowerMessage.includes('nutrition') ||
      lowerMessage.includes('diet')
    ) {
      return responses.general.nutrition;
    }
    if (
      lowerMessage.includes('sleep') ||
      lowerMessage.includes('rest') ||
      lowerMessage.includes('tired') ||
      lowerMessage.includes('fatigue')
    ) {
      return responses.general.rest;
    }
    if (
      lowerMessage.includes('clean') ||
      lowerMessage.includes('hygiene') ||
      lowerMessage.includes('wash') ||
      lowerMessage.includes('shower') ||
      lowerMessage.includes('bath')
    ) {
      return responses.general.hygiene;
    }

    // Handle quick action responses
    if (message === 'Book Appointment') return responses.health.appointment;
    if (message === 'View Records') return responses.health.records;
    if (message === 'Emergency Help') return responses.health.emergency;
    if (message === 'First Aid') return responses.general.first_aid;
    if (message === 'Hydration Tips') return responses.general.hydration;
    if (message === 'Nutrition') return responses.general.nutrition;
    if (message === 'Rest & Sleep') return responses.general.rest;
    if (message === 'Hygiene') return responses.general.hygiene;
    if (message === 'Health Tips') {
      const tips =
        currentLanguage === 'ml'
          ? 'ആരോഗ്യ ടിപ്പുകൾ: ഹൈഡ്രേറ്റഡ് ആയിരിക്കുക, സമതുലിതമായ ഭക്ഷണം കഴിക്കുക, മതിയായ വിശ്രമം എടുക്കുക, സുരക്ഷാ ഉപകരണങ്ങൾ ധരിക്കുക. നിങ്ങളുടെ അടുത്ത ചെക്കപ്പ് 5 ദിവസത്തിനുള്ളിൽ!'
          : 'Here are some health tips: Stay hydrated, eat balanced meals, get adequate rest, wear safety equipment, and report any health concerns immediately. Your next checkup is in 5 days!';
      return tips;
    }

    // Fallback response
    return responses.fallback;
  }

  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-message bot typing-indicator';
    typingDiv.innerHTML = '<span class="typing-dots">● ● ●</span>';
    typingDiv.style.cssText = `
            font-style: italic;
            color: #666;
            animation: typing 1.5s infinite;
        `;
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function hideTypingIndicator() {
    const typingIndicator = chatbotMessages.querySelector('.typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  function addChatbotMessage(message, sender) {
    console.log('Adding message:', message, 'from:', sender);

    if (!chatbotMessages) {
      console.error('chatbotMessages element not found!');
      return;
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}`;

    // Add timestamp
    const timestamp = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    messageDiv.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-time">${timestamp}</div>
        `;

    // Add styles for timestamp
    const style = document.createElement('style');
    style.textContent = `
            .message-time {
                font-size: 0.7rem;
                color: #999;
                margin-top: 2px;
                text-align: right;
            }
            .chatbot-message.user .message-time {
                text-align: left;
            }
            @keyframes typing {
                0%, 60%, 100% { opacity: 0.3; }
                30% { opacity: 1; }
            }
            .typing-dots {
                display: inline-block;
            }
        `;
    if (!document.head.querySelector('style[data-chatbot]')) {
      style.setAttribute('data-chatbot', 'true');
      document.head.appendChild(style);
    }

    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Save chat history after adding message
    saveChatHistory();
  }

  // Only initialize chatbot if elements exist
  if (chatbotInput && chatbotButton && chatbotMessages) {
    // Load chat history from localStorage
    loadChatHistory();

    // Add welcome message with health tips (only if no history exists)
    if (!localStorage.getItem('chatbot_history')) {
      setTimeout(() => {
        const welcomeMessage =
          currentLanguage === 'ml'
            ? 'നിങ്ങളുടെ ആരോഗ്യ സഹായിയിലേക്ക് സ്വാഗതം! ഞാൻ അപ്പോയിന്റ്മെന്റുകൾ, റെക്കോർഡുകൾ, അടിയന്തിര സാഹചര്യങ്ങൾ, ആരോഗ്യ വിവരങ്ങൾ എന്നിവയിൽ സഹായിക്കാനാകും. നിങ്ങളുടെ അടുത്ത ചെക്കപ്പ് അല്ലെങ്കിൽ ആരോഗ്യ റെക്കോർഡുകളെക്കുറിച്ച് ചോദിക്കുക.'
            : 'Welcome to your health assistant! I can help you with appointments, records, emergencies, and health information. Try asking me about your next checkup or health records.';
        addChatbotMessage(welcomeMessage, 'bot');
      }, 1000);
    }
  } else {
    console.error('Chatbot elements not found. Please check HTML structure.');
  }

  // Save chat history to localStorage
  function saveChatHistory() {
    const messages = Array.from(
      chatbotMessages.querySelectorAll('.chatbot-message')
    ).map((msg) => ({
      content: msg.querySelector('.message-content').textContent,
      sender: msg.classList.contains('user') ? 'user' : 'bot',
      timestamp: msg.querySelector('.message-time').textContent,
    }));
    localStorage.setItem('chatbot_history', JSON.stringify(messages));
  }

  // Load chat history from localStorage
  function loadChatHistory() {
    if (!chatbotMessages) return;

    const savedHistory = localStorage.getItem('chatbot_history');
    if (savedHistory) {
      try {
        const messages = JSON.parse(savedHistory);
        messages.forEach((msg) => {
          const messageDiv = document.createElement('div');
          messageDiv.className = `chatbot-message ${msg.sender}`;
          messageDiv.innerHTML = `
                        <div class="message-content">${msg.content}</div>
                        <div class="message-time">${msg.timestamp}</div>
                    `;
          chatbotMessages.appendChild(messageDiv);
        });
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      } catch (error) {
        console.error('Error loading chat history:', error);
        localStorage.removeItem('chatbot_history');
      }
    }
  }

  // Clear chat history
  function clearChatHistory() {
    chatbotMessages.innerHTML = '';
    localStorage.removeItem('chatbot_history');
    const welcomeMessage =
      currentLanguage === 'ml'
        ? 'ചാറ്റ് ക്ലിയർ ചെയ്തു. എങ്ങനെ സഹായിക്കാം?'
        : 'Chat cleared. How can I help you?';
    addChatbotMessage(welcomeMessage, 'bot');
  }

  // Carousel functionality
  // JavaScript

  // Initialize when DOM content is loaded
  document.addEventListener('DOMContentLoaded', initializeCarousel);

  //   // Initialize on DOM ready
  //   document.addEventListener('DOMContentLoaded', initializeCarousel);

  // ============ Popup Functionality ============

  // Initialize popup functionality after a short delay to ensure DOM is ready
  setTimeout(() => {
    initializePopups();
  }, 100);

  function initializePopups() {
    // Add click listeners to buttons
    const notificationBell = document.querySelector('.notification-bell');
    const bookCheckupBtn = document.querySelector('.btn-secondary');
    const viewRecordBtn = document.querySelector('.btn-primary');
    const userProfile = document.querySelector('.user-profile');

    console.log('Initializing popups...');
    console.log('Elements found:', {
      notificationBell: !!notificationBell,
      bookCheckupBtn: !!bookCheckupBtn,
      viewRecordBtn: !!viewRecordBtn,
      userProfile: !!userProfile,
    });

    if (notificationBell) {
      notificationBell.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Notification bell clicked');
        openPopup('notificationPopup');
      });
    } else {
      console.error('Notification bell not found!');
    }

    if (bookCheckupBtn) {
      bookCheckupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Book checkup button clicked');
        openPopup('bookCheckupPopup');
      });
    } else {
      console.error('Book checkup button not found!');
    }

    if (viewRecordBtn) {
      viewRecordBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('View record button clicked');
        openPopup('viewRecordPopup');
      });
    } else {
      console.error('View record button not found!');
    }

    // Record buttons are now initialized separately in initializeRecordButtons()

    if (userProfile) {
      userProfile.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('User profile clicked');
        openPopup('migrantWorkerPopup');
      });
    } else {
      console.error('User profile not found!');
    }

    // Initialize enhanced notification system
    initializeEnhancedNotifications();

    // Initialize form
    initializeBookCheckupForm();
  }

  // Close popup when clicking outside
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('popup-overlay')) {
      const activePopup = e.target;
      activePopup.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Close popup with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const activePopup = document.querySelector('.popup-overlay.active');
      if (activePopup) {
        activePopup.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    }
  });

  function initializeBookCheckupForm() {
    const form = document.getElementById('bookCheckupForm');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        healthProvider: document.getElementById('healthProvider').value,
        doctor: document.getElementById('doctor').value,
        appointmentDate: document.getElementById('appointmentDate').value,
        timeSlot: document.getElementById('timeSlot').value,
        reason: document.getElementById('reason').value,
      };

      // Validate form
      if (
        !formData.healthProvider ||
        !formData.doctor ||
        !formData.appointmentDate ||
        !formData.timeSlot
      ) {
        alert('Please fill in all required fields.');
        return;
      }

      // Book appointment via API
      console.log('Booking appointment with data:', formData);

      try {
        const response = await apiCall(
          API_ENDPOINTS.bookAppointment,
          'POST',
          formData
        );

        if (response.success) {
          // Show success message
          alert(
            'Appointment booked successfully! You will receive a confirmation SMS shortly.'
          );

          // Close popup
          closePopup('bookCheckupPopup');

          // Reset form
          form.reset();

          // Reload appointments to update the UI
          loadAppointments();
        } else {
          alert('Failed to book appointment. Please try again.');
        }
      } catch (error) {
        console.error('Error booking appointment:', error);
        alert('Failed to book appointment. Please try again.');
      }
    });

    // Set minimum date to today
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }
  }

  // Function to load data from backend (placeholder for future implementation)
  async function loadNotificationsFromBackend() {
    try {
      // Example API call
      // const response = await fetch('/api/notifications');
      // const notifications = await response.json();
      // return notifications;

      // For now, return sample data
      return sampleNotifications;
    } catch (error) {
      console.error('Error loading notifications:', error);
      return sampleNotifications;
    }
  }

  async function loadPatientDataFromBackend() {
    try {
      // Example API call
      // const response = await fetch('/api/patient-data');
      // const patientData = await response.json();
      // return patientData;

      // For now, return sample data
      return patientData;
    } catch (error) {
      console.error('Error loading patient data:', error);
      return patientData;
    }
  }

  async function loadMigrantWorkerDataFromBackend() {
    try {
      // Example API call
      // const response = await fetch('/api/migrant-worker-data');
      // const workerData = await response.json();
      // return workerData;

      // For now, return sample data
      return migrantWorkerData;
    } catch (error) {
      console.error('Error loading migrant worker data:', error);
      return migrantWorkerData;
    }
  }

  // Make functions globally available
  window.openPopup = openPopup;
  window.closePopup = closePopup;
  window.updateNotificationCount = updateNotificationCount;
  window.addNotification = addNotification;
  window.removeNotification = removeNotification;
  window.uploadWorkerPhoto = uploadWorkerPhoto;
  window.generateQRCode = generateQRCode;
  window.editWorkerDetails = editWorkerDetails;

  // Immediate test function
  window.testBasicFunctionality = function () {
    console.log('=== Testing Basic Functionality ===');
    console.log('Document ready state:', document.readyState);
    console.log('Window loaded:', window.loaded);

    console.log('Basic functionality test completed');
  };

  // Test function for debugging
  window.testNotificationPopup = () => openPopup('notificationPopup');
  window.testBookCheckupPopup = () => openPopup('bookCheckupPopup');
  window.testViewRecordPopup = () => openPopup('viewRecordPopup');
  window.testMigrantWorkerPopup = () => openPopup('migrantWorkerPopup');
  window.testPopulateRecords = () => populateRecentHealthRecords();
  window.testShowAllRecords = () => showAllRecords();
  window.testShowRecentRecords = () => showRecentRecords();
});

// ============ Floating Headlines Functionality ============

function initializeFloatingHeadlines() {
  console.log('Initializing floating headlines...');

  const headlineItems = document.querySelectorAll('.headline-item');

  headlineItems.forEach((item, index) => {
    item.addEventListener('click', function () {
      const headlineText = this.querySelector('.headline-text').textContent;
      console.log('Headline clicked:', headlineText);

      // Show a notification or popup about the health camp
      showHealthCampNotification(headlineText);
    });

    // Add hover effects
    item.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-3px) scale(1.02)';
    });

    item.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  console.log(
    'Floating headlines initialized with',
    headlineItems.length,
    'items'
  );
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
  alert(
    `Registration for ${campInfo} has been initiated! You will receive a confirmation SMS shortly.`
  );

  // Close the notification
  const notification = document.querySelector('.health-camp-notification');
  if (notification) {
    notification.remove();
  }

  // Here you would typically integrate with a booking system
  // Example: openPopup('bookCheckupPopup') with pre-filled camp information
}

// ============ Worker Edit Navigation ============

function editWorkerDetails() {
  console.log('Navigating to edit worker details page...');
  window.location.href = 'edit-worker.html';
}

// ============ Record Buttons Initialization ============

function initializeRecordButtons() {
  console.log('Initializing record buttons...');

  // Add click listeners for record buttons
  const showRecordsBtn = document.getElementById('showRecordsBtn');
  const hideRecordsBtn = document.getElementById('hideRecordsBtn');
  const recordsList = document.querySelector('.records-list');

  console.log('Record buttons found:', {
    show: !!showRecordsBtn,
    hide: !!hideRecordsBtn,
    recordsList: !!recordsList,
  });

  // Additional debugging
  if (showRecordsBtn) {
    console.log('Show button text:', showRecordsBtn.textContent);
    console.log('Show button classes:', showRecordsBtn.className);
  }
  if (hideRecordsBtn) {
    console.log('Hide button text:', hideRecordsBtn.textContent);
    console.log('Hide button classes:', hideRecordsBtn.className);
  }

  if (showRecordsBtn) {
    showRecordsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Show Records button clicked');

      // Check current button text to determine action
      if (showRecordsBtn.textContent === 'Show Recent Records') {
        // Show recent records (3 records)
        showRecentRecords();
        console.log('Recent records shown');
      } else if (showRecordsBtn.textContent === 'Show All Records') {
        // Show all records (5 records)
        showAllRecords();
        console.log('All records shown');
      }
    });
  } else {
    console.error('Show Records button not found!');
  }

  if (hideRecordsBtn && recordsList) {
    hideRecordsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Hide Records button clicked');

      // Hide all records
      recordsList.style.display = 'none';

      // Reset show button to initial state
      const showBtn = document.getElementById('showRecordsBtn');
      if (showBtn) {
        showBtn.textContent = 'Show Recent Records';
        showBtn.classList.remove('btn-outline');
        showBtn.classList.add('btn-primary');
      }

      console.log('Records hidden');
    });
  } else {
    console.error('Hide Records button or records list not found!');
  }

  console.log('Record buttons initialized successfully');
}
