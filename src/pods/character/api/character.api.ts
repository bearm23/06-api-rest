import axios from 'axios';
import { Character } from './character.api-model';
import { Lookup } from 'common/models';
import { updateTotalCharacters } from 'pods/character-collection/api';

const urlCharacters = '/api/characters';
const urlStatus = '/api/status';
const urlGender = '/api/gender';

export const getCharacter = async (id: string): Promise<Character> => {
  return axios
    .get<Character>(`${urlCharacters}/${id}`)
    .then(({ data }) => data);
};

export const getStatus = async (): Promise<Lookup[]> => {
  return axios.get<Lookup[]>(urlStatus).then(({ data }) => data);
};

export const getGender = async (): Promise<Lookup[]> => {
  return axios.get<Lookup[]>(urlGender).then(({ data }) => data);
};

export const saveCharacter = async (character: Character): Promise<boolean> => {
  if (character.id) {
    axios.put(`${urlCharacters}/${character.id}`, character);
  } else {
    axios.post(urlCharacters, character);
    updateTotalCharacters();
  }
  return true;
};
