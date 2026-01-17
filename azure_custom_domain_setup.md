# 🌐 Adding Your Custom Domain (imkan.ai) to Azure Static Web App

This guide shows you exactly how to add your custom domain `imkan.ai` (purchased from GoDaddy) to your Azure Static Web App.

---

## 📋 **Overview of the Process**

```
Azure Portal → Add Custom Domain → Get DNS Records
    ↓
GoDaddy DNS Manager → Add Records
    ↓
Azure Portal → Validate Domain
    ↓
Wait for SSL Certificate (automatic)
    ↓
✅ imkan.ai works with HTTPS!
```

**Total time: 15-30 minutes** (most of it is waiting for DNS propagation)

---

## 📋 **Part 1: Add Custom Domain in Azure Portal**

### **Step 1: Go to Your Static Web App**

1. Open **Azure Portal**: https://portal.azure.com
2. Sign in with `felipe@imkan.ai`
3. Navigate to your Static Web App (should be named something like `imkan-website`)
4. You'll see your current URL (e.g., `https://nice-bush-xxx.azurestaticapps.net`)

### **Step 2: Open Custom Domains**

1. In the left sidebar, click **"Custom domains"**
2. You'll see it currently says "No custom domains"
3. Click **"+ Add"** button at the top

### **Step 3: Choose Your Domain Configuration**

You have two options:

#### **Option A: Use `www.imkan.ai` (Recommended for beginners)**
- Easier to configure
- Most common setup
- Example: `www.imkan.ai` → Your site
- Root domain `imkan.ai` can redirect to `www.imkan.ai`

#### **Option B: Use apex domain `imkan.ai`**
- No `www` prefix
- Requires additional DNS record (ALIAS or TXT)
- Example: `imkan.ai` → Your site directly

**I recommend starting with Option A (`www.imkan.ai`) first.**

### **Step 4: Enter Domain Details**

1. **Domain name**: Enter `www.imkan.ai`
2. **Hostname record type**: Select **"CNAME"**
3. Click **"Next"**

### **Step 5: Get Your DNS Records**

Azure will show you the DNS records you need to add. **Keep this page open!**

You'll see something like:

**Record 1 (CNAME for domain):**
- **Type**: CNAME
- **Name**: `www`
- **Value**: `nice-bush-0890c9503.azurestaticapps.net` (your Azure URL)

**Record 2 (TXT for validation):**
- **Type**: TXT  
- **Name**: `_dnsauth.www`
- **Value**: Long string like `abcd1234efgh5678...`

**📝 Write these down or keep the Azure tab open!**

---

## 🔧 **Part 2: Configure DNS in GoDaddy**

### **Step 1: Sign in to GoDaddy**

1. Go to: https://www.godaddy.com
2. Sign in to your account
3. Click **"My Products"**
4. Find `imkan.ai` in your domains list
5. Click **"DNS"** button next to it (or click "Manage" → "DNS")

### **Step 2: Add the CNAME Record**

1. Scroll to the **"Records"** section
2. Click **"Add"** button

3. Fill in the CNAME record:
   - **Type**: Select `CNAME`
   - **Name**: Enter `www`
   - **Value**: Enter your Azure Static Web App URL
     - Example: `nice-bush-0890c9503.azurestaticapps.net`
     - **Important**: Don't include `https://` or trailing `/`
   - **TTL**: `1 Hour` (or 3600 seconds) - default is fine

4. Click **"Save"**

### **Step 3: Add the TXT Record (for validation)**

1. Click **"Add"** button again

2. Fill in the TXT record:
   - **Type**: Select `TXT`
   - **Name**: Enter `_dnsauth.www`
   - **Value**: Paste the long validation string from Azure
     - It looks like: `abcd1234efgh5678ijkl9012mnop3456...`
   - **TTL**: `1 Hour` - default is fine

3. Click **"Save"**

### **Step 4: Verify Your DNS Records in GoDaddy**

Your DNS records should now look like this:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | nice-bush-0890c9503.azurestaticapps.net | 1 Hour |
| TXT | _dnsauth.www | abcd1234... (validation string) | 1 Hour |

✅ **DNS configuration is done!**

---

## ⏱️ **Part 3: Validate Domain in Azure**

### **Step 1: Return to Azure Portal**

1. Go back to the Azure Portal tab (where you saw the DNS records)
2. Click **"Validate"** button at the bottom

### **Step 2: Wait for Validation**

Azure will check if the DNS records are set up correctly.

**Possible outcomes:**

#### **Scenario A: Validation Succeeds Immediately** ✅
- Green checkmark appears
- Domain status: "Active"
- **Jump to Part 4!**

#### **Scenario B: Validation Fails** ⏳
- Error message: "DNS records not found"
- **This is normal!** DNS changes take time to propagate

