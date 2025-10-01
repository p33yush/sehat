# 🏥 Healthcare Dashboard - Mock Data System

## Overview
This mock data system provides a complete simulation of backend API calls for the Healthcare Dashboard. It allows you to test all functionality without needing a real database or backend server.

## Files
- `mock-data.js` - Main mock data service
- `demo-usage.html` - Interactive demo page
- `healthcentre.html` - Main dashboard (updated to use mock data)
- `healthcentre.js` - Dashboard logic (updated to use mock data)

## Quick Start

### 1. Open the Demo Page
```bash
# Navigate to the Healthcare_dashboard folder
cd Healthcare_dashboard

# Open demo-usage.html in your browser
# This shows all available mock data methods
```

### 2. Use in Your Code
```javascript
// The mock data service is available globally as 'mockDataService'

// Get dashboard statistics
const stats = await mockDataService.getDashboardStats();
console.log(stats);

// Get recent patients
const patients = await mockDataService.getRecentPatients();
console.log(patients);

// Search patients
const searchResults = await mockDataService.searchPatients('Rajesh');
console.log(searchResults);
```

## Available Methods

### 📊 Dashboard Data
- `getDashboardStats()` - Returns statistics (active patients, appointments, etc.)
- `getRecentPatients()` - Returns recent patient list
- `getUrgentCases()` - Returns urgent cases
- `getTodaysSchedule()` - Returns today's appointments
- `getSystemAlerts()` - Returns system alerts

### 👥 Patient Management
- `getAllPatients()` - Returns all patients
- `getPatientDetails(patientId)` - Returns detailed patient information
- `searchPatients(query, statusFilter)` - Search patients by name, ID, or project
- `addPatient(patientData)` - Add new patient

### 👨‍⚕️ Staff Management
- `getMedicalStaff()` - Returns medical staff directory

### 🔔 Notifications
- `getNotifications()` - Returns notifications
- `markNotificationAsRead(notificationId)` - Mark notification as read
- `handleNotificationAction(notificationId, action)` - Handle notification actions

### 📄 Reports
- `uploadLabReport(reportData)` - Upload lab report
- `generateReport(reportConfig)` - Generate health report

## Sample Data Structure

### Dashboard Stats
```javascript
{
    activePatients: 156,
    todaysAppointments: 12,
    medicalStaff: 5,
    urgentCases: 3,
    reportsPending: 7,
    healthCoverage: 89,
    pendingReviews: 24
}
```

### Patient Data
```javascript
{
    id: 'PAT-001-2024',
    name: 'Rajesh Kumar',
    avatar: 'RK',
    project: 'Mama Store Construction',
    lastVisit: 'Dec 7, 2024',
    condition: 'Regular Checkup',
    status: 'active',
    priority: 'normal'
}
```

### Notification Data
```javascript
{
    id: 'n1',
    type: 'patient_request',
    title: 'Patient Checkup Request',
    message: 'Rajesh Kumar (PAT-001-2024) requesting urgent checkup',
    time: '5m ago',
    unread: true,
    priority: 'high'
}
```

## Integration with Real Backend

When you're ready to connect to a real backend, simply replace the mock data calls:

### Before (Mock Data)
```javascript
const stats = await mockDataService.getDashboardStats();
```

### After (Real Backend)
```javascript
const response = await fetch('/api/dashboard/stats');
const stats = await response.json();
```

## Customization

### Adding New Data
Edit `mock-data.js` and add new data to the `initializeMockData()` method:

```javascript
// Add new data type
newDataType: [
    { id: '1', name: 'Sample Item', value: 'Sample Value' }
],

// Add new method
async getNewData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(this.data.newDataType);
        }, 100);
    });
}
```

### Modifying Existing Data
Update the data arrays in `initializeMockData()` method to change the sample data.

## Error Handling

The mock data service includes proper error handling:

```javascript
try {
    const data = await mockDataService.getDashboardStats();
    // Use data
} catch (error) {
    console.error('Error fetching data:', error);
    // Handle error
}
```

## Performance Simulation

The mock data service simulates real network delays:
- Simple data: 80-150ms delay
- Complex data: 200-500ms delay
- File operations: 500-1000ms delay

## Testing

Use the `demo-usage.html` page to test all functionality:
1. Open the demo page in your browser
2. Click buttons to test different data methods
3. Check console for any errors
4. Verify data structure matches your needs

## Next Steps

1. **Test the mock data** using the demo page
2. **Integrate with your dashboard** (already done in healthcentre.js)
3. **Customize the data** to match your requirements
4. **Plan your real backend** based on the mock data structure
5. **Replace mock calls** with real API calls when ready

## Support

If you need to modify the mock data or add new functionality, edit the `mock-data.js` file. The structure is designed to be easily extensible and maintainable.
