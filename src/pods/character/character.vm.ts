export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  bestSentences: string;
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export const createEmptyCharacter = (): Character => ({
  id: 0,
  name: '',
  status: 'Alive',
  bestSentences: '',
  species: '',
  type: '',
  gender: 'Female',
  origin: {
    name: '',
    url: '',
  },
  location: {
    name: '',
    url: '',
  },
  image: '',
  episode: [''],
  url: '',
  created: '',
});
