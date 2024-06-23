import { render } from '@testing-library/react';
import Title from '../Title';

describe('Title Component', () => {
  it('Render correctly the title component (simple effect)', () => {
    const { getByText } = render(<Title title="Test Title" />);
    expect(getByText('Test Title')).toBeInTheDocument();
  });
});