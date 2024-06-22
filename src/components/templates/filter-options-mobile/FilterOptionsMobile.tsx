import React from 'react'
import BackIcon from '../../../assets/icons/arrow_back.png'
import { stringsProject } from '../../utils/stringsProject';
import FilterOptions from '../../molecules/filter-options/FilterOptions';
import { useFilterStore } from '../../../global/filterState';
import { useCharactersGeneral } from '../../../global/charactersGeneral';
import { ICharacter } from '../../../models';
import { useDesignUi } from '../../../global/design-ui';

const FilterOptionsMobile = () => {

	const { options, areAllOptionsEmpty } = useFilterStore();

	const { charactersOriginal, setCharacters } = useCharactersGeneral();
	const { openFilter } = useFilterStore();
	const { isMobile } = useDesignUi();

	const {
		FILTER_OPTIONS_TITLE,
		FILTER_OPTIONS_BUTTON_TEXT
	} = stringsProject;

	const filterData = () => {
		setCharacters(charactersOriginal);
		console.log('options', options);

		if((options.specie?.includes('All') || options.status?.includes('All'))) {
				setCharacters(charactersOriginal);
				openFilter();
				return;
		}

		const filteredCharacters = charactersOriginal.filter((character: ICharacter) =>
			(options.specie?.length === 0 || options.specie?.includes(character.species!)) &&
			(options.status?.length === 0 || options.status?.includes(character.status))
		);
		console.log(filteredCharacters);

		setCharacters(filteredCharacters);
		openFilter();
	}

  return (
	<div className={`flex flex-col justify-between ${isMobile ? 'w-full h-full' : 'w-[343px] h-[auto] left-8 shadow-lg top-[130px] rounded-lg'} absolute left-0 top-0 bg-white z-20 p-5`}>
		<div>
			<div className='flex w-[100%] text-center justify-between'>
				{
					isMobile && 
					(
						<>
							<button type='button' onClick={openFilter}>
								<img src={BackIcon} alt="back_icon" />
							</button>
							<h3 className='text-base  text-left  py-5'>{FILTER_OPTIONS_TITLE}</h3>
							<span></span>
						</>
					)}
				
			</div>

			<div>
				<FilterOptions titleFilter='Status' options={['All', 'Starred', 'Others']} /> 
				<FilterOptions titleFilter='Specie' options={['All', 'Human', 'Alien']} /> 
			</div>
		</div>

		<button onClick={filterData} disabled={areAllOptionsEmpty()} type='button' className={`w-full h-[39px] mx-auto ${areAllOptionsEmpty() ? 'bg-[#F3F4F6]' : 'bg-[#8054C7]' } rounded-md`}>
			<span className={`${areAllOptionsEmpty() ? 'text-[#6B7280]' : 'text-white' }`}>{FILTER_OPTIONS_BUTTON_TEXT}</span>
		</button>
		
	</div>
  )
}

export default FilterOptionsMobile