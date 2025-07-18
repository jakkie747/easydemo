
'use server';

import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { teachers as mockTeachers } from './mock-data';

export async function seedDatabase() {
  const teachersCollection = collection(db, 'teachers');

  try {
    const snapshot = await getDocs(teachersCollection);
    if (!snapshot.empty) {
      return { success: false, message: 'Database already contains teacher data. Seeding aborted.' };
    }

    let count = 0;
    for (const teacher of mockTeachers) {
      // We don't need to pass the ID, Firestore will generate one.
      const { id, ...teacherData } = teacher;
      await addDoc(teachersCollection, teacherData);
      count++;
    }

    return { success: true, count };
  } catch (error) {
    console.error('Error seeding database:', error);
    if (error instanceof Error) {
        return { success: false, message: error.message };
    }
    return { success: false, message: 'An unknown error occurred during seeding.' };
  }
}
