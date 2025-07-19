
import { collection, getDocs, addDoc, doc, QueryDocumentSnapshot, DocumentData, getDoc, updateDoc, setDoc, query, where, DocumentReference } from "firebase/firestore";
import { db } from "./firebase";
import type { Teacher, Document, Child, Parent, GalleryImage, Event } from "./types";

const docToType = <T>(doc: QueryDocumentSnapshot<DocumentData> | DocumentData): T => {
    const data = "data" in doc ? doc.data() : doc;
    if (!data) throw new Error("Document data is empty.");
    return {
        id: doc.id,
        ...data
    } as T;
}

export async function getTeachers(): Promise<Teacher[]> {
    try {
        const teachersCol = collection(db, "teachers");
        const teacherSnapshot = await getDocs(teachersCol);
        return teacherSnapshot.docs.map(doc => docToType<Teacher>(doc));
    } catch (error) {
        console.error("Error fetching teachers:", error);
        return [];
    }
}

export async function addTeacher(teacher: Omit<Teacher, 'id'>): Promise<DocumentReference> {
    try {
        return await addDoc(collection(db, 'teachers'), teacher);
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
        return docSnap.exists() ? docToType<Child>(docSnap) : null;
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
            return docToType<Child>(querySnapshot.docs[0]);
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
        return childrenSnapshot.docs.map(d => docToType<Child>(d));
    } catch (error) {
        console.error("Error fetching children:", error);
        return [];
    }
}

export async function addChild(child: Omit<Child, 'id'>): Promise<DocumentReference> {
    try {
        return await addDoc(collection(db, 'children'), child);
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
        return parentsSnapshot.docs.map(d => docToType<Parent>(d));
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
            const parentData = docToType<Parent>(docSnap);
            if (parentData.children && parentData.children.length > 0) {
              const childDetails = await Promise.all(
                  parentData.children.map(childName => getChildByName(childName))
              );
              parentData.childDetails = childDetails.filter(c => c !== null) as Child[];
            } else {
              parentData.childDetails = [];
            }
            return parentData;
        }
        return null;
    } catch (error) {
        console.error("Error fetching parent:", error);
        return null;
    }
}

export async function addParent(parent: Parent): Promise<void> {
    try {
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
        return documentSnapshot.docs.map(d => docToType<Document>(d));
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
        throw error;
    }
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
    try {
        const galleryCol = collection(db, "gallery");
        const gallerySnapshot = await getDocs(galleryCol);
        return gallerySnapshot.docs.map(d => docToType<GalleryImage>(d));
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
        return eventSnapshot.docs.map(d => docToType<Event>(d));
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
