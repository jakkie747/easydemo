# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at `src/app/page.tsx`.

---

## Deployment Guide (Automated via GitHub Actions)

Your project is now set up for automated deployments using GitHub Actions. This is the most reliable way to publish your app, as it bypasses issues with local command-line tools.

### How It Works

1.  **Push to `main` branch**: Every time you push or merge code into your `main` branch on GitHub, the action will automatically build and deploy your application to your live production URL.
2.  **Create a Pull Request**: If you create a pull request, a temporary preview version of the app will be deployed automatically. A comment will be added to the pull request with a link to the preview URL.

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

*   Go to your project's repository on GitHub.
*   Click on the **Settings** tab.
*   In the left sidebar, under "Security", click on **Secrets and variables** -> **Actions**.
*   Click the **New repository secret** button to add the following secrets:

    1.  **`FIREBASE_PROJECT_ID`**
        *   **Name:** `FIREBASE_PROJECT_ID`
        *   **Value:** Paste your Firebase Project ID (`easyspark-demo-a42db`).

    2.  **`FIREBASE_SERVICE_ACCOUNT_EASYSPARK_DEMO_A42DB`**
        *   **Name:** `FIREBASE_SERVICE_ACCOUNT_EASYSPARK_DEMO_A42DB`
        *   **Value:** Paste the entire content of the JSON service account key you copied earlier.

### Your New Workflow

That's it! With the secrets in place, your deployment is fully automated.

1.  Make changes to your code locally.
2.  Push your changes to GitHub using the git commands (`git add .`, `git commit`, `git push`).
3.  Go to the "Actions" tab in your GitHub repository to watch the deployment happen in real-time.
4.  Once the "deploy" action is complete, your site will be live at the production URL provided in the logs.
