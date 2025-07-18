
import { collection, getDocs, addDoc, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { db } from "./firebase";
import type { Teacher, Document, Child, Parent } from "./types";

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

const childFromDoc = (doc: QueryDocumentSnapshot<DocumentData>): Child => {
    const data = doc.data();
    return {
        id: doc.id,
        name: data.name || '',
        avatar: data.avatar || '',
        classroom: data.classroom || '',
        age: data.age || 0,
        parent: data.parent || '',
    };
};

const parentFromDoc = (doc: QueryDocumentSnapshot<DocumentData>): Parent => {
    const data = doc.data();
    return {
        id: doc.id,
        name: data.name || '',
        avatar: data.avatar || '',
        email: data.email || '',
        children: data.children || [],
    };
};

export async function getTeachers(): Promise<Teacher[]> {
    try {
        const teachersCol = collection(db, "teachers");
        const teacherSnapshot = await getDocs(teachersCol);
        return teacherSnapshot.docs.map(doc => teacherFromDoc(doc));
    } catch (error) {
        console.error("Error fetching teachers:", error);
        return [];
    }
}

export async function getChildren(): Promise<Child[]> {
    try {
        const childrenCol = collection(db, "children");
        const childrenSnapshot = await getDocs(childrenCol);
        return childrenSnapshot.docs.map(doc => childFromDoc(doc));
    } catch (error) {
        console.error("Error fetching children:", error);
        return [];
    }
}

export async function getParents(): Promise<Parent[]> {
    try {
        const parentsCol = collection(db, "parents");
        const parentsSnapshot = await getDocs(parentsCol);
        return parentsSnapshot.docs.map(doc => parentFromDoc(doc));
    } catch (error) {
        console.error("Error fetching parents:", error);
        return [];
    }
}


export async function getDocuments(): Promise<Document[]> {
    try {
        const documentsCol = collection(db, "documents");
        const documentSnapshot = await getDocs(documentsCol);
        return documentSnapshot.docs.map(doc => documentFromDoc(doc));
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
