#!/usr/bin/env node

/**
 * Automated Test Submission for Police Alert
 * This script sends a test alert directly to Google Sheets
 */

const https = require('https');

// Google Sheets Web App URL
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbynx5cZ34_LRTENU61IRfBYjFpN069EJYO0_ZR91Y67faGrVLn-OD4ZgUhxuvJ4jqNN/exec';

// Test alert data
const testAlertData = {
    id: 'POL' + Date.now(),
    timestamp: new Date().toISOString(),
    county: 'nairobi',
    specificLocation: 'Uhuru Park - TEST ALERT (Automated)',
    activityType: 'large-deployment',
    officerCount: '20-50',
    vehicleCount: '5-10',
    description: 'TEST SUBMISSION - Automated test from development environment. Please ignore this entry.',
    reporterContact: '0712345678',
    latitude: '-1.2864',
    longitude: '36.8172',
    gpsAccuracy: '50'
};

console.log('🧪 Police Alert Test Submission');
console.log('================================\n');
console.log('📤 Submitting test data to Google Sheets...');
console.log('🆔 Alert ID:', testAlertData.id);
console.log('📍 Location:', testAlertData.specificLocation);
console.log('⏰ Timestamp:', testAlertData.timestamp);
console.log('\n📊 Full test data:');
console.log(JSON.stringify(testAlertData, null, 2));
console.log('\n⏳ Sending request...\n');

const data = JSON.stringify(testAlertData);
const url = new URL(GOOGLE_SHEETS_URL);

const options = {
    hostname: url.hostname,
    path: url.pathname + url.search,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        console.log('✅ Request completed!');
        console.log('📡 Status Code:', res.statusCode);
        console.log('📥 Response:', responseData || '(empty response - normal for no-cors mode)');
        console.log('\n📋 NEXT STEPS:');
        console.log('1. Open your Google Spreadsheet');
        console.log('2. Go to the "Police Alerts" sheet tab');
        console.log('3. Look for a new row with:');
        console.log('   - Alert ID:', testAlertData.id);
        console.log('   - Location:', testAlertData.specificLocation);
        console.log('   - Timestamp:', testAlertData.timestamp);
        console.log('\n✨ If you see the data, the integration is working correctly!');
    });
});

req.on('error', (error) => {
    console.error('❌ Error submitting test data:', error.message);
    console.log('\n🔍 Troubleshooting:');
    console.log('1. Check that Google Apps Script is deployed');
    console.log('2. Verify the Web App URL is correct');
    console.log('3. Ensure "Anyone" has access to the Web App');
    console.log('4. Check your internet connection');
});

req.write(data);
req.end();
