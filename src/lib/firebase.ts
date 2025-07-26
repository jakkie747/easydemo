
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
  apiKey: "AIzaSyCG1sCyHwG9anUFqpX8rgrvdK4aoMIIn9g",
  authDomain: "easyspark-demo-a42db.firebaseapp.com",
  projectId: "easyspark-demo-a42db",
  storageBucket: "easyspark-demo-a42db.appspot.com",
  messagingSenderId: "843822001665",
  appId: "1:843822001665:web:dcde2b002d6a1e97f21a00",
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
