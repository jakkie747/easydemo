
'use server';

import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { teachers as mockTeachers, children as mockChildren, parents as mockParents } from './mock-data';

async function seedCollection(collectionName: string, data: any[]) {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    if (!snapshot.empty) {
        console.log(`Collection ${collectionName} already contains data. Seeding aborted.`);
        return { name: collectionName, status: 'skipped', count: 0 };
    }

    let count = 0;
    for (const item of data) {
        const { id, ...itemData } = item;
        await addDoc(collectionRef, itemData);
        count++;
    }
    console.log(`Seeded ${count} documents into ${collectionName}`);
    return { name: collectionName, status: 'seeded', count };
}


export async function seedDatabase() {
  try {
    const results = await Promise.all([
        seedCollection('teachers', mockTeachers),
        seedCollection('children', mockChildren),
        seedCollection('parents', mockParents),
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
