/**
 * Test Script for Police Alert Submission
 *
 * HOW TO USE:
 * 1. Open your website: https://june25-protest.netlify.app/
 * 2. Open browser Developer Tools (F12 or Right-click → Inspect)
 * 3. Go to the "Console" tab
 * 4. Copy and paste this entire script
 * 5. Press Enter
 * 6. Check your Google Sheet for the new entry
 */

// Test data for police alert
const testAlertData = {
    id: 'POL' + Date.now(),
    timestamp: new Date().toISOString(),
    county: 'nairobi',
    specificLocation: 'Uhuru Park - Test Location',
    activityType: 'large-deployment',
    officerCount: '20-50',
    vehicleCount: '5-10',
    description: 'TEST ALERT - This is a test submission. Please ignore.',
    reporterContact: '0712345678',
    latitude: -1.2864,  // Uhuru Park coordinates
    longitude: 36.8172,
    gpsAccuracy: '50'
};

console.log('🧪 Starting Police Alert Test...');
console.log('📤 Test Data:', testAlertData);

// Check if Google Sheets config is available
if (typeof GOOGLE_SHEETS_CONFIG === 'undefined') {
    console.error('❌ ERROR: GOOGLE_SHEETS_CONFIG not found!');
    console.log('💡 Make sure you are on the website page, not just viewing this file.');
} else {
    console.log('✅ Google Sheets config found');
    console.log('🔗 URL:', GOOGLE_SHEETS_CONFIG.policeAlertURL);

    // Send test data
    console.log('📤 Sending test data to Google Sheets...');

    fetch(GOOGLE_SHEETS_CONFIG.policeAlertURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(testAlertData)
    })
    .then(() => {
        console.log('✅ Test data sent successfully!');
        console.log('📊 Check your Google Sheet "Police Alerts" tab for the new entry');
        console.log('🔍 Look for Alert ID:', testAlertData.id);
        console.log('⏰ Timestamp:', testAlertData.timestamp);

        // Also save to localStorage for verification
        const alerts = JSON.parse(localStorage.getItem('june25_police_alerts') || '[]');
        alerts.push(testAlertData);
        localStorage.setItem('june25_police_alerts', JSON.stringify(alerts));
        console.log('💾 Also saved to localStorage as backup');
    })
    .catch(error => {
        console.error('❌ Error sending test data:', error);
        console.log('Please check:');
        console.log('1. Google Apps Script is deployed correctly');
        console.log('2. Web App URL is correct in google-sheets-config.js');
        console.log('3. Apps Script has "Anyone" access enabled');
    });
}

console.log('\n📋 NEXT STEPS:');
console.log('1. Wait 2-3 seconds for the request to complete');
console.log('2. Open your Google Spreadsheet');
console.log('3. Look for the "Police Alerts" sheet');
console.log('4. You should see a new row with the test data');
console.log('5. If successful, the system is working correctly!');
