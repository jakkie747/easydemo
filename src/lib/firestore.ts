
import { collection, getDocs, addDoc, deleteDoc, doc, QueryDocumentSnapshot, DocumentData, getDoc, updateDoc, setDoc, query, where } from "firebase/firestore";
import { db } from "./firebase";
import type { Teacher, Document, Child, Parent, GalleryImage, Event } from "./types";

const teacherFromDoc = (doc: QueryDocumentSnapshot<DocumentData> | DocumentData): Teacher => {
    const data = "data" in doc ? doc.data() : doc;
    if (!data) throw new Error("Document data is empty.");
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
    const data = "data" in doc ? doc.data() : doc;
    if (!data) throw new Error("Document data is empty.");
    return {
        id: doc.id,
        name: data.name || '',
        avatar: data.avatar || '',
        classroom: data.classroom || '',
        age: data.age || 0,
        parent: data.parent || '',
        dob: data.dob || '',
        allergies: data.allergies || '',
        emergencyContact: data.emergencyContact || { name: '', relation: '', phone: '' },
    };
};


const parentFromDoc = (doc: QueryDocumentSnapshot<DocumentData> | DocumentData): Parent => {
    const data = "data" in doc ? doc.data() : doc;
     if (!data) throw new Error("Document data is empty.");
    return {
        id: doc.id,
        name: data.name || '',
        avatar: data.avatar || '',
        email: data.email || '',
        phone: data.phone || '',
        children: data.children || [],
        childDetails: data.childDetails || [],
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

export async function addTeacher(teacher: Omit<Teacher, 'id'>): Promise<void> {
    try {
        await addDoc(collection(db, 'teachers'), teacher);
    } catch (error) {
        console.error("Error adding teacher:", error);
        throw error;
    }
}

export async function updateTeacher(id: string, teacher: Partial<Omit<Teacher, 'id'>>): Promise<void> {
    try {
        const docRef = doc(db, 'teachers', id);
        await updateDoc(docRef, teacher);
    } catch (error) {
        console.error("Error updating teacher:", error);
        throw error;
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


export async function getChildByName(name: string): Promise<Child | null> {
    try {
        const q = query(collection(db, "children"), where("name", "==", name));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            // Assuming name is unique, return the first result
            return childFromDoc(querySnapshot.docs[0]);
        }
        return null;
    } catch (error) {
        console.error("Error fetching child by name:", error);
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

export async function updateChild(id: string, child: Partial<Omit<Child, 'id'>>): Promise<void> {
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

export async function getParent(id: string): Promise<Parent | null> {
    try {
        const docRef = doc(db, 'parents', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const parentData = parentFromDoc(docSnap);
            // Fetch full child details
            const childDetails = await Promise.all(
                (parentData.children || []).map(childName => getChildByName(childName))
            );
            parentData.childDetails = childDetails.filter(c => c !== null) as Child[];
            return parentData;
        } else {
            console.log("No such parent document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching parent:", error);
        return null;
    }
}

export async function addParent(parent: Parent): Promise<void> {
    try {
        // Use the UID from Auth as the document ID for easy lookup
        const parentRef = doc(db, 'parents', parent.id);
        const { childDetails, ...parentData } = parent;
        await setDoc(parentRef, parentData);
    } catch (error) {
        console.error("Error adding parent:", error);
        throw error;
    }
}

export async function updateParent(id: string, parentData: Partial<Parent>): Promise<void> {
    try {
        const docRef = doc(db, 'parents', id);
        await updateDoc(docRef, parentData);
    } catch (error) {
        console.error("Error updating parent:", error);
        throw error;
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

export async function addDocument(docData: Omit<Document, 'id'>) {
    try {
        const documentsCollection = collection(db, 'documents');
        await addDoc(documentsCollection, docData);
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

export async function updateEvent(id: string, event: Partial<Omit<Event, 'id'>>): Promise<void> {
    try {
        const docRef = doc(db, 'events', id);
        await updateDoc(docRef, event);
    } catch (error) {
        console.error("Error updating event:", error);
        throw error;
    }
}
