import React from 'react'
import { stringsProject } from '../../utils/stringsProject';
import { customColors } from '../../utils/customColors';
import SearchIcon from '../../../assets/icons/search_icon.png'
import FilterIcon from '../../../assets/icons/filter.png'
import { useCharactersGeneral } from '../../../global/charactersGeneral';
import { ICharacter } from '../../../models';
import { useFilterStore } from '../../../global/filterState';
import { useFavoriteCharactersStore } from '../../../global/favoriteCharactersState';
import { useDesignUi } from '../../../global/design-ui';

const SearchBar = () => {

	const { favoriteCharactersOriginal, addFavoriteArrayCharacter } = useFavoriteCharactersStore();
	const { charactersOriginal, setCharacters } = useCharactersGeneral();
	const { openFilter } = useFilterStore();
	const { isMobile } = useDesignUi();

	const {
		INPUT_SEARCH_PLACEHOLDER
	} = stringsProject;

	const filterBySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchText = event.target.value.toLowerCase();

		const filterCharacters = (characters: ICharacter[], searchText: string) => {
            return characters.filter((character: ICharacter) =>
                character.name.toLowerCase().includes(searchText)
            );
        };

		const filteredCharacters = searchText !== '' 
            ? filterCharacters(charactersOriginal, searchText) 
            : charactersOriginal;

			const filteredFavoriteCharacters = searchText !== '' 
            ? filterCharacters(favoriteCharactersOriginal, searchText) 
            : favoriteCharactersOriginal;
			
        setCharacters(filteredCharacters);
        addFavoriteArrayCharacter(filteredFavoriteCharacters);
	}


  return (
	<div className={`flex relative pt-5 w-auto `}>
		<img className='w-[20px] h-[20px] absolute left-3 top-1/2' src={SearchIcon} alt="search_icon" />
		<input onChange={filterBySearch} style={{backgroundColor: customColors.primary}} className='rounded-md p-5 pl-11 w-full h-[38px] placeholder:text-[16px] placeholder-[#6B7280]' type="text" placeholder={INPUT_SEARCH_PLACEHOLDER} />
		<button type="button" onClick={() => {
			openFilter();
		}}>
			<img className='absolute w-[16px] h-[16px] right-3 top-1/2' src={FilterIcon} alt="filter_button" />
		</button>
	</div>
  )
}

export default SearchBar