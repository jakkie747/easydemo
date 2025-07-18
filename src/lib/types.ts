
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
  uploaded: string;
  size: string;
  url: string;
};

export type Child = {
    id: string;
    name: string;
    avatar: string;
    classroom: string;
    age: number;
    parent: string;
    dob?: string;
    allergies?: string;
    emergencyContact?: {
        name: string;
        relation: string;
        phone: string;
    };
};

export type Parent = {
    id: string;
    name: string;
    avatar: string;
    email: string;
    phone?: string;
    children: string[];
    childDetails?: Child[];
};

export type GalleryImage = {
  id: string;
  url: string;
  description?: string;
  storagePath: string;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  description?: string;
  attendees: number;
  type: string;
  imageUrl?: string;
  imageStoragePath?: string;
};
