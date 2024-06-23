export interface CommentsChracters {
	comment: string;
	id: number;
}

export interface ICharacter {
	id: string;
	name: string;
	status: string;
	image: string;
	isFavorite?: boolean;
	species?: string;
	comments?: CommentsChracters[];
}


export interface ICharacterDetail extends ICharacter {
	occupation: string;
}