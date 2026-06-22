// Google Sheets Integration Configuration
// This file contains the setup for saving form data to Google Sheets

/*
SETUP INSTRUCTIONS:

1. Create a new Google Spreadsheet with 3 sheets:
   - Sheet 1: "Registrations"
   - Sheet 2: "Transport Requests"
   - Sheet 3: "Legal Aid Requests"

2. Set up Google Apps Script:
   - Go to Extensions → Apps Script
   - Delete existing code
   - Paste the code from GOOGLE_APPS_SCRIPT.txt (included in project)
   - Click Deploy → New Deployment
   - Select "Web app"
   - Execute as: "Me"
   - Who has access: "Anyone"
   - Click "Deploy"
   - Copy the Web App URL

3. Update the URLs below with your Web App URL

*/

// Replace these with your Google Apps Script Web App URLs
const GOOGLE_SHEETS_CONFIG = {
    registrationURL: 'https://script.google.com/macros/s/AKfycbynx5cZ34_LRTENU61IRfBYjFpN069EJYO0_ZR91Y67faGrVLn-OD4ZgUhxuvJ4jqNN/exec',
    transportURL: 'https://script.google.com/macros/s/AKfycbynx5cZ34_LRTENU61IRfBYjFpN069EJYO0_ZR91Y67faGrVLn-OD4ZgUhxuvJ4jqNN/exec',
    legalURL: 'https://script.google.com/macros/s/AKfycbynx5cZ34_LRTENU61IRfBYjFpN069EJYO0_ZR91Y67faGrVLn-OD4ZgUhxuvJ4jqNN/exec',
    policeAlertURL: 'https://script.google.com/macros/s/AKfycbynx5cZ34_LRTENU61IRfBYjFpN069EJYO0_ZR91Y67faGrVLn-OD4ZgUhxuvJ4jqNN/exec'
};

// Send data to Google Sheets
async function sendToGoogleSheets(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        console.log('Data sent to Google Sheets successfully');
        return true;
    } catch (error) {
        console.error('Error sending to Google Sheets:', error);
        // Still save to localStorage as backup
        return false;
    }
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GOOGLE_SHEETS_CONFIG, sendToGoogleSheets };
}
