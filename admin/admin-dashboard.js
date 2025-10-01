// Dynamic Notification System for Migrant Workers and Health Centers
console.log('JavaScript file loaded successfully');

// Immediate test to verify JavaScript is working
console.log('Testing basic JavaScript functionality...');
console.log('Document ready state:', document.readyState);
console.log('Window loaded:', typeof window !== 'undefined');

// Test function to verify buttons exist
function testButtons() {
  console.log('Testing button elements...');
  const exportBtn = document.getElementById('exportReportsBtn');
  const sendAlertBtn = document.getElementById('sendAlertBtn');
  const addPatientBtn = document.getElementById('addPatientBtn');

  console.log('Button elements found:', {
    exportBtn: !!exportBtn,
    sendAlertBtn: !!sendAlertBtn,
    addPatientBtn: !!addPatientBtn,
  });

  return { exportBtn, sendAlertBtn, addPatientBtn };
}

// Make test function available globally
window.testButtons = testButtons;

let notifications = [
  {
    id: 1,
    type: 'migrant',
    title: 'New Migrant Worker Registration',
    message:
      'Health Center Kochi: 15 new migrant workers registered. Health screening scheduled for tomorrow.',
    time: '2 min ago',
    unread: true,
    priority: 'high',
    healthCenter: 'Kochi Health Center',
    workerCount: 15,
  },
  {
    id: 2,
    type: 'migrant',
    title: 'Health Screening Completed',
    message:
      'Health Center Thrissur: Completed health screening for 25 migrant workers. 3 require follow-up.',
    time: '15 min ago',
    unread: true,
    priority: 'medium',
    healthCenter: 'Thrissur Health Center',
    workerCount: 25,
  },
  {
    id: 3,
    type: 'health',
    title: 'Vaccination Drive Update',
    message:
      'Health Center Palakkad: Hepatitis B vaccination completed for 40 migrant workers.',
    time: '1 hour ago',
    unread: false,
    priority: 'low',
    healthCenter: 'Palakkad Health Center',
    workerCount: 40,
  },
  {
    id: 4,
    type: 'migrant',
    title: 'Emergency Health Alert',
    message:
      'Health Center Kollam: 2 migrant workers reported with respiratory symptoms. Immediate testing required.',
    time: '2 hours ago',
    unread: true,
    priority: 'high',
    healthCenter: 'Kollam Health Center',
    workerCount: 2,
  },
  {
    id: 5,
    type: 'health',
    title: 'Medical Supply Request',
    message:
      'Health Center Ernakulam: Requesting additional COVID-19 test kits for migrant worker screening.',
    time: '3 hours ago',
    unread: true,
    priority: 'medium',
    healthCenter: 'Ernakulam Health Center',
    workerCount: 0,
  },
  {
    id: 6,
    type: 'system',
    title: 'Health Center Registration',
    message:
      'New Health Center "Malappuram Medical Center" successfully registered in the system.',
    time: '4 hours ago',
    unread: false,
    priority: 'low',
    healthCenter: 'Malappuram Medical Center',
    workerCount: 0,
  },
  {
    id: 7,
    type: 'migrant',
    title: 'Health Records Updated',
    message:
      'Health Center Kozhikode: Updated health records for 30 migrant workers. All vaccinations current.',
    time: '5 hours ago',
    unread: false,
    priority: 'low',
    healthCenter: 'Kozhikode Health Center',
    workerCount: 30,
  },
  {
    id: 8,
    type: 'health',
    title: 'Disease Surveillance Report',
    message:
      'Health Center Kannur: Weekly disease surveillance completed. No outbreaks detected among migrant workers.',
    time: '6 hours ago',
    unread: true,
    priority: 'medium',
    healthCenter: 'Kannur Health Center',
    workerCount: 0,
  },
];

let currentTab = 'all';

// Simple test function to check if notification system is working
function quickTest() {
  console.log('Quick test - notifications array length:', notifications.length);
  console.log(
    'Unread notifications:',
    notifications.filter((n) => n.unread).length
  );

  // Try to find notification elements immediately
  const trigger = document.getElementById('notificationTrigger');
  const count = document.getElementById('notificationCount');

  console.log('Elements found immediately:', {
    trigger: !!trigger,
    count: !!count,
  });

  if (count) {
    const unreadCount = notifications.filter((n) => n.unread).length;
    count.textContent = unreadCount;
    console.log('Set notification count to:', unreadCount);
  }
}

// Make it available globally
window.quickTest = quickTest;

// Notification system will be initialized in DOMContentLoaded event

// Notification overlay controls - will be initialized when DOM is ready
let notificationTrigger,
  notificationOverlay,
  notificationClose,
  notificationContent,
  notificationCount,
  notificationTabs;

// Show notification overlay
function showNotifications() {
  console.log('showNotifications called');
  if (!notificationOverlay) {
    console.log('Notification overlay not found');
    return;
  }
  notificationOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  renderNotifications();
}

