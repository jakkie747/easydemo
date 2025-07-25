
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, writeBatch, query, orderBy, serverTimestamp } from 'firebase/firestore';
import type { Event } from '@/lib/types';
import { promiseWithTimeout } from '@/lib/utils';

const TIMEOUT_DURATION = 15000; // 15 seconds

const seedEvents = async (): Promise<Event[]> => {
    if (!db) throw new Error("Firebase is not configured for seeding.");
    
    const batch = writeBatch(db);
    const eventsCollectionRef = collection(db, 'events');
    
    const getFutureDate = (days: number) => {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date.toISOString().split('T')[0];
    }

    const mockEvents: Omit<Event, 'id' | 'createdAt'>[] = [
        {
            title: "Annual Sports Day",
            date: getFutureDate(30),
            description: "Get ready for a day of fun, games, and friendly competition! Parents are welcome to cheer on our little athletes.",
            image: "https://placehold.co/600x400.png",
            aiHint: "kids sports"
        },
        {
            title: "Pajama & Movie Day",
            date: getFutureDate(45),
            description: "A cozy day at school! Children can come in their favorite pajamas as we watch a fun animated movie and enjoy popcorn.",
            image: "https://placehold.co/600x400.png",
            aiHint: "children movie"
        },
        {
            title: "Parent-Teacher Meetings",
            date: getFutureDate(60),
            description: "A great opportunity to discuss your child's progress and development. Please sign up for a time slot at the front desk.",
            image: "https://placehold.co/600x400.png",
            aiHint: "meeting discussion"
        },
    ];

    const seededEvents: Event[] = [];
    const now = new Date();

    mockEvents.forEach(event => {
        const docRef = doc(eventsCollectionRef);
        batch.set(docRef, { ...event, createdAt: serverTimestamp() });
        seededEvents.push({ ...event, id: docRef.id, createdAt: now });
    });

    await batch.commit();
    console.log("Seeded mock events.");
    return seededEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};


export const getEvents = async (): Promise<Event[]> => {
    if (!db) return [];
    try {
        const eventsCollectionRef = collection(db, 'events');
        // Sort by the event date to show the soonest events first.
        const q = query(eventsCollectionRef, orderBy("date", "asc"));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            console.log("No events found, seeding mock data.");
            return await seedEvents();
        }
        
        const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
        // Client-side sort is still a good fallback.
        return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    } catch (error: any) {
        console.error("Error fetching events:", error);
        throw error;
    }
};

export const addEvent = async (eventData: Omit<Event, 'id' | 'createdAt'>): Promise<string> => {
    if (!db) throw new Error("Firebase is not configured.");
    const eventsCollectionRef = collection(db, 'events');
    const docRef = await promiseWithTimeout(
        addDoc(eventsCollectionRef, { ...eventData, createdAt: serverTimestamp() }),
        TIMEOUT_DURATION,
        new Error("Adding event document timed out.")
    );
    return docRef.id;
};

export const updateEvent = async (eventId: string, eventData: Partial<Omit<Event, 'id' | 'createdAt'>>): Promise<void> => {
    if (!db) throw new Error("Firebase is not configured.");
    const eventDoc = doc(db, 'events', eventId);
    await promiseWithTimeout(
        updateDoc(eventDoc, eventData),
        TIMEOUT_DURATION,
        new Error(`Updating event ${eventId} timed out.`)
    );
};

export const deleteEvent = async (eventId: string): Promise<void> => {
    if (!db) throw new Error("Firebase is not configured.");
    const eventDoc = doc(db, 'events', eventId);
    await promiseWithTimeout(
        deleteDoc(eventDoc),
        TIMEOUT_DURATION,
        new Error(`Deleting event ${eventId} timed out.`)
    );
};
