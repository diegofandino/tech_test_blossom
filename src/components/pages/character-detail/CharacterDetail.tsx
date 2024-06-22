import React from 'react'
import { customColors } from '../../utils/customColors'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_DETAIL_CHARACTER } from '../../../queries/get-detail-character'
import { ICharacterDetail } from '../../../models/Characters.model';
import { stringsProject } from '../../utils/stringsProject'

import BackIcon from '../../../assets/icons/arrow_back.png';
import FavoriteFilledIcon from '../../../assets/icons/favorites_marked.png';
import FavoriteUnfilledIcon from '../../../assets/icons/favorites_unmarked.png';
import { type } from '../../../models/index';
import { useFavoriteCharactersStore } from '../../../global/favoriteCharactersState'
import { useDesignUi } from '../../../global/design-ui'

const CharacterDetail = () => {

	const navigate = useNavigate();
	const { isMobile } = useDesignUi();
	const { favoriteCharacters, addFavoriteCharacter, removeFavoriteCharacter } = useFavoriteCharactersStore();
	const {
		DETAIL_SPECIE_TITLE,
		DETAIL_STATUS_TITLE
	} = stringsProject;

	const { id } = useParams();

	const isFavoriteCharacter = () => {
			return !!favoriteCharacters.find(favoriteCharacter => favoriteCharacter.id === id);
	}

	const { loading, data } = useQuery(GET_DETAIL_CHARACTER, {
		variables: { id },
	});

	const characterData: ICharacterDetail = data?.character;


	const addToFavorites = () => {
		if(favoriteCharacters.find(favoriteCharacter => favoriteCharacter.id === id)) {
			removeFavoriteCharacter(characterData);
		} else {
			addFavoriteCharacter(characterData);
		}

	}

	if (loading) return <p>Loading...</p>;

  return (
	<div className={`block ${isMobile ? 'absolute top-0 left-0 w-full h-full p-5' : 'relative px-20'} bg-white`}>
		{
			isMobile && 
			(
				<button className='flex pb-8' type='button' onClick={() => navigate(`/`)}>
					<img src={BackIcon} alt="back_icon" />
				</button>
			)
		}
		<div className='relative w-[75px] h-[75px]'>
			<img className='w-[75px] h-[75px] rounded-full' src={characterData.image} alt={`${characterData.name}-image`} />
			{
				isFavoriteCharacter() ? (
					<img onClick={addToFavorites} className='cursor-pointer absolute bottom-0 -right-3' src={FavoriteFilledIcon} alt="favorite_icon" />
				) : (
					<img onClick={addToFavorites} className='cursor-pointer absolute bottom-0 -right-3' src={FavoriteUnfilledIcon} alt="favorite_icon_unfilled" />
				)
			}
		</div>
		<h1 className='text-2xl font-bold text-left pt-2'>{characterData.name}</h1>
			<div className='flex flex-col w-full items-center py-4 relative leading-4'>
				<div className='flex flex-col border-b-[1px] py-4 w-full text-left'>
					<h3 style={{color: customColors.title_character}} className='text-base font-bold'>{DETAIL_SPECIE_TITLE}</h3>
					<p style={{color: customColors.grey_text}} className='font-light'>{characterData.species}</p>
				</div>
				<div className='flex flex-col w-full py-4 text-left'>
					<h3 style={{color: customColors.title_character}} className='text-base font-bold'>{DETAIL_STATUS_TITLE}</h3>
					<p style={{color: customColors.grey_text}} className='font-light'>{characterData.status}</p>
				</div>
			</div>
	</div>
  )
}

export default CharacterDetail