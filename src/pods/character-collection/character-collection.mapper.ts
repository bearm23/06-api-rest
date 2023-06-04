import * as apiModel from './api/character-collection.api-model';
import * as viewModel from './character-collection.vm';

export const mapFromApiToVm = (
  item: apiModel.RickMortyCharacter
): viewModel.RickMortyEntityVm => ({
  id: item.id,
  name: item.name,
  image: item.image,
});
