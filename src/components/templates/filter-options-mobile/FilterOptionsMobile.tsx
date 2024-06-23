import BackIcon from '../../../assets/icons/arrow_back.png'
import { stringsProject } from '../../utils/stringsProject';
import FilterOptions from '../../molecules/filter-options/FilterOptions';
import { useFilterStore } from '../../../global/filterState';
import { useCharactersGeneral } from '../../../global/charactersGeneral';
import { ICharacter } from '../../../models';
import { useDesignUi } from '../../../global/design-ui';
import { useFavoriteCharactersStore } from '../../../global/favoriteCharactersState';

const FilterOptionsMobile = () => {

	const { options, areAllOptionsEmpty } = useFilterStore();
	const { addFavoriteArrayCharacter, favoriteCharactersOriginal } = useFavoriteCharactersStore();

	const { charactersOriginal, setCharacters } = useCharactersGeneral();
	const { openFilter } = useFilterStore();
	const { isMobile } = useDesignUi();

	const {
		FILTER_OPTIONS_TITLE,
		FILTER_OPTIONS_BUTTON_TEXT
	} = stringsProject;

	const filterData = () => {
		setCharacters(charactersOriginal);
		addFavoriteArrayCharacter(favoriteCharactersOriginal);

		if((options.specie?.includes('All') || options.status?.includes('All'))) {
				setCharacters(charactersOriginal);
				addFavoriteArrayCharacter(favoriteCharactersOriginal);
				openFilter();
				return;
		}

		const filteredCharacters = charactersOriginal.filter((character: ICharacter) =>
			(options.specie?.length === 0 || options.specie?.includes(character.species!)) &&
			(options.status?.length === 0 || options.status?.includes(character.status))
		);
		
		const filteredCharactersStarred = favoriteCharactersOriginal.filter((character: ICharacter) =>
			(options.specie?.length === 0 || options.specie?.includes(character.species!)) &&
			(options.status?.length === 0 || options.status?.includes(character.status))
		);
		
		if(options?.status.includes('Starred')) {
			addFavoriteArrayCharacter(favoriteCharactersOriginal);
			setCharacters([]);
			openFilter();
			return;
		}
		setCharacters(filteredCharacters);
		addFavoriteArrayCharacter(filteredCharactersStarred);
		openFilter();
	}

  return (
	<div >
		<div className={`flex flex-col justify-between ${isMobile ? 'w-full h-full left-0 top-0' : 'w-[343px] h-[auto] left- shadow-lg top-[130px] rounded-lg '} absolute  bg-white z-20 p-5`}>
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
	</div>
	
  )
}

export default FilterOptionsMobile