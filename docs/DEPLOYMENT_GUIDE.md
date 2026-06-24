# 🚀 DEPLOYMENT GUIDE - Netlify + Google Sheets

## Complete Step-by-Step Guide to Deploy Your June 25 Protest Website

**Time Required**: 20-30 minutes
**Cost**: **100% FREE**
**Technical Level**: Beginner-friendly

---

## 📋 **What You'll Need**

- [ ] Gmail/Google account
- [ ] GitHub account (free to create)
- [ ] Netlify account (free to create)
- [ ] Your project files (already in `/june25/` folder)

---

## 🎯 **PART 1: Set Up Google Sheets (10 minutes)**

### Step 1: Create Your Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Blank"** to create a new spreadsheet
3. Name it: **"June 25 Protest Data"**
4. Create **3 sheets** (tabs at bottom):
   - Click the **"+"** button 3 times
   - Rename them:
     - Sheet 1: **"Registrations"**
     - Sheet 2: **"Transport Requests"**
     - Sheet 3: **"Legal Aid Requests"**

### Step 2: Set Up Google Apps Script

1. In your Google Sheet, click **Extensions → Apps Script**
2. You'll see a blank script editor
3. **Delete** all the existing code
4. Open the file **`GOOGLE_APPS_SCRIPT.txt`** from your project folder
5. **Copy ALL the code** from that file
6. **Paste** it into the Apps Script editor
7. Click **Save** (disk icon) or press Ctrl+S / Cmd+S
8. Name the project: **"June 25 Form Handler"**

### Step 3: Deploy the Apps Script

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **"Web app"**
4. Fill in the settings:
   - **Description**: `June 25 Protest Form Handler`
   - **Execute as**: Select **"Me (your email)"**
   - **Who has access**: Select **"Anyone"**
5. Click **"Deploy"**
6. You'll see a permission warning - click **"Authorize access"**
7. Choose your Google account
8. Click **"Advanced"** → **"Go to June 25 Form Handler (unsafe)"**
   - Don't worry - this is YOUR script, it's safe
9. Click **"Allow"**
10. **IMPORTANT**: Copy the **"Web app URL"** that appears
    - It will look like: `https://script.google.com/macros/s/ABC123.../exec`
    - Keep this URL safe - you'll need it!

### Step 4: Configure the Website to Use Your Google Script

1. Open the file **`google-sheets-config.js`** in a text editor
2. Find these lines (around line 26-28):
```javascript
const GOOGLE_SHEETS_CONFIG = {
    registrationURL: 'YOUR_GOOGLE_SCRIPT_URL_HERE',
    transportURL: 'YOUR_GOOGLE_SCRIPT_URL_HERE',
    legalURL: 'YOUR_GOOGLE_SCRIPT_URL_HERE'
};
```
3. Replace **ALL THREE** `'YOUR_GOOGLE_SCRIPT_URL_HERE'` with your Web app URL
4. It should look like:
```javascript
const GOOGLE_SHEETS_CONFIG = {
    registrationURL: 'https://script.google.com/macros/s/ABC123.../exec',
    transportURL: 'https://script.google.com/macros/s/ABC123.../exec',
    legalURL: 'https://script.google.com/macros/s/ABC123.../exec'
};
```
5. **Save the file**

✅ **Google Sheets Setup Complete!**

---

## 🎯 **PART 2: Deploy to Netlify (10 minutes)**

### Step 1: Create GitHub Account (if you don't have one)

