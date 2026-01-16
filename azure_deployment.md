# 🚀 Complete Guide: Deploying Your Imkan.ai Website to Azure

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [What is Azure Static Web Apps?](#what-is-azure-static-web-apps)
3. [Deployment Methods](#deployment-methods)
4. [Method 1: Deploy via Azure Portal (Easiest)](#method-1-deploy-via-azure-portal-easiest)
5. [Method 2: Deploy via VS Code Extension](#method-2-deploy-via-vs-code-extension)
6. [Method 3: Deploy via Azure CLI](#method-3-deploy-via-azure-cli)
7. [Post-Deployment Configuration](#post-deployment-configuration)
8. [Custom Domain Setup](#custom-domain-setup)
9. [Troubleshooting](#troubleshooting)
10. [Costs](#costs)

---

## 📌 Prerequisites

Before we begin, make sure you have:

### ✅ Required:
1. **Azure Account** 
   - Go to: https://azure.microsoft.com/free/
   - Click "Start free" and sign up
   - You get $200 free credit for 30 days
   - Credit card required (but won't be charged during free tier)

2. **GitHub Account**
   - Go to: https://github.com
   - Sign up if you don't have one (free)

3. **Git Installed on Your Computer**
   - Windows: Download from https://git-scm.com/download/win
   - Check if installed: Open Command Prompt and type: `git --version`

4. **Your Website Code**
   - You already have this! ✅

### 📦 Optional (but recommended):
- **Visual Studio Code**: https://code.visualstudio.com/
- **Node.js & npm**: https://nodejs.org/ (to test locally)

---

## 🌟 What is Azure Static Web Apps?

**Azure Static Web Apps** is a service that automatically builds and deploys your website from GitHub.

### Why Azure Static Web Apps?
- ✅ **Free Tier Available**: Perfect for your website
- ✅ **Automatic CI/CD**: Push to GitHub → Auto-deploys
- ✅ **Free SSL Certificate**: Automatic HTTPS
- ✅ **Global CDN**: Fast worldwide
- ✅ **Custom Domains**: Free (bring your own domain)
- ✅ **Easy to Use**: Beginner-friendly

### What happens when you deploy?
```
Your Computer (local files)
    ↓
GitHub (code repository)
    ↓
Azure Static Web Apps (builds & hosts)
    ↓
Your Live Website! 🎉
```

---

## 🎯 Deployment Methods

I'll show you **3 methods**. Pick the one you're most comfortable with:

| Method | Difficulty | Time | Best For |
|--------|-----------|------|----------|
| **Method 1: Azure Portal** | ⭐ Easiest | 15 min | First-time users |
| **Method 2: VS Code Extension** | ⭐⭐ Easy | 10 min | VS Code users |
| **Method 3: Azure CLI** | ⭐⭐⭐ Advanced | 20 min | Developers |

**👉 I recommend Method 1 for beginners!**

---

## 🔥 Method 1: Deploy via Azure Portal (Easiest)

This is the most beginner-friendly method. We'll use the Azure website to deploy.

---

### **STEP 1: Push Your Code to GitHub**

First, we need to get your code onto GitHub.

#### 1.1 Create a GitHub Repository

1. Go to https://github.com
2. Click the **"+"** button (top right) → **"New repository"**
3. Fill in:
   - **Repository name**: `imkan-website` (or any name you want)
   - **Description**: "Imkan.ai official website"
   - **Visibility**: Choose **Public** or **Private** (both work)
   - **Don't** check "Add a README file"
4. Click **"Create repository"**

#### 1.2 Push Your Local Code to GitHub

1. **Open Command Prompt** or **Terminal** on your computer

2. **Navigate to your project folder**:
   ```bash
   cd C:\Users\carre\OneDrive\Escritorio\Imkan\Website\Website\imkan_website
   ```

3. **Initialize Git** (if not already done):
   ```bash
   git init
   ```

4. **Add all files**:
   ```bash
   git add .
   ```

5. **Create first commit**:
   ```bash
   git commit -m "Initial commit - Ready for Azure deployment"
   ```

6. **Link to your GitHub repository**:
   
   Replace `YOUR_USERNAME` with your actual GitHub username:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/imkan-website.git
   ```

7. **Push to GitHub**:
   ```bash
   git branch -M main
   git push -u origin main
   ```

   > **Note**: You'll be asked to log in to GitHub. Enter your credentials.

8. **Verify**: Refresh your GitHub repository page. You should see all your files there! 🎉

---

### **STEP 2: Create an Azure Static Web App**

Now let's deploy from GitHub to Azure!

#### 2.1 Sign in to Azure Portal

1. Go to https://portal.azure.com
2. Sign in with your Azure account
3. You'll see the **Azure Dashboard**

#### 2.2 Create a Static Web App

1. Click **"+ Create a resource"** (top left, or search in the search bar)

2. In the search box, type: **"Static Web Apps"**

3. Click **"Static Web Apps"** → Click **"Create"**

#### 2.3 Fill in Basic Details

You'll see a form with multiple tabs. Let's fill them out:

**Tab 1: Basics**

1. **Subscription**: Select your subscription (usually "Pay-As-You-Go" or "Free Trial")

2. **Resource Group**: 
   - Click **"Create new"**
   - Name it: `imkan-website-rg`
   - Click **OK**

3. **Name**: `imkan-website` (this will be part of your URL)

4. **Plan type**: Select **"Free"** (perfect for your needs!)

5. **Region**: Choose closest to you or your users:
   - For Saudi Arabia/Middle East: **"West Europe"** or **"East Asia"**
   - For global: **"Central US"** works well

6. **Deployment source**: Select **"GitHub"**

7. Click **"Sign in with GitHub"** button
   - A popup will appear
   - Click **"Authorize AzureAppService"**
   - Enter your GitHub password if asked

8. After authorization:
   - **Organization**: Select your GitHub username
   - **Repository**: Select `imkan-website` (the repo you just created)
   - **Branch**: Select `main`

9. **Build Presets**: Select **"React"**

10. **App location**: Type `/` (forward slash)

11. **API location**: Leave **empty** (you don't have an API)

12. **Output location**: Type `dist`

#### 2.4 Review and Create

1. Click **"Review + create"** (bottom of the page)

2. Azure will validate your settings (takes ~10 seconds)

3. Review the summary. Make sure:
   - ✅ Plan type: Free
   - ✅ Repository: Your GitHub repo
   - ✅ Branch: main
   - ✅ Output location: dist

4. Click **"Create"**

5. **Wait for deployment** (~2-3 minutes)
   - You'll see "Deployment is in progress..."
   - When done: "Your deployment is complete" ✅

6. Click **"Go to resource"**

---

### **STEP 3: Get Your Website URL**

1. On your Static Web App page, look for **"URL"** near the top
   - It looks like: `https://nice-grass-0a3b1234.azurestaticapps.net`

2. **Click the URL** to open your website!

3. **First deployment takes 2-5 minutes** to build. If you see a placeholder page, wait a bit and refresh.

---

### **STEP 4: Verify Your Website is Live**

Once the build completes, your website should be live! 🎉

**Test these things:**

✅ Homepage loads  
✅ Navigation works  
✅ Images load  
✅ "Get in Touch" button opens modal  
✅ Form works  
✅ All sections visible  

**If something isn't working**, see [Troubleshooting](#troubleshooting) section below.

---

## 🎨 Method 2: Deploy via VS Code Extension

This method is great if you use Visual Studio Code.

### **STEP 1: Install VS Code Extension**

1. Open **Visual Studio Code**

2. Click the **Extensions** icon (left sidebar, or press `Ctrl+Shift+X`)

3. Search for: **"Azure Static Web Apps"**

4. Click **"Install"** on the extension by Microsoft

5. You'll see an **Azure icon** appear in the left sidebar

### **STEP 2: Sign in to Azure**

1. Click the **Azure icon** in the left sidebar

2. Under "Static Web Apps", click **"Sign in to Azure"**

3. A browser window will open → Sign in with your Azure credentials

4. Return to VS Code after signing in

### **STEP 3: Create Static Web App**

1. Make sure your project folder is open in VS Code

2. Click the **Azure icon** (left sidebar)

3. Hover over **"Static Web Apps"** section

4. Click the **"+"** icon (Create Static Web App)

5. Follow the prompts:
   - **Name**: `imkan-website`
   - **Region**: Select closest to your users
   - **Build preset**: Select **"React"**
   - **App location**: `/`
   - **Output location**: `dist`

6. VS Code will:
   - Create a GitHub repository (if needed)
   - Push your code
   - Create the Azure resource
   - Set up CI/CD

7. **Wait for deployment** (~3-5 minutes)

8. When done, right-click on your app → **"Browse Site"**

---

## 💻 Method 3: Deploy via Azure CLI

This method uses command-line tools. **Advanced users only!**

### **STEP 1: Install Azure CLI**

1. **Windows**: 
   ```bash
   winget install -e --id Microsoft.AzureCLI
   ```
   Or download from: https://aka.ms/installazurecliwindows

2. **Verify installation**:
   ```bash
   az --version
   ```

### **STEP 2: Install Azure Static Web Apps CLI**

```bash
npm install -g @azure/static-web-apps-cli
```

### **STEP 3: Login to Azure**

```bash
az login
```

A browser window will open → Sign in to Azure

### **STEP 4: Create Resource Group**

```bash
az group create --name imkan-website-rg --location eastus
```

### **STEP 5: Deploy to Azure**

First, build your app:
```bash
npm run build
```

Then deploy:
```bash
az staticwebapp create \
  --name imkan-website \
  --resource-group imkan-website-rg \
  --source https://github.com/YOUR_USERNAME/imkan-website \
  --location eastus \
  --branch main \
  --app-location "/" \
  --output-location "dist" \
  --login-with-github
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## ⚙️ Post-Deployment Configuration

After deployment, let's optimize your website!

### **1. Check GitHub Actions Workflow**

Azure automatically created a GitHub Actions workflow for you!

1. Go to your GitHub repository
2. Click **"Actions"** tab
3. You should see workflow runs
4. Every time you push code, it auto-deploys! 🚀

**The workflow file location:**
`.github/workflows/azure-static-web-apps-XXXX.yml`

### **2. Environment Variables (If Needed Later)**

If you need to add API keys or secrets:

1. Go to your Static Web App in Azure Portal
2. Click **"Configuration"** (left menu)
3. Click **"+ Add"** to add environment variables
4. Click **"Save"**

**For this website, you don't need any environment variables yet!**

### **3. Enable Custom Domains (Optional)**

See the [Custom Domain Setup](#custom-domain-setup) section below.

---

## 🌐 Custom Domain Setup

Want to use **imkan.ai** instead of `something.azurestaticapps.net`?

### **Prerequisites:**
- You own the domain (e.g., from GoDaddy, Namecheap, etc.)
- DNS access to the domain

### **Steps:**

#### **STEP 1: Add Custom Domain in Azure**

1. Go to your Static Web App in Azure Portal

2. Click **"Custom domains"** (left menu)

3. Click **"+ Add"**

4. **Domain name**: Enter your domain (e.g., `www.imkan.ai` or `imkan.ai`)

5. **Domain validation**: Select **"CNAME"** or **"TXT"** (CNAME is easier)

6. Azure will show you DNS records to add. **Don't close this page!**

#### **STEP 2: Add DNS Records**

1. Go to your domain registrar's website (GoDaddy, Namecheap, etc.)

2. Find **DNS Management** or **DNS Settings**

3. Add the DNS record Azure showed you:

   **For CNAME (most common):**
   - **Type**: CNAME
   - **Name**: `www` (or `@` for apex domain)
   - **Value**: `nice-grass-0a3b1234.azurestaticapps.net` (your Azure URL)
   - **TTL**: 3600 (or default)

   **For TXT (validation):**
   - **Type**: TXT
   - **Name**: `_dnsauth.www` (or as Azure specifies)
   - **Value**: (copy from Azure)

4. **Save** the DNS records

#### **STEP 3: Validate Domain in Azure**

1. Return to the Azure Portal page (still open from Step 1)

2. Click **"Validate"**

3. **Wait 15 minutes to 48 hours** for DNS propagation
   - Usually takes 15-30 minutes
   - Can take up to 48 hours in rare cases

4. Once validated:
   - ✅ Azure will automatically provision an SSL certificate
   - ✅ Your domain will work with HTTPS!

5. **Test your domain**: Open `https://www.imkan.ai` in your browser

---

## 🔧 Troubleshooting

### **Problem: Website shows "This site is under construction"**

**Solution:** The build is still in progress. Wait 2-5 minutes and refresh.

**Check build status:**
1. Go to your GitHub repository
2. Click **"Actions"** tab
3. Check if the workflow is running or failed

---

### **Problem: GitHub Actions build failed**

**Solution:**

1. Go to GitHub → **"Actions"** tab → Click the failed workflow

2. Click **"build_and_deploy_job"** to see logs

3. Common issues:
   - **Build command failed**: Check that `npm run build` works locally
   - **Wrong output location**: Should be `dist` for Vite
   - **Missing dependencies**: Check `package.json`

4. Fix the issue locally, then push:
   ```bash
   git add .
   git commit -m "Fix build issue"
   git push
   ```

5. GitHub Actions will automatically retry

---

### **Problem: Images not loading**

**Solution:**

1. Check that images are in the `public/images/` folder

2. Verify image paths in your components are correct:
   ```jsx
   // ✅ Correct
   <img src="/images/profile_pictures/real_felipe.png" />
   
   // ❌ Wrong
   <img src="images/profile_pictures/real_felipe.png" />
   ```

3. Make sure image files are committed to GitHub:
   ```bash
   git add public/images/
   git commit -m "Add images"
   git push
   ```

---

### **Problem: Form submission not working**

**Note:** The contact form is currently set to log to console only. To actually send emails, you need to:

1. **Option A**: Use a form service (Formspree, EmailJS, etc.)
2. **Option B**: Add an Azure Function backend
3. **Option C**: Use a third-party API

**For now**, the form validates inputs and shows a success message (frontend only).

---

### **Problem: Contact form not opening**

**Solution:**

1. Check browser console for errors (Press `F12` → Console tab)

2. Common issue: React not loading properly
   - Clear browser cache
   - Hard refresh: `Ctrl+Shift+R`

3. Check GitHub Actions completed successfully

---

### **Problem: Custom domain not working**

**Solution:**

1. **Wait longer**: DNS propagation can take up to 48 hours

2. **Check DNS**: Use https://www.whatsmydns.net to verify DNS is propagated

3. **Verify DNS records**:
   ```bash
   nslookup www.imkan.ai
   ```
   Should show your Azure Static Web Apps IP/domain

4. **Check Azure validation status**:
   - Azure Portal → Your Static Web App → Custom domains
   - Status should be "Active"

---

### **Problem: Website is slow**

**Solution:**

Azure Static Web Apps uses a global CDN, so it should be fast. If slow:

1. **Check your internet connection**

2. **Use Azure's CDN regions**: The free tier already includes CDN

3. **Optimize images**: 
   - Use WebP format for images
   - Compress images before uploading

4. **Check browser caching**: Make sure `staticwebapp.config.json` is deployed

---

## 💰 Costs

### **Free Tier (What you'll use):**

Azure Static Web Apps Free Tier includes:
- ✅ **100 GB bandwidth** per month
- ✅ **0.5 GB storage**
- ✅ **Free SSL certificate**
- ✅ **Custom domains** (unlimited)
- ✅ **Global CDN**
- ✅ **Automatic CI/CD**

**Cost: $0/month** 🎉

### **When would you need to upgrade?**

Only if you exceed:
- **Bandwidth**: 100 GB/month (≈ 100,000 visitors/month)
- **Storage**: 0.5 GB

**For your website, the free tier is perfect!**

### **Standard Tier (Optional - if you outgrow free tier):**

- **Cost**: ~$9/month
- **Includes**: More bandwidth, SLA, staging environments

**You don't need this now.**

---

## 🎉 Congratulations!

Your website is now live on Azure! 

### **What you accomplished:**
✅ Deployed a production-ready website  
✅ Set up automatic CI/CD (push to GitHub → auto-deploy)  
✅ Got a free SSL certificate (HTTPS)  
✅ Website is on a global CDN (fast worldwide)  

### **Next Steps:**

1. **Share your URL** with your team!

2. **Set up analytics** (Google Analytics, etc.)

3. **Add a custom domain** (when ready)

4. **Test thoroughly** on different devices

5. **Make updates**: 
   ```bash
   # Make changes locally
   git add .
   git commit -m "Update content"
   git push
   # Website auto-updates in 2-3 minutes! 🚀
   ```

---

## 📚 Additional Resources

- **Azure Static Web Apps Docs**: https://docs.microsoft.com/azure/static-web-apps/
- **GitHub Actions Docs**: https://docs.github.com/actions
- **Azure Free Tier Details**: https://azure.microsoft.com/free/
- **Azure Support**: https://azure.microsoft.com/support/

---

## 🆘 Need Help?

If you run into issues:

1. **Check the Troubleshooting section** above
2. **Check GitHub Actions logs** for build errors
3. **Azure Support**: https://azure.microsoft.com/support/
4. **Community**: Stack Overflow (tag: azure-static-web-apps)

---

## 📝 Quick Reference Commands

```bash
# Navigate to project
cd C:\Users\carre\OneDrive\Escritorio\Imkan\Website\Website\imkan_website

# Check Git status
git status

# Add changes
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub (triggers auto-deploy)
git push

# Build locally (to test)
npm run build

# Preview build locally
npm run preview
```

---

**🎊 Your website is live! Happy deploying!**
