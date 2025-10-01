// Admin Dashboard JavaScript
console.log('Admin Dashboard JavaScript loaded successfully');

// ============ API Configuration ============
const API_BASE_URL = 'http://127.0.0.1:5000';
const API_ENDPOINTS = {
  dashboard: '/api/admin/dashboard',
  systemOverview: '/api/admin/system-overview',
  users: '/api/admin/users',
  healthcareCenters: '/api/admin/healthcare-centers',
  workerStatistics: '/api/admin/workers/statistics',
  workerReports: '/api/admin/workers/reports',
  healthScreening: '/api/admin/workers/health-screening',
  comprehensiveReports: '/api/admin/reports/comprehensive',
  analytics: '/api/admin/analytics',
  export: '/api/admin/export',
  auditLogs: '/api/admin/audit-logs',
  backups: '/api/admin/backups',
  notifications: '/api/admin/notifications'
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
async function loadDashboardData() {
  try {
    console.log('Loading admin dashboard data...');
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

async function loadSystemOverview() {
  try {
    console.log('Loading system overview...');
    const response = await apiCall(API_ENDPOINTS.systemOverview);
    
    if (response.success) {
      console.log('System overview loaded:', response.data);
      updateSystemOverviewUI(response.data);
    } else {
      console.error('Failed to load system overview:', response.message);
    }
  } catch (error) {
    console.error('Error loading system overview:', error);
  }
}

async function loadUsers() {
  try {
    console.log('Loading users...');
    const response = await apiCall(API_ENDPOINTS.users);
    
    if (response.success) {
      console.log('Users loaded:', response.data);
      updateUsersUI(response.data);
    } else {
      console.error('Failed to load users:', response.message);
    }
  } catch (error) {
    console.error('Error loading users:', error);
  }
}

async function loadHealthcareCenters() {
  try {
    console.log('Loading healthcare centers...');
    const response = await apiCall(API_ENDPOINTS.healthcareCenters);
    
    if (response.success) {
      console.log('Healthcare centers loaded:', response.data);
      updateHealthcareCentersUI(response.data);
    } else {
      console.error('Failed to load healthcare centers:', response.message);
    }
  } catch (error) {
    console.error('Error loading healthcare centers:', error);
  }
}

async function loadWorkerStatistics() {
  try {
    console.log('Loading worker statistics...');
    const response = await apiCall(API_ENDPOINTS.workerStatistics);
    
    if (response.success) {
      console.log('Worker statistics loaded:', response.data);
      updateWorkerStatisticsUI(response.data);
    } else {
      console.error('Failed to load worker statistics:', response.message);
    }
  } catch (error) {
    console.error('Error loading worker statistics:', error);
  }
}

async function loadNotifications() {
  try {
    console.log('Loading notifications...');
    const response = await apiCall(API_ENDPOINTS.notifications);
    
    if (response.success) {
      console.log('Notifications loaded:', response.data);
      updateNotificationsUI(response.data);
    } else {
      console.error('Failed to load notifications:', response.message);
    }
  } catch (error) {
    console.error('Error loading notifications:', error);
  }
}

// ============ UI Update Functions ============
function updateDashboardUI(data) {
  // Update statistics
  if (data.users) {
    const totalUsers = document.getElementById('totalUsers');
    const totalWorkers = document.getElementById('totalWorkers');
    const totalHealthcareCenters = document.getElementById('totalHealthcareCenters');
    const activeUsers = document.getElementById('activeUsers');
    
    if (totalUsers) totalUsers.textContent = data.users.total;
    if (totalWorkers) totalWorkers.textContent = data.users.workers;
    if (totalHealthcareCenters) totalHealthcareCenters.textContent = data.users.healthcareCenters;
    if (activeUsers) activeUsers.textContent = data.users.active;
  }
  
  // Update healthcare center stats
  if (data.healthcareCenters) {
    const totalHealthCenters = document.getElementById('totalHealthCenters');
    const activeHealthCenters = document.getElementById('activeHealthCenters');
    
    if (totalHealthCenters) totalHealthCenters.textContent = data.healthcareCenters.total;
    if (activeHealthCenters) activeHealthCenters.textContent = data.healthcareCenters.active;
  }
  
  // Update patient stats
  if (data.patients) {
    const totalPatients = document.getElementById('totalPatients');
    const totalMedicalRecords = document.getElementById('totalMedicalRecords');
    const totalAppointments = document.getElementById('totalAppointments');
    
    if (totalPatients) totalPatients.textContent = data.patients.total;
    if (totalMedicalRecords) totalMedicalRecords.textContent = data.patients.medicalRecords;
    if (totalAppointments) totalAppointments.textContent = data.patients.appointments;
  }
  
  // Update system stats
  if (data.system) {
    const systemUptime = document.getElementById('systemUptime');
    const activeConnections = document.getElementById('activeConnections');
    const dataStorage = document.getElementById('dataStorage');
    
    if (systemUptime) systemUptime.textContent = data.system.uptime + '%';
    if (activeConnections) activeConnections.textContent = data.system.activeConnections;
    if (dataStorage) dataStorage.textContent = data.system.dataStorage;
  }
  
  // Update recent activities
  if (data.recentActivities) {
    updateRecentActivitiesUI(data.recentActivities);
  }
}

function updateSystemOverviewUI(data) {
  // Update system metrics
  if (data.metrics) {
    updateSystemMetricsUI(data.metrics);
  }
  
  // Update system logs
  if (data.systemLogs) {
    updateSystemLogsUI(data.systemLogs);
  }
  
  // Update database status
  if (data.databaseStatus) {
    updateDatabaseStatusUI(data.databaseStatus);
  }
}

function updateUsersUI(data) {
  const usersContainer = document.getElementById('usersContainer');
  if (!usersContainer) return;
  
  let html = '';
  data.users.forEach(user => {
    html += `
      <tr>
        <td>${user.profile.firstName} ${user.profile.lastName}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td><span class="status-badge ${user.isActive ? 'active' : 'inactive'}">${user.isActive ? 'Active' : 'Inactive'}</span></td>
        <td>${new Date(user.createdAt).toLocaleDateString()}</td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="editUser('${user._id}')">Edit</button>
          <button class="btn btn-sm btn-primary" onclick="toggleUserStatus('${user._id}', ${!user.isActive})">
            ${user.isActive ? 'Deactivate' : 'Activate'}
          </button>
        </td>
      </tr>
    `;
  });
  
  usersContainer.innerHTML = html;
}

function updateHealthcareCentersUI(data) {
  const centersContainer = document.getElementById('centersContainer');
  if (!centersContainer) return;
  
  let html = '';
  data.healthcareCenters.forEach(center => {
    html += `
      <div class="center-card">
        <div class="center-header">
          <h3>${center.name}</h3>
          <span class="status-indicator ${center.isActive ? 'online' : 'offline'}"></span>
        </div>
        <div class="center-info">
          <div class="info-item">
            <span class="label">Location:</span>
            <span class="value">${center.address.city}, ${center.address.state}</span>
          </div>
          <div class="info-item">
            <span class="label">Owner:</span>
            <span class="value">${center.ownerId?.profile.firstName} ${center.ownerId?.profile.lastName}</span>
          </div>
          <div class="info-item">
            <span class="label">Services:</span>
            <span class="value">${center.services?.join(', ') || 'N/A'}</span>
          </div>
        </div>
        <div class="center-actions">
          <button class="btn btn-sm btn-outline" onclick="viewCenter('${center._id}')">View Details</button>
          <button class="btn btn-sm btn-primary" onclick="editCenter('${center._id}')">Edit</button>
        </div>
      </div>
    `;
  });
  
  centersContainer.innerHTML = html;
}

function updateWorkerStatisticsUI(data) {
  // Update worker statistics display
  const totalWorkers = document.getElementById('totalWorkers');
  const activeWorkers = document.getElementById('activeWorkers');
  const totalHealthRecords = document.getElementById('totalHealthRecords');
  
  if (totalWorkers) totalWorkers.textContent = data.totalWorkers;
  if (activeWorkers) activeWorkers.textContent = data.activeWorkers;
  if (totalHealthRecords) totalHealthRecords.textContent = data.totalHealthRecords;
}

function updateNotificationsUI(data) {
  const notificationsContainer = document.getElementById('notificationsContainer');
  if (!notificationsContainer) return;
  
  let html = '';
  data.notifications.forEach(notification => {
    html += `
      <div class="notification-item">
        <div class="notification-icon">
          <i class="fas fa-${getNotificationIcon(notification.type)}"></i>
        </div>
        <div class="notification-content">
          <div class="notification-title">${notification.title}</div>
          <div class="notification-message">${notification.message}</div>
          <div class="notification-time">${new Date(notification.createdAt).toLocaleString()}</div>
        </div>
        <div class="notification-actions">
          <button class="btn btn-sm btn-outline" onclick="markAsRead('${notification._id}')">Mark as Read</button>
        </div>
      </div>
    `;
  });
  
  notificationsContainer.innerHTML = html;
}

function getNotificationIcon(type) {
  const icons = {
    'info': 'info-circle',
    'warning': 'exclamation-triangle',
    'error': 'times-circle',
    'success': 'check-circle',
    'system': 'cog'
  };
  return icons[type] || 'info-circle';
}

// ============ Action Functions ============
async function toggleUserStatus(userId, isActive) {
  try {
    const response = await apiCall(`${API_ENDPOINTS.users}/${userId}/status`, 'PUT', { isActive });
    
    if (response.success) {
      alert('✅ User status updated successfully!');
      loadUsers();
    } else {
      alert('❌ Failed to update user status: ' + response.message);
    }
  } catch (error) {
    console.error('Error updating user status:', error);
    alert('❌ Network error. Please try again.');
  }
}

async function markAsRead(notificationId) {
  try {
    const response = await apiCall(`${API_ENDPOINTS.notifications}/${notificationId}/read`, 'PUT');
    
    if (response.success) {
      alert('✅ Notification marked as read!');
      loadNotifications();
    } else {
      alert('❌ Failed to mark notification as read: ' + response.message);
    }
  } catch (error) {
    console.error('Error marking notification as read:', error);
    alert('❌ Network error. Please try again.');
  }
}

// Global Variables
let currentPage = 'dashboard';
let sidebarOpen = false;

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing admin dashboard...');
    
    // Load dashboard data from backend
    loadDashboardData();
    loadNotifications();
    
    initializeNavigation();
    initializeModals();
    initializeSidebar();
    initializeSearch();
    initializeNotifications();
    initializeSystemSettings();
    initializeUserManagement();
    initializeQuickActions();
    
    console.log('Admin dashboard initialized successfully');
    
    // Initialize charts
    initializeCharts();
});

// ============ CHART INITIALIZATION ============
function initializeCharts() {
    console.log('Initializing charts...');
    
    // Dashboard Charts
    createSystemOverviewChart();
    createHealthCenterStatusChart();
    
    // Analytics Charts (only if on analytics page)
    if (currentPage === 'data-analytics') {
        createAnalyticsCharts();
    }
}

// ============ DASHBOARD CHARTS ============
function createSystemOverviewChart() {
    const ctx = document.getElementById('systemOverviewChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'System Performance',
                data: [85, 92, 88, 95, 90, 99],
                borderColor: '#2c5aa0',
                backgroundColor: 'rgba(44, 90, 160, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function createHealthCenterStatusChart() {
    const ctx = document.getElementById('healthCenterStatusChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Online', 'Maintenance', 'Offline'],
            datasets: [{
                data: [85, 10, 5],
                backgroundColor: [
                    '#27ae60',
                    '#f39c12',
                    '#e74c3c'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 10,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

// ============ ANALYTICS CHARTS ============
function createAnalyticsCharts() {
    createUserGrowthChart();
    createHealthcareDistributionChart();
    createWorkerHealthChart();
    createSystemPerformanceChart();
    createRegistrationTrendsChart();
    createGeographicDistributionChart();
    createHealthRecordsChart();
    createAppointmentStatsChart();
    createRealtimeMetrics();
}

function createUserGrowthChart() {
    const ctx = document.getElementById('userGrowthChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'New Users',
                data: [45, 52, 48, 65, 58, 72],
                borderColor: '#2c5aa0',
                backgroundColor: 'rgba(44, 90, 160, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createHealthcareDistributionChart() {
    const ctx = document.getElementById('healthcareDistributionChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Hospitals', 'Clinics', 'PHCs', 'CHCs', 'Medical Colleges'],
            datasets: [{
                label: 'Count',
                data: [25, 45, 30, 15, 8],
                backgroundColor: [
                    '#2c5aa0',
                    '#3498db',
                    '#9b59b6',
                    '#e67e22',
                    '#e74c3c'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createWorkerHealthChart() {
    const ctx = document.getElementById('workerHealthChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Healthy', 'At Risk', 'Under Treatment', 'Recovered'],
            datasets: [{
                data: [65, 20, 10, 5],
                backgroundColor: [
                    '#27ae60',
                    '#f39c12',
                    '#e74c3c',
                    '#2ecc71'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 10,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

function createSystemPerformanceChart() {
    const ctx = document.getElementById('systemPerformanceChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['CPU Usage', 'Memory', 'Database', 'Network', 'Storage'],
            datasets: [{
                label: 'Performance',
                data: [85, 70, 90, 80, 75],
                borderColor: '#2c5aa0',
                backgroundColor: 'rgba(44, 90, 160, 0.2)',
                pointBackgroundColor: '#2c5aa0'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function createRegistrationTrendsChart() {
    const ctx = document.getElementById('registrationTrendsChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Workers',
                data: [120, 150, 180, 200, 220, 250, 280, 300, 320, 350, 380, 400],
                borderColor: '#2c5aa0',
                backgroundColor: 'rgba(44, 90, 160, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Healthcare Centers',
                data: [5, 8, 12, 15, 18, 22, 25, 28, 30, 32, 35, 38],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createGeographicDistributionChart() {
    const ctx = document.getElementById('geographicDistributionChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kannur', 'Kollam', 'Palakkad', 'Malappuram'],
            datasets: [{
                label: 'Workers',
                data: [450, 380, 320, 280, 250, 220, 180, 150],
                backgroundColor: '#2c5aa0'
            }, {
                label: 'Health Centers',
                data: [25, 20, 18, 15, 12, 10, 8, 6],
                backgroundColor: '#e74c3c'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createHealthRecordsChart() {
    const ctx = document.getElementById('healthRecordsChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Checkups', 'Vaccinations', 'Treatments', 'Emergency', 'Follow-ups'],
            datasets: [{
                data: [40, 25, 20, 10, 5],
                backgroundColor: [
                    '#2c5aa0',
                    '#27ae60',
                    '#f39c12',
                    '#e74c3c',
                    '#9b59b6'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

function createAppointmentStatsChart() {
    const ctx = document.getElementById('appointmentStatsChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Scheduled', 'Completed', 'Cancelled', 'No Show'],
            datasets: [{
                data: [60, 30, 7, 3],
                backgroundColor: [
                    '#3498db',
                    '#27ae60',
                    '#e74c3c',
                    '#f39c12'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 10,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

// ============ REAL-TIME METRICS ============
function createRealtimeMetrics() {
    createCpuUsageChart();
    createMemoryUsageChart();
    createDbConnectionsChart();
    createApiResponseChart();
}

function createCpuUsageChart() {
    const ctx = document.getElementById('cpuUsageChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 20}, (_, i) => ''),
            datasets: [{
                data: Array.from({length: 20}, () => Math.random() * 100),
                borderColor: '#2c5aa0',
                backgroundColor: 'rgba(44, 90, 160, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            },
            animation: {
                duration: 0
            }
        }
    });
}

function createMemoryUsageChart() {
    const ctx = document.getElementById('memoryUsageChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 20}, (_, i) => ''),
            datasets: [{
                data: Array.from({length: 20}, () => Math.random() * 100),
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            },
            animation: {
                duration: 0
            }
        }
    });
}

function createDbConnectionsChart() {
    const ctx = document.getElementById('dbConnectionsChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 20}, (_, i) => ''),
            datasets: [{
                data: Array.from({length: 20}, () => Math.random() * 50 + 10),
                borderColor: '#27ae60',
                backgroundColor: 'rgba(39, 174, 96, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            },
            animation: {
                duration: 0
            }
        }
    });
}

function createApiResponseChart() {
    const ctx = document.getElementById('apiResponseChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 20}, (_, i) => ''),
            datasets: [{
                data: Array.from({length: 20}, () => Math.random() * 200 + 50),
                borderColor: '#f39c12',
                backgroundColor: 'rgba(243, 156, 18, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            },
            animation: {
                duration: 0
            }
        }
    });
}

// ============ CHART UTILITIES ============
function exportChart(chartType) {
    console.log(`Exporting ${chartType} chart...`);
    alert(`Exporting ${chartType} chart...`);
}

// Navigation System
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            
            if (page === 'logout') {
                handleLogout();
                return;
            }
            
            navigateToPage(page);
        });
    });
}

function navigateToPage(page) {
    console.log(`Navigating to page: ${page}`);
    
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNavItem = document.querySelector(`[data-page="${page}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
    
    // Hide all pages with smooth transition
    document.querySelectorAll('.page-content').forEach(pageContent => {
        pageContent.style.opacity = '0';
        pageContent.style.transform = 'translateY(20px)';
        setTimeout(() => {
            pageContent.classList.remove('active');
        }, 150);
    });
    
    // Show target page with smooth transition
    setTimeout(() => {
        const targetPage = document.getElementById(`${page}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            targetPage.style.opacity = '0';
            targetPage.style.transform = 'translateY(20px)';
            setTimeout(() => {
                targetPage.style.opacity = '1';
                targetPage.style.transform = 'translateY(0)';
                
                // Initialize charts for analytics page
                if (page === 'data-analytics') {
                    setTimeout(() => {
                        createAnalyticsCharts();
                    }, 100);
                }
            }, 50);
        } else {
            // If page doesn't exist, show dashboard
            const dashboardPage = document.getElementById('dashboard-page');
            dashboardPage.classList.add('active');
            dashboardPage.style.opacity = '0';
            dashboardPage.style.transform = 'translateY(20px)';
            setTimeout(() => {
                dashboardPage.style.opacity = '1';
                dashboardPage.style.transform = 'translateY(0)';
            }, 50);
        }
    }, 150);
    
    currentPage = page;
    
    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        closeSidebar();
    }
    
    // Show navigation feedback
    showNotification(`Navigated to ${page.replace('-', ' ')}`, 'success');
}

// Sidebar Management
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    
    // Mobile menu toggle (if exists)
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            toggleSidebar();
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && sidebarOpen) {
            if (!sidebar.contains(e.target) && !mobileMenuToggle?.contains(e.target)) {
                closeSidebar();
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
            sidebarOpen = false;
        }
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
    sidebarOpen = !sidebarOpen;
}

function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.add('open');
    sidebarOpen = true;
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('open');
    sidebarOpen = false;
}

// Modal Management
function initializeModals() {
    // Notification Modal
    const notificationTrigger = document.getElementById('notificationTrigger');
    const notificationModal = document.getElementById('notificationModal');
    const notificationClose = notificationModal?.querySelector('.modal-close');
    
    if (notificationTrigger && notificationModal) {
        notificationTrigger.addEventListener('click', function() {
            showModal('notificationModal');
        });
    }
    
    if (notificationClose) {
        notificationClose.addEventListener('click', function() {
            hideModal('notificationModal');
        });
    }
    
    // User Profile Modal
    const userProfileTrigger = document.getElementById('userProfileTrigger');
    const userProfileModal = document.getElementById('userProfileModal');
    const userProfileClose = userProfileModal?.querySelector('.modal-close');
    
    if (userProfileTrigger && userProfileModal) {
        userProfileTrigger.addEventListener('click', function() {
            showModal('userProfileModal');
        });
    }
    
    if (userProfileClose) {
        userProfileClose.addEventListener('click', function() {
            hideModal('userProfileModal');
        });
    }
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        // Only close if clicking on the modal backdrop (not modal content)
        if (e.target.classList.contains('modal') && e.target === e.currentTarget) {
            // Check if it's a modal that should be closed
            const modalId = e.target.id;
            if (modalId && (modalId.includes('Modal') || modalId.includes('modal'))) {
                hideModal(modalId);
            }
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideAllModals();
        }
    });
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function hideAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            performSearch(query);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.toLowerCase();
                performSearch(query);
            }
        });
    }
}

function performSearch(query) {
    console.log(`Searching for: ${query}`);
    
    if (query.length < 2) {
        return;
    }
    
    // Search functionality can be implemented here
    // For now, just log the search query
    console.log(`Search results for "${query}" would be displayed here`);
}


// Enhanced Notification System
let notifications = [
    {
        id: 1,
        title: "System Update Available",
        message: "New version 2.1.0 is ready for installation with enhanced security features",
        type: "info",
        icon: "info-circle",
        time: "2 hours ago",
        unread: true
    },
    {
        id: 2,
        title: "High Server Load Alert",
        message: "Server CPU usage is at 85%. Consider scaling resources",
        type: "urgent",
        icon: "exclamation-triangle",
        time: "4 hours ago",
        unread: true
    },
    {
        id: 3,
        title: "New User Registration",
        message: "5 new healthcare centers registered in the system",
        type: "success",
        icon: "user-plus",
        time: "6 hours ago",
        unread: false
    },
    {
        id: 4,
        title: "Database Backup Completed",
        message: "Scheduled backup completed successfully. Data secured for 30 days",
        type: "success",
        icon: "database",
        time: "1 day ago",
        unread: false
    },
    {
        id: 5,
        title: "Security Audit Required",
        message: "Monthly security audit is due. Please schedule with IT team",
        type: "warning",
        icon: "shield-alt",
        time: "2 days ago",
        unread: true
    },
    {
        id: 6,
        title: "Worker Health Screening Report",
        message: "Weekly health screening report is ready for review",
        type: "info",
        icon: "file-medical",
        time: "3 days ago",
        unread: false
    },
    {
        id: 7,
        title: "System Maintenance Scheduled",
        message: "Planned maintenance window: Sunday 2:00 AM - 4:00 AM",
        type: "info",
        icon: "tools",
        time: "4 days ago",
        unread: true
    },
    {
        id: 8,
        title: "Data Export Completed",
        message: "Monthly data export to government portal completed successfully",
        type: "success",
        icon: "download",
        time: "5 days ago",
        unread: false
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
    
    const activeBtn = document.querySelector(`[data-filter="${filter}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    renderNotifications();
}

// Initialize notification system
function initializeNotifications() {
    console.log('🔔 Initializing enhanced notification system...');
    
    // Notification trigger
    const notificationTrigger = document.getElementById('notificationTrigger');
    if (notificationTrigger) {
        notificationTrigger.addEventListener('click', showNotificationModal);
        console.log('✅ Notification trigger attached');
    }
    
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
    
    // Modal close functionality
    const modal = document.getElementById('notificationModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Initialize with current notifications
    renderNotifications();
    
    console.log('✅ Enhanced notification system initialized');
}

// ========================================
// SYSTEM SETTINGS FUNCTIONALITY
// ========================================
function initializeSystemSettings() {
    console.log('⚙️ Initializing system settings...');
    
    // Settings tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const settingsContent = document.querySelectorAll('.settings-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            console.log(`⚙️ Switching to settings tab: ${targetTab}`);
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            settingsContent.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            const targetContent = document.getElementById(`${targetTab}-settings`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    console.log('✅ System settings initialized');
}

// Save settings function
function saveSettings() {
    console.log('💾 Saving system settings...');
    
    // Collect all settings data
    const settings = {
        general: {
            systemName: document.querySelector('input[value="Kerala Health Records System"]')?.value,
            defaultLanguage: document.querySelector('.form-select')?.value,
            timeZone: document.querySelectorAll('.form-select')[1]?.value,
            maintenanceMode: document.getElementById('maintenanceMode')?.checked
        },
        security: {
            minPasswordLength: document.querySelector('input[value="8"]')?.value,
            requireSpecialChars: document.getElementById('requireSpecialChars')?.checked,
            passwordExpiry: document.querySelector('input[value="90"]')?.value,
            admin2FA: document.getElementById('admin2FA')?.checked,
            healthcare2FA: document.getElementById('healthcare2FA')?.checked,
            sessionTimeout: document.querySelector('input[value="30"]')?.value,
            maxSessions: document.querySelector('input[value="3"]')?.value
        },
        notifications: {
            systemAlerts: document.getElementById('systemAlerts')?.checked,
            userRegistration: document.getElementById('userRegistration')?.checked,
            securityEvents: document.getElementById('securityEvents')?.checked,
            smtpServer: document.querySelector('input[value="smtp.gmail.com"]')?.value,
            smtpPort: document.querySelector('input[value="587"]')?.value,
            fromEmail: document.querySelector('input[value="noreply@sehat.gov.in"]')?.value
        },
        backup: {
            dailyBackups: document.getElementById('dailyBackups')?.checked,
            backupTime: document.querySelector('input[value="02:00"]')?.value,
            retentionPeriod: document.querySelector('input[value="30"]')?.value,
            localPath: document.querySelector('input[value="/backups/"]')?.value,
            cloudBackup: document.getElementById('cloudBackup')?.checked
        },
        api: {
            rateLimit: document.querySelector('input[value="100"]')?.value,
            burstLimit: document.querySelector('input[value="200"]')?.value,
            allowedOrigins: document.querySelector('.form-textarea')?.value
        }
    };
    
    console.log('📊 Settings data:', settings);
    
    // Show success message
    showToast('Settings saved successfully!', 'success');
    
    // Here you would typically send the settings to the backend
    // await apiCall('/api/admin/settings', 'POST', settings);
}

// Reset settings function
function resetSettings() {
    console.log('🔄 Resetting settings to defaults...');
    
    if (confirm('Are you sure you want to reset all settings to their default values?')) {
        // Reset all form inputs to default values
        document.querySelectorAll('input, select, textarea').forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = false;
            } else if (input.type === 'number') {
                input.value = input.getAttribute('value') || '';
            } else {
                input.value = input.getAttribute('value') || '';
            }
        });
        
        showToast('Settings reset to defaults!', 'info');
    }
}

// ========================================
// USER MANAGEMENT FUNCTIONALITY
// ========================================
function initializeUserManagement() {
    console.log('👥 Initializing user management...');
    
    // User search functionality
    const userSearch = document.getElementById('userSearch');
    if (userSearch) {
        userSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            console.log(`🔍 Searching users: ${searchTerm}`);
            filterUsers(searchTerm);
        });
    }
    
    // Role filter functionality
    const roleFilter = document.getElementById('roleFilter');
    if (roleFilter) {
        roleFilter.addEventListener('change', function() {
            const selectedRole = this.value;
            console.log(`🎭 Filtering by role: ${selectedRole}`);
            filterUsersByRole(selectedRole);
        });
    }
    
    // Status filter functionality
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            const selectedStatus = this.value;
            console.log(`📊 Filtering by status: ${selectedStatus}`);
            filterUsersByStatus(selectedStatus);
        });
    }
    
    console.log('✅ User management initialized');
}

// Filter users by search term
function filterUsers(searchTerm) {
    const userRows = document.querySelectorAll('#usersTableBody tr');
    
    userRows.forEach(row => {
        const userName = row.querySelector('.user-name')?.textContent.toLowerCase() || '';
        const userEmail = row.querySelector('.user-email')?.textContent.toLowerCase() || '';
        
        if (userName.includes(searchTerm) || userEmail.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Filter users by role
function filterUsersByRole(role) {
    const userRows = document.querySelectorAll('#usersTableBody tr');
    
    userRows.forEach(row => {
        const roleBadge = row.querySelector('.role-badge')?.textContent.toLowerCase() || '';
        
        if (role === '' || roleBadge.includes(role)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Filter users by status
function filterUsersByStatus(status) {
    const userRows = document.querySelectorAll('#usersTableBody tr');
    
    userRows.forEach(row => {
        const statusBadge = row.querySelector('.status-badge')?.textContent.toLowerCase() || '';
        
        if (status === '' || statusBadge.includes(status)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// User management functions
function openAddUserModal() {
    console.log('➕ Opening add user modal...');
    showToast('Add user functionality would open here', 'info');
}

function editUser(userId) {
    console.log(`✏️ Editing user: ${userId}`);
    showToast(`Edit user ${userId} functionality would open here`, 'info');
}

function viewUser(userId) {
    console.log(`👁️ Viewing user: ${userId}`);
    showToast(`View user ${userId} details would open here`, 'info');
}

function deleteUser(userId) {
    console.log(`🗑️ Deleting user: ${userId}`);
    if (confirm(`Are you sure you want to delete user ${userId}?`)) {
        showToast(`User ${userId} deleted successfully`, 'success');
    }
}

function exportUsers() {
    console.log('📤 Exporting users...');
    showToast('User data export would start here', 'info');
}

// ========================================
// QUICK ACTION BUTTONS FUNCTIONALITY
// ========================================

// Add Health Center Modal
function openAddHealthCenterModal() {
    console.log('🏥 Opening add health center modal...');
    const modal = document.getElementById('addHealthCenterModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Set default date values
        const today = new Date().toISOString().split('T')[0];
        const startDateInput = modal.querySelector('input[name="startDate"]');
        const endDateInput = modal.querySelector('input[name="endDate"]');
        if (startDateInput) startDateInput.value = today;
        if (endDateInput) endDateInput.value = today;
    }
}

// Generate Report Modal
function openGenerateReportModal() {
    console.log('📊 Opening generate report modal...');
    const modal = document.getElementById('generateReportModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Set default date values
        const today = new Date().toISOString().split('T')[0];
        const startDateInput = modal.querySelector('input[name="startDate"]');
        const endDateInput = modal.querySelector('input[name="endDate"]');
        if (startDateInput) startDateInput.value = today;
        if (endDateInput) endDateInput.value = today;
    }
}

// Export Data Modal
function openExportDataModal() {
    console.log('📥 Opening export data modal...');
    const modal = document.getElementById('exportDataModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Set default date values
        const today = new Date().toISOString().split('T')[0];
        const startDateInput = modal.querySelector('input[name="exportStartDate"]');
        const endDateInput = modal.querySelector('input[name="exportEndDate"]');
        if (startDateInput) startDateInput.value = today;
        if (endDateInput) endDateInput.value = today;
    }
}


// Submit Health Center Form
function submitHealthCenterForm() {
    console.log('🏥 Submitting health center form...');
    
    const form = document.getElementById('addHealthCenterForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const centerData = {
        centerName: formData.get('centerName'),
        centerType: formData.get('centerType'),
        address: formData.get('address'),
        pincode: formData.get('pincode'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        contactPerson: formData.get('contactPerson'),
        licenseNumber: formData.get('licenseNumber'),
        services: formData.getAll('services')
    };
    
    console.log('📊 Health center data:', centerData);
    
    // Validate required fields
    const requiredFields = ['centerName', 'centerType', 'address', 'pincode', 'phone', 'email', 'contactPerson', 'licenseNumber'];
    const missingFields = requiredFields.filter(field => !centerData[field]);
    
    if (missingFields.length > 0) {
        showToast(`Please fill in all required fields: ${missingFields.join(', ')}`, 'error');
        return;
    }
    
    // Simulate API call
    showToast('Adding health center...', 'info');
    
    setTimeout(() => {
        showToast('Health center added successfully!', 'success');
        closeModal('addHealthCenterModal');
        form.reset();
    }, 2000);
}

// Generate Report
function generateReport() {
    console.log('📊 Generating report...');
    
    const form = document.getElementById('generateReportForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const reportData = {
        reportType: formData.get('reportType'),
        format: formData.get('format'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        includeCharts: formData.get('includeCharts') === 'on',
        filters: formData.getAll('filters')
    };
    
    console.log('📊 Report configuration:', reportData);
    
    // Validate required fields
    if (!reportData.reportType || !reportData.format || !reportData.startDate || !reportData.endDate) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    // Simulate report generation
    showToast('Generating report...', 'info');
    
    setTimeout(() => {
        showToast(`Report generated successfully! (${reportData.format.toUpperCase()})`, 'success');
        closeModal('generateReportModal');
        form.reset();
    }, 3000);
}

// Export Data
function exportData() {
    console.log('📥 Exporting data...');
    
    const form = document.getElementById('exportDataForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const exportData = {
        dataTypes: formData.getAll('dataType'),
        format: formData.get('exportFormat'),
        startDate: formData.get('exportStartDate'),
        endDate: formData.get('exportEndDate'),
        includeSensitive: formData.get('includeSensitive') === 'on',
        emailExport: formData.get('emailExport')
    };
    
    console.log('📥 Export configuration:', exportData);
    
    // Validate required fields
    if (exportData.dataTypes.length === 0 || !exportData.format) {
        showToast('Please select at least one data type and format', 'error');
        return;
    }
    
    // Simulate data export
    showToast('Preparing data export...', 'info');
    
    setTimeout(() => {
        showToast(`Data export completed! (${exportData.format.toUpperCase()})`, 'success');
        closeModal('exportDataModal');
        form.reset();
    }, 2500);
}

// Close Modal
function closeModal(modalId) {
    console.log(`❌ Closing modal: ${modalId}`);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize Quick Actions
function initializeQuickActions() {
    console.log('⚡ Initializing quick actions...');
    
    // Note: Modal close functionality is already handled in initializeModals()
    // No need to duplicate event listeners here
    
    console.log('✅ Quick actions initialized');
}

// Dashboard Widgets
function initializeDashboardWidgets() {
    // Initialize any dashboard-specific widgets
    console.log('Dashboard widgets initialized');
}

// Action Buttons
function initializeActionButtons() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            console.log(`Action clicked: ${action}`);
            
            // Handle different actions
            switch(action) {
                case 'Add Health Center':
                    handleAddHealthCenter();
                    break;
                case 'Generate Report':
                    handleGenerateReport();
                    break;
                case 'Export Data':
                    handleExportData();
                    break;
                case 'System Settings':
                    navigateToPage('system-settings');
                    break;
                default:
                    console.log(`Action "${action}" not implemented yet`);
            }
        });
    });
}

function handleAddHealthCenter() {
    console.log('Opening add health center form...');
    // Implementation for adding health center
}

function handleGenerateReport() {
    console.log('Generating report...');
    // Implementation for report generation
}

function handleExportData() {
    console.log('Exporting data...');
    // Implementation for data export
}

// Logout Functionality
function handleLogout() {
    console.log('Logging out...');
    
    // Show confirmation dialog
    if (confirm('Are you sure you want to logout?')) {
        // Clear any stored data
        localStorage.clear();
        sessionStorage.clear();
        
        // Redirect to login page
        window.location.href = '../landing/land.html';
    }
}

// Utility Functions
function showNotification(message, type = 'info') {
    console.log(`Notification: ${message} (${type})`);
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function formatNumber(num) {
    return new Intl.NumberFormat().format(num);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));
}

// Chart.js Integration (for future use)
function initializeCharts() {
    console.log('Chart.js integration ready for implementation');
    
    // Chart.js can be implemented here when needed
    // Example:
    // const ctx = document.getElementById('myChart').getContext('2d');
    // const chart = new Chart(ctx, { ... });
}

// Data Management
function loadDashboardData() {
    console.log('Loading dashboard data...');
    
    // Simulate loading data
    setTimeout(() => {
        console.log('Dashboard data loaded');
        updateDashboardStats();
    }, 1000);
}

function updateDashboardStats() {
    // Update statistics with real or simulated data
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const currentValue = parseInt(stat.textContent.replace(/,/g, ''));
        if (!isNaN(currentValue)) {
            animateNumber(stat, currentValue);
        }
    });
}

function animateNumber(element, targetValue) {
    let currentValue = 0;
    const increment = targetValue / 50;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        
        element.textContent = formatNumber(Math.floor(currentValue));
    }, 20);
}

// Language Selector
function initializeLanguageSelector() {
    const languageSelect = document.querySelector('.language-selector select');
    
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            console.log(`Language changed to: ${selectedLanguage}`);
            
            // Language switching logic can be implemented here
            showNotification(`Language changed to ${selectedLanguage}`, 'success');
        });
    }
}

// Initialize language selector
initializeLanguageSelector();

// Export functions for global access
window.navigateToPage = navigateToPage;
window.showModal = showModal;
window.hideModal = hideModal;
window.showNotification = showNotification;
window.hideSearchResults = hideSearchResults;
window.viewUser = viewUser;
window.viewHealthCenter = viewHealthCenter;
window.viewReport = viewReport;
window.viewSystemItem = viewSystemItem;

console.log('Admin dashboard JavaScript loaded and ready');
