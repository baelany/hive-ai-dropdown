import { render, screen } from '@testing-library/react';
import Dropdown from './Dropdown';

test('renders dropdown component', () => {
  render(<Dropdown />);
  const testid = screen.getByTestId('dropdown');
  expect(testid).toBeInTheDocument();
});
