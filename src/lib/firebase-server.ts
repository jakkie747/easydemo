
'use server';

import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { deleteFileByUrl as deleteStorageFile, deleteUserByUid } from './firebase-admin';
import type { Event, GalleryImage } from './types';

// This file contains functions that use the Firebase Admin SDK and should only be run on the server.

export async function deleteParent(id: string): Promise<void> {
  try {
    // This function needs to be called from a server-side context
    // to have the permission to delete a user.
    await deleteUserByUid(id);
    await deleteDoc(doc(db, 'parents', id));
  } catch (error) {
    console.error("Error deleting parent:", error);
    throw error;
  }
}

export async function deleteTeacher(id: string): Promise<void> {
    try {
        await deleteDoc(doc(db, 'teachers', id));
    } catch (error) {
        console.error("Error deleting teacher:", error);
        throw error;
    }
}

export async function deleteGalleryImage(image: GalleryImage): Promise<void> {
    try {
        // First, delete the file from Cloud Storage
        await deleteStorageFile(image.storagePath);
        // Then, delete the document from Firestore
        await deleteDoc(doc(db, 'gallery', image.id));
    } catch (error) {
        console.error("Error deleting gallery image:", error);
        throw error;
    }
}


export async function deleteEvent(id: string): Promise<void> {
    try {
        const eventRef = doc(db, 'events', id);
        const eventSnap = await getDoc(eventRef);
        if (eventSnap.exists()) {
            const eventData = eventSnap.data() as Event;
            if (eventData.imageStoragePath) {
                await deleteStorageFile(eventData.imageStoragePath);
            }
        }
        await deleteDoc(eventRef);
    } catch (error) {
        console.error("Error deleting event:", error);
        throw error;
    }
}
