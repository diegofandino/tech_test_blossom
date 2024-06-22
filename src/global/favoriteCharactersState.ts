import { create } from 'zustand';
import { ICharacter } from '../models';

interface IFavoriteCharactersState {
	favoriteCharactersOriginal: ICharacter[];
	favoriteCharacters: ICharacter[];
	addFavoriteCharacter: (favorite: ICharacter) => void;
	addCompleteFavoriteCharacter: (favoriteCharacter: ICharacter[]) => void;
	removeFavoriteCharacter: (favorite: ICharacter) => void;
	addFavoriteArrayCharacter: (favoriteCharacters: ICharacter[]) => void
}

export const useFavoriteCharactersStore = create<IFavoriteCharactersState>((set) => ({
	favoriteCharactersOriginal: [],
	favoriteCharacters: [],
	addFavoriteCharacter: (favoriteCharacter: ICharacter) => set((state) => ({ favoriteCharacters: [...state.favoriteCharacters, favoriteCharacter] })),
    addCompleteFavoriteCharacter: (favoriteCharacter: ICharacter[]) => set((state) => ({ ...state, favoriteCharactersOriginal: favoriteCharacter })),
    addFavoriteArrayCharacter: (favoriteCharacters: ICharacter[]) => set((state) => ({ ...state, favoriteCharacters: favoriteCharacters })),
    removeFavoriteCharacter: (favoriteCharacter: ICharacter) => set((state) => ({ favoriteCharacters: state.favoriteCharacters.filter((character) => character.id !== favoriteCharacter.id) })),
}))