**What to do:**
1. Click **"Close"** (don't worry, your settings are saved)
2. Wait **15-30 minutes**
3. Return to **Custom domains** in Azure
4. Click **"Validate"** again next to `www.imkan.ai`

### **DNS Propagation Timeline:**
- ⚡ **Best case**: 5-15 minutes
- ⏱️ **Typical**: 30 minutes - 2 hours
- 🐌 **Worst case**: Up to 48 hours (rare)

---

## 🔒 **Part 4: SSL Certificate (Automatic)**

Once validation succeeds:

1. Azure **automatically provisions** a free SSL certificate
2. This takes **2-5 minutes**
3. Your domain will show:
   - Status: **"Active"** ✅
   - SSL: **"Secured"** 🔒

**You don't need to do anything!** Azure handles this automatically.

---

## 🎉 **Part 5: Test Your Custom Domain**

After validation and SSL provisioning:

1. Open your browser
2. Go to: `https://www.imkan.ai`
3. Your website should load! 🎊

**Test these:**
- ✅ `https://www.imkan.ai` - Should work
- ✅ HTTPS is enabled (lock icon in browser)
- ✅ All pages load correctly
- ✅ Images display
- ✅ Navigation works

---

## 🔄 **Bonus: Redirect Root Domain to www**

You probably want `imkan.ai` (without www) to redirect to `www.imkan.ai`.

### **Option 1: Use GoDaddy's Domain Forwarding (Easiest)**

1. In GoDaddy, go to your domain management
2. Click **"Settings"** tab
3. Find **"Domain forwarding"** or **"Forwarding"**
4. Click **"Add Forwarding"**
5. Set up:
   - **Forward to**: `https://www.imkan.ai`
   - **Forward type**: `Permanent (301)`
   - **Settings**: Forward only (not Forward with masking)
6. Click **"Save"**

Now `imkan.ai` automatically redirects to `www.imkan.ai`!

### **Option 2: Add Apex Domain to Azure (Advanced)**

If you want `imkan.ai` to work directly (not redirect):

1. In Azure, add another custom domain: `imkan.ai` (no www)
2. In GoDaddy, add an **ALIAS** or **ANAME** record (if supported)
   - **Type**: ALIAS or ANAME
   - **Name**: `@` (represents root domain)
   - **Value**: Your Azure Static Web App URL

**Note**: Not all DNS providers support ALIAS records. GoDaddy may call it "CNAME flattening" or you might need to use their forwarding feature instead.

---

## 🧪 **Check DNS Propagation Status**

Want to see if your DNS changes have propagated?

**Use these tools:**

1. **WhatsMyDNS**: https://www.whatsmydns.net
   - Enter: `www.imkan.ai`
   - Type: `CNAME`
   - Check: Shows propagation worldwide

2. **Command line** (on your computer):
   ```bash
   # Check CNAME record
   nslookup www.imkan.ai
   
   # Or use dig (if available)
   dig www.imkan.ai CNAME
   ```

You should see your Azure URL in the results.

---

## ⚠️ **Common Issues & Solutions**

### **Issue 1: "Validation Failed - DNS records not found"**

**Cause**: DNS hasn't propagated yet

**Solution**:
1. Double-check records in GoDaddy (exact spelling, no typos)
2. Wait 30 more minutes
3. Try validation again
4. Clear your DNS cache:
   ```bash
   ipconfig /flushdns
   ```

---

### **Issue 2: "www.imkan.ai doesn't load"**

**Cause**: Either DNS not propagated or wrong CNAME value

**Solution**:
1. Verify CNAME record in GoDaddy points to correct Azure URL
2. Check on whatsmydns.net
3. Wait for propagation
4. Try in incognito/private browser window

---

### **Issue 3: "Not Secure" warning in browser**

**Cause**: SSL certificate still provisioning

**Solution**:
1. Wait 5-10 minutes after validation
2. Hard refresh: `Ctrl + Shift + R`
3. Check Azure Portal - SSL status should be "Secured"

---

### **Issue 4: Old website/placeholder still shows**

**Cause**: Browser cache or CDN cache

**Solution**:
1. Hard refresh: `Ctrl + Shift + R`
2. Clear browser cache
3. Try incognito/private window
4. Wait a few minutes for CDN to update

---

## 📋 **Quick Checklist**

Before you start, make sure:
- ✅ Azure Static Web App is deployed and working (check the `.azurestaticapps.net` URL)
- ✅ You have access to GoDaddy account
- ✅ You have access to Azure Portal

**Steps summary:**
1. ✅ Azure: Add custom domain `www.imkan.ai`
2. ✅ GoDaddy: Add CNAME record for `www`
3. ✅ GoDaddy: Add TXT record for `_dnsauth.www`
4. ✅ Wait 15-30 minutes
5. ✅ Azure: Validate domain
6. ✅ Wait 2-5 minutes for SSL
7. ✅ Test `https://www.imkan.ai`
8. ✅ (Optional) Set up forwarding for root domain

---

## 📞 **Need Help?**

If you get stuck:

1. **Check Azure Portal** → Custom domains → Look for error messages
2. **Verify GoDaddy DNS** → Make sure records are saved correctly
3. **Check propagation**: https://www.whatsmydns.net

**Let me know if:**
- Validation keeps failing after 1 hour
- You see specific error messages
- SSL certificate doesn't provision after 10 minutes
- You want to set up the apex domain (`imkan.ai` without www)

---

**Start with Part 1 in Azure Portal and work through each step!** The whole process is straightforward once you get the DNS records configured. 🚀
