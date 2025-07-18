
import { collection, getDocs, addDoc, deleteDoc, doc, QueryDocumentSnapshot, DocumentData, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { Teacher, Document, Child, Parent, GalleryImage, Event } from "./types";
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

const childFromDoc = (doc: QueryDocumentSnapshot<DocumentData> | DocumentData): Child => {
    const data = doc.data();
    if (!data) throw new Error("Document data is empty.");
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

const eventFromDoc = (doc: QueryDocumentSnapshot<DocumentData>): Event => {
    const data = doc.data();
    return {
        id: doc.id,
        title: data.title || '',
        date: data.date || '',
        time: data.time || '',
        description: data.description || '',
        attendees: data.attendees || 0,
        type: data.type || '',
        imageUrl: data.imageUrl,
        imageStoragePath: data.imageStoragePath,
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

export async function getChild(id: string): Promise<Child | null> {
    try {
        const docRef = doc(db, 'children', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return childFromDoc(docSnap);
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching child:", error);
        return null;
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

export async function updateChild(id: string, child: Omit<Child, 'id'>): Promise<void> {
    try {
        const docRef = doc(db, 'children', id);
        await updateDoc(docRef, child);
    } catch (error) {
        console.error("Error updating child:", error);
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


export async function getEvents(): Promise<Event[]> {
    try {
        const eventsCol = collection(db, "events");
        const eventSnapshot = await getDocs(eventsCol);
        return eventSnapshot.docs.map(doc => eventFromDoc(doc));
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}

export async function addEvent(event: Omit<Event, 'id'>): Promise<void> {
    try {
        await addDoc(collection(db, 'events'), event);
    } catch (error) {
        console.error("Error adding event:", error);
        throw error;
    }
}

export async function updateEvent(id: string, event: Omit<Event, 'id'>): Promise<void> {
    try {
        const docRef = doc(db, 'events', id);
        await updateDoc(docRef, event);
    } catch (error) {
        console.error("Error updating event:", error);
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
                await deleteFileByUrl(eventData.imageStoragePath);
            }
        }
        await deleteDoc(eventRef);
    } catch (error) {
        console.error("Error deleting event:", error);
        throw error;
    }
}
