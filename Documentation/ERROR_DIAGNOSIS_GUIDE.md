# 🔍 CONTACT FORM ERROR DIAGNOSIS GUIDE

**Use this guide to identify what's wrong if the form doesn't work after deployment**

---

## 📊 **ERROR SCENARIOS & SOLUTIONS**

### **Scenario 1: Alert Shows "Failed to submit form..."**

**What you see**:
- Form shows spinner briefly
- Alert popup: "Failed to submit form. Please try again or contact us directly at info@imkan.ai"

**What this means**: Frontend couldn't reach the API or API returned an error

**How to diagnose**:

1. **Open Browser Console** (F12 → Console tab)
2. **Look for error messages** (usually in red)

**Possible errors**:

#### **A. 404 Not Found Error**
```
POST https://imkan.ai/api/contact 404 (Not Found)
```

**Cause**: Azure Function not deployed  
**Fix**: 
1. Check GitHub Actions completed successfully
2. Verify deployment token is added to GitHub
3. Wait a few minutes after deployment

---

#### **B. 500 Server Configuration Error**
```
{"error": "Server configuration error"}
```

**Cause**: `AZURE_STORAGE_CONNECTION_STRING` not set in Azure  
**Fix**: 
1. Go to Azure Portal
2. Your Static Web App → Configuration
3. Add application setting: `AZURE_STORAGE_CONNECTION_STRING`
4. Save and restart

---

#### **C. CORS Error**
```
Access to fetch at 'https://imkan.ai/api/contact' has been blocked by CORS policy
```

**Cause**: CORS headers not properly configured  
**Fix**: This shouldn't happen with current code, but if it does:
1. Check `function_app.py` has CORS headers in all responses
2. Verify `staticwebapp.config.json` allows `/api/*` routes

---

#### **D. Network Error / Connection Refused**
```
Failed to fetch
net::ERR_CONNECTION_REFUSED
```

**Cause**: API endpoint doesn't exist or is down  
**Fix**:
1. Test manually: `curl https://imkan.ai/api/contact`
2. Should return: `{"error":"Method not allowed"}` (this is correct!)
3. If 404, function isn't deployed

---

### **Scenario 2: Form Just Spins Forever**

**What you see**:
- Button shows "Sending..." with spinner
- Never completes or shows error
- No alert appears

**Cause**: Request is hanging (timeout or infinite wait)

**How to diagnose**:

1. **Open Network Tab** (F12 → Network)
2. **Filter**: XHR
3. **Submit form**
4. **Look for** `/api/contact` request
5. **Check**:
   - Status: Should be 200, 400, or 500
   - Time: Should complete in 1-3 seconds
   - Response: Should have JSON data

**Possible issues**:

#### **Request Pending Forever**
**Cause**: Azure Function cold start or timeout  
**Fix**: Wait up to 30 seconds for first request (cold start)

#### **Request Canceled**
**Cause**: Network issue or browser canceled  
**Fix**: Check internet connection, try again

---

### **Scenario 3: Form Shows Success But Data Not Saved**

**What you see**:
- "Message Sent!" appears ✅
- Modal closes
- But data not in Azure Table Storage

**Cause**: Function returned success but save failed

**How to diagnose**:

1. **Check Function Logs** in Azure:
   - Azure Portal → Static Web App
   - Monitor → Logs
   - Look for error messages
   
2. **Check Table Storage**:
   - Azure Portal → Storage Account (imkancontactdata)
   - Storage Browser → Tables → contactsubmissions
   - Verify data exists

**Possible causes**:

#### **Wrong Connection String**
**Symptom**: Logs show connection errors  
**Fix**: Verify connection string in Azure Configuration

#### **Table Permissions**
**Symptom**: Logs show "Forbidden" or "Unauthorized"  
**Fix**: Check storage account access keys are correct

---

## 🧪 **MANUAL TESTING STEPS**

### **Test 1: Check API Endpoint Exists**

