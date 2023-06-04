import * as React from 'react';
import { RickMortyEntityVm } from './character-collection.vm';
import { getCharacterCollection } from './api';
import { mapFromApiToVm } from './character-collection.mapper';
import { mapToCollection } from 'common/mappers';

export const useCharacterCollection = () => {
  const [characterCollection, setCharacterCollection] = React.useState<
    RickMortyEntityVm[]
  >([]);

  const loadCharacterCollection = ({
    page = 1,
    limit = 0,
    searchCharacter = '',
  }) => {
    getCharacterCollection({
      page,
      limit,
      searchCharacter,
    }).then((result) =>
      setCharacterCollection(mapToCollection(result, mapFromApiToVm))
    );
  };

  return { characterCollection, loadCharacterCollection };
};
