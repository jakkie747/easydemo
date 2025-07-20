# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at `src/app/page.tsx`.

---

## Deployment Guide

If you are facing issues with the integrated deployment button, you can deploy the application manually using the Firebase CLI. This gives you more control and provides more detailed feedback.

### Prerequisites

1.  **Node.js:** Ensure you have Node.js (version 18 or later) installed on your local machine.
2.  **Firebase Project:** Your Firebase project (`easyspark-demo`) should already be created.
3.  **Billing Enabled:** Your Firebase project must be on the "Blaze (pay-as-you-go)" plan.

### Step-by-Step Instructions

1.  **Download Your Code:**
    Download the complete source code of this application to your local machine.

2.  **Install Firebase CLI:**
    If you don't have it installed already, open your terminal and run the following command to install it globally:
    ```bash
    npm install -g firebase-tools
    ```

3.  **Log in to Firebase:**
    In your terminal, log in to your Google account:
    ```bash
    firebase login
    ```
    This will open a browser window for you to authenticate.

4.  **Configure Your Local Project:**
    Navigate into your project's root directory in the terminal. You need to link your local code to your Firebase project. Since the configuration file (`apphosting.yaml`) already exists, you can set the project with this command:
    ```bash
    firebase use easyspark-demo
    ```

5.  **Install Project Dependencies:**
    Run this command to install all the necessary packages for the application:
    ```bash
    npm install
    ```

6.  **Set Up Environment Variables:**
    Your application requires a service account key for server-side Firebase Admin operations.
    - Go to your Firebase project settings -> Service accounts.
    - Click "Generate new private key" and download the JSON file.
    - **Do not** add this file to your source code. Instead, create a file named `.env.local` in the root of your project.
    - Copy the contents of the downloaded JSON file and add it to `.env.local` like this:
      ```
      FIREBASE_SERVICE_ACCOUNT_KEY='{"type": "service_account", "project_id": "...", ...}'
      ```
    - **Important:** Make sure this variable is also set up in your hosting environment's secret manager for the deployed application.

7.  **Deploy the App:**
    Now you are ready to deploy. Run the following command from your project's root directory:
    ```bash
    firebase apphosting:backends:deploy easyspark-backend
    ```
    The `backendId` (`easyspark-backend`) is taken from your `apphosting.yaml` file. The CLI will build your Next.js application and deploy it to App Hosting.

After the command finishes, it will provide you with the URL where your live application is hosted.
