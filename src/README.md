# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at `src/app/page.tsx`.

---

## Deployment Guide

If you are facing issues with the integrated deployment button, you can deploy the application manually using the Firebase CLI. This gives you more control and provides more detailed feedback.

### Prerequisites

1.  **Node.js:** Ensure you have Node.js (version 18 or later) installed on your local machine. You can download it from [nodejs.org](https://nodejs.org/).
2.  **Firebase Project:** Your Firebase project (`easyspark-demo`) should already be created.
3.  **Billing Enabled:** Your Firebase project must be on the "Blaze (pay-as-you-go)" plan.

### Step-by-Step Instructions

1.  **Download Your Code:**
    Download the complete source code of this application to your local machine (e.g., from GitHub, download as a ZIP).

2.  **Open Your Terminal:**
    Open your terminal (Command Prompt or PowerShell on Windows, Terminal on Mac) and navigate into the project's root directory using the `cd` command.

3.  **Install Firebase CLI:**
    If you don't have it installed already, open your terminal and run the following command to install it globally. This is the recommended approach.
    ```bash
    npm install -g firebase-tools
    ```

4.  **Log in to Firebase:**
    In your terminal, log in to your Google account:
    ```bash
    firebase login
    ```
    This will open a browser window for you to authenticate.

5.  **Configure Your Local Project:**
    Navigate into your project's root directory in the terminal. You need to link your local code to your Firebase project.
    ```bash
    firebase use easyspark-demo
    ```

6.  **Install Project Dependencies:**
    Run this command to install all the necessary packages for the application:
    ```bash
    npm install
    ```

7.  **Set Up Environment Variables:**
    Your application requires a service account key for server-side Firebase Admin operations.
    - Go to your Firebase project settings -> Service accounts.
    - Click "Generate new private key" and download the JSON file.
    - **Do not** add this file to your source code. Instead, create a file named `.env.local` in the root of your project.
    - Copy the contents of the downloaded JSON file and add it to `.env.local` like this:
      ```
      FIREBASE_SERVICE_ACCOUNT_KEY='{"type": "service_account", "project_id": "...", ...}'
      ```
    - **Important:** Make sure the entire JSON object is on a single line and wrapped in single quotes.

8.  **Deploy the App:**
    Now you are ready to deploy. Run the following command from your project's root directory:
    ```bash
    firebase apphosting:backends:deploy easyspark-backend
    ```
    The `backendId` (`easyspark-backend`) is taken from your `apphosting.yaml` file. The CLI will build your Next.js application and deploy it to App Hosting.

    **Troubleshooting: Command Not Found**
    If you get an error like `apphosting:backends:deploy is not a Firebase command`, it means your globally installed `firebase-tools` is out of date. Run `npm install -g firebase-tools` to update it, then try the deploy command again.

    After the command finishes, it will provide you with the URL where your live application is hosted.

### Updating Your Live App

Once deployed, you can continue to make changes to your code. When you are ready to publish the updates, simply run the deploy command again:
```bash
firebase apphosting:backends:deploy easyspark-backend
```
This will build and deploy the new version of your app, replacing the old one.
