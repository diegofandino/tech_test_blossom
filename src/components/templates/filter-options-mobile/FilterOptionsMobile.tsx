import React from 'react'
import BackIcon from '../../../assets/icons/arrow_back.png'
import { stringsProject } from '../../utils/stringsProject';
import FilterOptions from '../../molecules/filter-options/FilterOptions';
import { useFilterStore } from '../../../global/filterState';

const FilterOptionsMobile = ({setIsOpenFilterOptions}: {setIsOpenFilterOptions: React.Dispatch<React.SetStateAction<boolean>>}) => {

	const { options, areAllOptionsEmpty } = useFilterStore();

	console.log(options);

	const {
		FILTER_OPTIONS_TITLE,
		FILTER_OPTIONS_BUTTON_TEXT
	} = stringsProject;

  return (
	<div className='flex flex-col justify-between w-full h-full absolute left-0 top-0 bg-white z-20 p-5'>
		<div>
			<div className='flex w-[100%] text-center justify-between'>
				<button type='button' onClick={() => setIsOpenFilterOptions(prevState => !prevState)}>
					<img src={BackIcon} alt="back_icon" />
				</button>
				<h3 className='text-base  text-left  py-5'>{FILTER_OPTIONS_TITLE}</h3>
				<span></span>
			</div>

			<div>
				<FilterOptions titleFilter='Status' options={['All', 'Starred', 'Others']} /> 
				<FilterOptions titleFilter='Specie' options={['All', 'Human', 'Alien']} /> 
			</div>
		</div>

		<button disabled={areAllOptionsEmpty()} type='button' className={`min-w-[327px] w-[327px] h-[39px] ${areAllOptionsEmpty() ? 'bg-[#F3F4F6]' : 'bg-[#8054C7]' } rounded-md`}>
			<span className={`${areAllOptionsEmpty() ? 'text-[#6B7280]' : 'text-white' }`}>{FILTER_OPTIONS_BUTTON_TEXT}</span>
		</button>
		
	</div>
  )
}

export default FilterOptionsMobile