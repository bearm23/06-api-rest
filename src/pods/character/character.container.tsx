import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from './api';
import { createEmptyCharacter, Character } from './character.vm';
import {
  mapCharacterFromApiToVm,
  mapCharacterFromVmToApi,
} from './character.mappers';
import { CharacterComponent } from './character.component';
import { Lookup } from 'common/models';

export const CharacterContainer: React.FunctionComponent = (props) => {
  const [character, setCharacter] = React.useState<Character>(
    createEmptyCharacter()
  );
  const [status, setStatus] = React.useState<Lookup[]>([]);
  const [gender, setGender] = React.useState<Lookup[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleLoadCharacter = async () => {
    const apiCharacter = await api.getCharacter(id);
    setCharacter(mapCharacterFromApiToVm(apiCharacter));
  };

  const handleLoadStatusCollection = async () =>
    setStatus(await api.getStatus());

  const handleLoadGenderCollection = async () =>
    setGender(await api.getGender());

  React.useEffect(() => {
    if (id) {
      handleLoadCharacter();
    }
    handleLoadStatusCollection();
    handleLoadGenderCollection();
  }, []);

  const handleSave = async (character: Character) => {
    const apiCharacter = mapCharacterFromVmToApi(character);
    const success = await api.saveCharacter(apiCharacter);
    if (success) {
      navigate(-1);
    } else {
      alert('Error on save character');
    }
  };

  return (
    <CharacterComponent
      character={character}
      status={status}
      gender={gender}
      onSave={handleSave}
      goBack={() => navigate(-1)}
    />
  );
};