// Hide notification overlay
function hideNotifications() {
  notificationOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Render notifications based on current tab
function renderNotifications() {
  const filteredNotifications =
    currentTab === 'all'
      ? notifications
      : notifications.filter((n) => n.type === currentTab);

  if (filteredNotifications.length === 0) {
    notificationContent.innerHTML = `
            <div class="notification-empty">
                <div style="font-size: 48px; margin-bottom: 12px;">📭</div>
                <div style="font-weight: 500; margin-bottom: 4px;">No notifications</div>
                <div style="font-size: 13px;">You're all caught up!</div>
            </div>
        `;
    return;
  }

  notificationContent.innerHTML = filteredNotifications
    .map(
      (notification) => `
        <div class="notification-item ${
          notification.unread ? 'unread' : ''
        }" data-id="${notification.id}">
            <div class="notification-meta">
                <div class="notification-type ${notification.type}">
                    <span class="notification-icon ${notification.type}">
                        ${getTypeIcon(notification.type)}
                    </span>
                    ${notification.type}
                </div>
                <div class="notification-time">${notification.time}</div>
            </div>
            <div class="notification-title">${notification.title}</div>
            <div class="notification-message">${notification.message}</div>
            <div class="notification-actions">
                <button class="notification-btn primary" onclick="handleNotificationAction(${
                  notification.id
                }, 'view')">
                    View Details
                </button>
                ${
                  notification.unread
                    ? `
                    <button class="notification-btn" onclick="markAsRead(${notification.id})">
                        Mark as Read
                    </button>
                `
                    : ''
                }
                <button class="notification-btn" onclick="dismissNotification(${
                  notification.id
                })">
                    Dismiss
                </button>
            </div>
        </div>
    `
    )
    .join('');
}

// Get icon for notification type
function getTypeIcon(type) {
  const icons = {
    health: '🏥',
    migrant: '👥',
    system: '⚙️',
    campaign: '💉',
    alert: '⚠️',
  };
  return icons[type] || '📧';
}

// Handle notification actions
function handleNotificationAction(notificationId, action) {
  const notification = notifications.find((n) => n.id === notificationId);
  if (!notification) return;

  switch (action) {
    case 'view':
      alert(
        `Viewing details for: ${notification.title}\n\n${notification.message}`
      );
      markAsRead(notificationId);
      break;
  }
}

// Mark notification as read
function markAsRead(notificationId) {
  const notification = notifications.find((n) => n.id === notificationId);
  if (notification) {
    notification.unread = false;
    renderNotifications();
    updateNotificationCount();
  }
}

// Dismiss notification
function dismissNotification(notificationId) {
  const index = notifications.findIndex((n) => n.id === notificationId);
  if (index > -1) {
    notifications.splice(index, 1);
    renderNotifications();
    updateNotificationCount();
  }
}

// Update notification count badge
function updateNotificationCount() {
  if (!notificationCount) {
    console.log('Notification count element not found');
    return;
  }

  const unreadCount = notifications.filter((n) => n.unread).length;
  console.log('Updating notification count:', unreadCount);
  notificationCount.textContent = unreadCount;
  notificationCount.style.display = unreadCount > 0 ? 'flex' : 'none';
}

// Tab switching will be set up in DOMContentLoaded event

// Event listeners are now set up in DOMContentLoaded event

// Add new notification function with health center support
function addNotification(
  type,
  title,
  message,
  priority = 'medium',
  healthCenter = null,
  workerCount = 0
) {
  const newNotification = {
    id: Date.now(),
    type: type,
    title: title,
    message: message,
    time: 'Just now',
    unread: true,
    priority: priority,
    healthCenter: healthCenter,
    workerCount: workerCount,
  };

  notifications.unshift(newNotification);
  updateNotificationCount();

  // Show toast notification
  showToast(`New ${type} notification: ${title}`);

  // Auto-refresh if overlay is open
  if (notificationOverlay.classList.contains('active')) {
    renderNotifications();
  }
}

// Simulate health center notifications
function simulateHealthCenterNotifications() {
  const healthCenters = [
    'Kochi Health Center',
    'Thrissur Health Center',
    'Palakkad Health Center',
    'Kollam Health Center',
    'Ernakulam Health Center',
    'Kozhikode Health Center',
    'Kannur Health Center',
    'Malappuram Health Center',
    'Wayanad Health Center',
  ];

  const notificationTypes = [
    {
      type: 'migrant',
      titles: [
        'New Migrant Worker Registration',
        'Health Screening Completed',
        'Emergency Health Alert',
        'Health Records Updated',
      ],
      messages: [
        'new migrant workers registered. Health screening scheduled.',
        'Completed health screening for migrant workers. Some require follow-up.',
        'migrant workers reported with symptoms. Immediate testing required.',
        'Updated health records for migrant workers. All vaccinations current.',
      ],
    },
    {
      type: 'health',
      titles: [
        'Vaccination Drive Update',
        'Medical Supply Request',
        'Disease Surveillance Report',
        'Health Camp Scheduled',
      ],
      messages: [
        'vaccination completed for migrant workers.',
        'Requesting additional medical supplies for migrant worker screening.',
        'Weekly disease surveillance completed. No outbreaks detected.',
        'Health camp scheduled for migrant workers in the area.',
      ],
    },
  ];

  if (Math.random() > 0.85) {
    // 15% chance every update cycle
    const healthCenter =
      healthCenters[Math.floor(Math.random() * healthCenters.length)];
    const typeData =
      notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    const title =
      typeData.titles[Math.floor(Math.random() * typeData.titles.length)];
    const message =
      typeData.messages[Math.floor(Math.random() * typeData.messages.length)];
    const priority = ['low', 'medium', 'high'][Math.floor(Math.random() * 3)];
    const workerCount = Math.floor(Math.random() * 50) + 1;

    const fullMessage = `Health Center ${healthCenter}: ${workerCount} ${message}`;

    addNotification(
      typeData.type,
      title,
      fullMessage,
      priority,
      healthCenter,
      workerCount
    );
  }
}

// Lab Report Export JavaScript functionality
class LabReportExporter {
  constructor() {
    this.overlay = document.getElementById('exportOverlay');
    this.closeBtn = document.getElementById('exportClose');
    this.previewBtn = document.getElementById('previewBtn');
    this.exportBtn = document.getElementById('exportPdfBtn');
    this.progressSection = document.getElementById('progressSection');
    this.progressBar = document.getElementById('progressBar');
    this.progressText = document.getElementById('progressText');
    this.exportSpinner = document.getElementById('exportSpinner');
    this.reportPreview = document.getElementById('reportPreview');

    this.setupEventListeners();
    this.updatePreview();
  }

  setupEventListeners() {
    // Close overlay
    this.closeBtn.addEventListener('click', () => this.hideOverlay());
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.hideOverlay();
    });

    // Preview and export buttons
    this.previewBtn.addEventListener('click', () => this.updatePreview());
    this.exportBtn.addEventListener('click', () => this.exportToPDF());

    // Form changes
    document
      .querySelectorAll('#exportOverlay select, #exportOverlay input')
      .forEach((element) => {
        element.addEventListener('change', () => this.updatePreview());
      });

    // Checkbox styling
    document.querySelectorAll('.checkbox-item').forEach((item) => {
      const checkbox = item.querySelector('input[type="checkbox"]');
      checkbox.addEventListener('change', () => {
        item.classList.toggle('checked', checkbox.checked);
        this.updatePreview();
      });
      // Initial state
      item.classList.toggle('checked', checkbox.checked);
    });
  }

  showOverlay() {
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.updatePreview();
  }

  hideOverlay() {
    this.overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    this.resetProgress();
  }

  getFormData() {
    return {
      reportType: document.getElementById('reportType').value,
      dateRange: document.getElementById('dateRange').value,
      region: document.getElementById('regionFilter').value,
      workerCategory: document.getElementById('workerCategory').value,
      sections: Array.from(
        document.querySelectorAll(
          '#exportOverlay input[type="checkbox"]:checked'
        )
      ).map((cb) => cb.id),
    };
  }

  updatePreview() {
    const formData = this.getFormData();
    const reportContent = this.generateReportContent(formData);
    this.reportPreview.textContent = reportContent;
  }

  generateReportContent(formData) {
    const reportTypes = {
      comprehensive: 'Comprehensive Health Report',
      vaccination: 'Vaccination Status Report',
      disease: 'Disease Surveillance Report',
      emergency: 'Emergency Health Alert Report',
      statistical: 'Statistical Analysis Report',
    };

    const regions = {
      all: 'All Regions',
      kochi: 'Kochi',
      kozhikode: 'Kozhikode',
      thrissur: 'Thrissur',
      palakkad: 'Palakkad',
      malappuram: 'Malappuram',
    };

    const dateRanges = {
      last7: 'Last 7 Days',
      last30: 'Last 30 Days',
      last90: 'Last 90 Days',
      last365: 'Last 365 Days',
      custom: 'Custom Date Range',
    };

    let content = `KERALA MIGRANT WORKER HEALTH REPORT
=============================

ype: ${reportTypes[formData.reportType]}
ge: ${dateRanges[formData.dateRange]}
${regions[formData.region]}
ategory: ${formData.workerCategory}
d: ${new Date().toLocaleString()}

 SECTIONS:
`;

    formData.sections.forEach((section) => {
      const sectionNames = {
        demographics: '• Worker Demographics',
        'health-status': '• Health Status Overview',
        vaccination: '• Vaccination Records',
        diseases: '• Disease Surveillance',
        alerts: '• Health Alerts & Incidents',
        providers: '• Healthcare Provider Statistics',
        trends: '• Trend Analysis',
        recommendations: '• Recommendations',
      };
      content += `${sectionNames[section] || '• ' + section}\n`;
    });

    content += `\nREPORT SUMMARY:
Workers: 12,456
ation Coverage: 78.5%
 Health Alerts: 7
care Providers: 89

ort will contain detailed analysis and recommendations
 the selected parameters and data sections.`;

    return content;
  }

  async exportToPDF() {
    this.showProgress();
    const formData = this.getFormData();

    try {
      // Initialize jsPDF
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      await this.generatePDFContent(doc, formData);

      // Generate filename
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `kerala-health-report-${formData.reportType}-${timestamp}.pdf`;

      // Save PDF
      doc.save(filename);

      this.showSuccess('Report exported successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      this.showError('Failed to generate PDF. Please try again.');
    } finally {
      this.hideProgress();
    }
  }

  async generatePDFContent(doc, formData) {
    const progressSteps = [
      'Initializing PDF generation...',
      'Adding header and metadata...',
      'Processing worker demographics...',
      'Compiling health statistics...',
      'Generating charts and graphs...',
      'Adding recommendations...',
      'Finalizing document...',
    ];

    let currentStep = 0;

    for (let step of progressSteps) {
      this.updateProgress((currentStep / progressSteps.length) * 100, step);
      await new Promise((resolve) => setTimeout(resolve, 500));

      switch (currentStep) {
        case 0:
          this.addPDFHeader(doc, formData);
          break;
        case 1:
          this.addMetadata(doc, formData);
          break;
        case 2:
          this.addDemographics(doc, formData);
          break;
        case 3:
          this.addHealthStatistics(doc, formData);
          break;
        case 4:
          this.addChartsSection(doc, formData);
          break;
        case 5:
          this.addRecommendations(doc, formData);
          break;
        case 6:
          this.addFooter(doc);
          break;
      }

      currentStep++;
    }
  }

  addPDFHeader(doc, formData) {
    // Header
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text('KERALA MIGRANT WORKER HEALTH REPORT', 20, 30);

    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text('Government of Kerala - Health Department', 20, 40);
    doc.text('Integrated Healthcare Management System', 20, 47);

    // Report details box
    doc.setDrawColor(200);
    doc.rect(20, 55, 170, 35);

    doc.setFontSize(10);
    const reportTypes = {
      comprehensive: 'Comprehensive Health Report',
      vaccination: 'Vaccination Status Report',
      disease: 'Disease Surveillance Report',
      emergency: 'Emergency Health Alert Report',
      statistical: 'Statistical Analysis Report',
    };

    doc.text(`Report Type: ${reportTypes[formData.reportType]}`, 25, 65);
    doc.text(`Date Range: ${formData.dateRange}`, 25, 72);
    doc.text(`Region: ${formData.region}`, 25, 79);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 25, 86);
  }

  addMetadata(doc, formData) {
    let yPosition = 100;

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('EXECUTIVE SUMMARY', 20, yPosition);

    yPosition += 15;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');

    const summaryData = [
      ['Total Registered Workers:', '12,456'],
      ['Vaccination Coverage:', '78.5%'],
      ['Active Health Alerts:', '7'],
      ['Healthcare Providers:', '89'],
      ['Report Sections Included:', formData.sections.length.toString()],
    ];

    summaryData.forEach(([label, value]) => {
      doc.text(label, 25, yPosition);
      doc.text(value, 120, yPosition);
      yPosition += 8;
    });
  }

  addDemographics(doc, formData) {
    if (!formData.sections.includes('demographics')) return;

    doc.addPage();
    let yPosition = 30;

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('WORKER DEMOGRAPHICS', 20, yPosition);

    yPosition += 20;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');

    const demographics = [
      'Age Distribution:',
      '  • 18-25 years: 3,245 (26.1%)',
      '  • 26-35 years: 4,123 (33.1%)',
      '  • 36-45 years: 3,456 (27.7%)',
      '  • 46+ years: 1,632 (13.1%)',
      '',
      'Gender Distribution:',
      '  • Male: 7,890 (63.3%)',
      '  • Female: 4,566 (36.7%)',
      '',
      'State of Origin:',
      '  • West Bengal: 4,234 (34.0%)',
      '  • Odisha: 2,456 (19.7%)',
      '  • Assam: 2,123 (17.0%)',
      '  • Bihar: 1,890 (15.2%)',
      '  • Others: 1,753 (14.1%)',
    ];

    demographics.forEach((line) => {
      doc.text(line, 25, yPosition);
      yPosition += 7;
    });
  }

  addHealthStatistics(doc, formData) {
    if (!formData.sections.includes('health-status')) return;

    doc.addPage();
    let yPosition = 30;

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('HEALTH STATUS OVERVIEW', 20, yPosition);

    yPosition += 20;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');

    const healthStats = [
      'Common Health Issues (This Month):',
      '  • Respiratory Infections: 23 cases (+15%)',
      '  • Skin Conditions: 12 cases (+8%)',
      '  • Work-related Injuries: 18 cases (+5%)',
      '  • Dengue Cases: 5 cases (New)',
      '  • Gastrointestinal Issues: 8 cases (-10%)',
      '',
      'Health Screening Coverage:',
      '  • Regular Health Checkups: 89.2%',
      '  • Occupational Health Screening: 76.8%',
      '  • Mental Health Assessment: 45.3%',
      '',
      'Healthcare Utilization:',
      '  • Primary Care Visits: 2,456/month',
      '  • Emergency Care: 89/month',
      '  • Specialist Referrals: 234/month',
      '  • Hospitalization Rate: 1.2%',
    ];

    healthStats.forEach((line) => {
      doc.text(line, 25, yPosition);
      yPosition += 7;
    });
  }

  addChartsSection(doc, formData) {
    doc.addPage();
    let yPosition = 30;

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('DATA VISUALIZATION', 20, yPosition);

    yPosition += 20;
    doc.setFontSize(10);
    doc.text(
      'Note: Charts and graphs would be rendered here in a full implementation.',
      25,
      yPosition
    );
    yPosition += 10;
    doc.text(
      'This includes vaccination trend charts, disease distribution graphs, and regional comparisons.',
      25,
      yPosition
    );

    // Simple text-based chart representation
    yPosition += 20;
    doc.text('Vaccination Coverage by Region:', 25, yPosition);
    yPosition += 10;

    const regions = [
      'Kochi:      ████████████████████ 85.2%',
      'Thrissur:   ████████████████████ 82.1%',
      'Kozhikode:  ███████████████████  78.9%',
      'Palakkad:   ██████████████████   76.5%',
      'Malappuram: █████████████████    73.8%',
    ];

    regions.forEach((region) => {
      doc.text(region, 25, yPosition);
      yPosition += 8;
    });
  }

  addRecommendations(doc, formData) {
    if (!formData.sections.includes('recommendations')) return;

    doc.addPage();
    let yPosition = 30;

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('RECOMMENDATIONS', 20, yPosition);

    yPosition += 20;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');

    const recommendations = [
      '1. IMMEDIATE ACTIONS REQUIRED:',
      '   • Enhanced dengue vector control measures in Ernakulam',
      '   • Increase respiratory infection screening protocols',
      '   • Workplace safety training for injury prevention',
      '',
      '2. VACCINATION PROGRAM IMPROVEMENTS:',
      '   • Target 85% coverage by March 2024',
      '   • Focus on Malappuram region for catch-up campaigns',
      '   • Implement mobile vaccination units',
      '',
      '3. HEALTHCARE SYSTEM ENHANCEMENTS:',
      '   • Strengthen primary healthcare capacity',
      '   • Improve mental health service accessibility',
      '   • Expand telemedicine services',
      '',
      '4. DATA MANAGEMENT IMPROVEMENTS:',
      '   • Enhance real-time disease surveillance',
      '   • Implement predictive health analytics',
      '   • Strengthen cross-regional data sharing',
    ];

    recommendations.forEach((line) => {
      doc.text(line, 25, yPosition);
      yPosition += 7;
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 30;
      }
    });
  }

  addFooter(doc) {
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128);
      doc.text(`Page ${i} of ${pageCount}`, 200, 290, { align: 'right' });
      doc.text('Kerala Health Records - Confidential Report', 20, 290);
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 290, {
        align: 'center',
      });
    }
  }

  showProgress() {
    this.progressSection.style.display = 'block';
    this.exportSpinner.style.display = 'inline-block';
    this.exportBtn.disabled = true;
  }

  hideProgress() {
    this.progressSection.style.display = 'none';
    this.exportSpinner.style.display = 'none';
    this.exportBtn.disabled = false;
  }

  resetProgress() {
    this.progressBar.style.width = '0%';
    this.progressText.textContent = 'Initializing...';
    this.hideProgress();
  }

  updateProgress(percentage, text) {
    this.progressBar.style.width = `${percentage}%`;
    this.progressText.textContent = text;
  }

  showSuccess(message) {
    this.showToast(message, 'success');
  }

  showError(message) {
    this.showToast(message, 'error');
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    const bgColor =
      type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';

    toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => (toast.style.opacity = '1'), 100);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  }
}

