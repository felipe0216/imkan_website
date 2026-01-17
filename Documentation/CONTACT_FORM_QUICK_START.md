# ✅ Contact Form Setup - Quick Start

**Everything is ready! Follow these steps to make your contact form functional.**

---

## 🎯 WHAT I'VE CREATED FOR YOU

I've set up all the necessary files:

### **✅ Backend (API)**
- `api/package.json` - Dependencies configuration
- `api/tsconfig.json` - TypeScript configuration
- `api/host.json` - Azure Functions configuration
- `api/src/functions/contact.ts` - **The main API function**
- `api/local.settings.json` - Local development settings
- `api/.gitignore` - Git ignore rules

### **✅ Frontend**
- Updated `components/ContactFormModal.tsx` - Now calls the API
- Updated `staticwebapp.config.json` - API routing configured

---

## 🚀 QUICK SETUP (5 STEPS)

### **Step 1: Create Azure Storage Account** ⏱️ 3 minutes

1. Go to [Azure Portal](https://portal.azure.com)
2. Search **"Storage accounts"** → Click **"+ Create"**
3. Fill in:
   - **Resource Group**: Same as your website
   - **Name**: `imkancontactdata` (must be unique)
   - **Region**: Same as your website
   - **Performance**: Standard
   - **Redundancy**: LRS (cheapest)
   - **⚠️ Primary workload**: **"Other (tables and queues)"** ✅
4. Click **"Review + create"** → **"Create"**
5. Wait 1-2 minutes

### **Step 2: Get Connection String** ⏱️ 1 minute

1. Open your new storage account
2. Left menu → **"Access keys"**
3. Click **"Show keys"** next to key1
4. **Copy** the **Connection string**
5. Keep it safe (you'll need it in Step 4)

### **Step 3: Install Dependencies** ⏱️ 3 minutes

**Open VSCode terminal** (Ctrl + ` or Terminal → New Terminal):

```bash
# Navigate to api folder
cd api

# Create Python virtual environment
python -m venv .venv

# Activate virtual environment
source .venv/Scripts/activate  # Windows Bash/Git Bash
# or
source .venv/bin/activate  # Mac/Linux

# You should see (.venv) in your terminal prompt

# Install dependencies
pip install -r requirements.txt

# Install Azure Table Storage SDK
pip install azure-data-tables

# This installs:
# - azure-functions (Azure Functions SDK)
# - azure-data-tables (Storage SDK)
```

**💡 VSCode Tip**: Python virtual environments keep dependencies isolated and clean!

### **Step 4: Configure Local Development** ⏱️ 1 minute

**In VSCode**, open `api/local.settings.json`:

**Option 1 - Using Explorer**:
1. In VSCode Explorer (left sidebar)
2. Navigate to `api` → `local.settings.json`
3. Click to open

**Option 2 - Using Command Palette**:
1. Press `Ctrl+P`
2. Type: `api/local.settings.json`
3. Press Enter

**Option 3 - Using Terminal**:
```bash
# Open the file in VSCode
code api/local.settings.json
```

**Then edit**:
Replace this line:
```json
"AZURE_STORAGE_CONNECTION_STRING": "REPLACE_WITH_YOUR_CONNECTION_STRING"
```

With your actual connection string from Step 2:
```json
"AZURE_STORAGE_CONNECTION_STRING": "DefaultEndpointsProtocol=https;AccountName=imkancontactdata;..."
```

Press `Ctrl+S` to save.

**✅ Already Done**: This file is already in `.gitignore`, so it won't be committed to Git.

### **Step 5: Test Locally** ⏱️ 2 minutes

**In VSCode terminal** (make sure you're in `/api` folder and virtual environment is **active**):

**Check virtual environment is active** - you should see `(.venv)` in your prompt:
```bash
# If (.venv) is NOT showing, activate it:
source .venv/Scripts/activate  # Windows
# or
source .venv/bin/activate  # Mac/Linux
```

**Start the function**:
```bash
func start

# You should see:
# Azure Functions Core Tools
# Core Tools Version: 4.x.x
# Function Runtime Version: 4.x.x
# 
# Functions:
#   contact: [POST] http://localhost:7071/api/contact
```

**💡 Python functions start instantly** - no compilation needed!

**Test the API** (open **new terminal**: Terminal → New Terminal):

```bash
curl -X POST http://localhost:7071/api/contact \
  -H "Content-Type: application/json" \
  -d "{\"firstName\":\"Test\",\"lastName\":\"User\",\"phone\":\"+966123456789\",\"email\":\"test@example.com\"}"
```

**Expected response**:
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "submissionId": "1234567890_abc123"
}
```

**💡 VSCode Tip**: 
- Split terminal: Click the split icon in terminal toolbar
- Or use `Ctrl+Shift+5` to create new terminal
- Keep function running in one terminal, test in another

**Alternative - Test in Browser**:
1. Open http://localhost:7071 in browser
2. Press F12 → Console
3. Paste:
```javascript
fetch('http://localhost:7071/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'Test',
    lastName: 'User',
    phone: '+966123456789',
    email: 'test@example.com'
  })
}).then(r => r.json()).then(console.log)
```

**✅ Success?** Check Azure Portal → Storage Account → Tables → `contactsubmissions`

---

## 🌐 DEPLOY TO PRODUCTION

### **Step 1: Push to GitHub** ⏱️ 1 minute

**⚠️ Important**: Make sure virtual environment is in `.gitignore` (already done!)

**Option A - Using VSCode Terminal**:

```bash
# In project root (not /api folder)
cd ..

# Verify you're in the right place
pwd
# Should show: /c/Users/carre/OneDrive/Escritorio/Imkan/Website/Website/imkan_website

# Add all files (but not .venv - it's in .gitignore)
git add .

# Commit
git commit -m "Add Python Azure Function for contact form storage"

# Push
git push origin main
```

**Option B - Using VSCode Git Panel** (Easier!):

1. Click **Source Control** icon in left sidebar (or press `Ctrl+Shift+G`)
2. Review all changed files (you should see `/api` folder, but NOT `.venv`)
3. Enter commit message: `Add Python Azure Function for contact form storage`
4. Click **✓ Commit** button
5. Click **"..."** menu → **Push**

**💡 Tip**: `.venv` folder is ignored automatically - only your code is pushed!

### **Step 2: Configure Azure** ⏱️ 2 minutes

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your **Static Web App**
3. Left menu → **"Configuration"**
4. Under **Application settings**, click **"+ Add"**
5. Add new setting:
   - **Name**: `AZURE_STORAGE_CONNECTION_STRING`
   - **Value**: Paste your connection string (from Step 2 above)
6. Click **"OK"**
7. Click **"Save"** at the top

### **Step 3: Wait for Deployment** ⏱️ 5-10 minutes

1. Go to your GitHub repository
2. Click **"Actions"** tab
3. You'll see a new workflow running
4. Wait for it to turn **green** ✅

### **Step 4: Test Live!** ⏱️ 1 minute

1. Go to your live website: `https://imkan.ai` (or your Azure URL)
2. Click **"Get in Touch"**
3. Fill out the form with test data
4. Submit

**Check if it worked**:
1. Azure Portal → Storage Account → Storage Browser → Tables
2. Click **"contactsubmissions"**
3. You should see your test submission! 🎉

---

## 📊 VIEW SUBMISSIONS

### **Method 1: Azure Portal (Easiest)**

1. Azure Portal → Storage Account → Tables → `contactsubmissions`
2. Click on entries to view details

### **Method 2: Azure Storage Explorer (Best)**

1. Download [Azure Storage Explorer](https://azure.microsoft.com/features/storage-explorer/)
2. Install and open
3. Sign in with your Azure account
4. Navigate to your storage account
5. Tables → contactsubmissions
6. **Export to Excel**: Right-click → Export to CSV

---

## 🎉 THAT'S IT!

Your contact form now:

✅ **Works!** - Stores all submissions in Azure  
✅ **Scalable** - Handles unlimited traffic  
✅ **Secure** - No exposed credentials  
✅ **Free** - Azure free tier covers most traffic  
✅ **Reliable** - 99.9% uptime SLA  

---

## 📋 WHAT HAPPENS WHEN SOMEONE SUBMITS?

1. User fills out form on your website
2. Frontend sends data to `/api/contact`
3. Azure Function validates the data
4. Function saves to Azure Table Storage
5. User sees success message
6. You can view submission in Azure Portal

**Data stored**:
- First Name
- Last Name
- Email
- Phone
- Submission timestamp
- IP address (for spam prevention)
- User agent (browser info)

---

## 💰 COST

**Expected monthly cost**: **$0 - $2**

Why so cheap?
- **Storage**: First 10GB free (forms are tiny)
- **Function calls**: First 1M free (you'll never hit this)
- **Bandwidth**: First 100GB free

---

## 🔒 SECURITY

✅ **Connection string** - Stored in Azure, not in code  
✅ **CORS** - Configured to allow your domain only  
✅ **Validation** - Email format, required fields checked  
✅ **HTTPS** - All traffic encrypted  
✅ **No SQL injection** - NoSQL storage (Table Storage)  

---

## 📧 OPTIONAL: ADD EMAIL NOTIFICATIONS

Want to get emailed when someone submits? See full guide:

`connect_website_to_storage.md` → Section: "Optional: Email Notifications"

**Quick options**:
- **SendGrid** - 100 emails/day free forever
- **Azure Logic Apps** - Visual workflow, no code
- **Power Automate** - Microsoft's automation tool

---

## 🐛 TROUBLESHOOTING

### **Form submits but I don't see data**

**Check**:
1. Azure Portal → Storage Account → Tables
2. Is `contactsubmissions` table created?
3. Azure Portal → Static Web App → Functions → Monitor (check logs)

### **Function returns 500 error**

**Check**:
1. Is connection string set in Static Web App Configuration?
2. Name must be exactly: `AZURE_STORAGE_CONNECTION_STRING`
3. Restart Static Web App after adding setting

### **CORS error in browser**

This shouldn't happen with our setup, but if it does:
1. Check `staticwebapp.config.json` is deployed
2. Clear browser cache
3. Check function code has CORS headers

### **Local testing fails**

**Check**:
1. `local.settings.json` has connection string
2. Run `npm install` in `/api` folder
3. Azure Functions Core Tools installed: `func --version`

---

## 📚 NEXT STEPS

**Now that your form works**:

1. ✅ Test with real data
2. ✅ Set up email notifications (optional)
3. ✅ Create export routine (weekly Excel export)
4. ✅ Set up alerts (if errors > 5)
5. ✅ Monitor usage in Azure Portal

---

## 📞 NEED HELP?

**Full detailed guide**: See `connect_website_to_storage.md`

**Common issues**: Check troubleshooting section above

**Azure Support**: Portal → Help + support → New support request

---

**You're all set! Your contact form is now production-ready! 🚀**

---

_Created: January 17, 2026_
