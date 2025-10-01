// Mock Data System for Healthcare Dashboard
// This simulates backend data until you set up your actual database

class MockDataService {
    constructor() {
        this.data = this.initializeMockData();
    }

    initializeMockData() {
        return {
            // Dashboard Statistics
            stats: {
                activePatients: 156,
                todaysAppointments: 12,
                medicalStaff: 5,
                urgentCases: 3,
                reportsPending: 7,
                healthCoverage: 89,
                pendingReviews: 24
            },

            // Recent Patients
            recentPatients: [
                {
                    id: 'PAT-001-2024',
                    name: 'Rajesh Kumar',
                    avatar: 'RK',
                    project: 'Mama Store Construction',
                    lastVisit: 'Dec 7, 2024',
                    condition: 'Regular Checkup',
                    status: 'active',
                    priority: 'normal'
                },
                {
                    id: 'PAT-VNY-00387',
                    name: 'Anurag Ben',
                    avatar: 'AB',
                    project: 'IT Park Construction',
                    lastVisit: 'Dec 7, 2024',
                    condition: 'Hypertension Follow-up',
                    status: 'active',
                    priority: 'normal'
                },
                {
                    id: 'PAT-VNV-00101',
                    name: 'Nehal Khan',
                    avatar: 'NK',
                    project: 'Highway Project',
                    lastVisit: 'Dec 5, 2024',
                    condition: 'Injury Treatment',
                    status: 'urgent',
                    priority: 'high'
                }
            ],

            // Urgent Cases
            urgentCases: [
                {
                    id: 'PAT-AA-001',
                    name: 'Ahmed Ali',
                    avatar: 'AA',
                    condition: 'Chest pain - Emergency consultation required',
                    priority: 'high',
                    status: 'urgent'
                },
                {
                    id: 'PAT-PS-002',
                    name: 'Priya Sharma',
                    avatar: 'PS',
                    condition: 'Severe allergic reaction - Immediate attention needed',
                    priority: 'critical',
                    status: 'urgent'
                }
            ],

            // Today's Schedule
            todaysSchedule: [
                {
                    time: '9:00 AM',
                    patientName: 'Rahim Uddin',
                    doctor: 'Dr. Smith',
                    type: 'General consultation',
                    status: 'pending'
                },
                {
                    time: '10:30 AM',
                    patientName: 'Sunita Devi',
                    doctor: 'Dr. Johnson',
                    type: 'Cardiology follow-up',
                    status: 'pending'
                },
                {
                    time: '1:00 PM',
                    patientName: 'Amit Patel',
                    doctor: 'Dr. Williams',
                    type: 'Orthopedic consultation',
                    status: 'pending'
                },
                {
                    time: '2:30 PM',
                    patientName: 'Mohammad Hasan',
                    doctor: 'Dr. Brown',
                    type: 'Lab report review',
                    status: 'completed'
                },
                {
                    time: '4:00 PM',
                    patientName: 'Rajesh Kumar',
                    doctor: 'Dr. Davis',
                    type: 'Routine checkup',
                    status: 'pending'
                }
            ],

            // Medical Staff
            medicalStaff: [
                {
                    id: 'DOC-001',
                    name: 'Dr. Sarah Johnson',
                    specialty: 'General Medicine',
                    availability: 'Online',
                    contact: '+91 98765 11111',
                    avatar: 'SJ',
                    experience: '8 years'
                },
                {
                    id: 'DOC-002',
                    name: 'Dr. Michael Chen',
                    specialty: 'Cardiology',
                    availability: 'Busy',
                    contact: '+91 98765 22222',
                    avatar: 'MC',
                    experience: '12 years'
                },
                {
                    id: 'DOC-003',
                    name: 'Dr. Priya Sharma',
                    specialty: 'Pediatrics',
                    availability: 'Online',
                    contact: '+91 98765 33333',
                    avatar: 'PS',
                    experience: '6 years'
                },
                {
                    id: 'DOC-004',
                    name: 'Dr. Rajesh Kumar',
                    specialty: 'Orthopedics',
                    availability: 'Offline',
                    contact: '+91 98765 44444',
                    avatar: 'RK',
                    experience: '15 years'
                },
                {
                    id: 'DOC-005',
                    name: 'Dr. Anjali Patel',
                    specialty: 'Dermatology',
                    availability: 'Online',
                    contact: '+91 98765 55555',
                    avatar: 'AP',
                    experience: '10 years'
                }
            ],

            // Notifications
            notifications: [
                {
                    id: 'n1',
                    type: 'patient_request',
                    title: 'Patient Checkup Request',
                    message: 'Rajesh Kumar (PAT-001-2024) requesting urgent checkup',
                    time: '5m ago',
                    unread: true,
                    priority: 'high'
                },
                {
                    id: 'n2',
                    type: 'admin_alert',
                    title: 'System Maintenance',
                    message: 'Scheduled maintenance tonight 11 PM - 1 AM',
                    time: '1h ago',
                    unread: true,
                    priority: 'normal'
                },
                {
                    id: 'n3',
                    type: 'patient_request',
                    title: 'Worker Registration',
                    message: 'New worker Anurag Ben requesting health registration',
                    time: '2h ago',
                    unread: true,
                    priority: 'normal'
                },
                {
                    id: 'n4',
                    type: 'follow_up',
                    title: 'Follow-up Reminder',
                    message: 'Patient PAT-002 due for follow-up next week',
                    time: '2h ago',
                    unread: true,
                    priority: 'normal'
                }
            ],

            // System Alerts
            systemAlerts: [
                {
                    type: 'danger',
                    title: '🚨 Disease Alert',
                    message: 'Dengue cases reported in sector 7 - Immediate action required',
                    timestamp: '2024-12-08T10:30:00Z'
                },
                {
                    type: 'warning',
                    title: '💉 Vaccine Reminder',
                    message: '23 children due for hepatitis B vaccination this week',
                    timestamp: '2024-12-08T09:15:00Z'
                },
                {
                    type: 'info',
                    title: '🏥 Health Campaign',
                    message: 'Malaria prevention drive scheduled for next week',
                    timestamp: '2024-12-08T08:45:00Z'
                },
                {
                    type: 'success',
                    title: '✅ System Update',
                    message: 'New health monitoring features available in v2.1',
                    timestamp: '2024-12-08T07:20:00Z'
                },
                {
                    type: 'warning',
                    title: '⚠️ Equipment Check',
                    message: 'Blood pressure monitors need calibration',
                    timestamp: '2024-12-08T06:30:00Z'
                },
                {
                    type: 'info',
                    title: '📅 Training Session',
                    message: 'First aid training for staff on Friday 2 PM',
                    timestamp: '2024-12-08T05:45:00Z'
                }
            ],

            // All Patients (for View All Patients modal)
            allPatients: [
                {
                    id: 'PAT-001-2024',
                    name: 'Rajesh Kumar',
                    project: 'Mama Store Construction',
                    lastVisit: 'Dec 7, 2024',
                    status: 'active'
                },
                {
                    id: 'PAT-VNY-00387',
                    name: 'Anurag Ben',
                    project: 'IT Park Construction',
                    lastVisit: 'Dec 7, 2024',
                    status: 'active'
                },
                {
                    id: 'PAT-VNV-00101',
                    name: 'Nehal Khan',
                    project: 'Highway Project',
                    lastVisit: 'Dec 5, 2024',
                    status: 'urgent'
                },
                {
                    id: 'PAT-AA-001',
                    name: 'Ahmed Ali',
                    project: 'Metro Construction',
                    lastVisit: 'Dec 6, 2024',
                    status: 'urgent'
                },
                {
                    id: 'PAT-PS-002',
                    name: 'Priya Sharma',
                    project: 'Bridge Construction',
                    lastVisit: 'Dec 6, 2024',
                    status: 'urgent'
                },
                {
                    id: 'PAT-003-2024',
                    name: 'Sunita Devi',
                    project: 'Residential Complex',
                    lastVisit: 'Dec 4, 2024',
                    status: 'completed'
                },
                {
                    id: 'PAT-004-2024',
                    name: 'Amit Patel',
                    project: 'Shopping Mall',
                    lastVisit: 'Dec 3, 2024',
                    status: 'active'
                },
                {
                    id: 'PAT-005-2024',
                    name: 'Mohammad Hasan',
                    project: 'Office Building',
                    lastVisit: 'Dec 2, 2024',
                    status: 'completed'
                }
            ],

            // Patient Details (for patient details modal)
            patientDetails: {
                'PAT-001-2024': {
                    name: 'Rajesh Kumar',
                    id: 'PAT-001-2024',
                    status: 'active',
                    fullName: 'Rajesh Kumar',
                    age: '32 years',
                    gender: 'Male',
                    phone: '+91 98765 43210',
                    project: 'Mama Store Construction',
                    workerId: 'WK-2024-001',
                    occupation: 'Construction Worker',
                    workSite: 'Sector 7, Kochi',
                    lastVisit: 'Dec 7, 2024',
                    nextAppointment: 'Dec 14, 2024',
                    bloodGroup: 'O+',
                    allergies: 'None known',
                    currentStatus: 'Under Treatment',
                    condition: 'Regular Checkup',
                    medications: 'Multivitamins',
                    emergencyContact: '+91 98765 43211',
                    avatar: 'RK'
                },
                'PAT-VNY-00387': {
                    name: 'Anurag Ben',
                    id: 'PAT-VNY-00387',
                    status: 'active',
                    fullName: 'Anurag Ben',
                    age: '28 years',
                    gender: 'Male',
                    phone: '+91 98765 43212',
                    project: 'IT Park Construction',
                    workerId: 'WK-2024-002',
                    occupation: 'Construction Worker',
                    workSite: 'IT Park, Kochi',
                    lastVisit: 'Dec 7, 2024',
                    nextAppointment: 'Dec 15, 2024',
                    bloodGroup: 'A+',
                    allergies: 'Dust allergy',
                    currentStatus: 'Under Treatment',
                    condition: 'Hypertension Follow-up',
                    medications: 'Blood pressure medication',
                    emergencyContact: '+91 98765 43213',
                    avatar: 'AB'
                },
                'PAT-VNV-00101': {
                    name: 'Nehal Khan',
                    id: 'PAT-VNV-00101',
                    status: 'urgent',
                    fullName: 'Nehal Khan',
                    age: '35 years',
                    gender: 'Male',
                    phone: '+91 98765 43214',
                    project: 'Highway Project',
                    workerId: 'WK-2024-003',
                    occupation: 'Construction Worker',
                    workSite: 'Highway Section 5',
                    lastVisit: 'Dec 5, 2024',
                    nextAppointment: 'Dec 12, 2024',
                    bloodGroup: 'B+',
                    allergies: 'None known',
                    currentStatus: 'Urgent Care',
                    condition: 'Injury Treatment',
                    medications: 'Pain relief medication',
                    emergencyContact: '+91 98765 43215',
                    avatar: 'NK'
                },
                'PAT-AA-001': {
                    name: 'Ahmed Ali',
                    id: 'PAT-AA-001',
                    status: 'urgent',
                    fullName: 'Ahmed Ali',
                    age: '42 years',
                    gender: 'Male',
                    phone: '+91 98765 43216',
                    project: 'Metro Construction',
                    workerId: 'WK-2024-004',
                    occupation: 'Construction Worker',
                    workSite: 'Metro Line 2, Kochi',
                    lastVisit: 'Dec 6, 2024',
                    nextAppointment: 'Immediate',
                    bloodGroup: 'AB+',
                    allergies: 'None known',
                    currentStatus: 'Emergency',
                    condition: 'Chest Pain',
                    medications: 'Emergency medication',
                    emergencyContact: '+91 98765 43217',
                    avatar: 'AA'
                },
                'PAT-PS-002': {
                    name: 'Priya Sharma',
                    id: 'PAT-PS-002',
                    status: 'urgent',
                    fullName: 'Priya Sharma',
                    age: '29 years',
                    gender: 'Female',
                    phone: '+91 98765 43218',
                    project: 'Bridge Construction',
                    workerId: 'WK-2024-005',
                    occupation: 'Construction Worker',
                    workSite: 'Bridge Site A',
                    lastVisit: 'Dec 6, 2024',
                    nextAppointment: 'Immediate',
                    bloodGroup: 'O-',
                    allergies: 'Severe allergic reaction',
                    currentStatus: 'Critical',
                    condition: 'Allergic Reaction',
                    medications: 'Emergency treatment',
                    emergencyContact: '+91 98765 43219',
                    avatar: 'PS'
                }
            }
        };
    }