// Lab Report Exporter will be initialized in DOMContentLoaded event
let labReportExporter;

// Toast notification function for general use
function showToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1f2937;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => (toast.style.opacity = '1'), 100);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}

// Initialize all systems when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM Content Loaded - Initializing all systems...');

  // Initialize notification elements
  notificationTrigger = document.getElementById('notificationTrigger');
  notificationOverlay = document.getElementById('notificationOverlay');
  notificationClose = document.getElementById('notificationClose');
  notificationContent = document.getElementById('notificationContent');
  notificationCount = document.getElementById('notificationCount');
  notificationTabs = document.querySelectorAll('.notification-tab');

  // Initialize admin popup elements
  adminPopupOverlay = document.getElementById('adminPopupOverlay');
  adminCloseBtn = document.getElementById('adminCloseBtn');
  adminInfoTrigger = document.getElementById('adminInfoTrigger');

  console.log('Elements found:', {
    notificationTrigger: !!notificationTrigger,
    notificationOverlay: !!notificationOverlay,
    adminInfoTrigger: !!adminInfoTrigger,
    adminPopupOverlay: !!adminPopupOverlay,
  });

  // Initialize Lab Report Exporter
  try {
    labReportExporter = new LabReportExporter();
    console.log('Lab Report Exporter initialized successfully');
  } catch (error) {
    console.error('Error initializing Lab Report Exporter:', error);
  }

  // Initialize notification count
  updateNotificationCount();

  // Set up notification event listeners
  if (notificationTrigger) {
    notificationTrigger.addEventListener('click', showNotifications);
    console.log('Notification trigger click handler attached');
  }

  if (notificationClose) {
    notificationClose.addEventListener('click', hideNotifications);
  }

  if (notificationOverlay) {
    notificationOverlay.addEventListener('click', (e) => {
      if (e.target === notificationOverlay) {
        hideNotifications();
      }
    });
  }

  // Set up admin popup event listeners
  if (adminInfoTrigger) {
    adminInfoTrigger.addEventListener('click', showAdminPopup);
    console.log('Admin trigger click handler attached');
  }

  if (adminCloseBtn) {
    adminCloseBtn.addEventListener('click', hideAdminPopup);
  }

  if (adminPopupOverlay) {
    adminPopupOverlay.addEventListener('click', (e) => {
      if (e.target === adminPopupOverlay) {
        hideAdminPopup();
      }
    });
  }

  // Tab switching for notifications
  if (notificationTabs) {
    notificationTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        notificationTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        currentTab = tab.dataset.tab;
        renderNotifications();
      });
    });
  }

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (
        notificationOverlay &&
        notificationOverlay.classList.contains('active')
      ) {
        hideNotifications();
      }
      if (adminPopupOverlay && adminPopupOverlay.classList.contains('active')) {
        hideAdminPopup();
      }
      // Also handle export overlay if it exists
      const exportOverlay = document.getElementById('exportOverlay');
      if (exportOverlay && exportOverlay.classList.contains('active')) {
        hideExportOverlay();
      }
    }
  });

  // Set up action button event listeners
  const exportReportsBtn = document.getElementById('exportReportsBtn');
  if (exportReportsBtn) {
    exportReportsBtn.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('Export Reports button clicked');
      labReportExporter.showOverlay();
    });
    console.log('Export Reports button event listener attached');
  }

  // Send Alert button
  const sendAlertBtn = document.getElementById('sendAlertBtn');
  if (sendAlertBtn) {
    sendAlertBtn.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('Send Alert button clicked');
      const alertType = prompt('Enter alert type (health/system/campaign):');
      const message = prompt('Enter alert message:');

      if (alertType && message) {
        addNotification(alertType, 'Custom Alert', message, 'high');

        // Update alerts count
        const alertsCount = document.querySelectorAll('.stat-card .number')[2];
        if (alertsCount) {
          const current = parseInt(alertsCount.textContent);
          alertsCount.textContent = current + 1;
        }

        showToast(`Alert sent: ${message}`);
      }
    });
    console.log('Send Alert button event listener attached');
  }

  // Add New Patient button
  const addPatientBtn = document.getElementById('addPatientBtn');
  if (addPatientBtn) {
    addPatientBtn.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('Add New Patient button clicked');
      openAddPatientPopup();
    });
    console.log('Add New Patient button event listener attached');
  }

  console.log('All systems initialized successfully');
});

