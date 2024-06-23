import { create } from 'zustand';
import { IFilterState } from '../models';


export const useFilterStore = create<IFilterState>((set, get) => ({
	options: {
		status: [],
		specie: []	
	},
	isOpenFilters: false,
	openFilter: () => set(( state ) => ({ ...state, isOpenFilters: !state.isOpenFilters }),),
	removeOption: (option, type) => set(( state ) => {
		const updatedOptions = { ...state.options };
	
		if (updatedOptions[type]) {
		updatedOptions[type] = updatedOptions[type].filter(
        (item) => item !== option
      );
		}
	
		return { ...state, options: updatedOptions };
	},),
	removeAllOptions: () => set(( state ) => ({ ...state, options: { status: [], specie: [] } }),),
	setFilters: (option, type) => set(( state ) => {
		const updatedOptions = { ...state.options };
	
		if (!updatedOptions[type]) {
			updatedOptions[type] = []
		}

		updatedOptions[type] = [...updatedOptions[type], option]
	
		return { ...state, options: updatedOptions };
	},),
	areAllOptionsEmpty: () => {
		const options = get().options;
		return Object.values(options).every((array) => array.length === 0);
	}
}));