import * as React from 'react';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { RickMortyEntityVm } from './character-collection.vm';
import { CharacterCard } from './components/character-card.component';
import * as classes from './character-collection.styles';
import { TextFieldComponent } from 'common/components';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  characterCollection: RickMortyEntityVm[];
  page: number;
  totalPages: number;
  spinner: boolean;
  searchCharacter: string;
  onCreateCharacter: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onPageChange: (event: React.ChangeEvent, value: number) => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CharacterCollectionComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {
    characterCollection,
    page,
    totalPages,
    spinner,
    searchCharacter,
    onCreateCharacter,
    onEdit,
    onDelete,
    onPageChange,
    onSearchChange,
  } = props;

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={onCreateCharacter}>
        Add character
      </Button>

      <TextFieldComponent
        label={'Search:'}
        value={searchCharacter}
        onChange={onSearchChange}
      />

      {spinner ? (
        <CircularProgress />
      ) : (
        <>
          <ul className={classes.list}>
            {characterCollection.map((character) => (
              <li key={character.id}>
                <CharacterCard
                  character={character}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </li>
            ))}
          </ul>

          <Pagination
            page={page}
            count={totalPages}
            color="primary"
            onChange={onPageChange}
            sx={{ display: 'flex', justifyContent: 'center' }}
          />
        </>
      )}
    </div>
  );
};