// Health Administrator Popup Functionality
// Show administrator popup
function showAdminPopup() {
  console.log('showAdminPopup called');
  if (!adminPopupOverlay) {
    console.log('Admin popup overlay not found');
    return;
  }
  adminPopupOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Hide administrator popup
function hideAdminPopup() {
  if (!adminPopupOverlay) return;
  adminPopupOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Function to manually add test notifications (can be called from browser console)
function addTestNotification() {
  const healthCenters = [
    'Kochi Health Center',
    'Thrissur Health Center',
    'Palakkad Health Center',
  ];
  const healthCenter =
    healthCenters[Math.floor(Math.random() * healthCenters.length)];
  const workerCount = Math.floor(Math.random() * 30) + 5;

  addNotification(
    'migrant',
    'Test Migrant Worker Registration',
    `${healthCenter}: ${workerCount} new migrant workers registered. Health screening scheduled for tomorrow.`,
    'high',
    healthCenter,
    workerCount
  );
}

// Make functions available globally for testing
window.addTestNotification = addTestNotification;
window.showAdminPopup = showAdminPopup;
window.hideAdminPopup = hideAdminPopup;

// Test function to verify notification system is working
function testNotificationSystem() {
  console.log('Testing notification system...');
  console.log('Notification elements:', {
    trigger: !!notificationTrigger,
    overlay: !!notificationOverlay,
    close: !!notificationClose,
    content: !!notificationContent,
    count: !!notificationCount,
    tabs: notificationTabs ? notificationTabs.length : 0,
  });

  if (notificationTrigger) {
    console.log('Notification trigger found, adding test notification...');
    addTestNotification();
  } else {
    console.log('Notification trigger not found - DOM may not be ready yet');
  }
}

// Test function for admin popup
function testAdminPopup() {
  console.log('Testing admin popup...');
  const trigger = document.getElementById('adminInfoTrigger');
  const overlay = document.getElementById('adminPopupOverlay');
  const closeBtn = document.getElementById('adminCloseBtn');

  console.log('Admin popup elements:', {
    trigger: !!trigger,
    overlay: !!overlay,
    closeBtn: !!closeBtn,
  });

  if (overlay) {
    console.log('Showing admin popup...');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    console.log('Admin popup overlay not found!');
  }
}

// Test all popups function
function testAllPopups() {
  console.log('=== TESTING ALL POPUPS ===');

  // Test notification popup
  console.log('1. Testing notification popup...');
  if (notificationTrigger && notificationOverlay) {
    console.log('✓ Notification elements found');
    showNotifications();
    setTimeout(() => {
      hideNotifications();
      console.log('✓ Notification popup test completed');
    }, 1000);
  } else {
    console.log('✗ Notification elements missing');
  }

  // Test admin popup
  console.log('2. Testing admin popup...');
  if (adminInfoTrigger && adminPopupOverlay) {
    console.log('✓ Admin popup elements found');
    showAdminPopup();
    setTimeout(() => {
      hideAdminPopup();
      console.log('✓ Admin popup test completed');
    }, 1000);
  } else {
    console.log('✗ Admin popup elements missing');
  }

  // Test patient popup
  console.log('3. Testing patient popup...');
  const patientPopup = document.getElementById('patientPopupOverlay');
  if (patientPopup) {
    console.log('✓ Patient popup element found');
    openAddPatientPopup();
    setTimeout(() => {
      closeAddPatientPopup();
      console.log('✓ Patient popup test completed');
    }, 1000);
  } else {
    console.log('✗ Patient popup element missing');
  }

  // Test export popup
  console.log('4. Testing export popup...');
  if (labReportExporter) {
    console.log('✓ Lab report exporter found');
    labReportExporter.showOverlay();
    setTimeout(() => {
      labReportExporter.hideOverlay();
      console.log('✓ Export popup test completed');
    }, 1000);
  } else {
    console.log('✗ Lab report exporter missing');
  }

  console.log('=== ALL POPUP TESTS COMPLETED ===');
}

// Make test functions available globally
window.testNotificationSystem = testNotificationSystem;
window.testAdminPopup = testAdminPopup;
window.testAllPopups = testAllPopups;

// Interactive Analytics System
class AnalyticsManager {
  constructor() {
    this.charts = {};
    this.data = this.initializeData();
    this.init();
  }

  initializeData() {
    // Initialize with default data that can be easily modified
    return {
      healthTrends: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        respiratory: [15, 18, 23, 20],
        vaccinations: [45, 52, 48, 55],
        emergencies: [8, 12, 15, 11],
      },
      regionalData: [
        { name: 'Kochi', count: 2456, percentage: 19.7, color: '#3b82f6' },
        { name: 'Thrissur', count: 2123, percentage: 17.0, color: '#10b981' },
        { name: 'Kozhikode', count: 1890, percentage: 15.2, color: '#f59e0b' },
        { name: 'Palakkad', count: 1756, percentage: 14.1, color: '#8b5cf6' },
        { name: 'Malappuram', count: 1623, percentage: 13.0, color: '#ef4444' },
        { name: 'Others', count: 2608, percentage: 20.9, color: '#6b7280' },
      ],
      vaccinationData: [
        { name: 'COVID-19', coverage: 89.2, color: '#3b82f6' },
        { name: 'Hepatitis B', coverage: 76.8, color: '#10b981' },
        { name: 'Tetanus', coverage: 82.1, color: '#f59e0b' },
        { name: 'Measles', coverage: 68.5, color: '#8b5cf6' },
      ],
      performanceData: [
        {
          name: 'Kochi Health Center',
          patients: 1245,
          satisfaction: 98.5,
          score: 98.5,
        },
        {
          name: 'Thrissur District Hospital',
          patients: 987,
          satisfaction: 97.2,
          score: 97.2,
        },
        {
          name: 'Kozhikode Health Center',
          patients: 756,
          satisfaction: 96.8,
          score: 96.8,
        },
        {
          name: 'Palakkad Medical Center',
          patients: 623,
          satisfaction: 95.1,
          score: 95.1,
        },
        {
          name: 'Malappuram Emergency Unit',
          patients: 1089,
          satisfaction: 94.7,
          score: 94.7,
        },
      ],
      surveillanceData: [], // Will be populated from HTML
      systemMetrics: [
        { name: 'Server Uptime', value: '99.9%', status: 'online', icon: '🖥️' },
        {
          name: 'Database Performance',
          value: '98.5%',
          status: 'online',
          icon: '💾',
        },
        {
          name: 'API Response Time',
          value: '45ms',
          status: 'online',
          icon: '🌐',
        },
        {
          name: 'Security Status',
          value: '100%',
          status: 'online',
          icon: '🔒',
        },
      ],
    };
  }

  // Method to update disease surveillance data - now reads from HTML
  updateSurveillanceData(condition, newData) {
    // Find the surveillance item in HTML and update it directly
    const surveillanceItems = document.querySelectorAll('.surveillance-item');
    surveillanceItems.forEach((item) => {
      const conditionName = item.querySelector('.condition-name').textContent;
      if (conditionName.toLowerCase() === condition.toLowerCase()) {
        // Update the count
        if (newData.count !== undefined) {
          const countElement = item.querySelector('.condition-count');
          countElement.textContent = `${newData.count} cases`;
        }

        // Update the trend
        if (newData.trend !== undefined) {
          const trendElement = item.querySelector('.trend-indicator');
          trendElement.textContent = newData.trend;

          // Update trend class
          trendElement.className = 'trend-indicator';
          if (newData.trend.startsWith('+')) {
            trendElement.classList.add('positive');
          } else if (newData.trend === '0%') {
            trendElement.classList.add('stable');
          } else {
            trendElement.classList.add('negative');
          }
        }

        // Update risk level
        if (newData.risk !== undefined) {
          item.className = `surveillance-item ${newData.risk}-risk`;
        }
      }
    });
  }

  // Method to update regional data
  updateRegionalData(regionName, newData) {
    const index = this.data.regionalData.findIndex(
      (item) => item.name.toLowerCase() === regionName.toLowerCase()
    );
    if (index !== -1) {
      this.data.regionalData[index] = {
        ...this.data.regionalData[index],
        ...newData,
      };
      this.updateRegionalDistribution();
    }
  }

  // Method to update vaccination data
  updateVaccinationData(vaccineName, newData) {
    const index = this.data.vaccinationData.findIndex(
      (item) => item.name.toLowerCase() === vaccineName.toLowerCase()
    );
    if (index !== -1) {
      this.data.vaccinationData[index] = {
        ...this.data.vaccinationData[index],
        ...newData,
      };
      this.updateVaccinationProgress();
    }
  }

  // Method to update performance data
  updatePerformanceData(centerName, newData) {
    const index = this.data.performanceData.findIndex(
      (item) => item.name.toLowerCase() === centerName.toLowerCase()
    );
    if (index !== -1) {
      this.data.performanceData[index] = {
        ...this.data.performanceData[index],
        ...newData,
      };
      this.updatePerformanceData();
    }
  }

  // Method to update health trends
  updateHealthTrendsData(newData) {
    this.data.healthTrends = { ...this.data.healthTrends, ...newData };
    if (this.charts.healthTrends) {
      this.charts.healthTrends.data.labels = this.data.healthTrends.labels;
      this.charts.healthTrends.data.datasets[0].data =
        this.data.healthTrends.respiratory;
      this.charts.healthTrends.data.datasets[1].data =
        this.data.healthTrends.vaccinations;
      this.charts.healthTrends.data.datasets[2].data =
        this.data.healthTrends.emergencies;
      this.charts.healthTrends.update();
    }
  }

  // Method to get current data (for external access)
  getData() {
    return this.data;
  }

  // Method to set new data (for external updates)
  setData(newData) {
    this.data = { ...this.data, ...newData };
    this.updateAllData();
  }

  init() {
    this.createHealthTrendsChart();
    this.updateRegionalDistribution();
    this.updateVaccinationProgress();
    this.updatePerformanceData();
    this.updateSurveillanceData();
    this.updateSystemMetrics();
    this.createMonthlyTrendsChart();
    this.createDemographicsChart();
    this.createDetailsCharts();
    this.setupInteractivity();
  }

  createHealthTrendsChart() {
    const ctx = document.getElementById('healthTrendsChart');
    if (!ctx) return;

    this.charts.healthTrends = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.data.healthTrends.labels,
        datasets: [
          {
            label: 'Respiratory Issues',
            data: this.data.healthTrends.respiratory,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Vaccinations',
            data: this.data.healthTrends.vaccinations,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Emergency Cases',
            data: this.data.healthTrends.emergencies,
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#3b82f6',
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#6b7280',
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#f3f4f6',
            },
            ticks: {
              color: '#6b7280',
            },
          },
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false,
        },
      },
    });
  }

  updateRegionalDistribution() {
    const regionalStats = document.querySelector('.regional-stats');
    if (!regionalStats) return;

    regionalStats.innerHTML = this.data.regionalData
      .map(
        (region) => `
            <div class="region-item" data-region="${region.name.toLowerCase()}">
                <div class="region-info">
                    <span class="region-name">${region.name}</span>
                    <span class="region-count">${region.count.toLocaleString()}</span>
                </div>
                <div class="region-bar">
                    <div class="region-fill" style="width: ${
                      region.percentage
                    }%; background: linear-gradient(90deg, ${
          region.color
        }, ${this.darkenColor(region.color, 20)});"></div>
                </div>
                <span class="region-percentage">${region.percentage}%</span>
            </div>
        `
      )
      .join('');
  }

  updateVaccinationProgress() {
    const vaccinationProgress = document.querySelector('.vaccination-progress');
    if (!vaccinationProgress) return;

    vaccinationProgress.innerHTML = this.data.vaccinationData
      .map(
        (vaccine) => `
            <div class="vaccine-item" data-vaccine="${vaccine.name
              .toLowerCase()
              .replace(' ', '-')}">
                <div class="vaccine-info">
                    <span class="vaccine-name">${vaccine.name}</span>
                    <span class="vaccine-coverage">${vaccine.coverage}%</span>
                </div>
                <div class="progress-ring">
                    <svg class="progress-ring-svg" width="60" height="60">
                        <circle class="progress-ring-circle" cx="30" cy="30" r="25" fill="transparent" stroke="#e5e7eb" stroke-width="4"/>
                        <circle class="progress-ring-circle progress-ring-fill" cx="30" cy="30" r="25" fill="transparent" stroke="${
                          vaccine.color
                        }" stroke-width="4" 
                                stroke-dasharray="157" stroke-dashoffset="${
                                  157 - (157 * vaccine.coverage) / 100
                                }" style="--progress: ${vaccine.coverage};"/>
                    </svg>
                    <span class="progress-text">${Math.round(
                      vaccine.coverage
                    )}%</span>
                </div>
            </div>
        `
      )
      .join('');
  }

  updatePerformanceData() {
    const performanceList = document.querySelector('.performance-list');
    if (!performanceList) return;

    performanceList.innerHTML = this.data.performanceData
      .map(
        (center, index) => `
            <div class="performance-item" data-rank="${index + 1}">
                <div class="performance-rank">${index + 1}</div>
                <div class="performance-info">
                    <span class="center-name">${center.name}</span>
                    <span class="center-metrics">${center.patients.toLocaleString()} patients • ${
          center.satisfaction
        }% satisfaction</span>
                </div>
                <div class="performance-score">
                    <span class="score-value">${center.score}</span>
                    <span class="score-label">Score</span>
                </div>
            </div>
        `
      )
      .join('');
  }

  updateSurveillanceData() {
    // This method now only sets up event listeners, doesn't override HTML content
    const surveillanceGrid = document.querySelector('.surveillance-grid');
    if (!surveillanceGrid) return;

    // Only add event listeners to existing surveillance items
    surveillanceGrid.querySelectorAll('.surveillance-item').forEach((item) => {
      item.addEventListener('click', () => {
        this.showSurveillanceDetails(item.dataset.condition);
      });
    });
  }

  updateSystemMetrics() {
    const systemMetrics = document.querySelector('.system-metrics');
    if (!systemMetrics) return;

    systemMetrics.innerHTML = this.data.systemMetrics
      .map(
        (metric) => `
            <div class="metric-item" data-metric="${metric.name
              .toLowerCase()
              .replace(' ', '-')}">
                <div class="metric-icon">${metric.icon}</div>
                <div class="metric-info">
                    <span class="metric-name">${metric.name}</span>
                    <span class="metric-value">${metric.value}</span>
                </div>
                <div class="metric-status ${metric.status}">${
          metric.status === 'online' ? 'Online' : 'Offline'
        }</div>
            </div>
        `
      )
      .join('');
  }

  setupInteractivity() {
    // Time filter for health trends
    const timeFilter = document.querySelector('.time-filter');
    if (timeFilter) {
      timeFilter.addEventListener('change', (e) => {
        this.updateHealthTrendsData(e.target.value);
      });
    }

    // Regional distribution hover effects
    document.querySelectorAll('.region-item').forEach((item) => {
      item.addEventListener('mouseenter', () => {
        this.highlightRegion(item.dataset.region);
      });
      item.addEventListener('mouseleave', () => {
        this.unhighlightRegion();
      });
    });

    // Performance items click to view details
    document.querySelectorAll('.performance-item').forEach((item) => {
      item.addEventListener('click', () => {
        this.showPerformanceDetails(item.dataset.rank);
      });
    });

    // Surveillance items click to view details
    document.querySelectorAll('.surveillance-item').forEach((item) => {
      item.addEventListener('click', () => {
        this.showSurveillanceDetails(item.dataset.condition);
      });
    });

    // Trend control buttons
    const trendBtns = document.querySelectorAll('.trend-btn');
    trendBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        trendBtns.forEach((b) => b.classList.remove('active'));
        e.target.classList.add('active');
        this.updateMonthlyTrends(e.target.dataset.trend);
      });
    });

    // Start activity feed updates
    this.startActivityFeed();

    // Health admin card click handlers
    this.setupHealthCardClicks();

    // Removed auto-update to prevent overriding HTML content
  }

  setupHealthCardClicks() {
    // Workers card click
    const workersCard = document.getElementById('workersCard');
    if (workersCard) {
      workersCard.addEventListener('click', () => {
        this.openWorkersDetailsPopup();
      });
    }

    // Vaccination card click
    const vaccinationCard = document.getElementById('vaccinationCard');
    if (vaccinationCard) {
      vaccinationCard.addEventListener('click', () => {
        this.openVaccinationDetailsPopup();
      });
    }

    // Alerts card click
    const alertsCard = document.getElementById('alertsCard');
    if (alertsCard) {
      alertsCard.addEventListener('click', () => {
        this.openAlertsDetailsPopup();
      });
    }

    // Providers card click
    const providersCard = document.getElementById('providersCard');
    if (providersCard) {
      providersCard.addEventListener('click', () => {
        this.openProvidersDetailsPopup();
      });
    }
  }

  openWorkersDetailsPopup() {
    const popup = document.getElementById('workersDetailsPopup');
    if (popup) {
      popup.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  closeWorkersDetailsPopup() {
    const popup = document.getElementById('workersDetailsPopup');
    if (popup) {
      popup.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  }

  openVaccinationDetailsPopup() {
    const popup = document.getElementById('vaccinationDetailsPopup');
    if (popup) {
      popup.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  closeVaccinationDetailsPopup() {
    const popup = document.getElementById('vaccinationDetailsPopup');
    if (popup) {
      popup.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  }

  openAlertsDetailsPopup() {
    const popup = document.getElementById('alertsDetailsPopup');
    if (popup) {
      popup.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  closeAlertsDetailsPopup() {
    const popup = document.getElementById('alertsDetailsPopup');
    if (popup) {
      popup.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  }

  openProvidersDetailsPopup() {
    const popup = document.getElementById('providersDetailsPopup');
    if (popup) {
      popup.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  closeProvidersDetailsPopup() {
    const popup = document.getElementById('providersDetailsPopup');
    if (popup) {
      popup.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  }

  createMonthlyTrendsChart() {
    const ctx = document.getElementById('monthlyTrendsChart');
    if (!ctx) return;

    this.charts.monthlyTrends = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'Registrations',
            data: [120, 150, 180, 200, 220, 190, 210, 240, 260, 280, 300, 320],
            borderColor: '#007b83',
            backgroundColor: 'rgba(0, 123, 131, 0.1)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  createDemographicsChart() {
    const ctx = document.getElementById('demographicsChart');
    if (!ctx) return;

    this.charts.demographics = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Male', 'Female'],
        datasets: [
          {
            data: [63.2, 36.8],
            backgroundColor: ['#007b83', '#00a8b5'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
            },
          },
        },
      },
    });
  }

  createDetailsCharts() {
    console.log('Creating details section charts...');

    try {
      // Registration Trend Chart
      const registrationTrendCtx = document.getElementById(
        'registrationTrendChart'
      );
      if (registrationTrendCtx) {
        this.charts.registrationTrend = new Chart(registrationTrendCtx, {
          type: 'line',
          data: {
            labels: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
            datasets: [
              {
                label: 'Registrations',
                data: [
                  320, 380, 420, 350, 480, 520, 580, 620, 550, 680, 720, 800,
                ],
                borderColor: '#007b83',
                backgroundColor: 'rgba(0, 123, 131, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#007b83',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: '#f3f4f6',
                },
                ticks: {
                  color: '#6b7280',
                },
              },
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: '#6b7280',
                },
              },
            },
          },
        });
        console.log('Registration trend chart created');
      }

      // Registration Source Chart
      const registrationSourceCtx = document.getElementById(
        'registrationSourceChart'
      );
      if (registrationSourceCtx) {
        this.charts.registrationSource = new Chart(registrationSourceCtx, {
          type: 'doughnut',
          data: {
            labels: [
              'Mobile App',
              'Website',
              'Health Centers',
              'Referrals',
              'Walk-ins',
            ],
            datasets: [
              {
                data: [35.2, 28.6, 18.4, 12.3, 5.5],
                backgroundColor: [
                  '#007b83',
                  '#10b981',
                  '#f59e0b',
                  '#8b5cf6',
                  '#6b7280',
                ],
                borderWidth: 0,
                cutout: '60%',
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        });
        console.log('Registration source chart created');
      }

      // Regional Distribution Chart
      const regionalDistributionCtx = document.getElementById(
        'regionalDistributionChart'
      );
      if (regionalDistributionCtx) {
        this.charts.regionalDistribution = new Chart(regionalDistributionCtx, {
          type: 'doughnut',
          data: {
            labels: [
              'Kochi',
              'Thrissur',
              'Kozhikode',
              'Thiruvananthapuram',
              'Others',
            ],
            datasets: [
              {
                data: [19.7, 17.0, 15.9, 14.8, 32.6],
                backgroundColor: [
                  '#3b82f6',
                  '#10b981',
                  '#f59e0b',
                  '#8b5cf6',
                  '#6b7280',
                ],
                borderWidth: 0,
                cutout: '60%',
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        });
        console.log('Regional distribution chart created');
      }

      // Regional Growth Chart
      const regionalGrowthCtx = document.getElementById('regionalGrowthChart');
      if (regionalGrowthCtx) {
        this.charts.regionalGrowth = new Chart(regionalGrowthCtx, {
          type: 'bar',
          data: {
            labels: [
              'Kochi',
              'Thrissur',
              'Kozhikode',
              'Thiruvananthapuram',
              'Others',
            ],
            datasets: [
              {
                label: 'Growth %',
                data: [12.5, 8.3, 15.2, 6.7, 9.8],
                backgroundColor: [
                  '#3b82f6',
                  '#10b981',
                  '#f59e0b',
                  '#8b5cf6',
                  '#6b7280',
                ],
                borderRadius: 4,
                borderSkipped: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: '#f3f4f6',
                },
                ticks: {
                  color: '#6b7280',
                },
              },
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: '#6b7280',
                },
              },
            },
          },
        });
        console.log('Regional growth chart created');
      }

      // Gender Distribution Chart
      const genderDistributionCtx = document.getElementById(
        'genderDistributionChart'
      );
      if (genderDistributionCtx) {
        this.charts.genderDistribution = new Chart(genderDistributionCtx, {
          type: 'doughnut',
          data: {
            labels: ['Male', 'Female'],
            datasets: [
              {
                data: [62.8, 37.2],
                backgroundColor: ['#007b83', '#00a8b5'],
                borderWidth: 0,
                cutout: '60%',
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        });
        console.log('Gender distribution chart created');
      }

      // Age Distribution Chart
      const ageDistributionCtx = document.getElementById(
        'ageDistributionChart'
      );
      if (ageDistributionCtx) {
        this.charts.ageDistribution = new Chart(ageDistributionCtx, {
          type: 'bar',
          data: {
            labels: ['18-25', '26-35', '36-45', '46-55', '56-65'],
            datasets: [
              {
                label: 'Workers %',
                data: [26.1, 33.1, 27.7, 10.2, 2.9],
                backgroundColor: [
                  '#3b82f6',
                  '#10b981',
                  '#f59e0b',
                  '#8b5cf6',
                  '#6b7280',
                ],
                borderRadius: 4,
                borderSkipped: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 40,
                grid: {
                  color: '#f3f4f6',
                },
                ticks: {
                  color: '#6b7280',
                },
              },
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: '#6b7280',
                },
              },
            },
          },
        });
        console.log('Age distribution chart created');
      }

      console.log('All details section charts created successfully!');
    } catch (error) {
      console.error('Error creating details charts:', error);
    }
  }

  updateMonthlyTrends(trendType) {
    if (!this.charts.monthlyTrends) return;

    const data = {
      registrations: [
        120, 150, 180, 200, 220, 190, 210, 240, 260, 280, 300, 320,
      ],
      vaccinations: [80, 95, 110, 130, 140, 125, 135, 150, 165, 180, 195, 210],
      alerts: [5, 8, 12, 15, 18, 14, 16, 20, 22, 25, 28, 30],
    };

    this.charts.monthlyTrends.data.datasets[0].data =
      data[trendType] || data.registrations;
    this.charts.monthlyTrends.update();
  }

  startActivityFeed() {
    const activities = [
      {
        icon: '👤',
        text: 'New patient registered at Kochi Health Center',
        time: '2 minutes ago',
      },
      {
        icon: '💉',
        text: 'Vaccination completed for 15 workers in Thrissur',
        time: '5 minutes ago',
      },
      {
        icon: '🏥',
        text: 'Health screening scheduled for tomorrow',
        time: '8 minutes ago',
      },
      {
        icon: '📋',
        text: 'Monthly report generated for Palakkad',
        time: '12 minutes ago',
      },
      {
        icon: '🚨',
        text: 'Health alert sent to Malappuram region',
        time: '15 minutes ago',
      },
      {
        icon: '👨‍⚕️',
        text: 'New doctor added to Thiruvananthapuram team',
        time: '18 minutes ago',
      },
      {
        icon: '📊',
        text: 'Weekly analytics report generated',
        time: '22 minutes ago',
      },
      {
        icon: '💊',
        text: 'Medical supplies restocked in Kozhikode',
        time: '25 minutes ago',
      },
    ];

    let currentIndex = 0;
    const activityFeed = document.querySelector('.activity-feed');

    if (!activityFeed) return;

    setInterval(() => {
      const activity = activities[currentIndex % activities.length];
      const activityItem = document.createElement('div');
      activityItem.className = 'activity-item';
      activityItem.innerHTML = `
                <div class="activity-icon">${activity.icon}</div>
                <div class="activity-content">
                    <div class="activity-text">${activity.text}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            `;

      activityFeed.insertBefore(activityItem, activityFeed.firstChild);

      // Remove old items (keep only 5)
      const items = activityFeed.querySelectorAll('.activity-item');
      if (items.length > 5) {
        activityFeed.removeChild(items[items.length - 1]);
      }

      currentIndex++;
    }, 10000); // Update every 10 seconds
  }

  updateHealthTrendsData(timeRange) {
    // Generate new data based on time range
    const newData = this.generateTimeRangeData(timeRange);

    if (this.charts.healthTrends) {
      this.charts.healthTrends.data.labels = newData.labels;
      this.charts.healthTrends.data.datasets[0].data = newData.respiratory;
      this.charts.healthTrends.data.datasets[1].data = newData.vaccinations;
      this.charts.healthTrends.data.datasets[2].data = newData.emergencies;
      this.charts.healthTrends.update('active');
    }
  }

  generateTimeRangeData(timeRange) {
    const baseData = {
      '7d': {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        multiplier: 0.3,
      },
      '30d': {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        multiplier: 1,
      },
      '90d': { labels: ['Month 1', 'Month 2', 'Month 3'], multiplier: 2.5 },
    };

    const config = baseData[timeRange] || baseData['30d'];
    const multiplier = config.multiplier;

    return {
      labels: config.labels,
      respiratory: config.labels.map(
        () => Math.floor(Math.random() * 20 * multiplier) + 10
      ),
      vaccinations: config.labels.map(
        () => Math.floor(Math.random() * 30 * multiplier) + 40
      ),
      emergencies: config.labels.map(
        () => Math.floor(Math.random() * 10 * multiplier) + 5
      ),
    };
  }

  highlightRegion(regionName) {
    document.querySelectorAll('.region-item').forEach((item) => {
      if (item.dataset.region === regionName) {
        item.style.transform = 'translateX(8px)';
        item.style.boxShadow = '0 4px 12px rgba(0, 123, 131, 0.2)';
      } else {
        item.style.opacity = '0.6';
      }
    });
  }

  unhighlightRegion() {
    document.querySelectorAll('.region-item').forEach((item) => {
      item.style.transform = 'translateX(0)';
      item.style.boxShadow = '';
      item.style.opacity = '1';
    });
  }

  showPerformanceDetails(rank) {
    const center = this.data.performanceData[rank - 1];
    if (center) {
      alert(
        `Performance Details for ${
          center.name
        }:\n\nPatients: ${center.patients.toLocaleString()}\nSatisfaction: ${
          center.satisfaction
        }%\nOverall Score: ${center.score}\n\nClick to view detailed analytics.`
      );
    }
  }

  showSurveillanceDetails(condition) {
    // Read data directly from HTML instead of data object
    const surveillanceItems = document.querySelectorAll('.surveillance-item');
    surveillanceItems.forEach((item) => {
      const conditionName = item.querySelector('.condition-name').textContent;
      if (conditionName.toLowerCase().replace(' ', '-') === condition) {
        const count = item.querySelector('.condition-count').textContent;
        const trend = item.querySelector('.trend-indicator').textContent;
        const riskClass = item.className.includes('high-risk')
          ? 'HIGH'
          : item.className.includes('medium-risk')
          ? 'MEDIUM'
          : 'LOW';

        alert(
          `Surveillance Details for ${conditionName}:\n\nCurrent Cases: ${count}\nTrend: ${trend}\nRisk Level: ${riskClass}\n\nClick to view detailed monitoring data.`
        );
      }
    });
  }

  updateAllData() {
    // Only update charts, don't override HTML content
    if (this.charts.healthTrends) {
      this.charts.healthTrends.update('none');
    }
    // Don't call updateSurveillanceData() as it would override HTML
  }

  darkenColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = ((num >> 8) & 0x00ff) - amt;
    const B = (num & 0x0000ff) - amt;
    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }
}

// Initialize analytics when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  // Initialize analytics after a short delay to ensure all elements are loaded
  setTimeout(() => {
    window.analyticsManager = new AnalyticsManager();
    console.log('Interactive Analytics initialized');

    // Make data update functions globally available
    window.updateDiseaseSurveillance = function (condition, newData) {
      if (window.analyticsManager) {
        window.analyticsManager.updateSurveillanceData(condition, newData);
      }
    };

    window.updateRegionalData = function (regionName, newData) {
      if (window.analyticsManager) {
        window.analyticsManager.updateRegionalData(regionName, newData);
      }
    };

    window.updateVaccinationData = function (vaccineName, newData) {
      if (window.analyticsManager) {
        window.analyticsManager.updateVaccinationData(vaccineName, newData);
      }
    };

    window.updatePerformanceData = function (centerName, newData) {
      if (window.analyticsManager) {
        window.analyticsManager.updatePerformanceData(centerName, newData);
      }
    };

    window.updateHealthTrends = function (newData) {
      if (window.analyticsManager) {
        window.analyticsManager.updateHealthTrendsData(newData);
      }
    };

    window.getDashboardData = function () {
      if (window.analyticsManager) {
        return window.analyticsManager.getData();
      }
      return null;
    };

    window.setDashboardData = function (newData) {
      if (window.analyticsManager) {
        window.analyticsManager.setData(newData);
      }
    };

    console.log('Data update functions are now available globally');
  }, 500);
});

// Simple test function to verify all systems
function testAllSystems() {
  console.log('=== TESTING ALL SYSTEMS ===');

  // Test buttons
  const buttons = testButtons();

  // Test notification system
  testNotificationSystem();

  // Test admin popup
  testAdminPopup();

  // Test if lab report exporter exists
  console.log(
    'Lab Report Exporter:',
    typeof labReportExporter !== 'undefined' ? 'Available' : 'Not Available'
  );

  console.log('=== TEST COMPLETE ===');
}

window.testAllSystems = testAllSystems;

// Simulate real-time data updates
function updateStats() {
  const workers = document.querySelector('.stat-card .number');
  const currentValue = parseInt(workers.textContent.replace(',', ''));
  const newValue = currentValue + Math.floor(Math.random() * 3);
  workers.textContent = newValue.toLocaleString();
}

// Update vaccination percentage randomly
function updateVaccination() {
  const percentage = document.querySelectorAll('.stat-card .number')[1];
  const progressBar = document.querySelector('.progress-fill');
  const currentPercent = parseFloat(percentage.textContent);
  const change = (Math.random() - 0.5) * 0.2;
  const newPercent = Math.max(75, Math.min(85, currentPercent + change));

  percentage.textContent = newPercent.toFixed(1) + '%';
  progressBar.style.width = newPercent + '%';
}

// Add click handlers for interactive elements
document.querySelectorAll('.action-item').forEach((item) => {
  item.addEventListener('click', function () {
    const action = this.querySelector('.metric-name').textContent;
    alert(`Executing: ${action}`);
  });
});

// Add click handlers for doctor cards
document.querySelectorAll('.doctor-card').forEach((card) => {
  card.addEventListener('click', function (e) {
    // Don't trigger if clicking on buttons
    if (e.target.classList.contains('btn-small')) return;

    const doctorName = this.querySelector('.doctor-name').textContent;
    const specialty = this.querySelector('.doctor-specialty').textContent;
    const location = this.querySelector('.doctor-location').textContent;

    alert(
      `Doctor Profile:\n\nName: ${doctorName}\nSpecialty: ${specialty}\nLocation: ${location}\n\nClick "View Profile" for detailed information.`
    );
  });
});

// Add click handlers for doctor action buttons
document.querySelectorAll('.btn-small').forEach((btn) => {
  btn.addEventListener('click', function (e) {
    e.stopPropagation(); // Prevent card click

    const doctorCard = this.closest('.doctor-card');
    const doctorName = doctorCard.querySelector('.doctor-name').textContent;
    const action = this.textContent.trim();

    if (action === 'View Profile') {
      alert(`Opening detailed profile for ${doctorName}...`);
    } else if (action === 'Contact') {
      alert(`Contacting ${doctorName}...`);
    }
  });
});

// Add click handlers for doctor management buttons
document
  .querySelector('.doctors-actions .btn-primary')
  .addEventListener('click', function () {
    alert('Opening "Add New Doctor" form...');
  });

document
  .querySelector('.doctors-actions .btn-secondary')
  .addEventListener('click', function () {
    alert('Opening "Manage All Doctors" panel...');
  });

// Patient Popup Functions
function openAddPatientPopup() {
  console.log('Opening Add Patient popup...');
  const popup = document.getElementById('patientPopupOverlay');
  if (popup) {
    popup.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Focus on first input
    setTimeout(() => {
      const firstNameInput = document.getElementById('firstName');
      if (firstNameInput) {
        firstNameInput.focus();
      }
    }, 300);
    console.log('Add Patient popup opened');
  } else {
    console.log('Patient popup overlay not found');
  }
}

function closeAddPatientPopup() {
  console.log('Closing Add Patient popup...');
  const popup = document.getElementById('patientPopupOverlay');
  if (popup) {
    popup.classList.remove('show');
    document.body.style.overflow = 'auto';

    // Reset form
    const form = document.getElementById('patientForm');
    if (form) {
      form.reset();
      clearFormErrors();
    }
    console.log('Add Patient popup closed');
  }
}

// Close popup when clicking outside
document
  .getElementById('patientPopupOverlay')
  .addEventListener('click', function (e) {
    if (e.target === this) {
      closeAddPatientPopup();
    }
  });

// Close popup with Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const popup = document.getElementById('patientPopupOverlay');
    if (popup.classList.contains('show')) {
      closeAddPatientPopup();
    }
  }
});

// Form validation and submission
document.getElementById('patientForm').addEventListener('submit', function (e) {
  e.preventDefault();

  if (validateForm()) {
    submitPatientForm();
  }
});

function validateForm() {
  let isValid = true;
  clearFormErrors();

  // Required fields validation
  const requiredFields = [
    'firstName',
    'lastName',
    'dateOfBirth',
    'gender',
    'phoneNumber',
    'address',
    'district',
    'pincode',
    'emergencyContact',
    'workType',
    'workLocation',
  ];

  requiredFields.forEach((fieldName) => {
    const field = document.getElementById(fieldName);
    const value = field.value.trim();

    if (!value) {
      showFieldError(fieldName, 'This field is required');
      isValid = false;
    }
  });

  // Email validation (if provided)
  const email = document.getElementById('email').value.trim();
  if (email && !isValidEmail(email)) {
    showFieldError('email', 'Please enter a valid email address');
    isValid = false;
  }

  // Phone number validation
  const phone = document.getElementById('phoneNumber').value.trim();
  if (phone && !isValidPhone(phone)) {
    showFieldError('phoneNumber', 'Please enter a valid phone number');
    isValid = false;
  }

  // Emergency contact validation
  const emergencyContact = document
    .getElementById('emergencyContact')
    .value.trim();
  if (emergencyContact && !isValidPhone(emergencyContact)) {
    showFieldError(
      'emergencyContact',
      'Please enter a valid emergency contact number'
    );
    isValid = false;
  }

  // Pincode validation
  const pincode = document.getElementById('pincode').value.trim();
  if (pincode && !isValidPincode(pincode)) {
    showFieldError('pincode', 'Please enter a valid 6-digit pincode');
    isValid = false;
  }

  // Date of birth validation
  const dob = document.getElementById('dateOfBirth').value;
  if (dob && !isValidDateOfBirth(dob)) {
    showFieldError('dateOfBirth', 'Please enter a valid date of birth');
    isValid = false;
  }

  return isValid;
}

function showFieldError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const formGroup = field.closest('.form-group');

  formGroup.classList.add('error');

  // Remove existing error message
  const existingError = formGroup.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }

  // Add new error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  formGroup.appendChild(errorDiv);
}

function clearFormErrors() {
  document.querySelectorAll('.form-group.error').forEach((group) => {
    group.classList.remove('error');
  });

  document.querySelectorAll('.error-message').forEach((error) => {
    error.remove();
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
  return phoneRegex.test(phone);
}

function isValidPincode(pincode) {
  const pincodeRegex = /^[0-9]{6}$/;
  return pincodeRegex.test(pincode);
}

function isValidDateOfBirth(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  const age = today.getFullYear() - birthDate.getFullYear();

  return age >= 0 && age <= 120;
}

function submitPatientForm() {
  const submitBtn = document.querySelector(
    '#patientForm button[type="submit"]'
  );
  const originalText = submitBtn.textContent;

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = 'Adding Patient...';

  // Collect form data
  const formData = collectFormData();

  // Simulate API call
  setTimeout(() => {
    // Simulate success
    showSuccessMessage('Patient added successfully!');

    // Reset form
    document.getElementById('patientForm').reset();
    closeAddPatientPopup();

    // Reset button
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;

    // Update dashboard stats (simulate)
    updatePatientStats();
  }, 2000);
}

function collectFormData() {
  const form = document.getElementById('patientForm');
  const formData = new FormData(form);
  const data = {};

  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }

  return data;
}

function showSuccessMessage(message) {
  // Create success notification
  const notification = document.createElement('div');
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-green);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

function updatePatientStats() {
  // Simulate updating the patient count
  const patientCountElement = document.querySelector('.stat-card .number');
  if (patientCountElement) {
    const currentCount = parseInt(
      patientCountElement.textContent.replace(/,/g, '')
    );
    const newCount = currentCount + 1;
    patientCountElement.textContent = newCount.toLocaleString();
  }
}

// Simulate status updates
function updateSystemStatus() {
  const statuses = ['Online', 'Operational', 'Active', 'Complete'];
  const colors = [
    'status-online',
    'status-operational',
    'status-active',
    'status-green',
  ];

  document.querySelectorAll('.status-badge').forEach((badge) => {
    if (Math.random() > 0.95) {
      // 5% chance of status change
      const randomIndex = Math.floor(Math.random() * statuses.length);
      badge.textContent = statuses[randomIndex];
      badge.className = `status-badge ${colors[randomIndex]}`;
    }
  });
}

// Use the new health center notification simulation
function simulateNotifications() {
  simulateHealthCenterNotifications();
}

// Removed auto-update intervals to prevent overriding HTML content

// Add search functionality
document
  .querySelector('.search-bar input')
  .addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    // In a real app, this would filter the dashboard content
    console.log('Searching for:', searchTerm);
  });

