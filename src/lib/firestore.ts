
import { collection, getDocs, addDoc, doc, QueryDocumentSnapshot, DocumentData, getDoc, updateDoc, setDoc, query, where, DocumentReference, writeBatch } from "firebase/firestore";
import { db } from "./firebase";
import type { Child, Parent, Document, Event, GalleryImage, Teacher } from "./types";

const docToType = <T>(doc: QueryDocumentSnapshot<DocumentData> | DocumentData): T => {
    const data = "data" in doc ? doc.data() : doc;
    if (!data) throw new Error("Document data is empty.");
    return {
        id: doc.id,
        ...data
    } as T;
}

// Children
export async function getChildren(): Promise<Child[]> {
    try {
        const querySnapshot = await getDocs(collection(db, "children"));
        return querySnapshot.docs.map(doc => docToType<Child>(doc));
    } catch (error) {
        console.error("Error fetching children:", error);
        return [];
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

// Parents
export async function getParents(): Promise<Parent[]> {
    try {
        const querySnapshot = await getDocs(collection(db, "parents"));
        return querySnapshot.docs.map(doc => docToType<Parent>(doc));
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

export async function addParent(parent: Omit<Parent, 'childDetails'>): Promise<void> {
    try {
        const parentRef = doc(db, 'parents', parent.id);
        await setDoc(parentRef, parent);
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

// Teachers
export async function getTeachers(): Promise<Teacher[]> {
    try {
        const querySnapshot = await getDocs(collection(db, "teachers"));
        return querySnapshot.docs.map(doc => docToType<Teacher>(doc));
    } catch (error) {
        console.error("Error fetching teachers:", error);
        return [];
    }
}

// Documents
export async function getDocuments(): Promise<Document[]> {
    try {
        const querySnapshot = await getDocs(collection(db, "documents"));
        return querySnapshot.docs.map(doc => docToType<Document>(doc));
    } catch (error) {
        console.error("Error fetching documents:", error);
        return [];
    }
}

// Events
export async function getEvents(): Promise<Event[]> {
    try {
        const querySnapshot = await getDocs(collection(db, "events"));
        return querySnapshot.docs.map(doc => docToType<Event>(doc));
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}

// Gallery
export async function getGalleryImages(): Promise<GalleryImage[]> {
    try {
        const querySnapshot = await getDocs(collection(db, "gallery"));
        return querySnapshot.docs.map(doc => docToType<GalleryImage>(doc));
    } catch (error) {
        console.error("Error fetching gallery images:", error);
        return [];
    }
}
