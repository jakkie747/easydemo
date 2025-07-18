import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { db } from "./firebase";
import type { Teacher } from "./types";

// A helper function to convert a Firestore document to our Teacher type
const teacherFromDoc = (doc: QueryDocumentSnapshot<DocumentData>): Teacher => {
    const data = doc.data();
    return {
        id: doc.id,
        name: data.name || '',
        email: data.email || '',
        classroom: data.classroom || '',
        avatar: data.avatar || '',
        status: data.status || 'Active',
    };
};

export async function getTeachers(): Promise<Teacher[]> {
    try {
        const teachersCol = collection(db, "teachers");
        const teacherSnapshot = await getDocs(teachersCol);
        const teacherList = teacherSnapshot.docs.map(doc => teacherFromDoc(doc));
        return teacherList;
    } catch (error) {
        console.error("Error fetching teachers:", error);
        // In case of an error, we can return an empty array
        // or handle it as needed.
        return [];
    }
}
