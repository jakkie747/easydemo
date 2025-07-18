
import { collection, getDocs, addDoc, deleteDoc, doc, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { db } from "./firebase";
import type { Teacher, Document, Child, Parent, GalleryImage } from "./types";
import { deleteFileByUrl } from "./firebase-admin";

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

const galleryImageFromDoc = (doc: QueryDocumentSnapshot<DocumentData>): GalleryImage => {
    const data = doc.data();
    return {
        id: doc.id,
        url: data.url || '',
        description: data.description || '',
        storagePath: data.storagePath || '',
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

export async function addChild(child: Omit<Child, 'id'>): Promise<void> {
    try {
        await addDoc(collection(db, 'children'), child);
    } catch (error) {
        console.error("Error adding child:", error);
        throw error;
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

export async function getGalleryImages(): Promise<GalleryImage[]> {
    try {
        const galleryCol = collection(db, "gallery");
        const gallerySnapshot = await getDocs(galleryCol);
        return gallerySnapshot.docs.map(doc => galleryImageFromDoc(doc));
    } catch (error) {
        console.error("Error fetching gallery images:", error);
        return [];
    }
}

export async function addGalleryImage(image: Omit<GalleryImage, 'id'>): Promise<void> {
    try {
        await addDoc(collection(db, 'gallery'), image);
    } catch (error) {
        console.error("Error adding gallery image:", error);
        throw error;
    }
}

export async function deleteGalleryImage(image: GalleryImage): Promise<void> {
    try {
        // First, delete the file from Cloud Storage
        await deleteFileByUrl(image.storagePath);
        // Then, delete the document from Firestore
        await deleteDoc(doc(db, 'gallery', image.id));
    } catch (error) {
        console.error("Error deleting gallery image:", error);
        throw error;
    }
}
