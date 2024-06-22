import React, { useState } from 'react'
import { ItemsModelToShow } from '../../../models'
import ItemsMenu from '../../molecules/items-menu/ItemsMenu'
import { customColors } from '../../utils/customColors'
import { useFavoriteCharactersStore } from '../../../global/favoriteCharactersState'
import ArrowSort from '../../../assets/icons/arrow_back.png';

const Items = ({title, Characters}: ItemsModelToShow) => {

	const { favoriteCharacters } = useFavoriteCharactersStore();
	const [isSorted, setIsSorted] = useState(false);

	const sortCharacters = () => {
		if (Characters && Characters.length > 0) {
			if (isSorted) {
			Characters.sort((a, b) => b.name.localeCompare(a.name));
			} else {
			Characters.sort((a, b) => a.name.localeCompare(b.name));
			}
			setIsSorted((prevState) => !prevState);
		}
	};

	const isFavoriteItem = (id: string) => {
		const isFavorite = favoriteCharacters.find(favoriteCharacter => favoriteCharacter.id === id);
		return isFavorite && Object.keys(isFavorite).length > 0 ? true : false;
	}

  return (
	<div>
		<div className='flex justify-between px-5'>
			<h3 style={{color: customColors.grey_text}} className='text-sm uppercase text-left py-5'>{title} ({Characters?.length})</h3>
			<button className='flex items-center' role='button' onClick={sortCharacters}>
				<img className={`${!isSorted ? 'rotate-90' : '-rotate-90'}`} src={ArrowSort} alt="arrow_sort" />
				<span style={{color: customColors.grey_text}} className='text-[13px] -mb-2'>(A-Z)</span>
			</button>
		</div>
		{
			Characters?.map((character) => (
				<ItemsMenu
					id={character.id}
					key={character.name}
					name={character.name}
					status={character.status}
					image={character.image}
					isFavorite={isFavoriteItem(character.id)} species={character.species}				/>
			))
		}
	</div>
  )
}

export default Items