    // API Methods (simulating backend calls)
    
    // Get dashboard statistics
    getDashboardStats() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data.stats);
            }, 100); // Simulate network delay
        });
    }

    // Get recent patients
    getRecentPatients() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data.recentPatients);
            }, 150);
        });
    }

    // Get urgent cases
    getUrgentCases() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data.urgentCases);
            }, 120);
        });
    }

    // Get today's schedule
    getTodaysSchedule() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data.todaysSchedule);
            }, 100);
        });
    }

    // Get medical staff
    getMedicalStaff() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data.medicalStaff);
            }, 200);
        });
    }

    // Get notifications
    getNotifications() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data.notifications);
            }, 100);
        });
    }

    // Get system alerts
    getSystemAlerts() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data.systemAlerts);
            }, 80);
        });
    }

    // Get all patients
    getAllPatients() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data.allPatients);
            }, 200);
        });
    }

    // Get patient details by ID
    getPatientDetails(patientId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const patient = this.data.patientDetails[patientId];
                if (patient) {
                    resolve(patient);
                } else {
                    resolve(null);
                }
            }, 100);
        });
    }

    // Search patients
    searchPatients(query, statusFilter = '') {
        return new Promise((resolve) => {
            setTimeout(() => {
                let results = this.data.allPatients;
                
                if (query) {
                    results = results.filter(patient => 
                        patient.name.toLowerCase().includes(query.toLowerCase()) ||
                        patient.id.toLowerCase().includes(query.toLowerCase()) ||
                        patient.project.toLowerCase().includes(query.toLowerCase())
                    );
                }
                
                if (statusFilter) {
                    results = results.filter(patient => patient.status === statusFilter);
                }
                
                resolve(results);
            }, 150);
        });
    }

    // Add new patient
    addPatient(patientData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newId = `PAT-${Date.now()}`;
                const newPatient = {
                    id: newId,
                    ...patientData,
                    status: 'active',
                    lastVisit: new Date().toLocaleDateString('en-GB'),
                    avatar: patientData.name.split(' ').map(n => n[0]).join('').toUpperCase()
                };
                
                this.data.allPatients.push(newPatient);
                this.data.recentPatients.unshift(newPatient);
                
                // Keep only 3 recent patients
                if (this.data.recentPatients.length > 3) {
                    this.data.recentPatients = this.data.recentPatients.slice(0, 3);
                }
                
                resolve(newPatient);
            }, 300);
        });
    }

    // Upload lab report
    uploadLabReport(reportData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const reportId = `RPT-${Date.now()}`;
                const report = {
                    id: reportId,
                    ...reportData,
                    uploadDate: new Date().toISOString(),
                    status: 'pending'
                };
                
                resolve(report);
            }, 500);
        });
    }

    // Generate report
    generateReport(reportConfig) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const reportId = `GEN-${Date.now()}`;
                const report = {
                    id: reportId,
                    ...reportConfig,
                    generatedDate: new Date().toISOString(),
                    status: 'generated',
                    downloadUrl: `/reports/${reportId}.pdf`
                };
                
                resolve(report);
            }, 1000);
        });
    }

    // Mark notification as read
    markNotificationAsRead(notificationId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const notification = this.data.notifications.find(n => n.id === notificationId);
                if (notification) {
                    notification.unread = false;
                }
                resolve(true);
            }, 100);
        });
    }

    // Handle notification action (accept/reject)
    handleNotificationAction(notificationId, action) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Remove notification after action
                this.data.notifications = this.data.notifications.filter(n => n.id !== notificationId);
                resolve({ success: true, action });
            }, 200);
        });
    }
}

// Create global instance
window.mockDataService = new MockDataService();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockDataService;
}
