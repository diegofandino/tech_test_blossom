export interface IOptions {
	[key: string]: string[];
}

export interface IFilterState {
	options: IOptions;
	openFilter: () => void;
	isOpenFilters: boolean;
	setFilters: (option: string, type: string) => void;
	removeOption: (option: string, type: string) => void;
	removeAllOptions: () => void;
	areAllOptionsEmpty: () => boolean;
}
