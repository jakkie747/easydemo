import type { Teacher, Child, Parent } from './types';

export const teachers: Teacher[] = [
  {
    id: '1',
    name: 'Emily Carter',
    email: 'emily.carter@example.com',
    classroom: 'Bumblebees (Preschool)',
    avatar: 'https://i.pravatar.cc/150?u=emily',
    status: 'Active',
  },
  {
    id: '2',
    name: 'David Chen',
    email: 'david.chen@example.com',
    classroom: 'Star Gazers (Afterschool)',
    avatar: 'https://i.pravatar.cc/150?u=david',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    classroom: 'Little Sprouts (Preschool)',
    avatar: 'https://i.pravatar.cc/150?u=maria',
    status: 'Active',
  },
  {
    id: '4',
    name: 'James Smith',
    email: 'james.smith@example.com',
    classroom: 'Trailblazers (Afterschool)',
    avatar: 'https://i.pravatar.cc/150?u=james',
    status: 'On Leave',
  },
  {
    id: '5',
    name: 'Aisha Khan',
    email: 'aisha.khan@example.com',
    classroom: 'Sunflowers (Preschool)',
    avatar: 'https://i.pravatar.cc/150?u=aisha',
    status: 'Active',
  },
];

export const children: Child[] = [
  { id: 'c1', name: 'Leo Bloom', avatar: 'https://i.pravatar.cc/150?u=leo', classroom: 'Bumblebees', age: 4, parent: 'Anna Bloom' },
  { id: 'c2', name: 'Olivia Martin', avatar: 'https://i.pravatar.cc/150?u=olivia', classroom: 'Sunflowers', age: 3, parent: 'Sarah Martin' },
  { id: 'c3', name: 'Liam Neeson', avatar: 'https://i.pravatar.cc/150?u=liam', classroom: 'Star Gazers', age: 6, parent: 'Michael Neeson' },
  { id: 'c4', name: 'Emma Watson', avatar: 'https://i.pravatar.cc/150?u=emma', classroom: 'Bumblebees', age: 4, parent: 'Jessica Watson' },
  { id: 'c5', name: 'Noah Brown', avatar: 'https://i.pravatar.cc/150?u=noah', classroom: 'Little Sprouts', age: 3, parent: 'Chris Brown' },
];

export const parents: Omit<Parent,'id'>[] = [
    { name: 'Anna Bloom', avatar: 'https://i.pravatar.cc/150?u=anna', email: 'm@example.com', children: ['Leo Bloom'] },
    { name: 'Sarah Martin', avatar: 'https://i.pravatar.cc/150?u=sarah', email: 'sarah.martin@example.com', children: ['Olivia Martin'] },
    { name: 'Michael Neeson', avatar: 'https://i.pravatar.cc/150?u=michael', email: 'michael.neeson@example.com', children: ['Liam Neeson'] },
    { name: 'Jessica Watson', avatar: 'https://i.pravatar.cc/150?u=jessica', email: 'jessica.watson@example.com', children: ['Emma Watson'] },
    { name: 'Chris Brown', avatar: 'https://i.pravatar.cc/150?u=chris', email: 'chris.brown@example.com', children: ['Noah Brown'] },
];
