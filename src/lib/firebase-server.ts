'use server';

import { doc, getDoc, deleteDoc, writeBatch, collection } from 'firebase/firestore';
import { db } from './firebase'; // This will be the server-side instance now
import { deleteFileByUrl as deleteStorageFile, deleteUserByUid } from './firebase-admin';
import type { Event, GalleryImage, Parent, Teacher } from './types';

// This file contains functions that use the Firebase Admin SDK and should only be run on the server.

export async function deleteParent(parentId: string): Promise<{success: boolean}> {
  try {
    const parentRef = doc(db, 'parents', parentId);
    const parentSnap = await getDoc(parentRef);
    if (!parentSnap.exists()) {
        console.warn(`Parent with id ${parentId} not found in Firestore.`);
        // Try to delete from Auth anyway
        await deleteUserByUid(parentId);
        return { success: true };
    }
    
    const parent = parentSnap.data() as Parent;

    // Delete associated children
    if (parent.childDetails) {
        const batch = writeBatch(db);
        parent.childDetails.forEach(child => {
            const childRef = doc(db, 'children', child.id);
            batch.delete(childRef);
        });
        await batch.commit();
    }
    
    // Delete parent from Firestore
    await deleteDoc(parentRef);
    
    // Delete parent from Auth
    await deleteUserByUid(parentId);

    return { success: true };

  } catch (error) {
    console.error("Error deleting parent and associated data:", error);
    throw error;
  }
}

export async function deleteTeacher(teacherId: string): Promise<void> {
    try {
        await deleteDoc(doc(db, 'teachers', teacherId));
    } catch (error) {
        console.error("Error deleting teacher:", error);
        throw error;
    }
}

export async function deleteGalleryImage(image: GalleryImage): Promise<void> {
    try {
        if (image.storagePath) {
            await deleteStorageFile(image.storagePath);
        }
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
