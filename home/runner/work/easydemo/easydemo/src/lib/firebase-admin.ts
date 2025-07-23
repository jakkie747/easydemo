
'use server';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKey) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.');
    }

    let serviceAccount;
    if (serviceAccountKey.trim().startsWith('{')) {
      serviceAccount = JSON.parse(serviceAccountKey);
    } else {
      const decodedKey = Buffer.from(serviceAccountKey, 'base64').toString('utf-8');
      serviceAccount = JSON.parse(decodedKey);
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
  }
}

const storage = admin.apps.length ? admin.storage() : null;
const auth = admin.apps.length ? admin.auth() : null;

export async function deleteFileByUrl(filePath: string) {
  if (!storage) {
    console.error('Firebase Admin SDK not initialized. Cannot delete file.');
    throw new Error('Storage service is not available.');
  }
  
  if (!filePath) {
    console.warn('deleteFileByUrl called with an empty or undefined filePath.');
    return { success: true, message: 'No file path provided.' };
  }

  try {
    await storage.bucket().file(filePath).delete();
    console.log(`Successfully deleted ${filePath} from Storage.`);
    return { success: true };
  } catch (error: any) {
    if (error.code === 404) {
      console.warn(`File not found at ${filePath}, but proceeding as if deleted.`);
      return { success: true, message: 'File not found, but considered deleted.' };
    }
    console.error(`Error deleting file from Storage at path: ${filePath}`, error);
    throw new Error('Could not delete file from storage.');
  }
}

export async function deleteUserByUid(uid: string) {
  if (!auth) {
    console.error('Firebase Admin SDK not initialized. Cannot delete user.');
    throw new Error('Authentication service is not available.');
  }

  try {
    await auth.deleteUser(uid);
    console.log(`Successfully deleted user with UID: ${uid}`);
    return { success: true };
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      console.warn(`User with UID ${uid} not found in Firebase Auth, but proceeding as if deleted.`);
      return { success: true, message: 'User not found, but considered deleted.' };
    }
    console.error(`Error deleting user with UID: ${uid}`, error);
    throw new Error('Could not delete user.');
  }
}
