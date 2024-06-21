import React from 'react'
import { stringsProject } from '../../utils/stringsProject';
import { customColors } from '../../utils/customColors';
import SearchIcon from '../../../assets/icons/search_icon.png'
import FilterIcon from '../../../assets/icons/filter.png'

const SearchBar = ({setIsOpenFilterOptions}: {setIsOpenFilterOptions: React.Dispatch<React.SetStateAction<boolean>>}) => {

	const {
		INPUT_SEARCH_PLACEHOLDER
	} = stringsProject;
  return (
	<div className='flex relative pt-5 min-w-[327px] w-[327px] '>
		<img className='w-[20px] h-[20px] absolute left-3 top-1/2' src={SearchIcon} alt="search_icon" />
		<input style={{backgroundColor: customColors.primary}} className='rounded-md p-5 pl-11 min-w-[327px] w-[327px] h-[38px] placeholder:text-[16px] placeholder-[#6B7280]' type="text" placeholder={INPUT_SEARCH_PLACEHOLDER} />
		<button type="button" onClick={() => setIsOpenFilterOptions(prevState => !prevState)}>
			<img className='absolute w-[16px] h-[16px] right-3 top-1/2' src={FilterIcon} alt="filter_button" />
		</button>
	</div>
  )
}

export default SearchBar