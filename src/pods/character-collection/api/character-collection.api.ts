import axios from 'axios';
import { ITEMS_PER_PAGE } from '../character-collection.constants';
import {
  RickMortyCharacter,
  RickMortyInfo,
} from './character-collection.api-model';

const urlCharacters = '/api/characters';
const urlCount = '/api/info';
const urlInfo = '/api/info';

export const getCharacterCollection = async ({
  page = 1,
  searchCharacter = '',
  limit = ITEMS_PER_PAGE,
}): Promise<RickMortyCharacter[]> => {
  return axios
    .get<RickMortyCharacter[]>(
      `${urlCharacters}?_page=${page}${limit !== 0 ? `&_limit=${limit}` : ''}${
        searchCharacter !== '' ? `&name_like=${searchCharacter}` : ''
      }`
    )
    .then(({ data }) => data);
};

export const getTotalCount = async (): Promise<number> => {
  return axios.get<RickMortyInfo>(urlCount).then(({ data }) => data.count);
};

export const deleteCharacter = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${urlCharacters}/${id}`);
    updateTotalCharacters(false);
    return true;
  } catch (error) {
    return false;
  }
};

export const updateTotalCharacters = async (
  create = true
): Promise<boolean> => {
  const total = await getTotalCount();
  axios.put(urlInfo, {
    count: create ? total + 1 : total - 1,
  });
  return true;
};
