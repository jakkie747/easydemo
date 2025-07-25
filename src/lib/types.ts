
export type Child = {
    id: string;
    name: string;
    avatar: string;
    parentId: string;
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
    address?: string;
    children: string[];
    childDetails: Child[];
};
