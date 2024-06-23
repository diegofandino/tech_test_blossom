import { render, screen } from '@testing-library/react';
import HeaderFilter from '../HeaderCustom';
import { stringsProject } from '../../../utils/stringsProject';

const { ADVANCE_SEARCH_TITLE } = stringsProject;


describe('HeaderFilter Component', () => {
	it('renders header title if this appears, renders is correct', () => {

	render(<HeaderFilter />);
	
	const title = screen.getByText(ADVANCE_SEARCH_TITLE);
	
	expect(title).toBeInTheDocument();
	});

	it('renders filter tip with options selected now', () => {

		jest.mock('../../../../global/filterState.ts', () => ({
		useFilterStore: jest.fn().mockImplementation(() => ({
			removeAllOptions: jest.fn(),
			options: { status: ['Alive'] },
		})),
		}));

	render(<HeaderFilter />);
	const optCounter = screen.getByText(/(\d+) Filter/i);
	expect(optCounter).toBeInTheDocument();
	
	})
})
