import React from 'react'
import { customColors } from '../../utils/customColors'
import { ICharacter } from '../../../models'

import FavoriteFilledIcon from '../../../assets/icons/favorites_marked.png'
import FavoriteUnfilledIcon from '../../../assets/icons/favorites_unmarked.png'
import { useNavigate } from 'react-router-dom'

const ItemsMenu = ({id, name, status, image, isFavorite}: ICharacter) => {

	const navigate = useNavigate();

	const goDetailPage = () => {
		navigate(`/character-detail/${id}`);
	}


  return (
	<div role="button" onClick={goDetailPage} className='flex w-full items-center py-4 border-t-[1px] relative leading-4'>
		<img className='w-[32px] h-[32px] rounded-full' src={image} alt={`${name}-image`} />
		<div className='flex flex-col ml-4 w-full text-left'>
			<h3 style={{color: customColors.title_character}} className='text-base font-bold'>{name}</h3>
			<p style={{color: customColors.grey_text}} className='font-light'>{status}</p>
		</div>
		{
			isFavorite ? (
				<img src={FavoriteFilledIcon} alt="favorite_icon" />
			) : (
				<img src={FavoriteUnfilledIcon} alt="favorite_icon_unfilled" />
			)
		}
	</div>
  )
}

export default ItemsMenu