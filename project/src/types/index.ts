export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  availability: string[];
  languages: string[];
  experience: number;
  rating: number;
  gender: 'male' | 'female' | 'other';
  imageUrl: string;
  address: string;
  price: number;
  insurance: string[];
  consultationMode: 'video' | 'in-clinic' | 'both';
};

export type FilterOptions = {
  specialty: string;
  availability: string;
  minRating: number;
  gender: string;
  language: string;
  consultationMode: string;
  sortBy: 'fees' | 'experience' | '';
};

export type SortOption = {
  value: 'fees' | 'experience';
  label: string;
  testId: string;
};