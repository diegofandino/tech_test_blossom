import React, { useState } from 'react'
import Title from '../../atoms/title/Title'
import { stringsProject } from '../../utils/stringsProject';
import SearchBar from '../../molecules/search-bar/SearchBar';

import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../../../queries/get-characters';
import Items from '../Items/Items';
import FilterOptionsMobile from '../../templates/filter-options-mobile/FilterOptionsMobile';

const Sidebar = () => {

	const { loading,  data } = useQuery(GET_CHARACTERS, {
		variables: { page: 1 },
	});

	const [isOpenFilterOptions, setIsOpenFilterOptions] = useState(false);

	if (loading) return <p>Loading...</p>;

	const {
		TITLE_INITIAL_PROJECT,
		CHARACTERS_GET_TITLE
	} = stringsProject;

	console.log(data?.characters.results)
  return (
	<div>
		<div className={`${isOpenFilterOptions ? 'hidden' : 'block'}`}>
			<Title title={TITLE_INITIAL_PROJECT} />
			<SearchBar setIsOpenFilterOptions={setIsOpenFilterOptions} />
			<Items title={CHARACTERS_GET_TITLE} Characters={data?.characters.results} />
		</div>
		{isOpenFilterOptions && 
		(
		<div className={`${isOpenFilterOptions ? 'block' : 'hidden'}`}>
			<FilterOptionsMobile setIsOpenFilterOptions={setIsOpenFilterOptions} />
		</div>
		)
		}
	</div>
  )
}

export default Sidebar