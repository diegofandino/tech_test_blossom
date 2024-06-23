import { useEffect } from 'react'
import Title from '../../atoms/title/Title'
import { stringsProject } from '../../utils/stringsProject';
import SearchBar from '../../molecules/search-bar/SearchBar';

import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../../../queries/get-characters';
import Items from '../Items/Items';
import FilterOptionsMobile from '../../templates/filter-options-mobile/FilterOptionsMobile';
import { useFavoriteCharactersStore } from '../../../global/favoriteCharactersState';
import { ICharacter } from '../../../models';
import { useCharactersGeneral } from '../../../global/charactersGeneral';
import { useFilterStore } from '../../../global/filterState';
import HeaderFilter from '../../molecules/header-custom/HeaderCustom';
import { useDesignUi } from '../../../global/design-ui';

const Sidebar = () => {

	const { favoriteCharacters } = useFavoriteCharactersStore();
	const { options }  = useFilterStore();
	const { isMobile }  = useDesignUi();
	const { characters, setCharacters, setCharactersOriginal } = useCharactersGeneral();
	const { isOpenFilters } = useFilterStore();

	const { loading,  data } = useQuery(GET_CHARACTERS, {
		variables: { page: 1 },
	});

	const {
		TITLE_INITIAL_PROJECT,
		CHARACTERS_GET_TITLE,
		STARRED_CHARACTERS_GET_TITLE
	} = stringsProject;


	useEffect(() => {

		const getFavoritesCharacters = () => {
			if(data?.characters.results){
				const charactersList = data.characters.results as ICharacter[];
                setCharacters(charactersList);
                setCharactersOriginal(charactersList);
			}
			
		}		
		getFavoritesCharacters();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[data]);

	if (loading) return <p>Loading...</p>;

	return (
	<div>
		<div className={`${isOpenFilters && isMobile ? 'hidden' : 'block'}`}>
			{
				!isOpenFilters && options && options.specie?.length > 0 || !isOpenFilters && options.status?.length > 0 ?
				(
					<HeaderFilter />
				) : (
					<>
						<Title title={TITLE_INITIAL_PROJECT} />
						<SearchBar />
					</>
				)
			}
			
			<div className='pt-5'>
				<Items title={STARRED_CHARACTERS_GET_TITLE} Characters={favoriteCharacters} />
				<Items title={CHARACTERS_GET_TITLE} Characters={characters.filter(character => !favoriteCharacters.find(favoriteCharacter => favoriteCharacter.id === character.id))} />
			</div>
		</div>
		{isOpenFilters && 
		(
		<div className={`${isOpenFilters ? 'block' : 'hidden'}`}>
			<FilterOptionsMobile />
		</div>
		)
		}
	</div>
  )
}

export default Sidebar