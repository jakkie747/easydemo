# Firebase Studio Project: Easyspark Demo

This is a Next.js project created in Firebase Studio. It is now correctly configured for deployment.

---

## Automated Deployment via GitHub Actions

This project is set up for continuous deployment to Firebase Hosting using GitHub Actions.

### How It Works

1.  **Push to `main` branch**: Every time you push or merge code into your `main` branch on GitHub, the action will automatically build and deploy your application to your live production URL.

### One-Time Setup: Connecting GitHub to Firebase

To allow GitHub to deploy on your behalf, you need to securely provide it with the necessary permissions. You only have to do this once.

**Step 1: Get Your Firebase Project ID**

*   Go to your [Firebase Project Settings](https://console.firebase.google.com/project/easyspark-demo-a42db/settings/general).
*   Your **Project ID** is listed there (it's `easyspark-demo-a42db`).

**Step 2: Get Your Service Account Key**

This is a secure key that lets GitHub Actions access your Firebase project.
*   In your Firebase Project Settings, go to the **Service Accounts** tab.
*   Click **"Generate new private key"**. A JSON file will be downloaded.
*   Open the JSON file in a text editor and copy its entire contents.

**Step 3: Set Up Secrets in Your GitHub Repository**

Secrets are encrypted environment variables that you can store in your GitHub repository.

*   Go to your project's repository on GitHub (`jakkie747/easydemo`).
*   Click on the **Settings** tab.
*   In the left sidebar, under "Security", click on **Secrets and variables** -> **Actions**.
*   Click the **New repository secret** button to add the following secrets:

    1.  **`FIREBASE_SERVICE_ACCOUNT_EASYSPARK_DEMO_A42DB`**
        *   **Name:** `FIREBASE_SERVICE_ACCOUNT_EASYSPARK_DEMO_A42DB`
        *   **Value:** Paste the entire content of the JSON service account key you copied earlier.

    2.  **All `NEXT_PUBLIC_` variables:** Add the rest of your Firebase app credentials from your Firebase project settings (or your `.env.local` file) as individual secrets. Make sure the names match exactly (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, etc.)
    
    3.  **`GEMINI_API_KEY`**: If you are using AI features, add your Gemini API key as a secret with this name

### Your New Workflow

Once the secrets are in place, your deployment is fully automated!

1.  Make changes to your code in the editor.
2.  Commit and Push your changes to GitHub.
3.  Go to the "Actions" tab in your GitHub repository to watch the deployment happen.
4.  Once the action is complete, your site will be live!
