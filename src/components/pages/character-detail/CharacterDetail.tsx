import { useEffect, useRef, useState } from 'react'
import { customColors } from '../../utils/customColors'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_DETAIL_CHARACTER } from '../../../queries/get-detail-character'
import { ICharacter, ICharacterDetail } from '../../../models/Characters.model';
import { stringsProject } from '../../utils/stringsProject'

import BackIcon from '../../../assets/icons/arrow_back.png';
import FavoriteFilledIcon from '../../../assets/icons/favorites_marked.png';
import FavoriteUnfilledIcon from '../../../assets/icons/favorites_unmarked.png';
import { useFavoriteCharactersStore } from '../../../global/favoriteCharactersState'
import { useDesignUi } from '../../../global/design-ui'
import { useCharactersGeneral } from '../../../global/charactersGeneral'

const CharacterDetail = () => {

	const navigate = useNavigate();
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { isMobile } = useDesignUi();
	const { characters, setCharacters, setCharactersOriginal } = useCharactersGeneral();
	const { favoriteCharacters, addFavoriteCharacter, removeFavoriteCharacter } = useFavoriteCharactersStore();
	const {
		DETAIL_SPECIE_TITLE,
		DETAIL_STATUS_TITLE,
		COMMENTS_ADD_PLACEHOLDER,
		COMMENTS_ADD_BUTTON,
		COMMENTS_TITLE_PLACEHOLDER
	} = stringsProject;

	const { id } = useParams();
	const [isButtonEnabled, setIsButtonEnabled] = useState(false);
	const [characterDetail, setcharacterDetail] = useState<ICharacter | undefined>(undefined);

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

	const handleInputChange = () => {
        if (inputRef.current?.value) {
            setIsButtonEnabled(true);
        } else {
            setIsButtonEnabled(false);
        }
    }

	const addCommentToCharacter = () => {
		if (characters) {
			const characterChoosed = characters.find(character => character.id === id);
			if (characterChoosed && inputRef.current?.value) {
				const updatedCharacter = {
					...characterChoosed,
					comments: [...(characterChoosed.comments || []), {
						id: Date.now(),
						comment: inputRef.current.value
					}]
				};
				const updatedCharacters = characters.map(character =>
					character.id === id ? updatedCharacter : character
				);
				setCharacters(updatedCharacters);
				setCharactersOriginal(updatedCharacters);
				inputRef.current.value = '';
				handleInputChange();
			}
		}
	}

	useEffect(() => {
		const characterChoosed = characters.find(character => character.id === id);
		setcharacterDetail(characterChoosed);
	}, [characters, id]);
	
	if (loading) return <p>Loading...</p>;

  return (
	<div className={`block ${isMobile ? 'absolute top-0 left-0 w-full h-full p-5' : 'relative px-14'} bg-white`}>
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
				<div className='flex flex-col w-full py-4 text-left'>
					<h3 style={{color: customColors.title_character}} className='text-base font-bold'>{COMMENTS_TITLE_PLACEHOLDER}</h3>
					{
						characterDetail?.comments?.map((comment) => (
							<div key={comment.id} className='py-4 border-b-[1px] last:border-b-0'>
								<p style={{color: customColors.grey_text}} className='font-light pb-2'>{comment.comment}</p>
								<span className='font-light text-[12px]'>Comment at: {new Date(comment.id).toLocaleString().split(',')[0]}</span>
							</div>
						))
					}
				</div>
			</div>
			<div className=' w-full'>
				<input onKeyDown={(e) => e.key === 'Enter' && addCommentToCharacter()} onChange={handleInputChange} type="text" ref={inputRef} className='mb-5 w-full border-[1px] border-[#E5E7EB] rounded-lg px-4 py-2 focus:border-[#8054C7] focus:outline-none' placeholder={COMMENTS_ADD_PLACEHOLDER} />
				<button onClick={addCommentToCharacter} disabled={!isButtonEnabled} type='button' className={`w-full h-[39px] mx-auto ${!isButtonEnabled ? 'bg-[#F3F4F6]' : 'bg-[#8054C7]' } rounded-md`}>
					<span className={`${!isButtonEnabled ? 'text-[#6B7280]' : 'text-white' }`}>{COMMENTS_ADD_BUTTON}</span>
				</button>
			</div>
	</div>
  )
}

export default CharacterDetail