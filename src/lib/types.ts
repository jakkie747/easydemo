
export type Child = {
    id: string;
    name: string;
    avatar: string;
    parentId: string;
    classroom?: string;
    age?: number;
    parent?: string;
    dob?: string;
    gender?: string;
    allergies?: string;
    emergencyContact?: {
        name: string;
        relation: string;
        phone: string;
    };
    previousExperience?: boolean;
    additionalNotes?: string;
};

export type Parent = {
    id: string;
    name: string;
    avatar: string;
    email: string;
    phone?: string;
    address?: string;
    children: string[];
    childDetails?: Child[];
};

export type Teacher = {
    id: string;
    name: string;
    email: string;
    classroom: string;
    avatar: string;
    status: 'Active' | 'On Leave';
};

export type Document = {
    id: string;
    name: string;
    type: string;
    url: string;
    size: string;
    uploaded: string;
};

export type Event = {
    id: string;
    title: string;
    date: string;
    time: string;
    type: string;
    attendees: number;
    description?: string;
    imageUrl?: string;
    imageStoragePath?: string;
};

export type GalleryImage = {
    id: string;
    url: string;
    description?: string;
    storagePath?: string;
};
