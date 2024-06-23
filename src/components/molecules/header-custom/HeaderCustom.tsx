import React, { useEffect, useState } from 'react'
import BackIcon from '../../../assets/icons/arrow_back.png';
import { stringsProject } from '../../utils/stringsProject';
import { useFilterStore } from '../../../global/filterState';
import { customColors } from '../../utils/customColors';
import { useCharactersGeneral } from '../../../global/charactersGeneral';
import { useFavoriteCharactersStore } from '../../../global/favoriteCharactersState';

const HeaderFilter = () => {

	const { ADVANCE_SEARCH_TITLE, 
		ADVANCE_SEARCH_TITLE_DONE_CLICK,
		ADVANCE_SEARCH_RESULTS,
		FILTER_OPTIONS_BUTTON_TEXT } = stringsProject;

	const { removeAllOptions } = useFilterStore();
	const { characters ,setCharacters, charactersOriginal } = useCharactersGeneral();
	const { addFavoriteArrayCharacter, favoriteCharactersOriginal } = useFavoriteCharactersStore()
	const [counterFilters, setCounterFilters] = useState<number>(0)


	useEffect(() => {
		const countFilters = () => {
			const options = useFilterStore.getState().options;
			const count = Object.values(options).reduce((acc, curr) => {
				if(curr?.length === 0) {
					return acc;
				}
				return acc + curr.length;
			}, 0);
			setCounterFilters(count);
		}
		countFilters();
	}, [])

	const returnAllOptions = () => {
		removeAllOptions();
		setCharacters(charactersOriginal);
		addFavoriteArrayCharacter(favoriteCharactersOriginal);
	}
		
	

  return (
	<div className='flex flex-col '>
		<div className='flex items-center w-[100%] text-center justify-between'>
			<button type='button' onClick={returnAllOptions}>
				<img src={BackIcon} alt="back_icon" />
			</button>
			<h3 className='text-base text-left py-5'>{ADVANCE_SEARCH_TITLE}</h3>
			<button type='button' onClick={returnAllOptions}>
				<h3 style={{color: customColors.purple_text}} className='text-base text-right'>{ADVANCE_SEARCH_TITLE_DONE_CLICK}</h3>
			</button>
		</div>
		<div className='border-t-[1px] py-5 -mb-4 border-b-[1px] flex justify-between items-center'>
			<span style={{color: customColors.blue_text}}>{characters.length} {ADVANCE_SEARCH_RESULTS}</span>
			<div className='py-1 px-4 rounded-xl bg-[#E0F7D7]'>
				<span style={{color: customColors.green_text}}>{counterFilters} {FILTER_OPTIONS_BUTTON_TEXT}</span>
			</div>
		</div>
	</div>

  )
}

export default HeaderFilter