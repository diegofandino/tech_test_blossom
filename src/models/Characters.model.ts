export interface ICharacter {
	id: string;
	name: string;
	status: string;
	image: string;
	isFavorite?: boolean;
	species?: string;
}

export interface ICharacterDetail extends ICharacter {
	occupation: string;
}