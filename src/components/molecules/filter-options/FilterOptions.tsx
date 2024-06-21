import React from 'react'
import SelectItem from '../../atoms/select-item/SelectItem'
import { FilterOptionsModel } from '../../../models'
import { customColors } from '../../utils/customColors'

const FilterOptions = ({titleFilter, options}: FilterOptionsModel) => {
  return (
	<div className='py-2'>
		<h3 style={{color: customColors.grey_text}} className='text-base text-left'>{titleFilter}</h3>
		<div className="grid grid-cols-3 gap-x-5 m-4 max-w-md mx-auto">
			{options.map((option) => (
				<SelectItem titleFilter={titleFilter} key={`${titleFilter} + ${option}`} optionName={option} />
			))}
		</div>
	</div>
  )
}

export default FilterOptions