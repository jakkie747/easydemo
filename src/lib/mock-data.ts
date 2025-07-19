
import type { Teacher, Child, Parent } from './types';

export const teachers: Omit<Teacher, 'id'>[] = [
  {
    name: 'Emily Carter',
    email: 'emily.carter@example.com',
    classroom: 'Bumblebees (Preschool)',
    avatar: 'https://i.pravatar.cc/150?u=emily',
    status: 'Active',
  },
  {
    name: 'David Chen',
    email: 'david.chen@example.com',
    classroom: 'Star Gazers (Afterschool)',
    avatar: 'https://i.pravatar.cc/150?u=david',
    status: 'Active',
  },
  {
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    classroom: 'Little Sprouts (Preschool)',
    avatar: 'https://i.pravatar.cc/150?u=maria',
    status: 'Active',
  },
  {
    name: 'James Smith',
    email: 'james.smith@example.com',
    classroom: 'Trailblazers (Afterschool)',
    avatar: 'https://i.pravatar.cc/150?u=james',
    status: 'On Leave',
  },
  {
    name: 'Aisha Khan',
    email: 'aisha.khan@example.com',
    classroom: 'Sunflowers (Preschool)',
    avatar: 'https://i.pravatar.cc/150?u=aisha',
    status: 'Active',
  },
];

export const children: Omit<Child, 'id'>[] = [
  { name: 'Leo Bloom', avatar: 'https://i.pravatar.cc/150?u=leo', classroom: 'Bumblebees', age: 4, parent: 'Anna Bloom', dob: '2020-05-15', allergies: 'Peanuts', emergencyContact: { name: 'John Bloom', relation: 'Father', phone: '555-555-5556' } },
  { name: 'Olivia Martin', avatar: 'https://i.pravatar.cc/150?u=olivia', classroom: 'Sunflowers', age: 3, parent: 'Sarah Martin', dob: '2021-02-20', allergies: 'None', emergencyContact: { name: 'Robert Martin', relation: 'Father', phone: '555-555-5557' } },
  { name: 'Liam Neeson', avatar: 'https://i.pravatar.cc/150?u=liam', classroom: 'Star Gazers', age: 6, parent: 'Michael Neeson', dob: '2018-08-10', allergies: 'None', emergencyContact: { name: 'Helen Neeson', relation: 'Mother', phone: '555-555-5558' } },
  { name: 'Emma Watson', avatar: 'https://i.pravatar.cc/150?u=emma', classroom: 'Bumblebees', age: 4, parent: 'Jessica Watson', dob: '2020-04-15', allergies: 'Gluten', emergencyContact: { name: 'David Watson', relation: 'Father', phone: '555-555-5559' } },
  { name: 'Noah Brown', avatar: 'https://i.pravatar.cc/150?u=noah', classroom: 'Little Sprouts', age: 3, parent: 'Chris Brown', dob: '2021-09-01', allergies: 'None', emergencyContact: { name: 'Laura Brown', relation: 'Mother', phone: '555-555-5560' } },
];

export const parents: Omit<Parent,'id' | 'childDetails'>[] = [
    { name: 'Anna Bloom', avatar: 'https://i.pravatar.cc/150?u=anna', email: 'anna.bloom@example.com', phone: '555-555-1234', children: ['Leo Bloom'] },
    { name: 'Sarah Martin', avatar: 'https://i.pravatar.cc/150?u=sarah', email: 'sarah.martin@example.com', phone: '555-555-2345', children: ['Olivia Martin'] },
    { name: 'Michael Neeson', avatar: 'https://i.pravatar.cc/150?u=michael', email: 'michael.neeson@example.com', phone: '555-555-3456', children: ['Liam Neeson'] },
    { name: 'Jessica Watson', avatar: 'https://i.pravatar.cc/150?u=jessica', email: 'jessica.watson@example.com', phone: '555-555-4567', children: ['Emma Watson'] },
    { name: 'Chris Brown', avatar: 'https://i.pravatar.cc/150?u=chris', email: 'chris.brown@example.com', phone: '555-555-5678', children: ['Noah Brown'] },
];
