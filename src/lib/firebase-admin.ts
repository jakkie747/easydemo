
'use server';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccountKey) {
    try {
      const serviceAccount = JSON.parse(serviceAccountKey);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    } catch (error) {
      console.error("Error parsing FIREBASE_SERVICE_ACCOUNT_KEY:", error);
    }
  } else {
    console.warn("FIREBASE_SERVICE_ACCOUNT_KEY is not set. Firebase Admin SDK not initialized.");
  }
}

const storage = admin.apps.length ? admin.storage() : null;

export async function deleteFileByUrl(filePath: string) {
  if (!storage) {
    console.error("Firebase Admin SDK not initialized. Cannot delete file.");
    throw new Error("Storage service is not available.");
  }

  try {
    // The SDK automatically handles the gs://bucket-name/ part.
    // We just need to provide the path to the file.
    await storage.bucket().file(filePath).delete();
    console.log(`Successfully deleted ${filePath} from Storage.`);
    return { success: true };
  } catch (error: any) {
    // Check if the error is because the file doesn't exist
    if (error.code === 404) {
      console.warn(`File not found at ${filePath}, but proceeding as if deleted.`);
      return { success: true, message: "File not found, but considered deleted." };
    }
    console.error(`Error deleting file from Storage at path: ${filePath}`, error);
    throw new Error('Could not delete file from storage.');
  }
}
