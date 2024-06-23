import { render } from '@testing-library/react';
import FilterOptions from '../FilterOptions';

describe('FilterOptions Component', () => {
  it('render filter in document', () => {
    const options = ['All', 'Alive', 'Dead', 'Unknown'];
    const { getByText } = render(<FilterOptions titleFilter="Options Characters" options={options} />);
    expect(getByText('Options Characters')).toBeInTheDocument();
    options.forEach(option => {
      expect(getByText(option)).toBeInTheDocument();
    });
  });
});