1. Go to [github.com](https://github.com)
2. Click **"Sign up"**
3. Follow the prompts (it's free!)

### Step 2: Upload Your Project to GitHub

#### Option A: Using GitHub Desktop (Easiest)

1. Download [GitHub Desktop](https://desktop.github.com)
2. Install and sign in
3. Click **"File → Add Local Repository"**
4. Browse to: `/Users/georgemwita/Documents/Projects/june25`
5. Click **"Create Repository"**
6. Click **"Publish repository"**
7. Name: `june25-protest-website`
8. **Uncheck** "Keep this code private" (or keep it private, up to you)
9. Click **"Publish repository"**

#### Option B: Using Command Line (If you know Terminal)

```bash
cd /Users/georgemwita/Documents/Projects/june25
git init
git add .
git commit -m "Initial commit - June 25 Protest Website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/june25-protest-website.git
git push -u origin main
```

### Step 3: Deploy on Netlify

1. Go to [netlify.com](https://www.netlify.com)
2. Click **"Sign up"** (or **"Log in"** if you have an account)
3. Choose **"Sign up with GitHub"**
4. Authorize Netlify to access GitHub
5. Click **"Add new site"** → **"Import an existing project"**
6. Click **"Deploy with GitHub"**
7. Find and click your repository: **`june25-protest-website`**
8. Configure settings:
   - **Branch to deploy**: `main`
   - **Build command**: Leave blank
   - **Publish directory**: Leave blank or type `.`
9. Click **"Deploy site"**

🎉 **Your site is now deploying!**

### Step 4: Get Your Live Website URL

1. Wait 30-60 seconds for deployment to finish
2. You'll see a **randomly generated URL** like:
   - `https://random-name-123456.netlify.app`
3. **Click the URL** to view your live site!
4. (Optional) Click **"Domain settings"** → **"Edit site name"** to customize:
   - Change to: `june25-kenya` or any available name
   - Your URL becomes: `https://june25-kenya.netlify.app`

✅ **Website is LIVE!**

---

## 🎯 **PART 3: Test Everything (5 minutes)**

### Test the Forms

1. Visit your live Netlify URL
2. **Test Registration Form**:
   - Fill out the form completely
   - Click "Register for Peaceful March"
   - You should see a success message with a reference number
3. **Check Google Sheets**:
   - Go back to your Google Spreadsheet
   - Open the **"Registrations"** tab
   - You should see your test data appear!

4. **Test Transport Request**:
   - Fill out and submit
   - Check **"Transport Requests"** sheet

5. **Test Legal Aid**:
   - Fill out and submit
   - Check **"Legal Aid Requests"** sheet

✅ **If you see data in Google Sheets, everything is working!**

---

## 📊 **Viewing Your Data**

### Google Sheets Dashboard

Your Google Sheet now has **3 tabs** with all form submissions:

1. **Registrations Tab** - Columns:
   - Timestamp
   - Reference ID
   - Full Name
   - Phone
   - Email
   - County
   - Assembly Point
   - Need Transport

2. **Transport Requests Tab** - Columns:
   - Timestamp
   - Reference ID
   - Name
   - Phone
   - Departure Point
   - Passenger Count
   - Route

3. **Legal Aid Requests Tab** - Columns:
   - Timestamp
   - Case Reference
   - Name
   - Phone
   - Email
   - Urgency
   - Issue Description
   - Current Location

### Download/Export Data

To export your data:
1. Open Google Sheet
2. Click **File → Download**
3. Choose format:
   - **Microsoft Excel (.xlsx)** - Best for Excel users
   - **CSV** - Best for importing to other systems
   - **PDF** - For printing/sharing

---

## 🔧 **Making Updates After Deployment**

### Update Your Live Site

Whenever you make changes to your website:

#### Using GitHub Desktop:
1. Open GitHub Desktop
2. You'll see your changes listed
3. Add a commit message (e.g., "Updated banner images")
4. Click **"Commit to main"**
5. Click **"Push origin"**
6. Netlify automatically rebuilds (30-60 seconds)

#### Using Command Line:
```bash
git add .
git commit -m "Your update message"
git push
```

Netlify will automatically detect the changes and redeploy!

---

## 🎨 **Optional Customizations**

### Custom Domain (Advanced)

If you have your own domain (e.g., `june25kenya.com`):

1. In Netlify, go to **"Domain settings"**
2. Click **"Add custom domain"**
3. Enter your domain
4. Follow Netlify's DNS instructions
5. Wait for DNS to propagate (can take 24-48 hours)

### Add Password Protection (Optional)

To protect your site with a password:

1. In Netlify, go to **"Site settings"** → **"Visitor access"**
2. Enable **"Password protection"**
3. Set a password
4. Save

---

## 🆘 **Troubleshooting**

### Forms not saving to Google Sheets?

**Check 1**: Verify Google Apps Script URL
- Open `google-sheets-config.js`
- Make sure the URL is correct and matches your Apps Script URL

**Check 2**: Re-deploy Apps Script
- Go to Apps Script editor
- Click **Deploy → Manage deployments**
- Click **Edit** (pencil icon)
- Click **Deploy**
- Copy the NEW URL and update `google-sheets-config.js`

**Check 3**: Check Google Sheet Permissions
- Make sure the script has permission to edit the sheet
- Re-authorize if needed

### Website not updating after push?

- Go to Netlify dashboard
- Click **"Deploys"**
- Check if latest deploy succeeded
- If failed, check error message
- Click **"Trigger deploy"** to manually redeploy

### Data saving to localStorage but not Google Sheets?

- This means the website is working locally but not sending to Google
- Check browser console (F12) for errors
- Verify `google-sheets-config.js` is loaded in index.html
- Make sure you saved changes to `google-sheets-config.js`

---

## 📞 **Support Resources**

### Netlify Help
- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Community Forum](https://answers.netlify.com)

### Google Apps Script Help
- [Apps Script Documentation](https://developers.google.com/apps-script)
- [Apps Script Community](https://groups.google.com/g/google-apps-script-community)

### GitHub Help
- [GitHub Guides](https://guides.github.com)
- [GitHub Desktop Help](https://docs.github.com/en/desktop)

---

## ✅ **Deployment Checklist**

Before sharing your website publicly:

- [ ] Google Sheets set up with 3 tabs
- [ ] Google Apps Script deployed and URL copied
- [ ] `google-sheets-config.js` updated with correct URL
- [ ] Project pushed to GitHub
- [ ] Site deployed on Netlify
- [ ] Test registration form works
- [ ] Test transport form works
- [ ] Test legal aid form works
- [ ] Data appearing in Google Sheets
- [ ] Custom site name set (optional)
- [ ] Banner images added to `/images/` folder (optional)
- [ ] Contact information updated in HTML
- [ ] Demo mode turned off if desired (`DEMO_MODE = false` in script.js)

---

## 🎉 **You're Live!**

Your June 25 Peaceful Protest website is now:
- ✅ **Live** on the internet
- ✅ **Saving** all form data to Google Sheets
- ✅ **Free** to host and maintain
- ✅ **Scalable** - can handle thousands of visitors
- ✅ **Secure** - HTTPS enabled automatically
- ✅ **Fast** - Deployed on Netlify's global CDN

**Share your URL**:
- On social media
- Via WhatsApp
- In email campaigns
- On posters/flyers

---

## 📝 **Next Steps**

1. **Add banner images** (see `/images/README.md`)
2. **Test with friends** before wide promotion
3. **Monitor Google Sheets** for submissions
4. **Set up email notifications** (optional - see Google Sheets add-ons)
5. **Promote your website** to potential participants

---

**Stand together. March peacefully. Demand change. 🇰🇪**

---

*Need help? Check the troubleshooting section or reach out to the development community.*
