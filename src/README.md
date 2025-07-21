# Manual Deployment Guide for Local Machine

Follow these instructions to set up a new computer and deploy the application manually using the command line. This bypasses any issues with the integrated Studio terminal or GitHub Actions.

### Step 1: Install Prerequisites

1.  **Install Node.js**: If you don't have it, download and install the "LTS" (Long Term Support) version of Node.js from the official website: [nodejs.org](https://nodejs.org/). This also installs `npm` (Node Package Manager).
2.  **Install Firebase CLI**: Open your new computer's terminal (Command Prompt on Windows, or Terminal on Mac) and run this command to install the Firebase tools globally.
    ```bash
    npm install -g firebase-tools
    ```

### Step 2: Download Code and Configure Keys

1.  **Download Your Code**: In Firebase Studio, download the entire project as a ZIP file and extract it to a folder on your new laptop (e.g., `C:\Users\YourName\Desktop\easyspark-project`).
2.  **Create the Keys File**: Inside your project folder, create a new file named exactly `.env.local`.
3.  **Get Your Firebase Keys**:
    *   Go to your [Firebase Project Settings](https://console.firebase.google.com/project/easyspark-demo-a42db/settings/general).
    *   Scroll down to the "Your apps" card and find your web app.
    *   Under "SDK setup and configuration", select **Config**. You'll see a `firebaseConfig` object.
4.  **Get Your Service Account Key**:
    *   Go to your [Google Cloud Console Service Accounts page](https://console.cloud.google.com/iam-admin/serviceaccounts?project=easyspark-demo-a42db).
    *   Click on the service account named `firebase-adminsdk-fbsvc@...`.
    *   Go to the **KEYS** tab, click **ADD KEY** -> **Create new key**. Choose **JSON** and a key file will download.
5.  **Fill `.env.local`**: Copy the following template into your `.env.local` file and fill in the values:
    *   Copy the values from the `firebaseConfig` object for the `NEXT_PUBLIC_` variables.
    *   Open the downloaded JSON key file, copy its **entire contents**, and paste it inside the single quotes for `FIREBASE_SERVICE_ACCOUNT_KEY`.

    ```
    # Firebase Public Keys (from Firebase Console -> Project Settings -> Web App Config)
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
    NEXT_PUBLIC_FIREBASE_APP_ID=...
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...

    # Firebase Admin Secret Key (from the downloaded JSON service account file)
    FIREBASE_SERVICE_ACCOUNT_KEY='...'
    ```

### Step 3: Log In and Deploy

1.  **Open Your Local Terminal**: Open Command Prompt (or your preferred terminal) and navigate into your project directory.
    ```bash
    cd C:\Users\YourName\Desktop\easyspark-project
    ```
2.  **Log in to Firebase**: Run this command. It will open a browser window for you to log in to the Google account associated with your Firebase project.
    ```bash
    firebase login
    ```
3.  **Deploy the App**: Now, run the single deployment command. This will install all dependencies and then deploy your application.
    ```bash
    npm run deploy
    ```

The terminal will show the build and deployment progress. Once it's finished, it will provide you with the live URL for your application. That's it!
