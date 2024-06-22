import React, { useEffect } from 'react'
import { customColors } from '../../utils/customColors'
import { ICharacter } from '../../../models'

import FavoriteFilledIcon from '../../../assets/icons/favorites_marked.png'
import FavoriteUnfilledIcon from '../../../assets/icons/favorites_unmarked.png'
import { useNavigate } from 'react-router-dom'
import { useFavoriteCharactersStore } from '../../../global/favoriteCharactersState'

const ItemsMenu = ({id, name, status, image, isFavorite, species}: ICharacter) => {

	const navigate = useNavigate();
	const { favoriteCharacters, addFavoriteCharacter, removeFavoriteCharacter } = useFavoriteCharactersStore();

	const goDetailPage = () => {
		navigate(`/character-detail/${id}`);
	}

	const addToFavorites = () => {
		if(favoriteCharacters.find(favoriteCharacter => favoriteCharacter.id === id)) {
			removeFavoriteCharacter({
				id, name, status, image,
				species: ''
			});
		} else {
			addFavoriteCharacter({
				id, name, status, image,
				species: ''
			});
		}

	}

  return (
	<div className='flex w-full items-center py-4 border-t-[1px] relative leading-4'>
		<div className='w-full flex items-center' role='button' onClick={goDetailPage}>
			<img className='w-[32px] h-[32px] rounded-full' src={image} alt={`${name}-image`} />
			<div className='flex flex-col ml-4 w-full text-left'>
				<h3 style={{color: customColors.title_character}} className='text-base font-bold'>{name}</h3>
				<p style={{color: customColors.grey_text}} className='font-light'>{species}</p>
			</div>
		</div>
		<div className='z-20' onClick={addToFavorites}>
			{
				isFavorite ? (
					<img src={FavoriteFilledIcon} alt="favorite_icon" />
				) : (
					<img src={FavoriteUnfilledIcon} alt="favorite_icon_unfilled" />
				)
			}
		</div>
			
	</div>
  )
}

export default ItemsMenu