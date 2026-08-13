# TECHAVAM 2026 — Google Apps Script Backend Deployment Guide

This directory contains the Google Apps Script integration for the **TECHAVAM 2026** Organiser Registration Management System.

---

## 🔒 Security Architecture
- The public React website **never** contains private Google Sheet IDs, service account tokens, or student personal records.
- All 4 Google Form response sheets are accessed server-side via this Google Apps Script Web App.
- The web app authenticates organizers before releasing any registration data.

---

## 📋 2-Minute Deployment Steps

### 1. Open Google Apps Script
1. Go to [script.google.com](https://script.google.com/) and click **+ New Project**.
2. Name the project: `TECHAVAM-2026-Backend`.

### 2. Copy the Script Files
Create the following files in your Apps Script project by clicking **+ (Add a file)** $\rightarrow$ **Script**:

1. **`Config.gs`**: Copy the content of [`Config.gs`](Config.gs)
2. **`AuthService.gs`**: Copy the content of [`AuthService.gs`](AuthService.gs)
3. **`DataService.gs`**: Copy the content of [`DataService.gs`](DataService.gs)
4. **`Code.gs`**: Copy the content of [`Code.gs`](Code.gs)

---

### 3. (Optional) Customise Admin Password
By default, the organizer login is:
- **Username**: `admin@techavam.in`
- **Default Password**: `techavam2026`

To set a custom password securely:
1. In Google Apps Script, click **Project Settings** (gear icon on the left).
2. Scroll to **Script Properties** $\rightarrow$ Click **Add script property**.
3. Add:
   - **Property**: `ADMIN_PASSWORD`
   - **Value**: `YourSecretPassword123`
4. Click **Save script properties**.

---

### 4. Deploy as a Web App
1. At the top right, click **Deploy** $\rightarrow$ **New deployment**.
2. Click the gear icon next to "Select type" $\rightarrow$ choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `TECHAVAM 2026 Production API`
   - **Execute as**: `Me (your Google account)`
   - **Who has access**: `Anyone` *(Note: The endpoint itself enforces token authentication for data access)*
4. Click **Deploy**.
5. Grant permissions when prompted by Google (click *Advanced* $\rightarrow$ *Go to TECHAVAM-2026-Backend (unsafe)* $\rightarrow$ *Allow*).
6. Copy the generated **Web app URL** (it looks like `https://script.google.com/macros/s/.../exec`).

---

### 5. Connect to your React Website
In your React project:
1. Create/edit `techavam-react/.env`:
   ```env
   VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
2. Or you can enter this Web App URL directly in the **Admin Settings modal** inside the Organiser Portal (`/#/admin`).
