# 🔗 Connect Website Contact Form to Azure Storage

**Complete Step-by-Step Guide**

---

## 📋 TABLE OF CONTENTS

1. [Overview & Architecture](#overview--architecture)
2. [Prerequisites](#prerequisites)
3. [Option A: Quick Setup (Azure Table Storage)](#option-a-quick-setup-azure-table-storage)
4. [Option B: Advanced Setup (Cosmos DB)](#option-b-advanced-setup-cosmos-db)
5. [Create Azure Function](#create-azure-function)
6. [Update Frontend Code](#update-frontend-code)
7. [Deploy & Test](#deploy--test)
8. [Optional: Email Notifications](#optional-email-notifications)
9. [Troubleshooting](#troubleshooting)

---

## 📐 OVERVIEW & ARCHITECTURE

### **What We're Building**

```
┌─────────────────┐      HTTP POST      ┌──────────────────┐
│                 │ ──────────────────> │                  │
│  Contact Form   │   /api/contact      │ Azure Function   │
│  (React)        │                     │  (Serverless)    │
│                 │ <────────────────── │                  │
└─────────────────┘    Success/Error    └──────────────────┘
                                                 │
                                                 │ Store Data
                                                 ▼
                                        ┌──────────────────┐
                                        │  Azure Storage   │
                                        │  (Table/Cosmos)  │
                                        └──────────────────┘
```

### **Why This Approach?**

✅ **Serverless** - No servers to manage, pay only for usage  
✅ **Scalable** - Handles 1 or 10,000 submissions automatically  
✅ **Integrated** - Azure Static Web Apps have built-in Function support  
✅ **Cost-Effective** - Free tier covers most small-medium websites  
✅ **Secure** - No exposed API keys in frontend code  

---

## ✅ PREREQUISITES

Before starting, ensure you have:

- [x] Azure account (already have - you deployed the website)
- [x] Azure Static Web App deployed (already done)
- [x] **Python 3.9-3.11 installed** (check with `python --version`)
- [x] Azure Functions Core Tools installed
- [x] Visual Studio Code (recommended)

### **Check Python Version**

```bash
# Check Python version (must be 3.9, 3.10, or 3.11)
python --version
# or
python3 --version

# If you don't have Python or have wrong version:
# Download from: https://www.python.org/downloads/
# Install Python 3.11 (recommended)
```

### **Install Azure Functions Core Tools**

**Windows (using npm - recommended for VSCode/Bash)**:
```bash
npm install -g azure-functions-core-tools@4 --unsafe-perm true
```

**Alternative - Windows Package Manager**:
```bash
# If you have winget installed
winget install Microsoft.Azure.FunctionsCoreTools
```

**Verify Installation**:
```bash
func --version
# Should show: 4.x.x
```

---

## 🚀 OPTION A: QUICK SETUP (AZURE TABLE STORAGE)

**Recommended for most use cases** - Simple, cost-effective, perfect for contact forms.

### **Why Azure Table Storage?**

✅ **Super Cheap** - First 10GB free, then $0.045/GB/month  
✅ **Simple** - NoSQL key-value storage, easy to query  
✅ **Fast** - Low latency, high throughput  
✅ **Perfect for Forms** - Structured data like contact submissions  

---

### **STEP 1: Create Storage Account**

#### **1.1 Via Azure Portal**

1. Go to [Azure Portal](https://portal.azure.com)
2. Search for **"Storage accounts"** in the top search bar
3. Click **"+ Create"**

#### **1.2 Configure Storage Account**

**Basics Tab**:
- **Subscription**: Your subscription
- **Resource Group**: Same as your Static Web App (e.g., `imkan-website-rg`)
- **Storage account name**: `imkancontactdata` (must be globally unique, lowercase, no spaces)
- **Region**: Same as your website (e.g., `East US 2`)
- **Performance**: **Standard** (cheaper)
- **Redundancy**: **LRS (Locally Redundant Storage)** (cheapest, sufficient for forms)

**⚠️ IMPORTANT - Under "Storage account details"**:
- **Primary workload**: Select **"Other (tables and queues)"** ✅
  - This enables Azure Table Storage which we use to store form submissions
  - Do NOT select "Azure Blob Storage" or "Azure Files"

**Advanced Tab**:
- Leave defaults

**Networking Tab**:
- **Network access**: Public endpoint (all networks)

**Data Protection Tab**:
- Leave defaults (soft delete optional)

**Encryption Tab**:
- Leave defaults

**Tags Tab** (optional):
- Add tags if you want (e.g., `Project: imkan-website`)

**Review + Create**:
- Click **"Review + create"**
- Click **"Create"**

⏱️ **Wait 1-2 minutes** for deployment to complete.

---

### **STEP 2: Get Storage Connection String**

1. Go to your new storage account (`imkancontactdata`)
2. In left menu, click **"Access keys"** (under Security + networking)
3. Click **"Show keys"** next to **key1**
4. Copy the **Connection string** (looks like: `DefaultEndpointsProtocol=https;AccountName=...`)

**⚠️ IMPORTANT**: Keep this connection string secret! Never commit it to Git.

---

### **STEP 3: Create Azure Function (Backend API)**

#### **3.1 Create Function Project**

**Open VSCode terminal** (Ctrl + ` or View → Terminal) in your project root:

```bash
# You should already be in your project root
# Verify with:
pwd
# Should show: /c/Users/carre/OneDrive/Escritorio/Imkan/Website/Website/imkan_website

# Create 'api' folder for functions
mkdir api
cd api

# Initialize Azure Functions project for Python
func init . --python

# This creates:
# - host.json (Azure Functions configuration)
# - local.settings.json (local development settings)
# - requirements.txt (Python dependencies)
# - .funcignore (files to ignore)
```

**💡 Tip**: Python functions are simpler than TypeScript - no compilation needed!

---

### **STEP 4: Install Python Dependencies**

**Still in `/api` folder**:

```bash
# Create virtual environment (recommended)
python -m venv .venv

# Activate virtual environment
# On Windows (Bash):
source .venv/Scripts/activate

# On Mac/Linux:
source .venv/bin/activate

# You should see (.venv) in your terminal prompt

# Install dependencies
pip install -r requirements.txt

# Install Azure Table Storage SDK
pip install azure-data-tables
```

**💡 Tip**: Always use a virtual environment for Python projects!

---

### **STEP 5: Create the Contact Function**

The function code is already created at `api/function_app.py`.

**Let's review what it does** (open in VSCode):

```bash
code api/function_app.py
```

**Key features**:
- ✅ Validates all required fields
- ✅ Validates email format with regex
- ✅ Handles CORS (Cross-Origin requests)
- ✅ Stores data in Azure Table Storage
- ✅ Returns proper error messages
- ✅ Logs all submissions

**No changes needed** - the code is production-ready!

---

### **STEP 6: Configure Local Settings**

The file `api/local.settings.json` was already created. **Update it**:

**Using VSCode**:
1. In VSCode Explorer, navigate to `api/local.settings.json`
2. Replace `REPLACE_WITH_YOUR_CONNECTION_STRING` with your actual connection string from Step 2

**Or using terminal**:
```bash
# In your project root
# Open the file in VSCode
code api/local.settings.json
```

**The file should look like this**:
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "python",
    "AZURE_STORAGE_CONNECTION_STRING": "DefaultEndpointsProtocol=https;AccountName=imkancontactdata;..."
  }
}
```

**✅ Already Done**: The file is already in `.gitignore` (check `api/.gitignore`)

---

### **STEP 7: Test Function Locally**

**In VSCode terminal** (make sure you're in `/api` folder and virtual environment is active):

**You should see `(.venv)` in your prompt**. If not:
```bash
# Activate virtual environment
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

**💡 Python starts faster than TypeScript** - no compilation!

**Test with cURL** (open a **new terminal** in VSCode: Terminal → New Terminal):
```bash
curl -X POST http://localhost:7071/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "phone": "+966123456789",
    "email": "test@example.com"
  }'

# Expected response:
# {"success":true,"message":"Contact form submitted successfully","submissionId":"..."}
```

**💡 Tip**: Keep the function running in one terminal, test in another terminal window.

**Alternative - Test in Browser Console**:
1. Open http://localhost:7071 in browser
2. Press F12 (Dev Tools)
3. Go to Console tab
4. Paste:
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

**✅ If successful**: Check Azure Portal → Storage Account → Tables → `contactsubmissions`

---

### **STEP 8: Update Frontend Code**

Update `components/ContactFormModal.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    // Call the Azure Function API
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit form');
    }

    // Success!
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ firstName: '', lastName: '', phone: '', email: '' });
      onClose();
    }, 3000);

  } catch (error) {
    console.error('Form submission error:', error);
    setIsSubmitting(false);
    // TODO: Show error message to user
    alert('Failed to submit form. Please try again.');
  }
};
```

---

### **STEP 9: Configure Azure Function in Static Web App**

#### **9.1 Add Function to staticwebapp.config.json**

Update `staticwebapp.config.json`:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/images/*.{png,jpg,gif,svg}", "/assets/*", "/api/*"]
  },
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["anonymous"]
    },
    {
      "route": "/*",
      "serve": "/index.html",
      "statusCode": 200
    }
  ],
  "mimeTypes": {
    ".json": "application/json",
    ".js": "application/javascript",
    ".css": "text/css"
  },
  "globalHeaders": {
    "content-security-policy": "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:;",
    "cache-control": "public, max-age=31536000, immutable"
  },
  "responseOverrides": {
    "404": {
      "rewrite": "/index.html",
      "statusCode": 200
    }
  }
}
```

---

### **STEP 10: Deploy to Azure**

#### **10.1 Update GitHub Repository**

**In VSCode terminal** (make sure you're in project root, not `/api` folder):
```bash
# Navigate to project root if needed
cd ..

# Verify you're in the right place
pwd
# Should show: /c/Users/carre/OneDrive/Escritorio/Imkan/Website/Website/imkan_website

# Add all files
git add .

# Commit
git commit -m "Add Azure Function for contact form"

# Push
git push origin main
```

**💡 VSCode Git Panel Alternative**:
1. Click Source Control icon in left sidebar (or Ctrl+Shift+G)
2. Review changed files
3. Enter commit message: "Add Azure Function for contact form"
4. Click ✓ Commit
5. Click "..." → Push

#### **10.2 Configure Function Settings in Azure**

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your **Static Web App**
3. In left menu, click **"Configuration"**
4. Click **"+ Add"** under Application settings
5. Add new setting:
   - **Name**: `AZURE_STORAGE_CONNECTION_STRING`
   - **Value**: Your storage connection string (from Step 2)
6. Click **"OK"**
7. Click **"Save"** at the top

⏱️ **Wait 5-10 minutes** for GitHub Actions to build and deploy.

---

### **STEP 11: Verify Deployment**

#### **11.1 Check GitHub Actions**

1. Go to your GitHub repository
2. Click **"Actions"** tab
3. Verify latest workflow is **green** (completed successfully)

#### **11.2 Test Live Function**

**Open browser console** (F12) and run:

```javascript
fetch('https://YOUR-SITE-NAME.azurestaticapps.net/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'Test',
    lastName: 'User',
    phone: '+966123456789',
    email: 'test@example.com'
  })
})
.then(res => res.json())
.then(data => console.log('Success:', data))
.catch(err => console.error('Error:', err));
```

**Expected response**:
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "submissionId": "1234567890_abc123"
}
```

---

### **STEP 12: View Stored Data**

#### **12.1 Via Azure Portal**

1. Go to your Storage Account (`imkancontactdata`)
2. In left menu, click **"Storage browser"** (preview)
3. Expand **"Tables"**
4. Click **"contactsubmissions"**
5. You'll see all form submissions!

#### **12.2 Via Azure Storage Explorer (Desktop App)**

1. Download [Azure Storage Explorer](https://azure.microsoft.com/features/storage-explorer/)
2. Install and open
3. Sign in with your Azure account
4. Navigate to your storage account
5. Browse tables → contactsubmissions

---

## 🎨 OPTION B: ADVANCED SETUP (COSMOS DB)

**Use if you need**:
- Advanced querying capabilities
- Global distribution
- Multi-region replication
- SLA guarantees

### **Why Cosmos DB?**

✅ **Powerful** - Rich query language, indexing  
✅ **Scalable** - Unlimited scale  
✅ **Multi-region** - Global distribution  
⚠️ **More Expensive** - ~$24/month minimum  

**For most contact forms, Table Storage is sufficient.** Only use Cosmos DB if you need the advanced features.

<details>
<summary><b>Click to expand Cosmos DB setup instructions</b></summary>

### **COSMOS DB SETUP**

#### **Step 1: Create Cosmos DB Account**

1. Go to [Azure Portal](https://portal.azure.com)
2. Search **"Azure Cosmos DB"**
3. Click **"+ Create"**
4. Select **"Azure Cosmos DB for NoSQL"**

**Configure**:
- **Subscription**: Your subscription
- **Resource Group**: Same as website
- **Account Name**: `imkan-contact-db`
- **Location**: Same as website
- **Capacity mode**: **Serverless** (cheapest for low volume)

#### **Step 2: Create Database and Container**

After deployment:
1. Go to your Cosmos DB account
2. Click **"Data Explorer"**
3. Click **"New Database"**
   - **Database id**: `ContactDatabase`
   - Click **"OK"**
4. Click **"New Container"**
   - **Database**: Use existing → `ContactDatabase`
   - **Container id**: `Submissions`
   - **Partition key**: `/email`
   - Click **"OK"**

#### **Step 3: Get Connection String**

1. In Cosmos DB account, click **"Keys"**
2. Copy **"PRIMARY CONNECTION STRING"**

#### **Step 4: Update Function Code**

Install Cosmos DB SDK:
```bash
npm install @azure/cosmos
```

Update `api/src/functions/contact.ts`:

```typescript
import { CosmosClient } from "@azure/cosmos";

// ... (same interfaces)

export async function contact(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    // ... (same validation code)

    try {
        const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;
        
        const client = new CosmosClient(connectionString!);
        const database = client.database('ContactDatabase');
        const container = database.container('Submissions');

        const document = {
            id: `${Date.now()}_${Math.random().toString(36).substring(7)}`,
            ...formData,
            submittedAt: new Date().toISOString(),
            ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
            userAgent: request.headers.get('user-agent') || 'unknown'
        };

        await container.items.create(document);

        return {
            status: 200,
            jsonBody: { success: true, message: 'Submitted successfully' },
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
    } catch (error) {
        // ... (same error handling)
    }
}
```

#### **Step 5: Configure Environment Variable**

Add to Azure Static Web App Configuration:
- **Name**: `COSMOS_DB_CONNECTION_STRING`
- **Value**: Your Cosmos DB connection string

</details>

---

## 📧 OPTIONAL: EMAIL NOTIFICATIONS

Get notified when someone submits the contact form.

### **Option 1: SendGrid (Recommended)**

**Free tier**: 100 emails/day forever

#### **Setup SendGrid**

1. Create account at [SendGrid](https://sendgrid.com)
2. Verify sender email (info@imkan.ai)
3. Create API key:
   - Go to Settings → API Keys
   - Create API Key with "Full Access"
   - Copy the key

#### **Install SendGrid SDK**

```bash
# In /api folder
npm install @sendgrid/mail
```

#### **Update Function Code**

Add to `api/src/functions/contact.ts`:

```typescript
import sgMail from '@sendgrid/mail';

// Inside the contact function, after saving to storage:

// Send email notification
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
        to: 'info@imkan.ai',
        from: 'info@imkan.ai', // Must be verified in SendGrid
        subject: 'New Contact Form Submission',
        text: `
New contact form submission:

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Submitted: ${timestamp}
        `,
        html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
<p><strong>Email:</strong> ${formData.email}</p>
<p><strong>Phone:</strong> ${formData.phone}</p>
<p><strong>Submitted:</strong> ${timestamp}</p>
        `
    };
    
    try {
        await sgMail.send(msg);
        context.log('Email notification sent');
    } catch (emailError) {
        context.error('Failed to send email:', emailError);
        // Don't fail the whole request if email fails
    }
}
```

#### **Add Environment Variable**

In Azure Static Web App Configuration:
- **Name**: `SENDGRID_API_KEY`
- **Value**: Your SendGrid API key

---

### **Option 2: Azure Logic Apps**

**Visual workflow designer** - no code needed!

<details>
<summary><b>Click to expand Logic Apps setup</b></summary>

#### **Setup Logic App**

1. Go to Azure Portal
2. Search **"Logic Apps"**
3. Click **"+ Add"**
4. Configure:
   - **Name**: `imkan-contact-notifications`
   - **Region**: Same as website
   - **Plan type**: Consumption (pay per run)

#### **Create Workflow**

After deployment:
1. Open Logic App
2. Click **"Logic app designer"**
3. Search for **"HTTP request"** trigger
4. Click **"When a HTTP request is received"**
5. In **"Request Body JSON Schema"**, paste:

```json
{
  "type": "object",
  "properties": {
    "firstName": { "type": "string" },
    "lastName": { "type": "string" },
    "email": { "type": "string" },
    "phone": { "type": "string" },
    "submittedAt": { "type": "string" }
  }
}
```

6. Click **"+ New step"**
7. Search **"Send an email (V2)"**
8. Sign in with your Microsoft account
9. Configure email:
   - **To**: info@imkan.ai
   - **Subject**: New Contact: {firstName} {lastName}
   - **Body**: Use dynamic content from trigger

10. Click **"Save"**
11. Copy the **HTTP POST URL** shown at the top

#### **Call Logic App from Function**

Update function code:

```typescript
// After saving to storage, call Logic App
if (process.env.LOGIC_APP_URL) {
    try {
        await fetch(process.env.LOGIC_APP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                submittedAt: timestamp
            })
        });
        context.log('Logic App notified');
    } catch (error) {
        context.error('Failed to notify Logic App:', error);
    }
}
```

Add environment variable:
- **Name**: `LOGIC_APP_URL`
- **Value**: Logic App HTTP POST URL

</details>

---

## 🔍 VIEWING & MANAGING SUBMISSIONS

### **Method 1: Azure Portal (Web)**

**Pros**: No installation, quick view  
**Cons**: Limited features, slow for large datasets

1. Azure Portal → Storage Account → Tables → contactsubmissions
2. Click entries to view details
3. Can search by PartitionKey, RowKey

### **Method 2: Azure Storage Explorer (Desktop)**

**Pros**: Best UI, export to Excel, batch operations  
**Cons**: Requires installation

1. Download from [here](https://azure.microsoft.com/features/storage-explorer/)
2. Connect to your storage account
3. Browse, search, export data
4. Right-click → Export to CSV

### **Method 3: Power BI (Analytics)**

**Pros**: Beautiful dashboards, charts, trends  
**Cons**: Requires Power BI Desktop

1. Open Power BI Desktop
2. Get Data → Azure → Azure Table Storage
3. Enter storage account name and key
4. Select `contactsubmissions` table
5. Create visualizations:
   - Submissions over time
   - By email domain
   - By hour/day

### **Method 4: Build Admin Dashboard**

Create a simple React admin page:

```typescript
// pages/admin.tsx
import { useEffect, useState } from 'react';

function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Create a separate Azure Function to list submissions
    fetch('/api/list-submissions')
      .then(res => res.json())
      .then(data => setSubmissions(data));
  }, []);

  return (
    <div>
      <h1>Contact Submissions</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map(sub => (
            <tr key={sub.rowKey}>
              <td>{new Date(sub.submittedAt).toLocaleString()}</td>
              <td>{sub.firstName} {sub.lastName}</td>
              <td>{sub.email}</td>
              <td>{sub.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 🐛 TROUBLESHOOTING

### **Issue 1: Function not found (404)**

**Symptoms**: `/api/contact` returns 404

**Solutions**:
1. Check GitHub Actions completed successfully
2. Verify `/api` folder is in your repository
3. Check `staticwebapp.config.json` has API routes
4. Wait 5-10 minutes after deployment
5. Clear browser cache

### **Issue 2: CORS errors**

**Symptoms**: "Access to fetch blocked by CORS policy"

**Solution**: Add CORS headers to function response:
```typescript
headers: {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}
```

### **Issue 3: 500 Internal Server Error**

**Symptoms**: Function returns 500

**Solutions**:
1. Check Azure Function logs:
   - Portal → Static Web App → Functions → click function name → Monitor
2. Verify connection string is set in Configuration
3. Check table/database exists
4. Test function locally first

### **Issue 4: Connection string not working**

**Symptoms**: "Storage connection string not configured"

**Solutions**:
1. Verify environment variable name matches: `AZURE_STORAGE_CONNECTION_STRING`
2. Check for typos in connection string
3. Ensure it's saved in Static Web App Configuration (not Function App)
4. Restart Static Web App after adding environment variable

### **Issue 5: Form submits but data not visible**

**Solutions**:
1. Check table name: `contactsubmissions` (lowercase, no spaces)
2. Verify storage account has the table
3. Check Azure Function logs for errors
4. Use Storage Explorer to browse tables directly

### **Issue 6: Local testing fails**

**Solutions**:
1. Ensure `local.settings.json` exists with connection string
2. Run `npm install` in `/api` folder
3. Check Node.js version (must be 18+)
4. Verify Azure Functions Core Tools installed: `func --version`

---

## 💰 COST BREAKDOWN

### **Azure Table Storage (Recommended)**

| Component | Free Tier | Cost After Free |
|-----------|-----------|----------------|
| Storage (first 10GB) | FREE | $0.045/GB/month |
| Transactions (first 20k) | FREE | $0.00036 per 10k transactions |
| Function executions (first 1M) | FREE | $0.20 per 1M |
| Function duration (first 400k GB-s) | FREE | $0.000016/GB-s |

**Expected monthly cost for small website**: **$0 - $2**

### **Cosmos DB (Advanced)**

| Component | Cost |
|-----------|------|
| Serverless | $0.25 per 1M RUs |
| Storage | $0.25/GB/month |

**Expected monthly cost**: **$10 - $50** (depending on usage)

**Recommendation**: Start with Table Storage, upgrade to Cosmos DB only if needed.

---

## 📊 MONITORING & ANALYTICS

### **Track Form Performance**

Add to function code:

```typescript
// Track metrics
context.log.metric('ContactFormSubmission', 1, {
  email: formData.email,
  source: request.headers.get('referer') || 'direct'
});
```

View metrics in Azure Portal → Static Web App → Metrics

### **Set Up Alerts**

1. Portal → Static Web App → Alerts
2. Create alert rule:
   - **Condition**: Function errors > 5 in 5 minutes
   - **Action**: Email notification

---

## ✅ FINAL CHECKLIST

Before going live:

- [ ] Azure Function deployed successfully
- [ ] Storage account created and configured
- [ ] Connection string added to Static Web App Configuration
- [ ] Frontend code updated to call `/api/contact`
- [ ] Tested locally with `func start`
- [ ] Tested live at `your-site.azurestaticapps.net/api/contact`
- [ ] Can see submissions in Azure Storage
- [ ] Email notifications working (if configured)
- [ ] Error handling in place
- [ ] CORS configured correctly
- [ ] Environment variables secured (not in Git)

---

## 🎉 SUCCESS!

Your contact form is now:

✅ **Functional** - Stores all submissions  
✅ **Scalable** - Handles any traffic  
✅ **Secure** - No exposed credentials  
✅ **Monitored** - Logs and alerts  
✅ **Cost-effective** - Free tier sufficient  

**Next Steps**:
1. Monitor submissions in Azure Portal
2. Set up email notifications (optional)
3. Create admin dashboard (optional)
4. Export data to Excel regularly

---

## 📚 ADDITIONAL RESOURCES

- [Azure Functions Documentation](https://docs.microsoft.com/azure/azure-functions/)
- [Azure Table Storage Guide](https://docs.microsoft.com/azure/storage/tables/)
- [Static Web Apps API Integration](https://docs.microsoft.com/azure/static-web-apps/apis)
- [Azure Storage Explorer Download](https://azure.microsoft.com/features/storage-explorer/)

---

**Need help?** Check the [Troubleshooting](#troubleshooting) section or contact Azure support.

---

_Last updated: January 17, 2026_
