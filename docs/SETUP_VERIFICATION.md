# Google Sheets Integration Setup Verification

## Current Status: ❌ NOT WORKING
No data is being received in Google Sheets. Let's fix this step by step.

---

## Step 1: Verify Google Apps Script Setup

### A. Open Apps Script Editor

1. Open your Google Spreadsheet: "June 25 Protest Data"
2. Click **Extensions** → **Apps Script**
3. You should see a code editor

### B. Check if Code is Installed

Look for this code in the Apps Script editor:

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    // ... rest of the code
```

**If you DON'T see this code:**
1. Open the file: `GOOGLE_APPS_SCRIPT.txt` in your project
2. Copy ALL the code (lines 28-145)
3. Paste it into the Apps Script editor
4. Click the **Save** icon (disk icon)
5. Proceed to Step 2

---

## Step 2: Deploy the Web App

This is the MOST IMPORTANT step!

### A. Deploy for the First Time

1. In Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in the settings:
   - **Description:** "June 25 Form Handler"
   - **Execute as:** Select "**Me** (your email)"
   - **Who has access:** Select "**Anyone**"
5. Click **Deploy**
6. **IMPORTANT:** You may need to authorize the script:
   - Click "Authorize access"
   - Select your Google account
   - Click "Advanced" → "Go to [Project Name] (unsafe)"
   - Click "Allow"
7. Copy the **Web App URL** (looks like: `https://script.google.com/macros/s/AKfyc...`)

### B. If Already Deployed - Update Deployment

1. Click **Deploy** → **Manage deployments**
2. Click the edit icon ✏️ next to your deployment
3. Under "Version", select **New version**
4. Click **Deploy**
5. Copy the updated **Web App URL**

---

## Step 3: Update the Web App URL in Your Code

1. Open: `google-sheets-config.js`
2. Find line 29-32 (the URLs)
3. **Replace** the `policeAlertURL` with your NEW Web App URL:

```javascript
const GOOGLE_SHEETS_CONFIG = {
    registrationURL: 'YOUR_WEB_APP_URL_HERE',
    transportURL: 'YOUR_WEB_APP_URL_HERE',
    legalURL: 'YOUR_WEB_APP_URL_HERE',
    policeAlertURL: 'YOUR_WEB_APP_URL_HERE'  // ← Update this!
};
```

**All 4 URLs should be THE SAME** (the Apps Script code routes to different sheets automatically).

4. Save the file
5. Commit and push to your repository
6. Wait for Netlify to redeploy (2-3 minutes)

---

## Step 4: Test the Connection

### Method A: Test from Apps Script (Recommended First)

1. In Apps Script editor, paste this test function:

```javascript
function testPoliceAlert() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        id: 'POL' + Date.now(),
        timestamp: new Date().toISOString(),
        county: 'nairobi',
        specificLocation: 'Test Location',
        activityType: 'test',
        officerCount: '5',
        vehicleCount: '2',
        description: 'Test from Apps Script',
        reporterContact: '0712345678',
        latitude: '-1.2864',
        longitude: '36.8172',
        gpsAccuracy: '50'
      })
    }
  };

  var result = doPost(testData);
  Logger.log(result.getContent());
}
```

2. Click the function dropdown, select **testPoliceAlert**
3. Click **Run** (▶️ icon)
4. Check your Google Sheet for new data
5. Check **Execution log** (View → Execution log) for any errors

### Method B: Test from Command Line

Run this command in your project directory:

```bash
node submit-test-alert.js
```

Then check your Google Sheet.

---

## Step 5: Common Issues & Solutions

### Issue 1: "Authorization Required" Error
**Solution:** You need to authorize the script
- Click "Review Permissions"
- Select your account
- Click "Advanced" → "Go to [Project] (unsafe)"
- Click "Allow"

### Issue 2: Empty Sheet / No Data
**Check:**
- ✅ Is the Apps Script code pasted correctly?
- ✅ Is the script deployed as a Web App?
- ✅ Is "Who has access" set to "Anyone"?
- ✅ Is the Web App URL correct in google-sheets-config.js?
- ✅ Did you commit and push the updated URL?
- ✅ Did Netlify finish deploying?

### Issue 3: "Permission Denied" Error
**Solution:**
- In Apps Script, go to Deploy → Manage deployments
- Edit the deployment
- Ensure "Execute as" is set to "Me"
- Ensure "Who has access" is "Anyone"

### Issue 4: Headers Created but No Data Rows
**Check:**
- The data.id must start with 'POL' for police alerts
- Run the testPoliceAlert() function in Apps Script
- Check the Execution log for errors

---

## Step 6: Verify Sheet Name

1. In your Google Spreadsheet, check the sheet tab name
2. It must be **exactly**: `Police Alerts` (case-sensitive, with space)
3. If it's different, rename it or update the script

---

## Quick Checklist

- [ ] Apps Script code is pasted in the editor
- [ ] Script is saved (disk icon)
- [ ] Script is deployed as Web App
- [ ] "Who has access" is set to "Anyone"
- [ ] Web App URL is copied
- [ ] Web App URL is updated in google-sheets-config.js
- [ ] All 4 URLs in config are the same
- [ ] Changes are committed and pushed to GitHub
- [ ] Netlify has finished deploying (check netlify.com)
- [ ] Sheet tab is named exactly "Police Alerts"
- [ ] Test submission sent
- [ ] Data appears in Google Sheet

---

## Need Help?

If you've completed all steps and still no data:

1. **Check Apps Script Execution Log:**
   - In Apps Script, go to **View** → **Execution log**
   - Look for any error messages

2. **Check Browser Console:**
   - Open your website
   - Press F12 → Console tab
   - Submit a test alert
   - Look for error messages

3. **Verify the URL:**
   - The Web App URL should start with: `https://script.google.com/macros/s/`
   - It should end with: `/exec`
   - Copy it exactly, no extra spaces

4. **Test the Apps Script directly:**
   - Run the testPoliceAlert() function in Apps Script
   - If this works, the issue is with the website connection
   - If this doesn't work, the issue is with the Apps Script

---

## Expected Result After Setup

When you submit a police alert form:
1. Success message appears on website
2. New row appears in "Police Alerts" sheet
3. All 12 columns are filled with data
4. Data is saved within 2-3 seconds

✨ Once you see data in your sheet, the integration is working!
