
import { collection, getDocs, addDoc, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { db } from "./firebase";
import type { Teacher, Document } from "./types";

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

const documentFromDoc = (doc: QueryDocumentSnapshot<DocumentData>): Document => {
    const data = doc.data();
    return {
        id: doc.id,
        name: data.name || '',
        type: data.type || '',
        uploaded: data.uploaded || '',
        size: data.size || '',
        url: data.url || '',
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
        return [];
    }
}

export async function getDocuments(): Promise<Document[]> {
    try {
        const documentsCol = collection(db, "documents");
        const documentSnapshot = await getDocs(documentsCol);
        const documentList = documentSnapshot.docs.map(doc => documentFromDoc(doc));
        return documentList;
    } catch (error) {
        console.error("Error fetching documents:", error);
        return [];
    }
}

export async function addDocument(doc: Omit<Document, 'id'>) {
    try {
        const documentsCollection = collection(db, 'documents');
        await addDoc(documentsCollection, doc);
    } catch (error) {
        console.error("Error adding document:", error);
        throw error; // Re-throw to be handled by the caller
    }
}