```bash
# Test from terminal
curl https://imkan.ai/api/contact

# Expected response:
# {"error":"Method not allowed"}

# This means the function is live but only accepts POST!
```

**✅ Success**: Returns JSON error  
**❌ Failed**: 404 or connection error → Function not deployed

---

### **Test 2: Submit Test Form**

1. Go to https://imkan.ai
2. Open browser console (F12)
3. Click "Get in Touch"
4. Fill form with test data
5. Submit
6. Watch console and network tab

**What to capture if error**:
- Screenshot of console errors
- Screenshot of network tab showing the request
- Copy the response body

---

### **Test 3: Verify in Azure Storage**

After successful submission:

1. Azure Portal → Storage Account
2. Storage Browser → Tables → contactsubmissions
3. Look for your test entry
4. Should see:
   - Your email
   - Your name
   - Timestamp
   - IP address

**✅ Success**: Data is there  
**❌ Failed**: No data → Check function logs

---

## 🎯 **QUICK DIAGNOSTIC FLOWCHART**

```
Form submission fails
    ↓
Check: Error message in alert?
    ↓ Yes                ↓ No (just spins)
    |                     |
    |                Check Network Tab
    |                     ↓
    |                Request pending?
    |                     ↓ Yes
    |                Wait 30 sec (cold start)
    |
Check Console (F12)
    ↓
404 Error?
    ↓ Yes
    Function not deployed
    → Check GitHub Actions
    ↓ No
    |
500 Error?
    ↓ Yes
    Check response body
    ↓
    "Server configuration error"?
        ↓ Yes
        Missing AZURE_STORAGE_CONNECTION_STRING
        → Add to Azure Configuration
    ↓ No
    |
Other error?
    → Share error with me
```

---

## 📋 **INFORMATION TO SHARE IF STUCK**

If you need help, provide:

### **1. Browser Console Screenshot** (F12 → Console)
- Shows JavaScript errors
- Shows network errors
- Shows API responses

### **2. Network Tab Screenshot** (F12 → Network → XHR)
- Shows request/response
- Shows status code
- Shows timing

### **3. GitHub Actions Status**
- Screenshot of workflow run
- Shows if deployment succeeded
- Shows build logs if failed

### **4. Azure Function Logs** (if accessible)
- Azure Portal → Static Web App → Monitor → Logs
- Shows Python function errors
- Shows connection issues

### **5. Test Results**
```bash
# Run this and share output:
curl https://imkan.ai/api/contact

# Also try:
curl -X POST https://imkan.ai/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","phone":"+966501234567","email":"test@example.com"}'
```

---

## ✅ **EXPECTED SUCCESS INDICATORS**

When everything works:

1. ✅ GitHub Actions: Green checkmark
2. ✅ curl test: Returns `{"error":"Method not allowed"}` for GET
3. ✅ Form submission: Shows "Message Sent!" in 1-2 seconds
4. ✅ Azure Table: Data appears in `contactsubmissions` table
5. ✅ Browser console: No errors
6. ✅ Network tab: Status 200, response has `{"success":true}`

---

## 🔧 **COMMON FIXES**

### **Fix 1: Clear Browser Cache**
```
Ctrl + Shift + Delete → Clear cached images and files
```

### **Fix 2: Hard Refresh**
```
Ctrl + F5 (Windows)
Cmd + Shift + R (Mac)
```

### **Fix 3: Restart Azure Function**
```
Azure Portal → Static Web App → Overview → Restart
```

### **Fix 4: Redeploy**
```bash
# Make small change
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

---

## 🎓 **UNDERSTANDING THE ERROR**

### **Frontend Error** (Alert shows):
- Problem in React app
- Network issue
- API not responding

### **Backend Error** (500 status):
- Problem in Python function
- Database connection issue
- Configuration missing

### **Deployment Error** (404):
- Function not deployed
- Wrong route
- GitHub Actions failed

---

**Use this guide alongside `DEPLOYMENT_FIX_GUIDE.md` to diagnose and fix issues!**

---

_Created: January 17, 2026  
For: Contact form troubleshooting_
