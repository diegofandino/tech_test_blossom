import React from 'react'
import { ItemsModelToShow } from '../../../models'
import ItemsMenu from '../../molecules/items-menu/ItemsMenu'
import { customColors } from '../../utils/customColors'

const Items = ({title, Characters}: ItemsModelToShow) => {
  return (
	<div>
		<h3 style={{color: customColors.grey_text}} className='text-sm uppercase text-left py-5'>{title} ({Characters?.length})</h3>
		{
			Characters?.map((character) => (
				<ItemsMenu
					id={character.id}
					key={character.name}
					name={character.name}
					status={character.status}
					image={character.image}
					isFavorite={character.isFavorite} species={''}				/>
			))
		}
	</div>
  )
}

export default Items