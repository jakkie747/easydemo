
'use server';

import { collection, getDocs, addDoc, setDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { teachers as mockTeachers, children as mockChildren, parents as mockParents } from './mock-data';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
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
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);

    if (!snapshot.empty) {
        console.log(`Collection ${collectionName} already contains data. Seeding aborted.`);
        return { name: collectionName, status: 'skipped', count: 0 };
    }
    
    const auth = getAuth(app);
    let count = 0;

    for (const parentData of mockParents) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, parentData.email, 'password123'); // Using a default password
            const user = userCredential.user;

            const parentDoc = {
                id: user.uid,
                ...parentData
            };

            const docRef = doc(db, collectionName, user.uid);
            await setDoc(docRef, parentDoc);
            count++;
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                console.log(`Email ${parentData.email} already exists. Skipping.`);
            } else {
                console.error(`Error seeding parent ${parentData.email}:`, error);
            }
        }
    }

    console.log(`Seeded ${count} documents into ${collectionName} and created auth users.`);
    return { name: collectionName, status: 'seeded', count };
}


export async function seedDatabase() {
  try {
    const results = await Promise.all([
        seedCollection('teachers', mockTeachers, 'id'),
        seedCollection('children', mockChildren, 'id'),
        seedParentsAndAuth(),
    ]);
    
    const seededCount = results.reduce((sum, result) => result.status === 'seeded' ? sum + result.count : sum, 0);

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
