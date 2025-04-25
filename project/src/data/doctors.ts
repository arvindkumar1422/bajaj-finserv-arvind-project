import { Doctor } from '../types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    specialty: 'Cardiology',
    availability: ['Monday', 'Wednesday', 'Friday'],
    languages: ['English', 'Spanish'],
    experience: 12,
    rating: 4.8,
    gender: 'female',
    imageUrl: 'https://images.pexels.com/photos/5207065/pexels-photo-5207065.jpeg',
    address: '123 Medical Plaza, Suite 101, San Francisco, CA',
    price: 200,
    insurance: ['Blue Cross', 'Aetna', 'Cigna']
  },
  {
    id: '2',
    name: 'Michael Chen',
    specialty: 'Pediatrics',
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    languages: ['English', 'Mandarin'],
    experience: 8,
    rating: 4.9,
    gender: 'male',
    imageUrl: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
    address: '456 Childrens Health Bldg, Oakland, CA',
    price: 180,
    insurance: ['Kaiser', 'United Healthcare', 'Blue Shield']
  },
  {
    id: '3',
    name: 'Robert Williams',
    specialty: 'Dermatology',
    availability: ['Monday', 'Tuesday', 'Thursday'],
    languages: ['English'],
    experience: 15,
    rating: 4.7,
    gender: 'male',
    imageUrl: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
    address: '789 Skin Care Center, Palo Alto, CA',
    price: 250,
    insurance: ['Aetna', 'Cigna', 'Medicare']
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    specialty: 'Neurology',
    availability: ['Wednesday', 'Friday', 'Saturday'],
    languages: ['English', 'Spanish', 'Portuguese'],
    experience: 10,
    rating: 4.6,
    gender: 'female',
    imageUrl: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
    address: '321 Brain Health Institute, San Jose, CA',
    price: 275,
    insurance: ['Blue Cross', 'Medicare', 'Medicaid']
  },
  {
    id: '5',
    name: 'David Kim',
    specialty: 'Orthopedics',
    availability: ['Monday', 'Thursday', 'Friday'],
    languages: ['English', 'Korean'],
    experience: 14,
    rating: 4.9,
    gender: 'male',
    imageUrl: 'https://images.pexels.com/photos/5998474/pexels-photo-5998474.jpeg',
    address: '567 Joint & Spine Center, Berkeley, CA',
    price: 230,
    insurance: ['Kaiser', 'Blue Shield', 'United Healthcare']
  },
  {
    id: '6',
    name: 'Lisa Martinez',
    specialty: 'Psychiatry',
    availability: ['Tuesday', 'Wednesday', 'Saturday'],
    languages: ['English', 'Spanish'],
    experience: 9,
    rating: 4.8,
    gender: 'female',
    imageUrl: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg',
    address: '890 Mental Health Clinic, San Francisco, CA',
    price: 220,
    insurance: ['Cigna', 'Aetna', 'Beacon Health']
  },
  {
    id: '7',
    name: 'James Wilson',
    specialty: 'Ophthalmology',
    availability: ['Monday', 'Wednesday', 'Friday'],
    languages: ['English'],
    experience: 11,
    rating: 4.7,
    gender: 'male',
    imageUrl: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg',
    address: '432 Vision Care Center, Oakland, CA',
    price: 190,
    insurance: ['VSP', 'EyeMed', 'Blue Cross']
  },
  {
    id: '8',
    name: 'Jennifer Lee',
    specialty: 'Endocrinology',
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    languages: ['English', 'Mandarin', 'Cantonese'],
    experience: 13,
    rating: 4.9,
    gender: 'female',
    imageUrl: 'https://images.pexels.com/photos/5214949/pexels-photo-5214949.jpeg',
    address: '654 Diabetes & Hormone Center, Palo Alto, CA',
    price: 260,
    insurance: ['Blue Shield', 'Aetna', 'Medicare']
  }
];

export const specialties = Array.from(new Set(doctors.map(doc => doc.specialty))).sort();
export const languages = Array.from(new Set(doctors.flatMap(doc => doc.languages))).sort();
export const availabilities = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const genders = ['male', 'female', 'other'];