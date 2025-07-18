
'use server';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

const storage = admin.storage();

export async function deleteFileByUrl(filePath: string) {
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
