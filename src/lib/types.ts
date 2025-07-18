
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