// Export Reports and Send Alert functionality moved to DOMContentLoaded event

// Global function to hide export overlay (accessible from outside)
function hideExportOverlay() {
  labReportExporter.hideOverlay();
}

// ========================================
// EXAMPLE FUNCTIONS FOR UPDATING DASHBOARD DATA
// ========================================

// Example: Update disease surveillance data
function updateDiseaseSurveillanceExample() {
  console.log('Updating disease surveillance data...');

  // Update respiratory infections count
  updateDiseaseSurveillance('Respiratory Infections', {
    count: 35,
    trend: '+25%',
    risk: 'medium',
  });

  // Update dengue cases
  updateDiseaseSurveillance('Dengue Cases', {
    count: 12,
    trend: '+140%',
    risk: 'high',
  });

  // Add a new disease condition
  const currentData = getDashboardData();
  if (currentData) {
    currentData.surveillanceData.push({
      condition: 'Malaria Cases',
      count: 8,
      trend: '+60%',
      risk: 'medium',
    });
    setDashboardData(currentData);
  }

  console.log('Disease surveillance data updated!');
}

// Example: Update regional data
function updateRegionalDataExample() {
  console.log('Updating regional data...');

  // Update Kochi data
  updateRegionalData('Kochi', {
    count: 3200,
    percentage: 25.7,
  });

  // Update Thrissur data
  updateRegionalData('Thrissur', {
    count: 2800,
    percentage: 22.5,
  });

  console.log('Regional data updated!');
}

