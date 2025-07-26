
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getFunctions, type Functions } from "firebase/functions";

// =================================================================================
// IMPORTANT: ACTION REQUIRED
// =================================================================================
// To make this a standalone app, you must create a NEW Firebase project and
// paste its unique configuration here.
//
// How to get your new Firebase config:
// 1. Go to the Firebase Console: https://console.firebase.google.com/
// 2. Click "Add project" and follow the steps to create a new project.
// 3. In your new project's dashboard, click the web icon (</>) to add a web app.
// 4. Firebase will display your `firebaseConfig` object. Copy the values from that
//    object and paste them into the `firebaseConfig` object below.
// =================================================================================
export const firebaseConfig = {
  apiKey: "PASTE_YOUR_NEW_API_KEY_HERE",
  authDomain: "PASTE_YOUR_NEW_AUTH_DOMAIN_HERE",
  projectId: "PASTE_YOUR_NEW_PROJECT_ID_HERE",
  storageBucket: "PASTE_YOUR_NEW_STORAGE_BUCKET_HERE",
  messagingSenderId: "PASTE_YOUR_NEW_MESSAGING_SENDER_ID_HERE",
  appId: "PASTE_YOUR_NEW_APP_ID_HERE",
};


// Function to check if Firebase config is filled
export const isFirebaseConfigured = (): boolean => {
  return !!firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("PASTE_YOUR");
};

// Initialize Firebase
// These lines will be gracefully handled by the app if the config is not provided.
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);
const auth: Auth = getAuth(app);
const functions: Functions | null = isFirebaseConfigured() ? getFunctions(app) : null;


export { app, db, storage, auth, functions };
