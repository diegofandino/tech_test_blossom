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
    updateFavoriteCharacter: (updatedCharacter: ICharacter) => void
}

export const useFavoriteCharactersStore = create<IFavoriteCharactersState>((set) => ({
	favoriteCharactersOriginal: [],
    favoriteCharacters: [],
	addFavoriteCharacter: (favoriteCharacter: ICharacter) => set((state) => {
        if (state.favoriteCharacters.find(character => character.id === favoriteCharacter.id)
		|| state.favoriteCharactersOriginal.find(character => character.id === favoriteCharacter.id)) {
            return state;
        }
        const updatedCharacters = [...state.favoriteCharacters, { isFavorite: true, ...favoriteCharacter }];
        const updatedCharactersOriginal = [...state.favoriteCharactersOriginal, { isFavorite: true, ...favoriteCharacter }];
        return {
            favoriteCharacters: updatedCharacters,
            favoriteCharactersOriginal: updatedCharactersOriginal
        };
    }),
	updateFavoriteCharacter: (updatedCharacter: ICharacter) => set((state) => {
        const updateCharacterInArray = (characters: ICharacter[], updatedCharacter: ICharacter) => {
            return characters.map(character => 
                character.id === updatedCharacter.id ? updatedCharacter : character
            );
        };
    
        return {
            favoriteCharacters: updateCharacterInArray(state.favoriteCharacters, updatedCharacter),
            favoriteCharactersOriginal: updateCharacterInArray(state.favoriteCharactersOriginal, updatedCharacter)
        };
    }),
    addFavoriteArrayCharacter: (favoriteCharacters: ICharacter[]) => set(() => ({ 
        favoriteCharacters: favoriteCharacters 
    })),
    removeFavoriteCharacter: (favoriteCharacter: ICharacter) => set((state) => ({
        favoriteCharacters: [...state.favoriteCharacters.filter((character) => character.id !== favoriteCharacter.id)],
        favoriteCharactersOriginal: [...state.favoriteCharactersOriginal.filter((character) => character.id !== favoriteCharacter.id)],
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