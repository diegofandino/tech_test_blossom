import { create } from "zustand";
import { ICharacter } from "../models";


export interface ICharactersGeneral {
	characters: ICharacter[];
	charactersOriginal: ICharacter[];
	setCharacters: (characters: ICharacter[]) => void;
	setCharactersOriginal: (characters: ICharacter[]) => void
	sortCharactersAZ: (characters: ICharacter[]) => void;
	sortCharactersZA: (characters: ICharacter[]) => void;
	areAllCharactersEmpty: () => boolean;
}

export const useCharactersGeneral = create<ICharactersGeneral>((set) => ({
	characters: [],
	charactersOriginal: [],
	sortCharactersAZ: (characters: ICharacter[]) => {
		const sortedCharacters = [...characters].sort((a, b) => b.name.localeCompare(a.name));
		set((state) => ({ ...state, characters: sortedCharacters }));
	},
	sortCharactersZA: (characters: ICharacter[]) => {
		const sortedCharacters = [...characters].sort((a, b) => a.name.localeCompare(b.name));
		set((state) => ({ ...state, characters: sortedCharacters }));
	},
	setCharactersOriginal: (characters: ICharacter[]) => set((state) => ({ ...state, charactersOriginal: characters })),
	setCharacters: (characters: ICharacter[]) => set((state) => ({ ...state, characters: characters })),
	areAllCharactersEmpty: () => false,
}));

	