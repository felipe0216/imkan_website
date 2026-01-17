# 🚀 DEPLOYMENT FIX GUIDE - Contact Form

**Issue**: Contact form submissions failing after deployment  
**Cause**: Missing configuration in Azure and GitHub  
**Solution**: Follow these steps exactly

---

## ✅ **STEP 1: Add GitHub Workflow (DONE)**

I've created the workflow file at:
```
.github/workflows/azure-static-web-apps.yml
```

This workflow will:
- ✅ Build your React frontend
- ✅ Deploy your Python Azure Function
- ✅ Deploy to Azure Static Web Apps automatically

---

## ⚠️ **STEP 2: Add Deployment Token to GitHub** (YOU NEED TO DO THIS)

### **A. Get Token from Azure**

1. Go to **Azure Portal**: https://portal.azure.com
2. Navigate to your **Static Web App** resource
3. In left menu, click **"Settings"** → **"API keys"** or **"Overview"**
4. Look for **"Deployment token"** or **"Manage deployment token"**
5. Click to reveal/copy the token (long string starting with something like `wapd_...`)
6. **Copy this entire token**

### **B. Add Token to GitHub**

1. Go to your GitHub repository: https://github.com/YOUR_USERNAME/imkan_website
2. Click **"Settings"** (top menu)
3. In left sidebar: **"Secrets and variables"** → **"Actions"**
4. Click **"New repository secret"** (green button)
5. Fill in:
   - **Name**: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - **Value**: Paste the deployment token from Azure
6. Click **"Add secret"**

**⚠️ CRITICAL**: The secret name MUST be exactly `AZURE_STATIC_WEB_APPS_API_TOKEN`

---

## ⚠️ **STEP 3: Add Storage Connection String to Azure** (YOU NEED TO DO THIS)

Your Azure Function needs the storage connection string to save form submissions.

### **A. Find Your Connection String**

You already have it in `api/local.settings.json`:
```
DefaultEndpointsProtocol=https;AccountName=imkancontactdata;AccountKey=0PAUz0h...
```

**Copy the entire connection string**

### **B. Add to Azure Function Configuration**

1. Go to **Azure Portal**: https://portal.azure.com
2. Navigate to your **Static Web App** resource
3. In left menu, click **"Configuration"** (under Settings)
4. Click **"+ Add"** (Application settings section)
5. Fill in:
   - **Name**: `AZURE_STORAGE_CONNECTION_STRING`
   - **Value**: Paste your connection string
6. Click **"OK"**
7. Click **"Save"** at the top
8. Click **"Continue"** to confirm restart

**⚠️ CRITICAL**: The setting name MUST be exactly `AZURE_STORAGE_CONNECTION_STRING`

---

## ✅ **STEP 4: Deploy Your Code**

After adding the GitHub secret and Azure setting:

```bash
# Make sure all files are committed
git add .

# Commit changes
git commit -m "Add GitHub workflow and fix deployment configuration"

# Push to trigger deployment
git push origin main
```

---

## 🔍 **STEP 5: Monitor Deployment**

### **A. Watch GitHub Actions**

1. Go to your GitHub repository
2. Click **"Actions"** tab (top menu)
3. You should see a new workflow running
4. Click on it to see progress
5. Wait for ✅ green checkmark (usually 3-5 minutes)

### **B. Check for Errors**

If deployment fails:
- Click on the failed job
- Expand the error section
- Common issues:
  - ❌ Missing deployment token → Go back to Step 2
  - ❌ Build errors → Check the build logs
  - ❌ API deployment failed → Check Python dependencies in `requirements.txt`

---

## 🧪 **STEP 6: Test the Form**

After successful deployment:

1. Go to **https://imkan.ai**
2. Clear browser cache (Ctrl+Shift+Delete)
3. Click **"Get in Touch"** button
4. Fill out the form:
   - First Name: Test
   - Last Name: User
   - Phone: +966501234567
   - Email: test@example.com
