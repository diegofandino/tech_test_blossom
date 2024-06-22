import zustand, { create } from "zustand";
import { ICharacter } from "../models";


export interface ICharactersGeneral {
	characters: ICharacter[];
	charactersOriginal: ICharacter[];
	setCharacters: (characters: ICharacter[]) => void;
	setCharactersOriginal: (characters: ICharacter[]) => void
	areAllCharactersEmpty: () => boolean;
}

export const useCharactersGeneral = create<ICharactersGeneral>((set) => ({
	characters: [],
	charactersOriginal: [],
	setCharactersOriginal: (characters: ICharacter[]) => set((state) => ({ ...state, charactersOriginal: characters })),
	setCharacters: (characters: ICharacter[]) => set((state) => ({ ...state, characters: characters })),
	areAllCharactersEmpty: () => false,
}));

	