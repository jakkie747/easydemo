
'use server';

import { collection, getDocs, addDoc, setDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { teachers as mockTeachers, children as mockChildren, parents as mockParents } from './mock-data';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebase';

async function seedCollection(collectionName: string, data: any[], idKey?: string) {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    
    if (!snapshot.empty) {
        console.log(`Collection ${collectionName} already contains data. Seeding aborted.`);
        return { name: collectionName, status: 'skipped', count: 0 };
    }

    let count = 0;
    for (const item of data) {
        if (idKey && item[idKey]) {
            const docRef = doc(db, collectionName, item[idKey]);
            await setDoc(docRef, item);
        } else {
            const { id, ...itemData } = item;
            await addDoc(collectionRef, itemData);
        }
        count++;
    }
    console.log(`Seeded ${count} documents into ${collectionName}`);
    return { name: collectionName, status: 'seeded', count };
}

async function seedParentsAndAuth() {
    const collectionName = 'parents';
    const auth = getAuth(app);
    let count = 0;

    for (const parentData of mockParents) {
        try {
            let userId: string;
            
            // Check if user already exists in Auth
            try {
                // Try to sign in to see if user exists. This is a workaround since there's no direct "checkUserExists" on client SDK.
                const userCredential = await signInWithEmailAndPassword(auth, parentData.email, 'password123');
                userId = userCredential.user.uid;
                console.log(`User with email ${parentData.email} already exists. Using existing UID.`);
            } catch (error: any) {
                // If sign-in fails because of wrong password or user not found, try to create the user.
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                    const newUserCredential = await createUserWithEmailAndPassword(auth, parentData.email, 'password123'); // Using a default password
                    userId = newUserCredential.user.uid;
                } else {
                    // Re-throw other errors
                    throw error;
                }
            }
            
            // Check if Firestore document exists
            const docRef = doc(db, collectionName, userId);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                const parentDoc = {
                    id: userId,
                    ...parentData
                };
                await setDoc(docRef, parentDoc);
                count++;
            } else {
                 console.log(`Parent document for ${parentData.email} already exists. Skipping Firestore write.`);
            }

        } catch (error: any) {
            console.error(`Error seeding parent ${parentData.email}:`, error);
        }
    }

    console.log(`Seeded ${count} new documents into ${collectionName} and created/verified auth users.`);
    return { name: collectionName, status: 'seeded', count };
}


export async function seedDatabase() {
  try {
    const results = await Promise.all([
        seedCollection('teachers', mockTeachers, 'id'),
        seedCollection('children', mockChildren, 'id'),
        seedParentsAndAuth(),
    ]);
    
    const seededCount = results.reduce((sum, result) => sum + result.count, 0);

    if (seededCount > 0) {
        return { success: true, count: seededCount, message: `Successfully seeded ${seededCount} new documents.` };
    } else {
        return { success: false, message: 'Database already contains data. Seeding aborted for all collections.' };
    }

  } catch (error) {
    console.error('Error seeding database:', error);
    if (error instanceof Error) {
        return { success: false, message: error.message };
    }
    return { success: false, message: 'An unknown error occurred during seeding.' };
  }
}
