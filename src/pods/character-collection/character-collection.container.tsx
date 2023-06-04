import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { linkRoutes } from 'core/router';
import { deleteCharacter, getTotalCount } from './api';
import { useCharacterCollection } from './character-collection.hook';
import { CharacterCollectionComponent } from './character-collection.component';
import { ITEMS_PER_PAGE } from './character-collection.constants';

export const CharacterCollectionContainer = () => {
  const { characterCollection, loadCharacterCollection } =
    useCharacterCollection();
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [spinner, setSpinner] = React.useState(false);
  const [searchCharacter] = React.useState<string>('');

  React.useEffect(() => {
    setSpinner(true);
    loadCharacterCollection({ page });
    handleGetTotalCollection();
    setSpinner(false);
  }, [page, searchCharacter]);

  const handleCreateCharacter = () => {
    navigate(linkRoutes.createCharacter);
  };

  const handleEdit = (id: number) => {
    navigate(linkRoutes.editCharacter(id));
  };

  const handleDelete = async (id: number) => {
    await deleteCharacter(id);
    loadCharacterCollection({ page, searchCharacter });
    handleGetTotalCollection();
  };

  const handlePageChange = (_: React.ChangeEvent, value: number) => {
    setPage(value);
  };

  const handleGetTotalCollection = async () => {
    const totalCount = await getTotalCount();
    setTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE));
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.value === '') {
      handleGetTotalCollection();
    } else {
      setTotalPages(0);
    }
    setPage(1);
    loadCharacterCollection({
      page,
      searchCharacter: event.target.value || '',
    });
  };

  return (
    <CharacterCollectionComponent
      characterCollection={characterCollection}
      page={page}
      totalPages={totalPages}
      spinner={spinner}
      searchCharacter={searchCharacter}
      onCreateCharacter={handleCreateCharacter}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onPageChange={handlePageChange}
      onSearchChange={handleSearchChange}
    />
  );
};
