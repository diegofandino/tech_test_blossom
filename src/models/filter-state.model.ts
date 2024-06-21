export interface IOptions {
	[key: string]: string[];
}

export interface IFilterState {
	options: IOptions;
	setFilters: (option: string, type: string) => void;
	removeOption: (option: string, type: string) => void;
	areAllOptionsEmpty: () => boolean;
}
