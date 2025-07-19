
'use server';

import { collection, getDocs, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { teachers as mockTeachers, children as mockChildren, parents as mockParents } from './mock-data';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebase';

async function seedCollection(collectionName: string, data: any[], idKey?: string) {
    const collectionRef = collection(db, collectionName);
    let count = 0;
    for (const item of data) {
        const docId = idKey ? item[idKey] : item.id;
        const docRef = doc(collectionRef, docId);
        
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            await setDoc(docRef, item);
            count++;
        }
    }
    if (count > 0) {
        console.log(`Seeded ${count} new documents into ${collectionName}`);
    }
    return { name: collectionName, status: count > 0 ? 'seeded' : 'skipped', count };
}

async function seedParentsAndAuth() {
    const collectionName = 'parents';
    const auth = getAuth(app);
    let count = 0;

    for (const parentData of mockParents) {
        try {
            // Check if user already exists
            const q = query(collection(db, collectionName), where("email", "==", parentData.email));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                const userCredential = await createUserWithEmailAndPassword(auth, parentData.email, 'password123'); // Using a default password
                const userId = userCredential.user.uid;
                
                const docRef = doc(db, collectionName, userId);
                const parentDoc = {
                    id: userId,
                    ...parentData
                };
                await setDoc(docRef, parentDoc);
                count++;
            }
        } catch (error: any) {
             if (error.code !== 'auth/email-already-in-use') {
                console.error(`Error seeding parent ${parentData.email}:`, error);
            }
        }
    }

    if (count > 0) {
      console.log(`Seeded ${count} new documents into ${collectionName} and created auth users.`);
    }
    return { name: collectionName, status: count > 0 ? 'seeded' : 'skipped', count };
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
        return { success: true, count: 0, message: 'Database already contains data or no new data was seeded.' };
    }

  } catch (error) {
    console.error('Error seeding database:', error);
    if (error instanceof Error) {
        return { success: false, message: error.message };
    }
    return { success: false, message: 'An unknown error occurred during seeding.' };
  }
}