// Example: Update vaccination data
function updateVaccinationDataExample() {
  console.log('Updating vaccination data...');

  // Update COVID-19 coverage
  updateVaccinationData('COVID-19', {
    coverage: 95.2,
  });

  // Update Hepatitis B coverage
  updateVaccinationData('Hepatitis B', {
    coverage: 82.1,
  });

  console.log('Vaccination data updated!');
}

// Example: Update health center performance
function updatePerformanceDataExample() {
  console.log('Updating performance data...');

  // Update Kochi Health Center performance
  updatePerformanceData('Kochi Health Center', {
    patients: 1500,
    satisfaction: 99.2,
    score: 99.2,
  });

  // Update Thrissur District Hospital performance
  updatePerformanceData('Thrissur District Hospital', {
    patients: 1200,
    satisfaction: 98.8,
    score: 98.8,
  });

  console.log('Performance data updated!');
}

// Example: Update health trends
function updateHealthTrendsExample() {
  console.log('Updating health trends...');

  updateHealthTrends({
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    respiratory: [15, 18, 23, 20, 28],
    vaccinations: [45, 52, 48, 55, 62],
    emergencies: [8, 12, 15, 11, 18],
  });

  console.log('Health trends updated!');
}

// Example: Reset all data to default values
function resetDashboardData() {
  console.log('Resetting dashboard data to defaults...');

  if (window.analyticsManager) {
    window.analyticsManager.data = window.analyticsManager.initializeData();
    window.analyticsManager.updateAllData();
  }

  console.log('Dashboard data reset to defaults!');
}

