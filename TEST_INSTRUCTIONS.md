# Police Alert Testing Instructions

## Quick Test Guide

### Method 1: Test via Website Form (Recommended)

1. **Visit your live site:**
   ```
   https://june25-protest.netlify.app/
   ```

2. **Navigate to Police Alerts section:**
   - Click on "🚨 Police Alerts" in the navigation menu
   - Or scroll down to the "Police Presence Alerts" section

3. **Fill out the form with test data:**

   | Field | Test Value |
   |-------|-----------|
   | County/Location | Nairobi |
   | Specific Location/Street | Uhuru Park - TEST ALERT |
   | Type of Police Activity | Large Deployment |
   | Approx. Number of Officers | 20-50 officers |
   | Number of Vehicles | 5-10 vehicles |
   | Additional Details | TEST SUBMISSION - Please ignore. Testing system. |
   | Your Phone (Optional) | 0712345678 |

4. **Click "Submit Alert" button**

5. **Expected Result:**
   - ✅ Success message appears
   - Alert ID is displayed (e.g., POL1719060000000)
   - Alert appears in the "Live Alert Feed" on the right side
   - If GPS was used, a marker appears on the map

6. **Verify in Google Sheets:**
   - Open your Google Spreadsheet
   - Go to the "Police Alerts" tab
   - Look for the new row with your test data
   - Check all columns are populated correctly

---

### Method 2: Test via Browser Console

1. **Open your website in a browser**

2. **Open Developer Tools:**
   - Chrome/Edge: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
   - Firefox: Press `F12`
   - Safari: Enable Developer Menu first, then press `Cmd+Option+I`

3. **Go to the "Console" tab**

4. **Open the test script:**
   - Open the file: `test-police-alert.js`
   - Copy ALL the code
   - Paste into the browser console
   - Press `Enter`

5. **Check the console output:**
   - Look for: ✅ Test data sent successfully!
   - Note the Alert ID shown

6. **Verify in Google Sheets:**
   - Check the "Police Alerts" sheet for the new entry

---

## What Gets Saved to Google Sheets

When you submit a police alert, the following data is saved:

| Column | Data | Example |
|--------|------|---------|
| Timestamp | Date/time of report | 2026-06-22 14:30:00 |
| Alert ID | Unique identifier | POL1719060000000 |
| County | Selected county | Nairobi |
| Specific Location | Street/area | Uhuru Park |
| Activity Type | Type of activity | Large Deployment |
| Officer Count | Number of officers | 20-50 officers |
| Vehicle Count | Number of vehicles | 5-10 vehicles |
| Description | Additional details | TEST SUBMISSION... |
| Reporter Contact | Phone number | 0712345678 |
| Latitude | GPS coordinate | -1.2864 |
| Longitude | GPS coordinate | 36.8172 |
| GPS Accuracy | Location accuracy | ±50m |

---

## Troubleshooting

### If the form submission fails:

1. **Check Google Apps Script Deployment:**
   - Open your Google Spreadsheet
   - Go to Extensions → Apps Script
   - Verify the code from `GOOGLE_APPS_SCRIPT.txt` is pasted
   - Click Deploy → Manage Deployments
   - Ensure "Who has access" is set to "Anyone"

2. **Check the Web App URL:**
   - In Google Apps Script, copy the Web App URL
   - Verify it matches the URL in `google-sheets-config.js`
   - The URL should start with: `https://script.google.com/macros/s/...`

3. **Check Browser Console for Errors:**
   - Open Developer Tools (F12)
   - Go to Console tab
   - Submit the form
   - Look for any error messages

4. **Verify Sheet Exists:**
   - Your Google Spreadsheet must have a sheet named exactly "Police Alerts"
   - Or the Apps Script will create it automatically on first submission

5. **Check localStorage Backup:**
   - Even if Google Sheets fails, data is saved locally
   - Open Developer Tools → Application tab → Local Storage
   - Look for key: `june25_police_alerts`
   - You should see your test data there

---

## Expected Success Indicators

✅ **Form Submission:**
- Success message appears on the website
- Alert ID is displayed
- Alert appears in Live Feed immediately

✅ **Google Sheets:**
- New row appears in "Police Alerts" sheet
- All columns are filled correctly
- Timestamp is in correct format

✅ **Local Storage:**
- Data is saved to browser localStorage
- Can be viewed in Developer Tools

✅ **Map (if GPS used):**
- Marker appears on the map
- Popup shows alert details

---

## Clean Up Test Data

After testing, you can delete the test entries:

1. **From Google Sheets:**
   - Open the "Police Alerts" sheet
   - Find rows with "TEST" in the description
   - Right-click and delete those rows

2. **From localStorage:**
   - Open Developer Tools → Console
   - Run: `localStorage.removeItem('june25_police_alerts')`
   - Or: `localStorage.clear()` (clears all data)

---

## Questions?

If you encounter any issues:
1. Check the browser console for error messages
2. Verify the Google Apps Script is deployed correctly
3. Ensure the Web App URL is correct in the config file
4. Make sure the "Police Alerts" sheet exists in your spreadsheet

**The system has dual storage:**
- Primary: Google Sheets (permanent)
- Backup: localStorage (temporary)

So even if one fails, your data won't be lost!
