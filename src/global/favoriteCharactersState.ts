import { create } from 'zustand';
import { ICharacter } from '../models';

interface IFavoriteCharactersState {
	favoriteCharactersOriginal: ICharacter[];
	favoriteCharacters: ICharacter[];
	addFavoriteCharacter: (favorite: ICharacter) => void;
	removeFavoriteCharacter: (favorite: ICharacter) => void;
	addFavoriteArrayCharacter: (favoriteCharacters: ICharacter[]) => void;
	filterFavoriteCharacters: (searchText: string) => void;
	sortCharacterStarredAZ: (favoriteCharacter: ICharacter[]) => void;
	sortCharacterStarredZA: (favoriteCharacter: ICharacter[]) => void;
}

export const useFavoriteCharactersStore = create<IFavoriteCharactersState>((set) => ({
	favoriteCharactersOriginal: [],
    favoriteCharacters: [],
    addFavoriteCharacter: (favoriteCharacter: ICharacter) => set((state) => ({
        favoriteCharacters: [...state.favoriteCharacters, {isFavorite: true, ...favoriteCharacter}],
        favoriteCharactersOriginal: [...state.favoriteCharactersOriginal, {isFavorite: true, ...favoriteCharacter}]
    })),
    addFavoriteArrayCharacter: (favoriteCharacters: ICharacter[]) => set(() => ({ 
        favoriteCharacters: favoriteCharacters 
    })),
    removeFavoriteCharacter: (favoriteCharacter: ICharacter) => set((state) => ({
        favoriteCharacters: [...state.favoriteCharacters.filter((character) => character.id !== favoriteCharacter.id)],
    })),
    filterFavoriteCharacters: (searchText: string) => set((state) => ({
        favoriteCharacters: searchText
            ? state.favoriteCharactersOriginal.filter((character) => character.name.toLowerCase().includes(searchText))
            : state.favoriteCharactersOriginal
    })),
	sortCharacterStarredAZ: (favoriteCharacter: ICharacter[]) => {
		const sortedCharacters = [...favoriteCharacter].sort((a, b) => b.name.localeCompare(a.name));
		set((state) => ({ ...state, favoriteCharacters: sortedCharacters }));
	},
	sortCharacterStarredZA: (favoriteCharacter: ICharacter[]) => {
		const sortedCharacters = [...favoriteCharacter].sort((a, b) => a.name.localeCompare(b.name));
		set((state) => ({ ...state, favoriteCharacters: sortedCharacters }));
	},
}))