// Example: Get current data for inspection
function inspectDashboardData() {
  console.log('Current dashboard data:');
  console.log(getDashboardData());
}

// Make example functions globally available
window.updateDiseaseSurveillanceExample = updateDiseaseSurveillanceExample;
window.updateRegionalDataExample = updateRegionalDataExample;
window.updateVaccinationDataExample = updateVaccinationDataExample;
window.updatePerformanceDataExample = updatePerformanceDataExample;
window.updateHealthTrendsExample = updateHealthTrendsExample;
window.resetDashboardData = resetDashboardData;
window.inspectDashboardData = inspectDashboardData;

console.log('Dashboard data update functions loaded!');
console.log('Available functions:');
console.log('- updateDiseaseSurveillanceExample()');
console.log('- updateRegionalDataExample()');
console.log('- updateVaccinationDataExample()');
console.log('- updatePerformanceDataExample()');
console.log('- updateHealthTrendsExample()');
console.log('- resetDashboardData()');
console.log('- inspectDashboardData()');
console.log('');

console.log('Individual update functions:');
console.log('- updateDiseaseSurveillance(condition, newData)');
console.log('- updateRegionalData(regionName, newData)');
console.log('- updateVaccinationData(vaccineName, newData)');
console.log('- updatePerformanceData(centerName, newData)');
console.log('- updateHealthTrends(newData)');

console.log('- getDashboardData()');
console.log('- setDashboardData(newData)');

// Test function to manually create details charts
function testDetailsCharts() {
  console.log('Testing details charts creation...');
  if (window.analyticsManager && window.analyticsManager.createDetailsCharts) {
    window.analyticsManager.createDetailsCharts();
    console.log('Details charts test completed');
  } else {
    console.log('AnalyticsManager not available yet');
  }
}

// Make test function globally available
window.testDetailsCharts = testDetailsCharts;