5. Click **"Send Message"**

### **Expected Behavior**:

**✅ Success**:
- Button shows "Sending..." with spinner
- After 1-2 seconds: "Message Sent!" with green checkmark
- Modal closes after 3 seconds

**❌ If Error Occurs**:
- Alert appears: "Failed to submit form..."
- Open browser console (F12) → Console tab
- Look for error messages
- Take a screenshot and share with me

---

## 🔍 **STEP 7: Verify Data Was Saved**

### **Check Azure Table Storage**

1. Go to **Azure Portal**
2. Navigate to your **Storage Account** (`imkancontactdata`)
3. In left menu, click **"Storage browser"** (Preview)
4. Expand **"Tables"**
5. Click **"contactsubmissions"**
6. You should see your test submission!

**Data you'll see**:
- PartitionKey: `contact`
- RowKey: `1737xxxxx_abc123` (timestamp + random)
- firstName: `Test`
- lastName: `User`
- email: `test@example.com`
- phone: `+966501234567`
- submittedAt: ISO timestamp
- ipAddress: Your IP
- userAgent: Your browser

---

## 🎯 **QUICK CHECKLIST**

Before testing, ensure:

- [ ] GitHub workflow file exists (`.github/workflows/azure-static-web-apps.yml`)
- [ ] GitHub secret added (`AZURE_STATIC_WEB_APPS_API_TOKEN`)
- [ ] Azure application setting added (`AZURE_STORAGE_CONNECTION_STRING`)
- [ ] Code pushed to `main` branch
- [ ] GitHub Actions workflow completed successfully (✅)
- [ ] Website loads at https://imkan.ai
- [ ] Browser cache cleared

**If all checked**, the form should work! ✅

---

## 🐛 **TROUBLESHOOTING**

### **Issue: Form submission shows "Server configuration error"**

**Cause**: `AZURE_STORAGE_CONNECTION_STRING` not set in Azure  
**Fix**: Go back to Step 3B

### **Issue: Form submission shows "Failed to submit form"**

**Possible causes**:
1. **API not deployed**: Check GitHub Actions logs
2. **CORS issue**: Check browser console for CORS errors
3. **Wrong API path**: Verify `/api/contact` is accessible

**Debug**:
```bash
# Test if API is live
curl https://imkan.ai/api/contact

# Should return: {"error":"Method not allowed"}
# (This is correct - it only accepts POST)
```

### **Issue: Deployment fails in GitHub Actions**

**Check**:
1. Is `AZURE_STATIC_WEB_APPS_API_TOKEN` secret added correctly?
2. Does the secret name match exactly?
3. Check GitHub Actions logs for specific errors

### **Issue: Table not found**

**Cause**: Function can't create table (permissions)  
**Fix**: 
1. Check connection string is correct
2. Verify storage account exists
3. Ensure function has permission to create tables

---

## 📞 **GETTING HELP**

If you're still stuck after following all steps:

1. **Gather information**:
   - Screenshot of GitHub Actions logs (if failed)
   - Screenshot of browser console (F12 → Console)
   - Screenshot of Network tab (F12 → Network, filter: XHR)
   - Error message from form submission

2. **Check**:
   - Is https://imkan.ai/api/contact accessible?
   - Does curl return any response?
   - Are GitHub Actions running?

3. **Share with me**:
   - What step you're on
   - What error you're seeing
   - Screenshots if possible

---

## ✅ **SUCCESS CRITERIA**

You'll know everything works when:

1. ✅ GitHub Actions shows green checkmark
2. ✅ Website loads at https://imkan.ai
3. ✅ Form submission shows "Message Sent!"
4. ✅ Data appears in Azure Table Storage
5. ✅ No errors in browser console

---

**Estimated time**: 10-15 minutes  
**Difficulty**: Easy (just follow steps exactly)

---

_Created: January 17, 2026  
Last updated: After adding GitHub workflow_
