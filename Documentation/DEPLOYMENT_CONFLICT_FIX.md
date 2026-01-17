# 🚨 CRITICAL: CI/CD DEPLOYMENT FIX GUIDE

**Issue**: Duplicate workflows causing deployment conflicts  
**Impact**: Website not deploying correctly  
**Priority**: CRITICAL - Must fix before launch  
**Status**: ⚠️ Action Required

---

## 🔍 **PROBLEM DIAGNOSIS**

### **Symptoms**
- Two workflows running on every push
- Error 1: "No matching static site found"
- Error 2: "deployment_token was not provided"
- Both workflows fail but with different errors

### **Root Cause**
When you created the Azure Static Web App, Azure **automatically created a workflow file** in your GitHub repository. Then we created another workflow file locally, causing **duplicate workflows** to run simultaneously and conflict with each other.

---

## 💡 **SOLUTION: DELETE DUPLICATE WORKFLOW**

### **STEP 1: Check GitHub for Duplicate Workflows**

1. Go to your GitHub repository: https://github.com/felipe0216/imkan_website
2. Navigate to **Actions** tab (top menu)
3. Click on any recent workflow run
4. Look at the workflow file path (usually shown at the top)
5. **Check if there are TWO different workflow files**, likely:
   - `.github/workflows/azure-static-web-apps.yml` (our file)
   - `.github/workflows/azure-static-web-apps-nice-bush-XXXXX.yml` (Azure's auto-generated)

---

### **STEP 2: Identify the Duplicate Workflow File**

**Azure's auto-generated workflow typically has a name like**:
- `azure-static-web-apps-nice-bush-0890c9503.yml`
- `azure-static-web-apps-[random-words]-[hash].yml`

**Our workflow file is**:
- `azure-static-web-apps.yml`

You need to **DELETE the Azure auto-generated one** and keep ours.

---

### **STEP 3: Delete the Duplicate Workflow (Two Options)**

#### **OPTION A: Via GitHub Web Interface (RECOMMENDED)**

1. Go to: https://github.com/felipe0216/imkan_website
2. Click on the **Code** tab
3. Navigate to `.github/workflows/`
4. Look for **TWO** `.yml` files
5. Click on the Azure auto-generated one (e.g., `azure-static-web-apps-nice-bush-XXXXX.yml`)
6. Click the **trash icon** (🗑️) in the top right
7. Scroll down and click **Commit changes**
8. **Important**: Add commit message: "Remove duplicate Azure workflow"
9. Click **Commit changes**

#### **OPTION B: Via Git Command Line**

```bash
# 1. Pull latest changes from GitHub
git pull origin main

# 2. Check which workflow files exist
ls .github/workflows/

# 3. Delete the duplicate (replace XXXXX with actual filename)
git rm .github/workflows/azure-static-web-apps-nice-bush-XXXXX.yml

# 4. Commit and push
git commit -m "Remove duplicate Azure workflow file"
git push origin main
```

---

### **STEP 4: Verify the Fix**

After deleting the duplicate workflow:

1. **Push a small change** to trigger the workflow:
   ```bash
   # Make a trivial change (e.g., add a comment to README)
   echo "" >> README.md
   git add README.md
   git commit -m "Test deployment after workflow fix"
   git push origin main
   ```

2. **Check GitHub Actions**:
   - Go to the **Actions** tab
   - You should now see **ONLY ONE** workflow running
   - Wait for it to complete (3-5 minutes)
   - It should show ✅ **All checks passed**

3. **Verify deployment**:
   - Visit your website: https://imkan.ai
   - Check that changes are live
   - If you see your latest changes, deployment is working! ✅

---

## 📋 **UPDATED WORKFLOW FILE**

I've already updated your local workflow file to be more robust. Here's what changed:

### **Changes Made**:

1. ✅ **Removed PR-related triggers** - Simplified to only push to main
2. ✅ **Removed close_pull_request_job** - Not needed for your use case
3. ✅ **Added explicit build flags** - More control over build process
4. ✅ **Cleaner configuration** - Easier to maintain

### **New Workflow**:

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy_job:
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
          lfs: false

      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          api_location: "api"
          output_location: "dist"
          skip_app_build: false
          skip_api_build: false
```

**Why these changes?**:
- ✅ **Simpler**: Only deploys on push to main (most common use case)
- ✅ **Reliable**: No complex conditional logic to fail
- ✅ **Clear**: Easy to understand and debug
- ✅ **Fast**: Single job, no unnecessary steps

---

## 🚨 **CRITICAL: WHAT TO DO RIGHT NOW**

### **Immediate Actions** (Do these in order):

1. ✅ **Commit the updated workflow file**:
   ```bash
   git add .github/workflows/azure-static-web-apps.yml
   git commit -m "Update workflow file to fix deployment conflicts"
   git push origin main
   ```

2. ⚠️ **Go to GitHub and delete the duplicate workflow** (see Step 3 above)

3. ✅ **Test the deployment** (see Step 4 above)

4. ✅ **Monitor for success**:
   - GitHub Actions should show ✅ green
   - Website should update within 3-5 minutes
   - No errors in Actions log

---

## 🔍 **HOW TO IDENTIFY THE DUPLICATE**

When you go to `.github/workflows/` in GitHub, you'll see files like:

```
✅ KEEP THIS ONE:
   azure-static-web-apps.yml  (our clean workflow)

❌ DELETE THIS ONE:
   azure-static-web-apps-nice-bush-0890c9503.yml  (Azure auto-generated)
   or
   azure-static-web-apps-[any-random-name].yml
```

**How to tell which is which?**:
- **Azure's file**: Has a random name with words like "nice-bush", "proud-sea", etc.
- **Our file**: Simple name: `azure-static-web-apps.yml`

---

## 🛠️ **TROUBLESHOOTING**

### **If you can't find a duplicate workflow file in GitHub**:

The issue might be in Azure. Check Azure Portal:

1. Go to **Azure Portal** → **Static Web Apps**
2. Click on your app (nice-bush-0890c9503 or similar)
3. Go to **Configuration** → **Continuous Deployment**
4. Check if there are **two deployment configurations**
5. If yes, delete the old/duplicate one

### **If deployment still fails after deleting duplicate**:

1. **Check the secret exists**:
   - GitHub repo → **Settings** → **Secrets and variables** → **Actions**
   - Verify `AZURE_STATIC_WEB_APPS_API_TOKEN` exists

2. **Regenerate the token**:
   - Azure Portal → Your Static Web App
   - **Manage deployment token**
   - Copy the new token
   - Update GitHub secret with new token

3. **Try a fresh deployment**:
   ```bash
   git commit --allow-empty -m "Trigger deployment"
   git push origin main
   ```

---

## 📊 **EXPECTED RESULTS**

### **Before Fix**:
```
❌ Workflow Run #1: Failed (No matching static site found)
❌ Workflow Run #2: Failed (deployment_token was not provided)
⚠️ Website not updating
```

### **After Fix**:
```
✅ Workflow Run: Success
✅ Build completed: ~2 minutes
✅ Deploy completed: ~3 minutes total
✅ Website updated with latest changes
```

---

## 🎯 **SUCCESS CRITERIA**

You'll know the fix worked when:

1. ✅ **Only ONE workflow runs** on each push
2. ✅ **All steps pass** (green checkmarks)
3. ✅ **No error messages** in GitHub Actions log
4. ✅ **Website updates** within 3-5 minutes of push
5. ✅ **Deployment shows** in Azure Static Web App logs

---

## 📝 **CHECKLIST**

- [ ] Updated local workflow file (`azure-static-web-apps.yml`)
- [ ] Committed and pushed updated workflow
- [ ] Checked GitHub for duplicate workflow files
- [ ] Deleted Azure's auto-generated workflow file
- [ ] Tested deployment with a new push
- [ ] Verified only one workflow runs
- [ ] Confirmed all steps pass (green)
- [ ] Checked website updates correctly
- [ ] Deployment is stable and working

---

## 🚀 **AFTER THE FIX**

Once you've completed all steps:

1. **Test a real code change**:
   - Make a small change to any component
   - Commit and push
   - Verify it deploys successfully
   - Check the change appears on imkan.ai

2. **Monitor for a day**:
   - Make 2-3 more pushes throughout the day
   - Ensure each deploys correctly
   - No more duplicate workflows

3. **You're ready for launch!** 🎉

---

## 🆘 **IF YOU GET STUCK**

### **Quick Diagnostic Commands**:

```bash
# Check local workflow files
ls -la .github/workflows/

# Check current branch
git branch

# Check remote status
git status

# Pull any changes from GitHub
git pull origin main

# Force push if needed (CAREFUL!)
git push --force origin main
```

### **What to Share if Still Failing**:

1. Screenshot of GitHub Actions error
2. List of workflow files in `.github/workflows/`
3. Output of: `git log --oneline -5`
4. Azure Static Web App name from Azure Portal

---

## ✅ **FINAL SUMMARY**

**The Fix**:
1. Delete duplicate Azure auto-generated workflow from GitHub
2. Use our cleaned-up workflow file (already updated locally)
3. Test deployment
4. Success! ✨

**Why This Happened**:
- Azure automatically creates workflows when you set up Static Web Apps
- We created a better workflow manually
- Both tried to deploy simultaneously → conflict

**Prevention**:
- Always check for existing workflows before creating new ones
- Use our workflow file for all future deployments
- Disable automatic workflow creation in Azure (if possible)

---

**Status**: ⏳ **Waiting for you to delete duplicate workflow in GitHub**

Once complete, your deployment will work perfectly! 🚀

---

_Created: January 18, 2026  
Priority: CRITICAL  
Expected Fix Time: 5-10 minutes  
Difficulty: Easy (just delete a file)_
