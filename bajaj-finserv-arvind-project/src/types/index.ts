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
};

export type FilterOptions = {
  specialty: string;
  availability: string;
  minRating: number;
  gender: string;
  language: string;
};