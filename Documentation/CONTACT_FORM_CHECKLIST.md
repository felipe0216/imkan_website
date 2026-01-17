# ✅ Contact Form Implementation Checklist

**Use this checklist to ensure everything is set up correctly.**

---

## 📋 PRE-DEPLOYMENT CHECKLIST

### **1. Azure Storage Account** ☐

- [ ] Storage account created in Azure Portal
- [ ] Name: `imkancontactdata` (or your chosen name)
- [ ] Region: Same as Static Web App
- [ ] Performance: Standard
- [ ] Redundancy: LRS
- [ ] Connection string copied and saved securely

### **2. Local Development** ☐

- [ ] Azure Functions Core Tools installed (`func --version`)
- [ ] Node.js v18+ installed (`node --version`)
- [ ] Navigated to `/api` folder
- [ ] Ran `npm install` successfully
- [ ] Updated `api/local.settings.json` with connection string
- [ ] File `api/local.settings.json` is in `.gitignore`

### **3. Local Testing** ☐

- [ ] Ran `npm start` in `/api` folder
- [ ] Function endpoint shows: `http://localhost:7071/api/contact`
- [ ] Tested with cURL (or Postman)
- [ ] Received success response
- [ ] Verified data appears in Azure Portal → Tables → `contactsubmissions`

### **4. Frontend Code** ☐

- [ ] `ContactFormModal.tsx` updated to call `/api/contact`
- [ ] Error handling implemented
- [ ] Success message displays correctly
- [ ] Form resets after submission

### **5. Configuration** ☐

- [ ] `staticwebapp.config.json` includes `/api/*` route
- [ ] `api/.gitignore` exists (prevents committing secrets)
- [ ] All API files committed to Git
- [ ] `local.settings.json` NOT committed to Git

---

## 🚀 DEPLOYMENT CHECKLIST

### **6. GitHub Push** ☐

- [ ] All changes committed locally
- [ ] Changes pushed to GitHub (`git push origin main`)
- [ ] GitHub Actions workflow triggered
- [ ] No Git errors or conflicts

### **7. Azure Configuration** ☐

- [ ] Navigated to Azure Portal → Static Web App
- [ ] Opened Configuration section
- [ ] Added environment variable:
  - Name: `AZURE_STORAGE_CONNECTION_STRING`
  - Value: Your connection string
- [ ] Clicked "Save"
- [ ] Configuration saved successfully

### **8. Deployment Verification** ☐

- [ ] GitHub Actions workflow completed (green checkmark)
- [ ] No deployment errors in Actions log
- [ ] Waited 5-10 minutes for full deployment
- [ ] Static Web App shows "Running" status

---

## ✅ PRODUCTION TESTING CHECKLIST

### **9. Live API Test** ☐

- [ ] Opened browser console (F12)
- [ ] Tested API endpoint with fetch:
  ```javascript
  fetch('https://YOUR-SITE.azurestaticapps.net/api/contact', {
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
- [ ] Received success response
- [ ] No CORS errors

### **10. Form Submission Test** ☐

- [ ] Opened live website
- [ ] Clicked "Get in Touch"
- [ ] Filled form with test data:
  - First Name: Test
  - Last Name: User
  - Phone: +966123456789
  - Email: test@example.com
- [ ] Submitted form
- [ ] Saw success message
- [ ] No console errors

### **11. Data Verification** ☐

- [ ] Logged into Azure Portal
- [ ] Navigated to Storage Account
- [ ] Opened Storage Browser → Tables
- [ ] Clicked `contactsubmissions`
- [ ] Test submission visible
- [ ] All fields populated correctly:
  - firstName: Test
  - lastName: User
  - email: test@example.com
  - phone: +966123456789
  - submittedAt: Recent timestamp
  - ipAddress: Populated
  - userAgent: Populated

---

## 🔍 POST-DEPLOYMENT VERIFICATION

### **12. Multiple Submissions Test** ☐

- [ ] Submitted form 3 times with different data
- [ ] All 3 submissions visible in Azure Portal
- [ ] No duplicate rowKey values
- [ ] Timestamps correct

### **13. Error Handling Test** ☐

- [ ] Tried submitting with missing fields (should fail gracefully)
- [ ] Tried submitting with invalid email (should show error)
- [ ] Error messages display correctly to user
- [ ] Form doesn't break after error

### **14. Mobile Testing** ☐

- [ ] Opened website on mobile device
- [ ] Form displays correctly
- [ ] Submitted form successfully
- [ ] Success message displays
- [ ] Data saved to Azure

### **15. Cross-Browser Testing** ☐

- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari (if Mac/iOS)
- [ ] Tested on Edge
- [ ] All work correctly

---

## 📊 MONITORING SETUP

### **16. Azure Monitor** ☐

- [ ] Azure Portal → Static Web App → Monitoring
- [ ] Function execution count visible
- [ ] No error logs present
- [ ] Response times reasonable (< 2 seconds)

### **17. Storage Monitoring** ☐

- [ ] Azure Portal → Storage Account → Insights
- [ ] Table transaction count increasing
- [ ] No failed requests
- [ ] Storage size minimal

### **18. Alerts (Optional)** ☐

- [ ] Created alert for function errors > 5 in 5 minutes
- [ ] Created alert for storage availability < 99%
- [ ] Email notifications configured
- [ ] Test alerts working

---

## 📧 OPTIONAL: EMAIL NOTIFICATIONS

### **19. Email Setup** (If using SendGrid/Logic Apps) ☐

- [ ] SendGrid account created OR Logic App created
- [ ] API key / webhook URL obtained
- [ ] Added to Azure Static Web App Configuration
- [ ] Function code updated to send emails
- [ ] Test email received
- [ ] Email format looks good

---

## 🔒 SECURITY CHECKLIST

### **20. Security Verification** ☐

- [ ] Connection string NOT in Git repository
- [ ] `local.settings.json` in `.gitignore`
- [ ] Environment variables set in Azure (not in code)
- [ ] HTTPS enabled (automatic in Azure)
- [ ] CORS configured correctly
- [ ] Input validation working (email format, required fields)
- [ ] No exposed API keys

---

## 📚 DOCUMENTATION

### **21. Team Documentation** ☐

- [ ] Team knows how to view submissions (Azure Portal)
- [ ] Process documented for exporting data
- [ ] Contact person assigned for monitoring
- [ ] Troubleshooting guide accessible

---

## 🎉 FINAL SIGN-OFF

### **22. Production Ready** ☐

- [ ] All tests passing ✅
- [ ] No errors in logs ✅
- [ ] Form working on all devices ✅
- [ ] Data saving correctly ✅
- [ ] Team trained on viewing submissions ✅
- [ ] Monitoring in place ✅

---

## 📞 TROUBLESHOOTING CONTACTS

**If something doesn't work**:

1. Check this checklist - did you miss a step?
2. Review logs:
   - Azure Portal → Static Web App → Functions → Monitor
   - GitHub Actions → Latest workflow → Logs
3. Consult documentation:
   - `CONTACT_FORM_QUICK_START.md` (quick guide)
   - `connect_website_to_storage.md` (detailed guide)
4. Azure Support:
   - Portal → Help + support → New support request

---

## 🚀 LAUNCH STATUS

**Current Status**: ☐ Not Started / ☐ In Progress / ☐ Complete

**Last Updated**: _________________

**Verified By**: _________________

**Issues Found**: _________________

**Resolution**: _________________

---

**Sign off when all items checked!** ✅

---

_Checklist created: January 17, 2026_
